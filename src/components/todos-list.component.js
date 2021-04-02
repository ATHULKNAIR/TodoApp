import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';

const Todo=(props)=>(
    <tr>
        <td className={props.todo.todo_completed?'completed':''}>{props.todo.todo_title}</td>
        <td className={props.todo.todo_completed?'completed':''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed?'completed':''}>{props.todo.todo_dueDate}</td>
        <td>
          <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>  
    </tr>
)

export default class TodoList extends Component {

    constructor(props){
        super(props);
        this.state={
            todos:[]
        };
    }

    componentDidMount(){
        axios.get('http://localhost:8000/todos/')
        .then(res=>{
            this.setState({todos:res.data});
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    todoList(){
        return this.state.todos.map((currentTodo,i)=>{
            return <Todo todo={currentTodo} key={i} />
        })
    }
    render() {
        return (
            <div>
               <h3>Todos List
              
               </h3>
               <table className="table table-striped" style={{marginTop:20}}>
                   <thead>
                       <tr>
                           <th>Title</th>
                           <th>Decsription</th>
                           <th>Due Date</th>
                           <th>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                       {this.todoList()}
                   </tbody>
               </table>
               <button type="button" className="btn btn-default">
                   <h1><Link to={'/create'}  className="glyphicon glyphicon-align-left"> +</Link></h1>
               </button>
            </div>
        )
    }
}


