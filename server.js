const express = require('express');
const app = require('./app'); // Import the app module


app.use(express.static('frontend'));

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});