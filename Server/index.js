const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const todoModel = require('./models/todo.js')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://mazenemam17:mazen%402004@lec1.off1yiv.mongodb.net/test')

app.post('/add', (req, res) => {
    const task = req.body.task;         
    todoModel.create({
        task: task
    })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.get('/get', (req,res) => {
    todoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req,res) => {
    const {id} = req.params;
    todoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => err.json(err))
})

app.put('/alert/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body; // Retrieve the new task name from the request body
    todoModel.findByIdAndUpdate({_id: id}, { task: task }) // Update the task name in the database
    .then(result => res.json(result))
    .catch(err => res.json(err));
  });


app.delete('/delete/:id', (req,res) => {
    const {id} = req.params;
    todoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

app.listen(8080, () => {
    console.log("Server is running")
})