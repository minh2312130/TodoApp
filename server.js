const express = require('express');
const server = express();
const mongoose = require('mongoose');

server.use(express.json());
server.use (express.static('frontend'));

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();




server.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/html/login.html');
});



// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});