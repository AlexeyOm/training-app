import React from 'react';
import { Button, Form, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import './Register.css';
import $ from 'jquery';


//const baseUrl = 'http://localhost:3000/api/login/';

class Login extends React.Component {
  
  constructor() {
    super();
    this.state = {login : ''
      , password : ''
      , password2 : ''
      , email : ''
      , loginHelp : ''
      , passwordHelp : ''
      , password2Help : ''
      , msg : 'prestine'
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkCredentials = this.checkCredentials.bind(this);
    this.passwordsMatch = this.passwordsMatch.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.allCredAreOk = this.allCredAreOk.bind(this);
    }

  //prestine = {login : true, password : true, password2 : true};
  // prestine.login = true;
  // prestine.password = true;
  // prestine.password2 = true;


  validateLogin() {
    if(this.state.login.length === 0) return null;
    if(this.state.login.length > 0) return 'success'
  }
  

  validatePassword() {
    if(this.state.password === this.state.password2 && this.state.password.length === 0) {
        return null;
      }
    if(this.state.password === this.state.password2 && this.state.password.length > 0) {
      return 'success';
    }
    else {
      //alert('bad');
      return 'error';
    }
  }

  allCredAreOk() {
    return this.validatePassword() === 'success' && this.validateLogin() === 'success' ? false : false;
  }


  getValidationState(param) {
    const length = this.state[param].length;
    if (length > 0 ) return 'success';
    else return 'error';
  }

  handleChange(e) {
    //alert(e.target.name);
    //this.prestine[e.target.name] = false;
    let temp = {};
    temp[e.target.name] = e.target.value;
    this.setState(temp);
  }

  checkCredentials(e) {

    const that = this;

    const credentials = { login : that.state.login, password : that.state.password };

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/api/login/",
      data: JSON.stringify(credentials),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){that.setState({msg : "ok"});},
      failure: function(errMsg) {
          that.setState({msg : "not ok"});
      }
    });
  }

  passwordsMatch()
  {
    if (this.state.password === this.state.password2) {
      this.setState({password2Help : 'введенные пароли должны совпадать'});
      return 'error';
    }
    else {
      this.setState({password2Help : ''});
      return 'success';
    }
  }

  okDisabled() {
    return !(this.validatePassword() === 'success' && this.validateLogin() === 'success');
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
          validationState={this.validateLogin()}
        >
          <ControlLabel>Логин</ControlLabel>
          <FormControl
            name="login"
            type="text"
            value={this.state.login}
            autoFocus="true"
            onChange={this.handleChange}
            onBlur={this.checkCredentials}
          />
          <HelpBlock>{this.state.loginHelp}</HelpBlock>
        </FormGroup>
        <FormGroup
          controlId="formBasicText2"
          validationState={this.validatePassword()}
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
          <div hidden={this.state.password === this.state.password2}>
            <HelpBlock>Пароли должны совпадать</HelpBlock>
          </div>
          <Button
            bsStyle="success"
            bsSize="large"
            block
            disabled={this.okDisabled()}
            >
              Начать
          </Button>
        </FormGroup>
      </Form>
    </div>

      
    );
  }
}



export default Login;
//onClick={this.checkCredentials()}