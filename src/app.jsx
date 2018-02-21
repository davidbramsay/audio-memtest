import React from 'react';
import AudioMemTest from './components/AudioMemTest';
import HeadphonesTest from './components/HeadphonesTest';
import VolumeSet from './components/VolumeSet';
import UserSurvey from './components/UserSurvey';
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
            
              {this.state.window == 0 &&
                <div>
                    <div className='third' style={{fontSize:'1.2em',marginBottom:'5%'}}>
                        <h1>
                            Audio Memory Test
                        </h1>
                        We are MIT researchers trying to understand what makes a sound memorable.  By participating in this test, you'll be contributing to that work.  <br/><br/> 
                        You will be entered in a raffle for a <b style={{fontSize:'1.3em'}}>$25 Amazon Giftcard</b> if you provide us your email.  The better your score in the game, the more raffle tickets you'll win. <br/><br/>
                    </div>
                          <div className='centered button playbutton' style={{marginRight:'30px'}} onClick={() => {this.setState({window: 1});}}> Start! </div>

                        <div style={{fontSize:'0.7em', marginTop:'5%'}}>
                            Disclaimer:  Entering your email is purely optional, it will be stored securely on a password protected server, and it will be deleted immediately upon raffle drawing on March 15, 2018.
                            Any questions can be directed to 'davidr (at) mit (dot) edu'. Thank you!
                        </div>
                </div>
              }

              {this.state.window == 1 && <VolumeSet finishedCallback={this.finishedVolumeSet}/>}
              {this.state.window == 2 && <UserSurvey uid={this.state.uid} finishedCallback={this.testCallback}/>}
              {this.state.window == 3 && <HeadphonesTest volume={this.state.globalVolume} finishedCallback={this.testCallback}/>}
              {this.state.window == 5 && <AudioMemTest uid={this.state.uid} volume={this.state.globalVolume}/>}

              {this.state.window == 4 &&
                <div>
                    <div className='third' style={{fontSize:'1.5em',marginBottom:'10%'}}>
                        <h1>
                            Memory Test
                        </h1>
                        Click below to start the test.  <br/><br/> Sounds will play one after another.  If you hear one that repeats, hit the space bar or click the screen before the counter hits 0!
                        <br/><br/>Your score will be displayed at the end!
                    </div>
                          <div className='centered button playbutton' style={{marginRight:'30px'}} onClick={() => {this.setState({window: 5});}}> Start! </div>
                      </div>
              }

              {this.state.window == 10 &&
                      <div>
                          <h1>It appears your headphones are not calibrated correctly. </h1>
                          <div className='third' style={{fontSize:'1.5em',marginBottom:'20%'}}>Please re-do the test with a different pair of headphones if you would like to participate in this study.</div>
                          <div className='centered button playbutton' style={{marginRight:'30px'}} onClick={() => {this.setState({window: 3});}}> Restart </div>
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
