const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Middleware
app.use((req, res, next) => {
    console.log("words words");
    next();
});
app.use((req, res, next) => {
    console.log("Other words");
    next();
});

const port = process.env.PORT || 8080;
app.listen(8080);

console.log('listening on port 8080')