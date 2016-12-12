import React from 'react';

class Congrats extends React.Component {
  render () {
    return (
    <div>
      Поздравляю! Тренировка закончена!
      <button data-success="0" onClick={this.props.onClick}>ОК</button>
    </div>
      
    );
  }
}

export default Congrats;