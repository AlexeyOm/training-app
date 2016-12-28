import React from 'react';
import { Button, Form, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
//import './Register.css';
import $ from 'jquery';


//const baseUrl = 'http://localhost:3000/api/login/';

class Login extends React.Component {
  
  constructor() {
    super();
    this.state = {login : ''
      , password : ''
      , email : ''
      , loginHelp : ''
      , passwordHelp : ''
      , password2Help : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkCredentials = this.checkCredentials.bind(this);
    }


  getValidationState(param) {
    const length = this.state[param].length;
    if (length > 0) return 'success';
    else return 'error';
  }

  handleChange(e) {
    let temp = {};
    temp[e.target.name] = e.target.value;
    this.setState(temp);
  }

  checkCredentials(e) {

    //alert('enterede checkCredentials');

    //e.preventDefault();

    //const that = this;

    //alert(this.state.login);

    const credentials = { login : this.state.login, password : this.state.password };

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/api/login/",
      data: JSON.stringify(credentials),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){alert(data);},
      failure: function(errMsg) {
          alert(errMsg);
      }
    });
  }


  render () {
    return (
    <div>
      <h2>
        Регистрация
      </h2>
      <Form>
        <FormGroup
          controlId="formBasicText1"
          validationState={this.getValidationState('login')}
        >
          <ControlLabel>Логин</ControlLabel>
          <FormControl
            name="login"
            type="text"
            value={this.state.login}
            autoFocus="true"
            onChange={this.handleChange}
          />
          <HelpBlock>{this.state.loginHelp}</HelpBlock>
        </FormGroup>
        <FormGroup
          controlId="formBasicText2"
          validationState={this.getValidationState('password')}
        >
          <ControlLabel>Пароль</ControlLabel>
          <FormControl
            name="password"
            type="text"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <HelpBlock>{this.state.password2Help}</HelpBlock>
          <ControlLabel>Введите пароль еще раз</ControlLabel>
          <FormControl
            name="password2"
            type="text"
            value={this.state.password2}
            onChange={this.handleChange}
          />
          <HelpBlock>{this.state.password2Help}</HelpBlock>
          <Button
            bsStyle="success"
            bsSize="large"
            block
            onClick={this.checkCredentials}>
              Начать
          </Button>
        </FormGroup>
      </Form>
    </div>
      
    );
  }
}



export default Login;
