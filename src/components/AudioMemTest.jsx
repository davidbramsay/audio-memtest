import React from 'react';
import 'normalize.css';
import 'styles/index.scss';

import {Line} from 'rc-progress';
import {CSSTransitionGroup} from 'react-transition-group';

import * as helpers from 'helpers';
import {db_uri} from 'db_config';

const TARGET_DISTANCES = [30, 40, 50, 60];

function setGlobalVolume(volume){
    //sadly must be called whenever new audio elements are
    //introduced, magic React state doesn't work for audio

    let audio_elems = document.getElementsByTagName('audio');
    for (let i=0; i < audio_elems.length; i++) {
        audio_elems[i].volume = volume;
    }

  }

const willEnter = () => ({
    opacity: spring(1, {damping:100, stiffness:20}),
    scale: spring(1, {damping:100, stiffness:20})
})

const willLeave = () => ({
    opacity: spring(0, {damping:100, stiffness:20}),
    scale: spring(0.1, {damping:100, stiffness:20})
})

const getStyles = () => ({
    opacity: spring(0.5, {damping:100, stiffness:20}),
    scale: spring(0.5, {damping:100, stiffness:20})
})


class AudioBox extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let label = this.props.src.split('/');
    label = label[label.length-1];

    return (
        <CSSTransitionGroup
            transitionName={{enter: 'ae-enter', enterActive: 'ae-enter-active', leave:'ae-leave', leaveActive:'ae-leave-active'}}
            transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
            {this.props.nowVisible ?
                <div className='audioElement' key={this.props.id}>
                    {this.props.nowPlaying ?
                        <img className='centered' key= {'im-' + label + this.props.nowPlaying} width='100%' src={require('/images/playing3.gif')}/> :
                        <img className='centered' key= {'im-' + label + this.props.nowPlaying} width='100%' src={require('/images/playing_still3.png')}/>
                    }

                    <br/>
                    <audio key={this.props.id + 'aud'} id={this.props.id}>
                        <source src={this.props.src} type='audio/wav'/>
                    </audio>
                </div> :
                ''
            }
        </CSSTransitionGroup>
    );
  }
}


class AudioCascade extends React.Component {

  constructor(props) {
    super(props);

    let nowPlaying = new Array(props.files.length).fill(0);
    nowPlaying[0] = 1;

    let nowVisible = new Array(props.files.length-3).fill(0);
    nowVisible.splice(0,0,1,1,1);

    this.state = {count: Math.floor(props.duration),
                  nowPlaying: nowPlaying,
                  nowVisible: nowVisible,
                  sampleStart: Date.now()
                 };

  }

  componentDidMount() {
    //create timer that supports non-integer seconds
    this.timerID = setInterval(
      () => this.tick(),
      Math.floor(this.props.duration / Math.floor(this.props.duration) * 1000)
    );

    window.addEventListener("keyup", this.handleKeyPress.bind(this));

    //play the first sample
    setGlobalVolume(this.props.volume);
    document.getElementById('audio-' + this.state.nowPlaying.indexOf(1)).play();

  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }


  tick() {
    //if finished a cycle, call timerDone
    if (this.state.count == 0) {
      this.TimerDone();
    }

    //update timer count
    if (this.state.count > 0) {
      this.setState(prevState => {
        return {count: prevState.count - 1}
      });
    }
    else {
      this.setState(prevState => {
        return {count: Math.floor(this.props.duration), sampleStart: Date.now()}
      });
    }

  }

  TimerDone(){
    //check if done playing all files
    if (this.state.nowPlaying.indexOf(1) == this.state.nowPlaying.length-1){
      console.log('done with test!');
      clearInterval(this.timerID);
      this.props.finishedCallback();
    }
    else {
      this.printState();

      //update nowPlaying and nowVisible
      let newPlaying = this.state.nowPlaying;
      newPlaying.splice(0,0,0);
      newPlaying.pop();

      let newVisible = this.state.nowVisible;
      newVisible.splice(0,0,0);
      newVisible.pop();

      this.setState(prevState => {
         return {nowPlaying: newPlaying,
                nowVisible: newVisible}
      });

      document.getElementById('audio-' + newPlaying.indexOf(1)).play();

    }

  }


