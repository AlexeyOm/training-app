import React, { Component } from 'react';
import './App.css';
import RepCount from './components/repcount/RepCount';
import Rest from './components/rest/Rest';

class App extends Component {
  
  constructor() {
    super();
    
    this.state = {screen : 'repetition', set : 0, workout : [{reps : 5, rest : 4},{reps : 10, rest : 3},{reps : 15, rest : 30},{reps : 20}]};
    this.handleClick = this.handleClick.bind(this);
    this.nextRep = this.nextRep.bind(this);
    }
  
  handleClick() {
    this.setState({
      screen : 'rest'
    });
  }
  
  nextRep() {
    this.setState((prevState, props) => ({
      set : prevState.set + 1,
      screen : 'repetition'
    }));
  }
  
  getReps(set){
    return this.state.workout[this.state.set].reps;
  }
  
  getRestTime(set){
    return this.state.workout[this.state.set].rest;
  }
  
  renderScreen(screen) {
    switch(screen) {
      case 'repetition' : return <RepCount reps={this.getReps(this.state.set)} onClick={this.handleClick}/>;
      case 'rest' : return <Rest restTime={this.getRestTime(this.state.set)} onTimer={this.nextRep}/>;
      default : return <div>default</div>;
    }
  }
  
  render() {
    return (
      <div className="App">
        <p>
          {this.renderScreen(this.state.screen)}
        </p>
        <p className="Rep-count">
          
        </p>
      </div>
    );
  }
}

export default App;
