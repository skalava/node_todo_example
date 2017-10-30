const {ObjectID} = require('mongodb');
const{mongoose} = require('./../server/db/mongoose');
const{Todo} = require('./../server/Models/todo');
const{user} = require('./../server/models/user');

var id = '59f24436db964a7b6431937e';

// Todo.remove({}).then((result) =>{
//     console.log(result);
// });
Todo.findOneAndRemove({_Id: '59f25c9ff69d3263983ae895'}).then((result)=>{
    console.log(result);
});
