var express = require('express');
var bodyParser  = require('body-parser');
var {ObjectID} = require('mongodb');

var{mongoose}= require('./DB/mongoose');
var{Todo} = require('./Models/todo');
var{USer} = require('./Models/user')


var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
    console.log(req.body);
    var todo = new Todo ({
        text: req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
        // res.statusCode(200);
    }, (err)=>{
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) =>{
    console.log(req.body);
    Todo.find().then((todos)=>{
        res.send({todos});
        // res.statusCode(200);
    }, (err) =>{
        res.status(400).send();
    });
    
});

app.get('/todos/:id', (req, res) =>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((todos) =>{
        if(!todos)
        return  res.send(404).send({todos});
        res.send({todos});
    }, (err) =>{
        res.status(404).send(err);
    }).catch((e) =>{
        res.status(400).send(e);
    });
});


app.listen(port, () =>{
    console.log('started on port ', port);
});


module.exports = {app};
