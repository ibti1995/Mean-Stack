//import libs
const express = require('express');
const bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
const _ = require('lodash');
//import connection to MongoDB and MySQL databases
var { mongoose } = require('../BD/config');

//import Mongoose models
var { Todo } = require('../models/todo');
const router = express.Router();
router.use(bodyParser.json());

router.post('/addTodo/:id', (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.params.id,
        completed :false,
        savedAt : new Date().getTime()
    });
    
  todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

router.post('/todoList/:id', (req, res) => {
    Todo.find({
        _creator: req.params.id
    }).then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});

router.get('/todoDetails/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/deleteTodo/:id/:creator', (req, res) => {
    console.log(req.params.id)
    console.log(JSON.stringify(req.params.creator))
    
    Todo.findOneAndRemove({
        _id: req.params.id,
        _creator: req.params.creator
    }).then((todo) => {
        console.log(todo)
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

router.patch('/updateTodo/:id', (req, res) => {
    var id = req.params.id;
    
    var body = _.pick(req.body, ['text', 'completed']);
    console.log( "testtt",req.params.id,req.body.text,req.body._userId)
    /*if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }*/

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
console.log('t3adda el test ')
    Todo.findOneAndUpdate({ 
        _id: id,
        _creator:req.body._userId
         }, { $set: body }, { new: true }).then((todo) => {

            if (!todo) {
                return res.status(404).send();
            }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    })
});

router.get('/', (req, res) => {
    res.send('From todo route')
})

module.exports = router;