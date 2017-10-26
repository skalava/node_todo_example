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
        res.statusCode(200);
    }, (err)=>{
        res.status(400).send(err);
    });
});
app.listen(3000, () =>{
    console.log('started on port 3000');
});

app.get('todos', (req, res) =>{
    console.log(req.body);
    
});

module.exports = {app};
// var newTodo = new Todo({
//     text: 'Edi this video',
//     completed:  false,
//     completedAt: 5454545

// });

// newTodo.save().then((doc)=>{
//     console.log('Saved TOdo', doc);
// }, (err)=>{
//     console.log('Save error' , err);
// });



// var newUser = new user ({
//     email: 'test@test.com'
// });

// newUser.save().then((user)=>{
//     console.log('saved user', user);
// },(err)=>{
//     console.log('error' + err);
// })