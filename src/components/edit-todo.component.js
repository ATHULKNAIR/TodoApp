import React, { Component } from 'react'
import axios from 'axios';



export default class EditTodo extends Component {

    constructor(props){
        super(props);

        this.onChangeTodoTitle = this.onChangeTodoTitle.bind(this);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoDueDate = this.onChangeTodoDueDate.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            todo_title:'',
            todo_description:'',
            todo_dueDate:'',
            todo_completed:false
        }
    }
    componentDidMount(){
        axios.get('http://localhost:8000/todos/'+this.props.match.params.id)
        .then(res=>{
            this.setState({
                todo_title : res.data.todo_title,
                todo_description : res.data.todo_description,
                todo_dueDate : res.data.todo_dueDate,
                todo_completed : res.data.todo_completed
            })
        })
        .catch((err)=>{
            console.log(err);
        })
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

    onChangeTodoCompleted(e){
        this.setState({
            todo_completed:!this.state.todo_completed
        });
    }

    onSubmit(e){
        e.preventDefault();
        const updated = {
            todo_title : this.state.todo_title,
            todo_description : this.state.todo_description,
            todo_dueDate : this.state.todo_dueDate,
            todo_completed : this.state.todo_completed
        };
        console.log(updated);
        axios.post('http://localhost:8000/todos/update/'+this.props.match.params.id,updated)
        .then(res=>{
            console.log(res.data)
            
        });
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
               <h3 align='center'>Update Todo</h3>
               <form onSubmit={this.onSubmit}>
                   <div className='form-group'>
                       <label>Title :</label>
                       <input type='text'
                              className='form-control'
                              value={this.state.todo_title}
                              onChange={this.onChangeTodoTitle}/>
                   </div>
                   <div className='form-group'>
                       <label>Description :</label>
                       <input type='text'
                              className='form-control'
                              value={this.state.todo_description}
                              onChange={this.onChangeTodoDescription}/>
                   </div>
                   <div className='form-group'>
                       <div className='form-check form-check-inline'>
                           <input className='form-check-input'
                                  type='date'
                                  name='dueDateOptions'
                                  id='dueDateLow'
                                  onChange={this.onChangeTodoDueDate}/>   
                                                     
                       </div>
                      
                   </div>
                   <div className='form-check'>
                       <input className='form-check-input'
                              id='completedCheckbox'
                              type='checkbox'
                              name='completedCheckbox'
                              onChange={this.onChangeTodoCompleted}
                              checked={this.state.todo_completed}
                              value={this.state.todo_completed}/>
                        <label className="form-check-label" htmlFor='completedCheckbox'>
                            Completed
                        </label>
                   </div>
                   <br/>
                   <div className="form-group">
                       <input type="submit" value="Update Todo" className="btn btn-primary"/>
                   </div>

               </form>
            </div>
        )
    }
}


