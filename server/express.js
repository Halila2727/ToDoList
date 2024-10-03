const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

mongoose.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

let todos = [];

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const newTodo = {
        id: Date.now(),
        text: req.body.text,
        done: req.body.done
    };
    todos.push(newTodo);
    res.json(newTodo);
});

module.exports = app;