const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/tasks', function (req, res) {
    fs.readFile('todos.json', 'utf-8', function (err, data) {
        if (err) {
            res.status(404).json({ "message": "Data not found" });
            return;
        }
        const todos = JSON.parse(data);
        res.status(200).json(todos);
    })
})


app.post('/tasks', function (req, res) {
    fs.readFile("todos.json", 'utf-8', function (err, data) {
        if (err) {
            res.status(404).json({ "message": "Data not found" });
            return;
        }
        const todos = JSON.parse(data);
        let isCompleted = false;
        const title = req.body.title;
        const todo = {
            id: crypto.randomUUID(),
            title: title,
            isCompleted: isCompleted
        }
        todos.push(todo);
        fs.writeFileSync("todos.json", JSON.stringify(todos));
        res.status(201).json(todo);
    })
})


app.patch('/tasks/:id', function (req, res) {
    fs.readFile("todos.json", "utf-8", function (err, data) {
        if (err) {
            res.status(404).json({ "message": "Data not found" });
            return;
        }
        const todos = JSON.parse(data);
        const id = req.params.id;
        const index = todos.findIndex(todo => todo.id === id);
        if (index == -1) {
            res.status(404).json({ message: "Todo Not Found" });
            return;
        }
        todos[index].isCompleted = !todos[index].isCompleted;
        fs.writeFileSync('todos.json', JSON.stringify(todos));
        res.status(200).json(todos[index]);
    })
})


app.delete('/tasks/:id', function (req, res) {
    fs.readFile("todos.json", "utf-8", function (err, data) {
        if (err) {
            res.status(404).json({ message: "Data not found" });
            return;
        }
        const todos = JSON.parse(data);
        const id = req.params.id;
        const index = todos.findIndex(todo => todo.id === id);
        const temp = todos[index];
        todos.splice(index, 1);
        fs.writeFileSync("todos.json", JSON.stringify(todos));
        res.status(200).json(temp)
    })
})












app.listen(3000)
