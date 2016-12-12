import React, { Component } from 'react';
import './App.css';
import RepCount from './components/repcount/RepCount';
import Rest from './components/rest/Rest';
import Report from './components/report/Report';
import Congrats from './components/congrats/Congrats';
import $ from 'jquery';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const baseUrl = 'http://localhost:3000/api/users/';

// async function getTraining(day) {
//   const response = await fetch(baseUrl + '?day=' + day);
//   if (response.status >= 400 ) throw Error('can not get training programm');
//   const programm = await response.json();
//   return programm;
// }

class App extends Component {
  
  //методы получения данных из базы данных и записи в базу данных
  
  constructor() {
    super();
    
    this.state = {asyncGet: 'd', screen : 'repetition', set : 0, workout : [{reps : 5, rest : 2},{reps : 10, rest : 2},{reps : 15, rest : 2},{reps : 20, report: true}]};
    this.handleClick = this.handleClick.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.handleCongrats = this.handleCongrats.bind(this);
    this.nextRep = this.nextRep.bind(this);
    }

  componentDidMount() {
    const that = this;
    $.get(baseUrl, function(result) {
      const programm = result;
      that.setState({
        asyncGet: programm
      });
    });

    //this.setState({workout: [{reps:66,rest:2}]});
  }
  
  handleClick(event) {
    if(event.target.dataset.success === "1") {
      if(!this.isFinalSet()) {
        this.setState({screen: 'rest'});
      }
      else {
        this.setState({screen: 'congrats'});
      }
    }
    else {
      this.setState({screen: 'report'});
    }
    //todo записать удачное выполнение подхода в базу
    
  }
  
  nextRep() {
    this.setState((prevState, props) => ({
      set : prevState.set + 1,
      screen : 'repetition'
    }));
  }
  
  handleReport(event) {
    //todo обработка репорта о подходе. записать в базу
    if(this.isFinalSet()) {
      this.setState({screen: 'congrats'});
    }
    else {
      this.setState({screen: 'rest'});
    }
  }
  
  handleCongrats(event) {
    //todo делать что-то по завершению тренировки
  }
  
  getReps(set){
    return this.state.workout[this.state.set].reps;
  }
  
  getRestTime(set){
    return this.state.workout[this.state.set].rest;
  }
  
  isFinalSet(){
    return this.state.set === this.state.workout.length - 1; 
  }
  
  renderScreen(screen) {
    //alert(screen);
    switch(screen) {
      case 'repetition' : return <RepCount reps={this.getReps(this.state.set)} onClick={this.handleClick}/>;
      case 'rest' : return <Rest restTime={this.getRestTime(this.state.set)} onTimer={this.nextRep}/>;
      case 'report' : return <Report onClick={this.handleReport}/>;
      case 'congrats' : return <Congrats onClick={this.handleCongrats}/>;
      default : return <div>default</div>;
    }
  }
  
  render() {
    return (
      <div className="App">
        <p>
          {this.renderScreen(this.state.screen)}
        </p>
        <p className="Rep-count">
          {this.state.asyncGet}  
        </p>
      </div>
    );
  }
}

export default App;
