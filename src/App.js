import React, { Component } from 'react';
import './App.css';
import RepCount from './components/repcount/RepCount';
import Rest from './components/rest/Rest';
import Report from './components/report/Report';
import Congrats from './components/congrats/Congrats';
import Login from './components/login/Login';
import Register from './components/register/Register';
import $ from 'jquery';
import { Grid, Col, Navbar, Jumbotron} from 'react-bootstrap';

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
    
    this.state = {serverReply: [], screen : 'register', set : 0, workout : [{reps : 5, rest : 2},{reps : 10, rest : 2},{reps : 15, rest : 2},{reps : 20, report: true}]};
    this.handleClick = this.handleClick.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.handleCongrats = this.handleCongrats.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.nextRep = this.nextRep.bind(this);
    }

  componentDidMount() {
    const that = this;
    $.get(baseUrl, function(result) {
      that.setState({
        workout: result
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
      //0*alert(event.target.form.repnum.value);
      this.setState({screen: 'rest'});
    }
  }

  handleLogin(event) {
    //todo делать что-то по нажатию кнопки "логин"
  }
  
  handleCongrats(event) {
    //todo делать что-то по завершению тренировки
  }
  
  getReps(){
    return this.state.workout[this.state.set].reps;
  }

  isTest(){
    return this.state.workout[this.state.set].test;
  }
  
  getRestTime(){
    return this.state.workout[this.state.set].rest;
  }
  
  isFinalSet(){
    return this.state.set === this.state.workout.length - 1; 
  }
  
  renderScreen(screen) {
    //alert(screen);
    switch(screen) {
      case 'login' : return <Login onClick={this.handleLogin}/>;
      case 'register' : return <Register onClick={this.handleRegister}/>;
      case 'repetition' : return <RepCount reps={this.getReps()} test={this.isTest()} onClick={this.handleClick}/>;
      case 'rest' : return <Rest restTime={this.getRestTime()} onTimer={this.nextRep}/>;
      case 'report' : return <Report onClick={this.handleReport}/>;
      case 'congrats' : return <Congrats onClick={this.handleCongrats}/>;
      default : return <div>default</div>;
    }
  }
  
  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
           <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Push Harder App</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
          <Jumbotron>
                <Grid key="1">
                  <Col xs={12} md={4} mdOffset={4}>
                    {this.renderScreen(this.state.screen)}  
                  </Col>
                </Grid>
          </Jumbotron>
      </div>
    );
  }
}

export default App;
