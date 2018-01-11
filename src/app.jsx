import React from 'react';
import AudioMemTest from './components/AudioMemTest';
import HeadphonesTest from './components/HeadphonesTest';
import VolumeSet from './components/VolumeSet';
import * as helpers from 'helpers';
import 'normalize.css';
import 'styles/index.scss';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            globalVolume: 0.2,
            window: 0
        };
    }

    finishedVolumeSet(volume) {
        this.setState((prevState) => {
            return ({
                globalVolume: volume,
                window: prevState.window + 1
            })
        });
    }

    testCallback(x) {
        if (x){ 
            this.setState((prevState) => {
                return ({
                    window: prevState.window + 1
                })
            });
        } else {
            this.setState((prevState) => {
                return ({
                    window: 10
                })
            });
        }
    }

    render () {
        console.log(this.state);
        return (
            <div className='fill'>
              {this.state.window == 0 && <VolumeSet finishedCb={this.finishedVolumeSet.bind(this)}/>}
              {this.state.window == 1 && <HeadphonesTest volume={this.state.globalVolume} finishedCallback={this.testCallback.bind(this)}/>}
              {this.state.window == 3 && <AudioMemTest uid={this.props.uid} volume={this.state.globalVolume}/>}

              {this.state.window == 2 &&
                <div>
                    <div className='third'>
                        <h1>
                            Memory Test
                        </h1>
                            Click below to start the test.  Audio will play one after another.  If you've heard it before, hit the space bar before the counter hits 0!
                    </div>
                          <div className='centered button playbutton' style={{marginRight:'30px'}} onClick={() => {this.setState({window: 3});}}> start! </div>
                      </div>
              }



              {this.state.window == 10 &&
                      <div>
                          <h1>It appears your headphones are not calibrated correctly. </h1>
                          <div className='third' style={{fontSize:'1.5em',marginBottom:'10%'}}>Please re-do the test with a different pair of headphones if you would like to participate in this study.</div>
                          <div className='centered button playbutton' style={{marginRight:'30px'}} onClick={() => {this.setState({window: 0});}}> restart </div>
                      </div>
              }
            </div>
        );
    }
}

App.defaultProps = {
    uid: helpers.makeid()
}

export default App;
