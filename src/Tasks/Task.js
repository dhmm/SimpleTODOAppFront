import React from 'react';

class Task extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name : this.props.name , 
            done : this.props.done
        }
    }

    render() {
        let status = '';        
        if(this.state.done === true) {
            status= <span className="badge badge-success">Succesfull</span>;
        } else {
            status= <span className="badge badge-secondary">Not ready</span>;
        }
        let action = '';
        if(this.state.done === true) {
            action= <button className="btn btn-sm btn-secondary">Uncomplete</button>;
        } else {
            action= <button className="btn btn-sm btn-success">Complete</button>;
        }
        return (
        <div className="row" style={styles.task}>
            <div className="col-md-7">
                <span>{this.state.name}</span>
            </div>
            <div className="col-md-1">
                {status}       
            </div> 
            <div className="col-md-2">
                {action}                
            </div> 
            <div className="col-md-2">
                <button className="btn btn-sm btn-primary">Edit</button>
                <button className="btn btn-sm btn-danger"  style={styles.removeButton}>Remove</button>
            </div>                   
        </div>
        );            
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
  }
}
export default Task;