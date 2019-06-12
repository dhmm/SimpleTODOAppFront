import React, { Component } from 'react';
import TaskManager from './Tasks/TaskManager';
import TaskCreator from './Tasks/TaskCreator';
import './App.css';

class App extends Component {
  constructor() {  
    super();    
    this.state = {
      refreshList: {}
    }
  }

  doRefresh = (evt) => {
    this.setState({
      refreshList: evt
    }) ; 
  }

  render () {
    return(
    <div className="App">
      <TaskCreator doRefresh={this.doRefresh}/>      
      <TaskManager refresh={this.state.refreshList} />  
    </div>);
  };
}



export default App;
