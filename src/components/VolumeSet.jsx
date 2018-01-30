import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import 'styles/index.scss';
import noiseFile from '../audio/pinknoise_-9dBA.wav';



function setGlobalVolume(volume){
    //sadly must be called whenever new audio elements are
    //introduced, magic React state doesn't work for audio

    let audio_elems = document.getElementsByTagName('audio');
    for (let i=0; i < audio_elems.length; i++) {
        audio_elems[i].volume = volume;
    }

}


class VolumeSet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 0.15
    };


  }
  
  componentDidMount() {
    setGlobalVolume(0.15);
  }

  handleChange(value) {
    this.setState({
      value: value
    });
    setGlobalVolume(value);
    console.log(value);
  }

  render() {
    const { value } = this.state;
    return (
      <div className='fill'>
        <div className='centered' style={{marginBottom: '5%'}}>
            <div  style={{width:'90%'}}>
            <h1> This is to set the volume for the remainder of the test. </h1>
            </div>
        </div>
        <div className='centered' style={{textAlign:'left', margin:'10px'}}>
            <div  style={{width:'70%'}}>
            (1) HEADPHONES ARE REQUIRED FOR THIS TEST.  Please make sure you have headphones in before continuing.
            </div>
        </div>
        <div className='centered' style={{textAlign:'left', margin:'10px'}}>
            <div  style={{width:'70%'}}>
            (2) Set the volume to a pleasant and clear level using the slider.
            </div>
        </div>
        <div className='centered' style={{textAlign:'left', margin:'10px'}}>
            <div  style={{width:'70%'}}>
            (3) Hit done when this is completed.
            </div>
        </div>
        <audio key='noisesig' id='noisesig' loop autoPlay>
            <source src={noiseFile} type='audio/wav'/>
        </audio>
        <div className='centered' style={{marginTop: '5%'}}>
            <div className='slider' style={{width:'70%'}}>
                <Slider
                min={0}
                max={1}
                step={0.01}
                tooltip={false}
                value={value}
                onChange={this.handleChange.bind(this)}
                />
            </div>
        </div>
        <div className='centered' style={{marginBottom: '5%'}}>
            <div>
            Volume
            </div>
        </div>
        <div className='third'>
        <div className='centered' style={{marginBottom: '5%'}}>
            <div className='button' onClick={this.props.finishedCb.bind(null,this.state.value)}>
                Done
            </div>
        </div>
        </div>
      </div>
    );
  }
}

export default VolumeSet;
