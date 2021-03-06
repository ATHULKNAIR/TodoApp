
import React,{Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './index.css'

import CreateTodo from './components/create-todo.component';
import EditTodo from './components/edit-todo.component';
import TodoList from './components/todos-list.component';

import logo from './logo192.png'; 

class App extends Component {

 render(){
   return(
     <Router>
       <div className='container'>
         <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          
             <img src={logo} width='30' height='30' alt='CodingTheSmartWay.com'/>
          
          <Link className="navbar-brand" >My Todo App  </Link>
           <div className="collapse navbar-collapse">
             <ul className="navbar-nav mr-auto">
               <li className="navbar-item">
                 <Link to="/" className="nav-link">Todos</Link>
               </li>
               <li className="navbar-item">
                 <Link to="/create" className="nav-link">Create Todo</Link>

               </li>
             </ul>
           </div>
         </nav>
         <br/>
         
         <Route path="/" exact component={TodoList} />
         <Route path="/edit/:id" component={EditTodo} />
         <Route path="/create" component={CreateTodo} />
       </div>
     </Router>
    
   )
   
 }
}
export default App;
