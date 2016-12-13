import React from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';

class Report extends React.Component {
  render () {
    return (
    <div>
      <Form>
        <FormControl
          type="number"
          label="Сколько получилось?"
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