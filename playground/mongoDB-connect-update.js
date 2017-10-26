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
    // // })
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('59efa7c2b335f83a909396df')
    // }, {
    //     $set: {
    //          completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) =>{
    //     console.log(result);
    // });
    db.collection('Users').findOneAndUpdate({
       _id: new ObjectID('59efb00d67771555c8e11aee') 

    }, {
        $set: {
            name: 'some shitty name'
        },
        $inc: {
            Age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) =>{
        console.log(result);
    });
});