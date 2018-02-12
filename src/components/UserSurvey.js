import React from 'react';
import 'normalize.css';
import 'styles/index.scss';

import {db_uri} from 'db_config';

class selectable extends React.Component {

    constructor(props) {
     super(props);

    }

    render() {
        <div>

        <div>
    }

}


class VolumeSet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        urban: 0,
        bar: 0,
        car: 0,
        school: 0,
        church: 0,
        office: 0,
        factory: 0,
        home: 0,
        kitchen: 0,
        nature: 0,
        street: 0,
        shopping: 0,
        tv: 0,
        music: 0
    }

    this.finished = this.finished.bind(this);

  }


  finished() {

    let xhr = new XMLHttpRequest();
    xhr.open('POST', db_uri + '-user');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            this.props.finishedCallback(true);
        }else if (xhr.readyState == XMLHttpRequest.DONE) {
            alert('ERROR: user data failed to save!  Please email dramsay@mit.edu and tell him to fix it!');
        }
    }.bind(this);

    const jsonStr = JSON.stringify({
        "uid": this.props.uid,
        "urbanSuburbRural": this.state.urban,
        "barRestaurant": this.state.bar,
        "car": this.state.car,
        "school": this.state.school,
        "church": this.state.church,
        "office": this.state.office,
        "factory": this.state.factory,
        "home": this.state.home,
        "kitchen": this.state.kitchen,
        "nature": this.state.nature,
        "cityStreet": this.state.street,
        "shoppingGroceries": this.state.shopping,
        "watchingMedia": this.state.tv,
        "listeningMusic": this.state.music
    });

    xhr.send(jsonStr);
    console.log(this.state);

  }

  render() {

     <div className='fill'>
        <div className='centered' style={{marginBottom: '5%'}}>
            <div  style={{width:'90%'}}>
            <h1> A short survey to understand what you hear in your life. </h1>
            </div>

        </div>
     </div>

  }

}


export default UserSurvey;
