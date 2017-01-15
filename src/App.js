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
    
    this.state = {token : '', screen : 'repetition', set : 0, workout : [{reps : 5, rest : 2},{reps : 10, rest : 2},{reps : 15, rest : 2},{reps : 20, report: true}]};
    this.handleClick = this.handleClick.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.handleCongrats = this.handleCongrats.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.nextRep = this.nextRep.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    }

  componentDidMount() {
    
    // localStorage.token = '';

    // if(!localStorage.token) {
    //   this.setState({screen : 'login'});      
    // }
    // else {
    //   if(localStorage.workout) {
    //     this.setState({workout : JSON.parse(localStorage.workout)}, screen : 'repetition');
    //   }
    // }

    // const token = localStorage.token;
    // console.log(token);
    //alert(token);

    // $.ajaxSetup({
    //   xhrFields: {
    //     withCredentials: true
    //   }
    // });

    this.setState({token : "SoMeToKeN"});

    const that = this;

    $.ajax({
      url : baseUrl,
      headers : {token : "SoMeToKeN/"}
      }).done(function(result) {
        console.log(result);
        if(result === 'auth_required') {
          console.log('going to login');
          that.setState({screen : 'login'});
        }
        else {
          that.setState({workout : result});
        }
      }).fail(function() {
        that.setState({screen : 'error'});
      });

    // $.get(baseUrl,
    //   'user_id=test_user',
    //   function(result) {
    //     that.setState({
    //       workout: result
    //     });
    // });

    //alert(document.cookie);

    
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

  handleLogin(login = '', password = '') {
    //todo делать что-то по нажатию кнопки "логин"
    const that = this;

    const credentials = { login, password };

    $.ajax({
      type: "GET",
      url: "http://localhost:3000/api/login/",
      data: JSON.stringify(credentials),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        //that.props.handleLogin(data);
      },
      failure: function(errMsg) {
          alert(errMsg);
      }
    });
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

  handleRegister(event) {
    //console.log(event.target.form.login.value);
    console.log(event.target.form.password.value);
  }
  
  renderScreen(screen) {
    //alert(screen);
    switch(screen) {
      case 'login' : return <Login handleLogin={this.handleLogin}/>;
      case 'register' : return <Register handleRegister={this.handleRegister}/>;
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
