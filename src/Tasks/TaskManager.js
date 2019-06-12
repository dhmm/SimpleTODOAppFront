import React from 'react';
import Task from './Task';
let unirest = require('unirest');

class TaskManager extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tasks : []
        }           
        this.getTasks();        
    }


    getTasks() {                
        unirest.get("http://localhost:8000/todo")
        .end( (response) => {                        
            var responseData = response.body;   
            console.log(responseData);             
            this.setState({
                tasks: responseData                
            });            
        })
    }   
    
    render() {        
        let tasks = '';
        if(this.state.tasks !=null) {
            tasks = this.state.tasks.map( (value,index) => {                
                return <Task key={index} deleteTask={this.deleteTask} id={value.id} name={value.name} done={value.done}/>;
            });
        }
        return (
            <div className="container" style={styles.todoList}>
                {tasks}                
            </div>
        );
    }
}

const styles = {
    todoList: {
      textAlign: 'left'
    }
  };

export default TaskManager;
