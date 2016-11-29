import React from 'react';

class RepCount extends React.Component {
  render () {
    return (
    <div>
    <div key="1">
      <button onClick={this.props.onClick}>Щелкай</button>
    </div> 
    <div key="2">
      {this.props.reps}
    </div> 
    </div>
      
    );
  }
}

export default RepCount;