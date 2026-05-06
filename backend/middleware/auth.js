const jwt = require("jsonwebtoken");
require("dotenv").config();

function authMiddleware(req, res, next) {
    const token = req.headers.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.username) {
            req.username = decoded.username;
            next();
        } else {
            res.status(403).json({ message: "deined entry" });
        }
    } catch (error) {
        res.status(403).json({ "message": "invalid token" });
        console.error(error);
    }
}

module.exports = authMiddleware;