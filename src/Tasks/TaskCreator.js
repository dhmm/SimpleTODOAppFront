import React from 'react';
let unirest = require('unirest');

class TaskCreator extends React.Component {
    constructor(props){
        super(props);     

        this.state  = {
            name : '' ,
            done : false             
        }
    }    
    
    createTask() {                 
        unirest.post("http://localhost:8000/todo")        
        .send(JSON.stringify({name: this.state.name, done: this.state.done.toString()}))
        .end( (response) => {                      
            this.setState({ name : '' , done : false});
            this.props.doRefresh(); 
        })    
        
    }
    render() {        
        return (
        <div className="container" style={styles.addTaskContainer}>
            <div className="row">
                <div className="col-md-1">
                    <label>Task</label>
                </div>
                <div className="col-md-8">
                    <input className="form-control" onChange={evt=> { this.setState({ name : evt.target.value }) }} value={this.state.name}  type="text"></input>
                </div>
                <div className="col-md-3">
                    <button type="button" onClick={evt => this.createTask()} className="btn btn-primary">Add</button>
                </div>
            </div>
        </div>
        );
    }
}

const styles = {
    addTaskContainer : {
      textAlign: 'left',
      marginTop: 50,
      marginBottom: 30,
      background: '#ccffcc',
      paddingTop:5,
      paddingBottom:5
    } 
  };

export default TaskCreator;
