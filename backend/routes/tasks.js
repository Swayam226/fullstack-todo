const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");


router.get('/', function (req, res) {
    fs.readFile('./data/todos.json', 'utf-8', function (err, data) {
        if (err) {
            res.status(404).json({ "message": "Data not found" });
            return;
        }
        const todos = JSON.parse(data);
        const filteredTodos = todos.filter((todo) => todo.username === req.username);
        res.status(200).json(filteredTodos);
    })
})


router.post('/', function (req, res) {
    fs.readFile("./data/todos.json", 'utf-8', function (err, data) {
        if (err) {
            res.status(404).json({ "message": "Data not found" });
            return;
        }
        const todos = JSON.parse(data);
        let isCompleted = false;
        const title = req.body.title;
        const todo = {
            username: req.username,
            id: crypto.randomUUID(),
            title: title,
            isCompleted: isCompleted
        }
        todos.push(todo);
        fs.writeFileSync("./data/todos.json", JSON.stringify(todos, null, 2));
        res.status(201).json(todo);
    })
})


router.patch('/:id', function (req, res) {
    fs.readFile("./data/todos.json", "utf-8", function (err, data) {
        if (err) {
            res.status(404).json({ "message": "Data not found" });
            return;
        }
        const todos = JSON.parse(data);
        const id = req.params.id;
        const index = todos.findIndex(todo => todo.id === id && todo.username === req.username);
        if (index == -1) {
            res.status(404).json({ message: "Todo Not Found" });
            return;
        }
        todos[index].isCompleted = !todos[index].isCompleted;
        fs.writeFileSync('./data/todos.json', JSON.stringify(todos, null, 2));
        res.status(200).json(todos[index]);
    })
})


router.delete('/:id', function (req, res) {
    fs.readFile("./data/todos.json", "utf-8", function (err, data) {
        if (err) {
            res.status(404).json({ message: "Data not found" });
            return;
        }
        const todos = JSON.parse(data);
        const id = req.params.id;
        const index = todos.findIndex(todo => todo.id === id && todo.username === req.username);
        if (index == -1) {
            res.status(404).json({ message: "Todo Not Found" });
            return;
        }
        const temp = todos[index];
        todos.splice(index, 1);
        fs.writeFileSync("./data/todos.json", JSON.stringify(todos, null, 2));
        res.status(200).json(temp)
    })
})

module.exports = router;