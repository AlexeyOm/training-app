import React from 'react';
import './Rest.css'

class Rest extends React.Component {
  constructor(props){
      super(props);
      this.state = {restTime : props.restTime};
  }
  
  decreaseTimeLeft() {
      if(this.state.restTime === 0) {
          this.props.onTimer();
          return 0;
      }
      this.setState((prevState, props)=>({restTime : prevState.restTime - 1 })); 
  }
  
  componentDidMount() {
    this.timerID = setInterval(
      () => this.decreaseTimeLeft(),
      1000
    );
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  render () {
    return (
    <div>
      <h2>Отдохни</h2>
      <h1>{this.state.restTime}</h1>
      <h2>сек</h2>
    </div>
      
    );
  }
}



export default Rest;