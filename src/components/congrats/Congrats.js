import React from 'react';
import { Button } from 'react-bootstrap';
import './Congrats.css';

class Congrats extends React.Component {
  render () {
    return (
    <div>
      <h1>Поздравляю, тренировка закончена!</h1>
      <Button
          bsStyle="success"
          bsSize="large"
          block
          onClick={this.props.onClick}>
            Отлично
        </Button>  
    </div>
      
    );
  }
}

export default Congrats;