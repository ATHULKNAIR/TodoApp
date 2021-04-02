const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const cors=require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('MongoDB connection established successfully');
})

todoRoutes.route('/').get((req,res)=>{
    Todo.find((err,todos)=>{
        if(err){
            console.log(err);
        }else{
            res.json(todos);
        }
    })
})

todoRoutes.route('/:id').delete((req,res)=>{
    let id = req.params.id;
    Todo.findByIdAndDelete(id,(err,todo)=>{
        if(err){
            res.send('Deletion failed')
        }else{
            res.send('Successfully Deleted')
        }
    });
})

todoRoutes.route('/').delete((req,res)=>{
    Todo.deleteMany((err,todo)=>{
        if(err){
            res.send('Deletion failed')
        }else{
            res.send('Successfully Deleted')
        
    }
});
});

todoRoutes.route('/:id').get((req,res)=>{
    let id= req.params.id;
    Todo.findById(id,(err,todo)=>{
        res.json(todo);
    });

});

todoRoutes.route('/add').post((req,res)=>{
    let todo = new Todo(req.body);
    todo.save()
    .then(todo=>{
        res.status(200).json({'todo':'todo added successfully'});
        res.redirect('/');
    })
    .catch(err=>{
        res.status(400).send('adding new todo failed');
    });
});

todoRoutes.route('/update/:id').post((req,res)=>{
    Todo.findById(req.params.id,(err,todo)=>{
        if(!todo){
            res.status(404).send("data not found");
        }else{
            todo.todo_title = req.body.todo_title;
            todo.todo_description = req.body.todo_description;
            todo.todo_dueDate = req.body.todo_dueDate;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo=>{
                res.json('Todo updated');
            })
            .catch(err=>{
                res.status(400).send("Update not possible");
            });
        }
    })
})

app.use('/todos',todoRoutes);

app.listen(8000,()=>console.log("Server Listening to http://localhost:8000"));