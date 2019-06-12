import React, { Component } from 'react';
import TaskManager from './Tasks/TaskManager';
import TaskCreator from './Tasks/TaskCreator';
import './App.css';

class App extends Component {
  constructor() {  
    super();    
    this.managerComponent = React.createRef();  
    console.log(this.managerComponent);  
  }

  reloadTasks = () => {
    this.managerComponent.current.getTasks();
  }

  render () {
    return(
    <div className="App">
      <TaskCreator reloadTasks={this.reloadTasks}/>      
      <TaskManager ref={this.managerComponent}  />  
    </div>);
  };
}



export default App;
