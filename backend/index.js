const express = require('express');
const cors = require('cors');

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/tasks', authMiddleware, taskRoutes);

app.listen(3000)
