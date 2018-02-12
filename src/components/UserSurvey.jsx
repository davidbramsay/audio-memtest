import React from 'react';
import 'normalize.css';
import 'styles/index.scss';

import {db_uri} from 'db_config';

class Selectable extends React.Component {

    constructor(props) {
     super(props);

    }

    render() {
        return (
        <div className='selectable-wrapper'>
        <div className='selectable-wrap'>
            <div className='selectable-description'>
                {this.props.title}
            </div>
            {this.props.options.map((option, i) =>
                <div className='selectable-option' key={i} style={i==this.props.selected ? {background:'#4D4F7D'} : {}} onClick={this.props.callback.bind(null, i)}>
                            {option}
                </div>
            )}
        </div>
        </div>
        );
    }

}


class UserSurvey extends React.Component {

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
    };

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

  updateState(obj){
      this.setState(obj);
  }

  render() {
    return (
     <div className='fill' style={{textAlign:'left', overflowY:'scroll'}}>
        <div className='quarter' style={{width:'100%'}}>
            <h2> A short survey to understand what you hear in your life. </h2>
        </div>
        <div className='quarter-rest' style={{minHeight:'650px'}}>
            <div style={{float:'left', marginTop:'7px', textAlign:'left', marginLeft:'25px', width:'100%'}}>
            How many *waking* hours do you spend in these places on a typical day?
            </div>
            <div style={{float:'left', marginLeft:'25px', border:'none', textAlign:'left', fontStyle:'italic',fontSize:'0.7em',width:'100%'}}>
            (If you visit somewhere once a week for less than 6 hours, that's 0-1.  If you're there for a full day once a week, put 1-2.)
            </div>
            <div className='selectable-section'>
            <Selectable title='car or truck' options={['0','0-1','1-2','2-4','4-6','6-8','more than 8']} selected={this.state.car} callback={(newval)=>{this.updateState({car: newval});}} />
            <Selectable title='office' options={['0','0-1','1-2','2-4','4-6','6-8','more than 8']} selected={this.state.office} callback={(newval)=>{this.updateState({office: newval});}} />
            <Selectable title='school' options={['0','0-1','1-2','2-4','4-6','6-8','more than 8']} selected={this.state.school} callback={(newval)=>{this.updateState({school: newval});}} />
            <Selectable title='church' options={['0','0-1','1-2','2-4','4-6','6-8','more than 8']} selected={this.state.church} callback={(newval)=>{this.updateState({church: newval});}} />
            <Selectable title='factory' options={['0','0-1','1-2','2-4','4-6','6-8','more than 8']} selected={this.state.factory} callback={(newval)=>{this.updateState({factory: newval});}} />
            <Selectable title='secluded nature' options={['0','0-1','1-2','2-4','4-6','6-8','more than 8']} selected={this.state.nature} callback={(newval)=>{this.updateState({nature: newval});}} />
            <Selectable title='outside in a public park or city street' options={['0','0-1','1-2','2-4','4-6','6-8','more than 8']} selected={this.state.street} callback={(newval)=>{this.updateState({street: newval});}} />
            <Selectable title='restaurant or bar/club' options={['0','0-1','1-2','2-4','4-6','6-8','more than 8']} selected={this.state.bar} callback={(newval)=>{this.updateState({bar: newval});}} />
            <Selectable title='retail or grocery store' options={['0','0-1','1-2','2-4','4-6','6-8','more than 8']} selected={this.state.shopping} callback={(newval)=>{this.updateState({shopping: newval});}} />
            <Selectable title='home' options={['0','0-1','1-2','2-4','4-6','6-8','more than 8']} selected={this.state.home} callback={(newval)=>{this.updateState({home: newval});}} />
            <Selectable title='kitchen' options={['0','0-1','1-2','2-4','4-6','6-8','more than 8']} selected={this.state.kitchen} callback={(newval)=>{this.updateState({kitchen: newval});}} />
            </div>
            <div style={{float:'left', marginTop:'7px', marginLeft:'25px', textAlign:'left', width:'100%'}}>
            How many hours do you spend on these activities on a typical day?
            </div>
            <div className='selectable-section'>
            <Selectable title='watching video content (tv, internet)' options={['0','0-1','1-2','2-4','4-6','6-8','more than 8']} selected={this.state.tv} callback={(newval)=>{this.updateState({tv: newval});}} />
            <Selectable title='listening to music' options={['0','0-1','1-2','2-4','4-6','6-8','more than 8']} selected={this.state.music} callback={(newval)=>{this.updateState({music: newval});}} />
            </div>
            <div className='selectable-section'>
            <Selectable title='you live in an ' options={['urban city', 'suburban neighborhood', 'rural landscape']} selected={this.state.urban} callback={(newval)=>{this.updateState({urban: newval});}} />
            </div>
            <div className='centered button playbutton' style={{marginRight:'30px', marginTop:'25px', marginBotton:'35px'}} onClick={this.finished}> Continue </div>

        </div>
     </div>
    );
  }

}


export default UserSurvey;
