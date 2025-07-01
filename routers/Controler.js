const express = require('express');
const router = express.Router();
const {SendMailCode} = require('../Action/Sending');


router.post('/sendVerificationCode', async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }
    
    try {
        
        const code = email.length+ Math.floor(100 + Math.random() * 900).toString(); // Tạo mã xác nhận
        
        
        await SendMailCode(email, code);
        
        res.status(200).json({ message: 'Verification code sent successfully.',checkCode: code });
    } catch (error) {
        console.error('Error sending verification code:', error);
        res.status(500).json({ message: 'Failed to send verification code.' });
    }
});

module.exports = router;