import React from 'react';

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
      <div key="1">
        Отдохни {this.state.restTime} сек
      </div> 
      <div key="2">
     
      </div> 
    </div>
      
    );
  }
}



export default Rest;