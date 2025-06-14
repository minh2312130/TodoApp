const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Account = require('./module/Account');

// Create a new account
router.post('/create', async (req, res) => {
    const { username, password, email } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }
    try {
        const newAccount = new Account({ username, password, email });
        await newAccount.save();
        res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating account' });
    }
});