  handleKeyPress(event) {
      if (event.keyCode == 32 || event.keyCode == 13){
          let delay = Date.now() - this.state.sampleStart;
          let index = this.state.nowPlaying.indexOf(1);
          console.log('space or enter detected');
          console.log(this.state.nowPlaying);
          console.log(index);
          console.log(delay);
          this.props.heardCallback(index, delay);
      }
  }

  handleClick() {
        let delay = Date.now() - this.state.sampleStart;
        let index = this.state.nowPlaying.indexOf(1);
        console.log('click detected');
        console.log(this.state.nowPlaying);
        console.log(index);
        console.log(delay);
        this.props.heardCallback(index, delay);
  }


  printState(){
    for (let i in this.state){
      console.log(this.state[i]);
    }
  }

  render() {

    const audioList = this.props.files.map((f, i) => {
          return (
                <AudioBox key={'audio-' + i} id={'audio-' + i} src={f} nowPlaying={this.state.nowPlaying[i]} nowVisible={this.state.nowVisible[i]} />
          );
    });

    return (
      <div className='two-third'>
        <div className='half'>
            <div className='fill'>
                <div className='vert-third centered'>
                    {this.state.count}
                </div>
                <div className='vert-rest'>
                    <div className='ae-container'>
                        {audioList}
                    </div>
                </div>
            </div>
        </div>
        <div className='half'>
            <div className='three-quarters'>
                <div>
                <Line percent={(this.state.nowPlaying.indexOf(1)+1)/(this.props.files.length) * 100} strokeWidth="5" strokeColor='#4D4F7D'/>
                </div>
                <div className='centered' style={{fontSize:'1em'}}>
                    progress: {this.state.nowPlaying.indexOf(1)+1}/{this.props.files.length}
                </div>
            </div>
        </div>
      </div>
    );
  }
}


