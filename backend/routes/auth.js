const express = require('express');
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const authMiddleware = require("../middleware/auth")


router.post('/signup', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    fs.readFile("./data/users.json", 'utf-8', function (err, data) {
        if (err) {
            console.error(err)
            res.status(403).json({ message: "data not found" });
            return;
        } else {
            const userInfo = {
                username,
                password
            }
            const users = JSON.parse(data);
            const existingUser = users.find((user) => user.username === username)
            if (existingUser) {
                res.status(409).json({
                    message: "user already exists"
                })
                return;
            }
            users.push(userInfo);
            fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));
            res.status(201).json(userInfo);
        }
    })
})

router.post('/signin', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    fs.readFile("./data/users.json", "utf-8", function (err, data) {
        if (err) {
            console.error(err);
            res.status(403).json({ message: "data not found" });
        } else {
            const users = JSON.parse(data);
            const existingUser = users.find((user) => user.username === username && user.password === password);
            if (existingUser) {
                const token = jwt.sign({
                    username: username
                }, process.env.JWT_SECRET)
                res.json({ token: token });
            } else {
                res.status(403).json({ message: "entry declined" });
            }
        }
    })
})

router.get('/me', authMiddleware, function (req, res) {
    res.json({ username: req.username });
})

module.exports = router;
