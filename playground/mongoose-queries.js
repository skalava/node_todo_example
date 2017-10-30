const{mongoose} = require('./../server/db/mongoose');
const{Todo} = require('./../server/Models/todo');

var id = '59f24436db964a7b6431937e';

Todo.find({
    __id: id
}).then((todos) =>{
    console.log('Todos' , todos);
});

Todo.findOne({
    __id: id
}).then((todos) =>{
    console.log('Todos one' , todos);
});
// Todo.findById({
//     __id: id
// }).then((todos) =>{
//     console.log('Findby id' , todos);
// });
