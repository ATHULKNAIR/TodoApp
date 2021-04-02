import React, { Component } from 'react'
import axios from 'axios';

import {Link} from 'react-router-dom';

export default class CreateTodo extends Component {

    constructor(props){
        super(props);
        this.state={
            todo_title:'',
            todo_description:'',
            todo_dueDate:'',
            todo_completed:false
        }

        this.onChangeTodoTitle = this.onChangeTodoTitle.bind(this);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoDueDate = this.onChangeTodoDueDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeTodoTitle(e){
        this.setState({
            todo_title:e.target.value
        });
    }

    onChangeTodoDescription(e){
        this.setState({
            todo_description:e.target.value
        });
    }

    onChangeTodoDueDate(e){
        this.setState({
            todo_dueDate:e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        console.log(`Form submitted :`);
        console.log(`Todo Title: ${this.state.todo_title}`);
        console.log(`Todo Description : ${this.state.todo_description}`);
        console.log(`Todo DueDate : ${this.state.todo_dueDate}`);


        const newTodo={
            todo_title : this.state.todo_title,
            todo_description : this.state.todo_description,
            todo_dueDate : this.state.todo_dueDate,
            todo_completed : this.state.todo_completed
        };

        axios.post('http://localhost:8000/todos/add',newTodo)
        .then(res=>console.log(res.data))
        ;

        this.setState({
            todo_title:'',
            todo_description:'',
            todo_dueDate:'',
            todo_completed:false
        })
        
    }

    render() {
        return (
            <div style={{marginTop:10}}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title :</label>
                        <input type="text"
                               className="form-control" 
                               value={this.state.todo_title}
                               onChange={this.onChangeTodoTitle}/>
                    </div>
                    <div className="form-group">
                        <label>Description :</label>
                        <input type="textarea" className="form-control"
                               value={this.state.todo_description}
                               onChange={this.onChangeTodoDescription}/>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                        
                            <input className="form-check-input"
                                   type="date"
                                   name="dueDateOptions"
                                   id="dateTodo"
                                   onChange={this.onChangeTodoDueDate}/>
                            

                        </div>
                        
                       
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary"/>
                    </div>
                    
                </form>
                <button type="button" className="btn btn-default">
                   <h1><Link to={'/'}  className="glyphicon glyphicon-align-left">-</Link></h1>
               </button>
                
            </div>
        )
    }
}


