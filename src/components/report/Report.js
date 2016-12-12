import React from 'react';

class Report extends React.Component {
  render () {
    return (
    <div>
      <form>
        <input type="number" name="repnum" />
        <input type="button" value="OK" onClick={this.props.onClick} />
      </form>
    </div>
      
    );
  }
}

export default Report;