class AudioMemTest extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            guesses: [],
            fileList: [],
            tLocation: [],
            vLocations: [],
            fLocations: [],
            remainingFiles: [],
            showDialog: false,
            dialogStats: {}
        };
    }

    componentDidMount() {
        let targ_dist = TARGET_DISTANCES;

        const rand_dist = targ_dist[Math.floor(Math.random() * targ_dist.length)];
        const vig_files = Math.floor(rand_dist/3);
        const fill_files = rand_dist-vig_files*2 + 5;

        helpers.getAllWaves(
            [
                'https://keyword.media.mit.edu/shared/natural_sounds/',
                'https://keyword.media.mit.edu/shared/ambiguous_sounds/',
                'https://keyword.media.mit.edu/shared/final_morph/'
            ]
        ).done(function(data){

            let dataToFunc = data.slice();
            let ret_vals = helpers.createLevelFromFiles(dataToFunc, vig_files, fill_files, rand_dist);
            this.setState({
                fileList: ret_vals[1].file_list,
                guesses: new Array(ret_vals[1].file_list.length).fill(0),
                tLocation: ret_vals[1].t_location,
                vLocations: ret_vals[1].v_locations,
                fLocations: ret_vals[1].f_locations,
                remainingFiles: ret_vals[0],
                allFiles: data
            });

            console.log(this.state);

        }.bind(this));

        /*
        helpers.createRandomLevel(vig_files, fill_files, rand_dist).then((data)=>{
            console.log('-- created level --');
            console.log(data);
            this.setState({
                fileList: data.file_list,
                guesses: new Array(data.file_list.length).fill(0),
                tLocation: data.t_location,
                vLocations: data.v_locations,
                fLocations: data.f_locations
            });
        });
        */
    }

    flashGood() {
        document.getElementsByName('container')[0].classList.add('flashgreen');
        setTimeout(() => {document.getElementsByName('container')[0].classList.remove('flashgreen')}, 500);
    }

    flashBad() {
        document.getElementsByName('container')[0].classList.add('flashred');
        setTimeout(() => {document.getElementsByName('container')[0].classList.remove('flashred')}, 500);
    }

    heardIndicated(index, delay){

        console.log('heard ' + index + ' ' + delay);

        if (!this.state.guesses[index]) {

            let guesses = this.state.guesses;
            guesses[index] = delay;
            this.setState({
                guesses: guesses
            });

        }

        if (this.state.fileList.indexOf(this.state.fileList[index]) < index){
            this.flashGood();
        }else {
            this.flashBad();
        }
    }

    completeIndicated(){

        const tcorrect = (this.state.guesses[this.state.tLocation[1]] ? true : false);
        let incorrect = (this.state.guesses[this.state.tLocation[0]] ? 1 : 0);

        let vcorrect = 0;
        let vtotal = 0;

        for (var v in this.state.vLocations){
            if (this.state.guesses[this.state.vLocations[v][0]]) incorrect += 1;
            if (this.state.guesses[this.state.vLocations[v][1]]) vcorrect += 1;
            vtotal += 1;
        }

        for (var f in this.state.fLocations){
            if (this.state.guesses[this.state.fLocations[f]]) incorrect += 1;
        }

        const falsePositives = incorrect / (1 + vtotal + this.state.fLocations.length);
        const vPercent = vcorrect / vtotal;

        let xhr = new XMLHttpRequest();
        xhr.open('POST', db_uri);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                this.setState({
                    fileList: [],
                    showDialog: true,
                    dialogStats: {"vcorrect": vcorrect, "tcorrect": tcorrect, "vtotal": vtotal, "incorrect": incorrect}
                });
            }else if (xhr.readyState == XMLHttpRequest.DONE) {
                alert('ERROR: results failed to save!  Please email dramsay@mit.edu and tell him to fix it! You scored: ' + (vcorrect + (tcorrect ? 1 : 0)) + '/' + (vtotal+1) + ' and had ' + incorrect + ' incorrect guesses.');
            }
        }.bind(this);

        const jsonStr = JSON.stringify({
            "uid": this.props.uid,
            "guesses": this.state.guesses,
            "fileList": this.state.fileList,
            "tLocation": this.state.tLocation,
            "vLocations": this.state.vLocations,
            "fLocations": this.state.fLocations,
            "tCorrect": tcorrect,
            "vPercent": vPercent,
            "falsePositives": falsePositives});

        xhr.send(jsonStr);
        console.log(this.state);
        console.log('tcorrect: ' + tcorrect);
        console.log('vpercent: ' + vPercent);
        console.log('falsePos: ' + falsePositives);
        console.log('vtotal: ' + vtotal);
        console.log('incorrect: ' + incorrect);
        console.log('vcorrect: ' + vcorrect);


    }

    newGame() {
        console.log('new game initiated');

        let choices = this.state.remainingFiles.slice();

        let targ_dist = TARGET_DISTANCES;
        console.log(targ_dist);

        const rand_dist = targ_dist[Math.floor(Math.random() * targ_dist.length)];
        const vig_files = Math.floor(rand_dist/3);
        const fill_files = rand_dist-vig_files*2 + 5;

        if ( (2+2*vig_files+fill_files) > choices.length ){
            console.log('not enough left, re-adding previous sounds');
            choices = this.state.allFiles.slice();
        }

        let ret_vals = helpers.createLevelFromFiles(choices, vig_files, fill_files, rand_dist);
        this.setState({
            fileList: ret_vals[1].file_list,
            guesses: new Array(ret_vals[1].file_list.length).fill(0),
            tLocation: ret_vals[1].t_location,
            vLocations: ret_vals[1].v_locations,
            fLocations: ret_vals[1].f_locations,
            remainingFiles: ret_vals[0],
            showDialog: false
        });

        console.log(this.state);
        console.log(ret_vals[0].length);

    }

    render () {
        return (
            <div className='fill' onClick={() => {this.child.handleClick.bind(this.child)();}}>
            <div className='third'>
                <h1>
                    Memory Test
                </h1>
                    Press the *Space Bar* or Click the Screen if you hear a sound that has repeated!  You should see the screen flash when you do.  Good luck!
            </div>
                {this.state.fileList.length ?
                        <AudioCascade ref={instance => {this.child = instance;}} files={this.state.fileList} duration={6} volume={0.5} heardCallback={this.heardIndicated.bind(this)} finishedCallback={this.completeIndicated.bind(this)}/>
                    :null
                }
                {this.state.showDialog ?
                    <div>
                    <div>
                        results saved! you scored {(this.state.dialogStats['vcorrect'] + (this.state.dialogStats['tcorrect'] ? 1 : 0))} / {(this.state.dialogStats['vtotal']+1)} and had {this.state.dialogStats['incorrect']} incorrect guesses.
                    </div>
                    <div className='centered button playbutton' style={{marginRight:'30px', marginTop:'25px'}} onClick={this.newGame.bind(this)}> Next Level! </div>
                    </div>
                    :null
                }
        </div>
        );
    }
}


AudioMemTest.defaultProps = {
    uid: helpers.makeid()
}

export default AudioMemTest;
