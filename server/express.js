const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/todoapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

const TodoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false }
});
const Todo = mongoose.model('Todo', TodoSchema);

//CRUD operations
app.post('/todos', async (req, res) => { //create
    try {
        const newTodo = new Todo({
            text: req.body.text,
            completed: req.body.completed
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/todos', async (req, res) => { //retrieve
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/todos/:id', async (req, res) => { //update
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/todos/:id', async (req, res) => { //delete
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

app.patch('/api/todos/:id', async (req, res) => { //update completed
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { completed: req.body.completed }, { new: true });
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = app;