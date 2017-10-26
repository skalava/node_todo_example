// const MongoClient = require ('mongodb').MongoClient;
const {MongoClient, ObjectID } = require ('mongodb');

var obj =  new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/Todoapp', (err, db) =>{
    if(err){
        return console.log('unable to connect to DB');
    }
    console.log('Connected to MonngoDB');
    db.collection('Todos1').find({Name: 'Sudheer'}).toArray().then((docs)=>{
        console.log('TODOS');
        console.log(JSON.stringify(docs, undefined, 2));

    }, (err)=>{
        console.log('unable to fetch docs' + err);
    });

// MongoClient.connect('mongodb://localhost:27017/Todoapp', (err, db) =>{
//     if(err){
//         return console.log('unable to connect to DB');
//     }
//     console.log('Connected to MonngoDB');
//     db.collection('Todos').find().count().then((counts)=>{
//         console.log('TODOS count' + counts);
//         // console.log(JSON.stringify(docs, undefined, 2));

//     }, (err)=>{
//         console.log('unable to fetch docs' + err);
//     });
    // db.close();
});