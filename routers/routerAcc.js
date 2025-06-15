const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Account = require('../module/Account');
const jwt = require('jsonwebtoken');


// Create a new account
router.post('/signin', async (req, res) => {
    const { username, password, email } = req.body;
    try{
        const existingAccount = await Account.findOne({ username});
        console.log("existingAccount", existingAccount);
        if(existingAccount) {
            return res.status(400).json({message: "Username is already taken"});
        }

        var newAccount = new Account({username,password,email});
        await newAccount.save();
        
        return res.status(201).json({mesage:"Account created successfully"});
    }
    catch(error) {
        console.error("Error creating account:", error);
        return res.status(500).json({message: "Internal server error"});
    }
});

// have Account
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try{
        const Acc = await Account.findOne({username,password});
        var token = jwt.sign({username}, process.env.SECRET_KEY, {expiresIn: 10000});
        console.log("token : ",token);
        if(!Acc){
            return res.status(404).json({message: "Account not found"});
        }
        console.log("token : ",token);
        return res.status(200).json({message : "Login successful", token: token});  
    }
    catch(error) {
        console.error("Error fetching account:", error);
        return res.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;