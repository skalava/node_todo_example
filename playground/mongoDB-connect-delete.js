// const MongoClient = require ('mongodb').MongoClient;
const {MongoClient, ObjectID } = require ('mongodb');

var obj =  new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/Todoapp', (err, db) =>{
    if(err){
        return console.log('unable to connect to DB');
    }
    // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result)=>{
    //     console.log(result);
    // })
    db.collection('Todos').findOneAndDelete({Completed: false}).then((result) =>{
        console.log(result);
    })

});