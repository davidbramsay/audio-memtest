import React from 'react';
import wav_normal from '../audio/200_test.wav';
import wav_quiet from '../audio/200_test_quiet.wav';
import wav_phase from '../audio/200_test_phase.wav';
import {Line} from 'rc-progress';
import {CSSTransitionGroup} from 'react-transition-group';
import 'normalize.css';
import 'styles/index.scss';

function setGlobalVolume(volume, cb){
    //sadly must be called whenever new audio elements are
    //introduced, magic React state doesn't work for audio

    let audio_elems = document.getElementsByTagName('audio');
    for (let i=0; i < audio_elems.length; i++) {
        audio_elems[i].volume = volume;
    }
    cb();
}


function shuffle(main_array) {
  let array = main_array.slice();
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


class AudioBox extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let label = this.props.src.split('/');
    label = label[label.length-1];

    return (
                <div className='audioElement hoverable' style={{borderRadius:'5px', border: '2px solid white'}} key={this.props.id} onClick={this.props.clickCb.bind(null, this.props.src)}>
                    {this.props.nowPlaying ?
                        <img className='centered playing' key= {'im-' + label + this.props.nowPlaying} width='100%' src={require('/images/playing3.gif')}/> :
                        <img className='centered' key= {'im-' + label + this.props.nowPlaying} width='100%' src={require('/images/playing_still3.png')}/>
                    }

                    <br/>
                    <audio key={this.props.id + 'aud'} id={this.props.id}>
                        <source src={this.props.src} type='audio/wav'/>
                    </audio>
                </div>
    );
  }
}


const audioFiles = [
    wav_normal,
    wav_quiet,
    wav_phase
];

//play the three audio files, register click to pick more quiet, return
//correct or incorrect
class IndividualHeadphonesTest extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        audioFiles: shuffle(audioFiles),
        nowPlaying: [0,0,0],
        buttonText: 'Play Test '
    };
  }

  onButtonClick() {
    if (this.state.nowPlaying.indexOf(1) == -1) {

        //make sure volume is set
        setGlobalVolume(this.props.volume, () => {
            //create timer that supports non-integer seconds
            this.timerID = setInterval(
            () => this.tick(),
            1500
            );

            this.setState({
                nowPlaying: [1,0,0]
            });

            //play the first sample
            document.getElementById('audio-0' + this.props.id ).play();
        });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    if (this.state.nowPlaying.indexOf(1) >= this.state.nowPlaying.length-1){
      clearInterval(this.timerID);
      this.setState({
          nowPlaying: [0,0,0],
          buttonText: 'Replay #'
      });
    } else {
      //update nowPlaying and nowVisible
      let newPlaying = this.state.nowPlaying;
      newPlaying.splice(0,0,0);
      newPlaying.pop();

      this.setState({
            nowPlaying: newPlaying
      });

      document.getElementById('audio-' + newPlaying.indexOf(1) + this.props.id).play();
    }

  }

  answerRegistered(audioFile) {
    //pass answer back up to parent with true if correct, and false if
    //incorrect (this.props.finishedCallback)
    let correct = (audioFile === wav_quiet ? true : false);
    this.props.finishedCallback(correct);
  }

  render() {

    let audioList = (this.state.audioFiles ? this.state.audioFiles.map((f, i) => {
          console.log(f + ' ' +  i + ' ' +  this.state.audioFiles);
          return (
                <AudioBox key={'audio-' + i + this.props.id} id={'audio-' + i + this.props.id} src={f} nowPlaying={this.state.nowPlaying[i]} clickCb={this.answerRegistered.bind(this)} />
          );
    }): null)

    return (
        (this.props.id === this.props.visibleItem &&
        <div>
            <div className='centered'>
                <div className='button playbutton' style={{marginRight:'30px'}} onClick={this.onButtonClick.bind(this)}>
                    {this.state.buttonText} {this.props.id+1}
                </div>
                <div className='ae-container'>
                    {audioList}
                </div>
            </div>
        </div>)
    );
  }
}




//wrap individual test in suite of 6, with progress bar and overall correct

class HeadphonesTest extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        currentTrial: 0,
        correct: 0
    };
  }

  trialFinished(correct) {

    //check if finished all trials, return true if passed, false if not to
    //parent (this.props.finishedCallback)
    if (this.state.currentTrial == this.props.totalTrials - 1) {
        const finalCorrect = (correct ? this.state.correct + 1 : this.state.correct)
        const passed = (finalCorrect >= this.props.numPassing ? true : false);
        this.props.finishedCallback(passed);
    }

    //if not finished, increment trials and correct guesses appropriately
    if (correct) {
        this.setState((prevState) => {
            return ({
                correct: prevState.correct + 1,
                currentTrial: prevState.currentTrial + 1
            });
        });
    } else {
        this.setState((prevState) => {
            return ({
                currentTrial: prevState.currentTrial + 1
            });
        });
    }
  }

  render () {
    var tests = [];
    for (var i = 0; i < this.props.totalTrials; i++) {
        tests.push(<IndividualHeadphonesTest key={i} id={i} visibleItem={this.state.currentTrial} volume={this.props.volume} finishedCallback={this.trialFinished.bind(this)} />);
    }

    return (

        <div className='fill'>
            <div className='half'>
                <h1>
                    Loudness Test
                </h1>
                This is a test to make sure your headphones are sufficient.  Press play, listen to the three sounds, and click on the quietest sound.
                This test repeats six times.
            </div>
            <div className='half'>
                <div className='third'>
                    <div className='centered headphonesTest'>
                        <CSSTransitionGroup
                            transitionName={{enter: 'ae-enter', enterActive: 'ae-enter-active', leave:'ae-leave', leaveActive:'ae-leave-active'}}
                            transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
                            {tests}
                        </CSSTransitionGroup>
                    </div>
                </div>
                <div className='third'>
                    <div style={{height: '60%', width:'60%', margin:'0 auto', marginTop:'20px'}}>
                        <Line percent={(this.state.currentTrial)/(this.props.totalTrials) * 100} strokeWidth="5" strokeColor='#4D4F7D'/> 
                        <div className='centered' style={{fontSize:'1em', width:'100%'}}>
                            progress: {this.state.currentTrial}/{this.props.totalTrials}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

HeadphonesTest.defaultProps = {
    totalTrials: 6,
    numPassing: 5
}

export default HeadphonesTest;
