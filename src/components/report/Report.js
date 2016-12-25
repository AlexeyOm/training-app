import React from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import './Report.css'

class Report extends React.Component {
  render () {
    return (
    <div>
      <h2>
        Сколько получилось?
      </h2>
      <Form>
        <FormControl
          type="number"
          id="repnum"
          autoFocus="true"
        />
        <Button
          bsStyle="success"
          bsSize="large"
          block
          onClick={this.props.onClick}>
            Записать
        </Button>      
      </Form>
    </div>
      
    );
  }
}

export default Report;





// <input type="number" name="repnum" />
//         <input type="button" value="OK" onClick={this.props.onClick} />        