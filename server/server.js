var express = require('express');
var bodyParser  = require('body-parser');

var{mongoose}= require('./DB/mongoose');
var{Todo} = require('./Models/todo');
var{USer} = require('./Models/user')


var app = express();

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


app.listen(3000, () =>{
    console.log('started on port 3000');
});


module.exports = {app};
