const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../Models/todo');

const todos = [{
    text: 'First TODO'
},
{
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