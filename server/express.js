const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

let todos = [];

app.get('/todos', (req, res) => {
    res.send(todos);
});

app.post('/todos', (req, res) => {
    const newTodo = {
        id: Date.now(),
        text: req.body.text,
        done: req.body.done
    };
    todos.push(newTodo);
    res.send(newTodo);
});

module.exports = app;