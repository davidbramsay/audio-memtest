import React from 'react';
import AudioMemTest from './components/AudioMemTest';
import HeadphonesTest from './components/HeadphonesTest';
import VolumeSet from './components/VolumeSet';
import * as helpers from 'helpers';
import { withCookies, Cookies } from 'react-cookie';
import 'normalize.css';
import 'styles/index.scss';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            globalVolume: 0.2,
            window: 0
        };

    this.testCallback = this.testCallback.bind(this);
    this.finishedVolumeSet = this.finishedVolumeSet.bind(this);
    }

    componentWillMount () {
        let uid = this.props.cookies.get('uid') || this.props.uid;
        this.setState({
         uid: uid
        });

        this.props.cookies.set('uid', uid, {path: '/'});
        console.log(uid);
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
              {this.state.window == 0 && <VolumeSet finishedCb={this.finishedVolumeSet}/>}
              {this.state.window == 1 && <HeadphonesTest volume={this.state.globalVolume} finishedCallback={this.testCallback}/>}
              {this.state.window == 3 && <AudioMemTest uid={this.state.uid} volume={this.state.globalVolume}/>}

              {this.state.window == 2 &&
                <div>
                    <div className='third' style={{fontSize:'1.5em',marginBottom:'10%'}}>
                        <h1>
                            Memory Test
                        </h1>
                        Click below to start the test.  <br/><br/> Sounds will play one after another.  If you hear one that repeats, hit the space bar or click the screen before the counter hits 0!
                        <br/><br/>Your score will be displayed at the end!
                    </div>
                          <div className='centered button playbutton' style={{marginRight:'30px'}} onClick={() => {this.setState({window: 3});}}> start! </div>
                      </div>
              }



              {this.state.window == 10 &&
                      <div>
                          <h1>It appears your headphones are not calibrated correctly. </h1>
                          <div className='third' style={{fontSize:'1.5em',marginBottom:'20%'}}>Please re-do the test with a different pair of headphones if you would like to participate in this study.</div>
                          <div className='centered button playbutton' style={{marginRight:'30px'}} onClick={() => {this.setState({window: 0});}}> restart </div>
                      </div>
              }
            </div>
        );
    }
}

App.defaultProps = {
    uid: helpers.makeid(),
    cookies: new Cookies()
}

export default App;
