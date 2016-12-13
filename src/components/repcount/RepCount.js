import React from 'react';
import { Button } from 'react-bootstrap';
import './RepCount.css'

class RepCount extends React.Component {

  // properRepEnding(num) {
  //   switch(true) {
  //     case num === 1 : return подход;
  //     case num 
  //   }
  // }

  render () {
    return (
    <div>
      <div key="2">
        <h2>Нужно сделать</h2>
        <h1>{this.props.reps}</h1>
        <h2>повторов</h2>
      </div> 
      <div key="1">
        <Button
          bsStyle="success"
          bsSize="large"
          data-success="1"
          block
          onClick={this.props.onClick}>
            Получилось
        </Button>

        <Button
          bsStyle="danger"
          bsSize="large"
          data-success="0"
          block
          onClick={this.props.onClick}>
            Пока нет
        </Button>
      </div> 

    </div>
      
    );
  }
}

export default RepCount;