// connect with .env
require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
// solution for cors related issues
const cors = require("cors");
// shows request in terminal
const morgan = require("morgan");
//module for working with paths
const path = require('path');
const { auth, admin } = require("./auth");
// all /api requests redirected to this file
const indexRouter = require("./routes/index");

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//
app.use(express.static('../frontend/build'));

//routes
app.use("/api", indexRouter);
app.get("/maps", auth, function(req, res, next) {
    res.status(204).send();
});

app.get("/admin", auth, admin, function(req, res, next) {
    res.status(204).send();
});

// all requests except above stated will be sent to front page
app.get('*', function (req, res) {
    console.log(req.params)
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

//list port from dotenv
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}.`)
})