import React from 'react';
let unirest = require('unirest');

class Task extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            id : this.props.id,
            previousName : this.props.name,
            name : this.props.name ,             
            done : this.props.done ,

            editVisible :false ,

            newName : '' ,

            deleted : false
        }
    }
    changeEditVisibility (visibility) {      
      if(visibility === true) {        
        this.setState({
          newName : this.state.name ,
          editVisible: visibility
        });        
      } else {
        this.setState({
          newName : '',
          editVisible: visibility
        });
      }        
    }
    cancelEdit() {
      this.setState({
        name: this.state.previousName        
      });
      this.changeEditVisibility(false);
    }
    setNewName(evt) {
      this.setState({
        newName: evt.target.value 
      })
    }
    saveChanges() {
      unirest.put("http://localhost:8000/todo")            
      .send(JSON.stringify({id: this.state.id , name: this.state.newName, done: this.state.done.toString()}))
      .end( (response) => {   
          let updatedUser = response.body;
          this.setState({
            previousName: updatedUser.name,
            name:updatedUser.name
          });
          this.changeEditVisibility(false);       
      }) 
    }
    deleteTask() {
      if(window.confirm("Are you sure")) {
        unirest.delete("http://localhost:8000/todo")            
        .send(JSON.stringify({id: this.state.id}))
        .end( (response) => { 
          if(response.status == 201)
          {
            if(response.body === "deleted") {
              this.setState({
                id : null,
                previousName : null,
                name : null,             
                done : null,
    
                editVisible :false ,
    
                newName : null ,
    
                deleted : true
              });              
            } 
          }
        }) 
      }
    }
    complete() {
      unirest.post("http://localhost:8000/todo/complete")            
      .send(JSON.stringify({id: this.state.id}))
      .end( (response) => { 
        if(response.status == 201)
        {  
          this.setState({            
            done :response.body.done 
          });                        
        }
      }) 
    }
    uncomplete() {
      unirest.post("http://localhost:8000/todo/uncomplete")            
      .send(JSON.stringify({id: this.state.id}))
      .end( (response) => { 
        if(response.status == 201)
        {  
          this.setState({            
            done :response.body.done 
          });                        
        }
      }) 
    }
    render() {
        let status = '';        
        if(this.state.done === true) {
            status= <span className="badge badge-success">Completed</span>;
        } else {
            status= <span className="badge badge-secondary">Not ready</span>;
        }
        let action = '';
        if(this.state.done === true) {
            action= <button className="btn btn-sm btn-secondary" onClick={evt=>{this.uncomplete()}}>Uncomplete</button>;
        } else {
            action= <button className="btn btn-sm btn-success"  onClick={evt=>{this.complete()}}>Complete</button>;
        }

        let edit = '';
        if(this.state.editVisible) {
          edit = 
          <div style={styles.editForm}>
            <input className="form-control col-md-6" style={styles.editFormText} value={this.state.newName} onChange={evt => this.setNewName(evt)} type = "text"></input>
            <button className="btn btn-sm btn-danger" style={styles.editFormSave} onClick={evt=> this.cancelEdit()}>Cancel</button>
            <button className="btn btn-sm btn-warning" style={styles.editFormSave} onClick={evt=> this.saveChanges()}>Save</button>
          </div>;
        }
        if(this.state.deleted === false) {
          return (
          <div className="row" style={styles.task}>
              <div className="col-md-7">
                  <span>{this.state.name}</span> <br/>
                  {edit}
              </div>
              <div className="col-md-1">
                  {status}       
              </div> 
              <div className="col-md-2">
                  {action}                
              </div> 
              <div className="col-md-2">
                  <button className="btn btn-sm btn-primary" onClick={evt=>{this.changeEditVisibility(true)}}>Edit</button>
                  <button className="btn btn-sm btn-danger"  style={styles.removeButton} onClick={evt=>{this.deleteTask()}}>Remove</button>
              </div>                   
          </div>
          );            
        }
        else {
          return (<div></div>);
        }
    };
}

const styles = {    
  task: {
    marginTop:10,
    paddingBottom: 5,
    borderBottom: '1px dashed gray'
  },
  removeButton: {
    marginLeft:5
  },
  editForm: {
    background:'#ccc' , 
    padding:15
  },
  editFormText : {
    float:'left'
  },
  editFormSave:{
    marginLeft:10
  }
}
export default Task;