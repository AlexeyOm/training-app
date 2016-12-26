import React from 'react';
import { Button, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import './Login.css'




class Login extends React.Component {
  
  constructor() {
    super();
    this.state = {login : '', password : ''};
    this.handleChange = this.handleChange.bind(this);
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


  render () {
    return (
    <div>
      <h2>
        Вход в систему
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
          <Button
            bsStyle="success"
            bsSize="large"
            block
            onClick={this.props.onClick}>
              Начать
          </Button>
        </FormGroup>
      </Form>
    </div>
      
    );
  }
}

export default Login;