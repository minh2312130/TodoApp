require('dotenv').config();

const express = require('express');
const app = require('./app'); // Import the app module
const Account = require("./module/Account");

const {restoreScheduledEvents} = require('./routers/Scheduler');

app.use(express.static('frontend'));

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB().then(() => {
  restoreScheduledEvents(); // Khôi phục các job khi DB sẵn sàng
});

// make admin
async function loginAdmin() {
    var existedAd = await Account.findOne({role : process.env.AdminRole});
    if(!existedAd){
      var newAd = new Account({username:process.env.AdminName,
        password:process.env.AdminPass,
        email:process.env.AdminEmail,
        role:process.env.AdminRole});
      await newAd.save();
    }
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    loginAdmin();
    console.log(`Server is running at http://localhost:${PORT}/acc`);
});