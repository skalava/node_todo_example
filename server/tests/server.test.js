const expect = require('expect');
const request = require('supertest');
const{ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../Models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First TODO'
},
{
    _id: new ObjectID(),
    text: 'second todo'
}];
beforeEach((done) =>{
    Todo.remove({}).then(() =>{
        return Todo.insertMany(todos);
    }).then(() => done());
   
});
describe('POST/Todos', () =>{
    
    it('Should create a new todo', (done)=>{
        var text =  'test todo text';
        request(app)
            .post('/Todos')
            .send({text})
            .expect(200)
            .expect((res) =>{
                    expect(res.body.text).toBe(text);
            })
            .end((err, res) =>{
                if(err){
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=>{
                    done(e);
                })
            })
    });
    it('Should not create todo', (done)=>{
        var text = "";
        request(app)
            .post('/Todos')
            .send({text})
            .expect(400)
            // .expect((res)=>{ 
            //     expect(res.body.text).toBe()
            // })
            .end((err, res) =>{
                if(err){
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                  // expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=>{
                    done(e);
                })
                
            })
    })
});

describe('Get/Tpdos', ()=>{
    it('It should test GET/TODO', (done) =>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) =>{
                expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todos.text).toBe(todos[0].text);
        })
        .end(done);
    });
  
    it('should return 404 if todo not found', (done) => {
      var hexId = new ObjectID().toHexString();
  
      request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
  
    it('should return 404 for non-object ids', (done) => {
      request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done);
    });
  });
  