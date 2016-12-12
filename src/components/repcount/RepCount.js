import React from 'react';

class RepCount extends React.Component {
  render () {
    return (
    <div>
    <div key="1">
      <button data-success="1" onClick={this.props.onClick}>Получилось</button>
      <button data-success="0" onClick={this.props.onClick}>Пока нет</button>
    </div> 
    <div key="2">
      {this.props.reps}
    </div> 
    </div>
      
    );
  }
}

export default RepCount;