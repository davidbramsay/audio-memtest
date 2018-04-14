import React from 'react';
import 'normalize.css';
import 'styles/index.scss';

import {Line} from 'rc-progress';
import {CSSTransitionGroup} from 'react-transition-group';

import * as helpers from 'helpers';
import {db_uri} from 'db_config';

const TARGET_DISTANCES = [60];
const NUM_TARGETS = 3;

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
                  sampleStart: Date.now(),
                  audioLoaded: false,
                  loaded: 0,
                  audio: []

                 };

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.loadedAudio = this.loadedAudio.bind(this);
    this.finishedAudioLoad = this.finishedAudioLoad.bind(this);

  }

  componentDidMount() {
    console.log('mounted cascade!');

    //preload audio
    this.setState({loaded: 0});

    let audio = [];
    for (let i in this.props.files){
        audio[i] = new Audio();
        audio[i].addEventListener('canplaythrough', this.loadedAudio, false);
        audio[i].src = this.props.files[i] + "?cb=" + new Date().getTime();
        audio[i].volume = this.props.volume;
    }

    /*
    this.cachetimeout = setTimeout(function(){

        console.log('load timeout :/');
        this.finishedAudioLoad();

    }.bind(this), 8000);
    */


    this.setState({ audio: audio });




  }

  componentWillUnmount() {
    console.log('Cleared Timer:' + this.timerID);
    this.setState({ audioLoaded: false });
    clearInterval(this.timerID);
    /*if (this.cachetimeout) {
        clearTimeout(this.cachetimeout);
        this.cachetimeout = null;
    }*/
    window.removeEventListener("keyup", this.handleKeyPress);
    window.removeEventListener("click", this.handleClick);
    for (let i in this.state.audio){
        this.state.audio[i].removeEventListener('canplaythrough', this.loadedAudio);
    }
  }

  finishedAudioLoad() {

        setGlobalVolume(this.props.volume);

        //create timer that supports non-integer seconds
        this.timerID = setInterval(
        () => this.tick(),
        Math.floor(this.props.duration / Math.floor(this.props.duration) * 1000)
        );

        setTimeout(()=>{window.addEventListener("keyup", this.handleKeyPress)}, 400);
        setTimeout(()=>{window.addEventListener("click", this.handleClick)}, 400);

        //play the first sample
        this.setState({ audioLoaded: true });
        this.state.audio[this.state.nowPlaying.indexOf(1)].play();

  }

  loadedAudio() {

    let newload = this.state.loaded + 1;
    this.setState({loaded: newload});

    console.log('loaded ' + newload);

    if (newload == this.props.files.length){

        //clearTimeout(this.cachetimeout);
        //this.cachetimeout = null;
        console.log('loaded all! start it!');
        this.finishedAudioLoad();

    }
  }

  tick() {
    console.log('tick! ' + this.state.count +  '   ' + (Date.now()-this.state.sampleStart));
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
      let newPlaying = this.state.nowPlaying.slice();
      newPlaying.splice(0,0,0);
      newPlaying.pop();

      let newVisible = this.state.nowVisible.slice();
      newVisible.splice(0,0,0);
      newVisible.pop();

      this.setState(prevState => {
         return {nowPlaying: newPlaying,
                nowVisible: newVisible}
      });

      this.state.audio[newPlaying.indexOf(1)].play();

    }

  }


  handleKeyPress(event) {
      if (event.keyCode == 32 || event.keyCode == 13){
          let delay = Date.now() - this.state.sampleStart;
          let index = this.state.nowPlaying.indexOf(1);
          console.log('space or enter detected');
          console.log(this);
          console.log(index);
          console.log(delay);
          this.props.heardCallback(index, delay);
      }
  }

  handleClick() {
        let delay = Date.now() - this.state.sampleStart;
        let index = this.state.nowPlaying.indexOf(1);
        console.log('click detected');
        console.log(this);
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
                <AudioBox key={'audio-' + i} id={'audio-' + i} src={f} nowPlaying={this.state.nowPlaying[i]} nowVisible={this.state.nowVisible[i]} loadedAudio={this.loadedAudio} />
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
                    {this.state.audioLoaded ?
                        <div className='ae-container'>
                            {audioList}
                        </div>
                       :<div style={{display:'table', width:'100%', height:'100%'}}>
                            <div style={{display:'table-cell', fontSize:'3em',color:'white',textAlign:'left',verticalAlign:'middle'}}>
                                loading {this.state.loaded}/{this.props.files.length} sounds...
                            </div>
                        </div>
                    }
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
            tLocations: [],
            vLocations: [],
            fLocations: [],
            remainingFillFiles: [],
            remainingTargets: [],
            showDialog: false,
            dialogStats: {},
            successString: ''
        };

        this.newGame = this.newGame.bind(this);
        this.heardIndicated = this.heardIndicated.bind(this);
        this.completeIndicated = this.completeIndicated.bind(this);
    }

    componentDidMount() {
        let targ_dist = TARGET_DISTANCES;

        const rand_dist = targ_dist[Math.floor(Math.random() * targ_dist.length)];
        const vig_files = Math.floor(rand_dist/3);
        const fill_files = rand_dist-vig_files*2 + 10;

        helpers.getAllWaves(
            [
                'https://keyword.media.mit.edu/shared/natural_sounds/',
                'https://keyword.media.mit.edu/shared/ambiguous_sounds/',
                'https://keyword.media.mit.edu/shared/final_morph/'
            ]
        ).done(function(data){
            //got all audio files

            helpers.getTargets().done(function(targets){
                //got targets audio files that have fewers submits

                //copy all audio files to new array
                let dataToFunc = data.slice();
                //remove the target files from the filler array
                for (let i in targets){
                    var index = dataToFunc.indexOf(targets[i]);
                    if (index !== -1) dataToFunc.splice(index, 1);
                }

                let ret_vals = helpers.createLevelFromTargetAndFiles(targets.splice(0,NUM_TARGETS), dataToFunc, vig_files, fill_files, rand_dist);

                console.log(ret_vals);

                this.setState({
                    fileList: ret_vals[1].file_list,
                    guesses: new Array(ret_vals[1].file_list.length).fill(0),
                    tLocations: ret_vals[1].t_locations,
                    vLocations: ret_vals[1].v_locations,
                    fLocations: ret_vals[1].f_locations,
                    remainingFillFiles: ret_vals[0],
                    remainingTargets: targets,
                    allFiles: data
                });

            }.bind(this));

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
        console.log('green flash');
        console.log(this.state.guesses);
        document.getElementsByName('container')[0].classList.add('flashgreen');
        setTimeout(function() {document.getElementsByName('container')[0].classList.remove('flashgreen');}, 300);
    }

    flashBad() {
        console.log('red flash');
        console.log(this.state.guesses);
        document.getElementsByName('container')[0].classList.add('flashred');
        setTimeout(function() {document.getElementsByName('container')[0].classList.remove('flashred');}, 300);
    }

    heardIndicated(index, delay){

        console.log('heard ' + index + ' ' + delay);

        if (!this.state.guesses[index]) {

            let guesses = this.state.guesses.slice();
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

        let incorrect = 0;
        let tcorrect = [];

        for (var t in this.state.tLocations){
            if (this.state.guesses[this.state.tLocations[t][0]]) incorrect += 1;
            tcorrect.push(this.state.guesses[this.state.tLocations[t][1]] ? true : false);
        }


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

        const falsePositives = incorrect / (NUM_TARGETS + vtotal + this.state.fLocations.length);
        const vPercent = vcorrect / vtotal;

        let xhr = new XMLHttpRequest();
        xhr.open('POST', db_uri);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {

                if ((vPercent > 0.6) && (falsePositives < 0.4)){
                    helpers.getSuccessString().done(function(str){ this.setState({"successString": str}); }.bind(this));
                }

                this.setState({
                    fileList: [],
                    showDialog: true,
                    dialogStats: {"vcorrect": vcorrect, "tcorrect": tcorrect, "vtotal": vtotal, "incorrect": incorrect, "falsePositives": falsePositives, "vPercent": vPercent}
                });
            }else if (xhr.readyState == XMLHttpRequest.DONE) {
                alert('ERROR: results failed to save!  Please email dramsay@mit.edu and tell him to fix it! You scored: ' + (vcorrect + tcorrect.filter(v => v).length) + '/' + (vtotal+NUM_TARGETS) + ' and had ' + incorrect + ' incorrect guesses.');
            }
        }.bind(this);

        const jsonStr = JSON.stringify({
            "uid": this.props.uid,
            "guesses": this.state.guesses,
            "fileList": this.state.fileList,
            "tLocation": this.state.tLocations,
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

        let choices = this.state.remainingFillFiles.slice();
        let targets = this.state.remainingTargets.slice();

        let targ_dist = TARGET_DISTANCES;

        const rand_dist = targ_dist[Math.floor(Math.random() * targ_dist.length)];
        const vig_files = Math.floor(rand_dist/3);
        const fill_files = rand_dist-vig_files*2 + 10;

        let ret_vals = helpers.createLevelFromTargetAndFiles(targets.slice(0,NUM_TARGETS), choices, vig_files, fill_files, rand_dist);

        console.log(ret_vals);

        this.setState({
            fileList: ret_vals[1].file_list,
            guesses: new Array(ret_vals[1].file_list.length).fill(0),
            tLocations: ret_vals[1].t_locations,
            vLocations: ret_vals[1].v_locations,
            fLocations: ret_vals[1].f_locations,
            remainingFillFiles: ret_vals[0],
            remainingTargets: targets,
            showDialog: false
        });

        console.log(ret_vals[0].length);

    }

    render () {
        console.log(this.state);
        return (
            <div className='fill'>
            <div className='third'>
                <h1>
                    Memory Test
                </h1>
                    Press the *Space Bar* or Click the Screen if you hear a sound that has repeated!  You should see the screen flash when you do.  Good luck!
            </div>
                {this.state.fileList.length ?
                        <AudioCascade files={this.state.fileList} duration={6} volume={this.props.volume} heardCallback={this.heardIndicated} finishedCallback={this.completeIndicated}/>
                    :null
                }
                {this.state.showDialog ?
                    <div>

                        <div>
                            Results saved! You got {(this.state.dialogStats['vcorrect'] + this.state.dialogStats['tcorrect'].filter(v=>v).length)} / {(this.state.dialogStats['vtotal']+NUM_TARGETS)} and had {this.state.dialogStats['incorrect']} incorrect guesses.

                            {((this.state.dialogStats['vPercent'] > 0.6) && (this.state.dialogStats['falsePositives'] < 0.4)) ?
                                <div>
                                Please copy and paste this code into the amazon interface to receive your payment for this test: <br/><br/><b>{this.state.successString}</b><br/><br/>
                                </div>
                                : <div>You did not appear to be paying attention enough throughout this test to earn your reward, you need to be correct more than half of the time.</div>
                            }
                        </div>

                        {this.state.remainingTargets.length ?
                            <div>
                                <div> Please make sure to check out another hit in the turk interface *before* hitting this button! </div>
                                <div className='centered button playbutton' style={{marginRight:'30px', marginTop:'25px'}} onClick={this.newGame}> Next Level! </div>
                            </div>
                            : <div>You have completed all the possible tests, thanks!</div>
                        }

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
