const express = require('express');
const app = express();


const login = require('./routers/routerAcc'); // Import the login router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/',login);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/html/login.html');
});

app.get('/trangchu', (req, res) => {
    res.sendFile(__dirname + '/frontend/html/trangchu.html');
});


module.exports = app;