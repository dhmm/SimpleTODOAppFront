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
        this.props.refresh.bind(this);
    }


    getTasks() {                
        unirest.get("http://localhost:8000/todo")
        .end( (response) => {                        
            var responseData = response.body;                
            this.setState({
                tasks: responseData                
            });
        })
    }
    
    render() {        
        let tasks = '';
        if(this.state.tasks !=null) {
            tasks = this.state.tasks.map( (value,index) => {                
                return <Task name={value.name} done={value.done=="1"}/>;
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
