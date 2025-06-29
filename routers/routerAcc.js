const express = require('express');
const router = express.Router();
const Account = require('../module/Account');
const jwt = require('jsonwebtoken');
const { checklogin,isAdmin } = require('../helper/helper');


// Create a new account
router.post('/signin',async (req, res) => {
    const { username, password, email } = req.body;
    try{
        const existingAccount = await Account.findOne({ username});
        console.log("existingAccount", existingAccount);
        if(existingAccount) {
            return res.status(400).json({message: "Username is already taken"});
        }

        var newAccount = new Account({username,password,email});
        await newAccount.save();
        
        return res.status(201).json({message:"Account created successfully"});
    }
    catch(error) {
        console.error("Error creating account:", error);
        return res.status(500).json({message: "Internal server error"});
    }
});

// have Account
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    var go;
    try{
        const Acc = await Account.findOne({username,password});
        if(!Acc){
            console.log("Account not found");
            return res.status(404).json({message: "Account not found"});
        }
        var token = jwt.sign({id:Acc._id,username: username}, process.env.SECRET_KEY, {expiresIn: 10000});
        res.cookie('token', token, {
            httpOnly: true,     // Bảo mật: không truy cập qua JS
            secure: false,      // true nếu dùng HTTPS
            maxAge: 60*60*1000    // 1 giờ
        });
        
        if(Acc.role == process.env.AdminRole ){
            go = '/trangchuAdmin'; 
        }
        else{
            go = '/trangchu';
        }

        return res.status(200).json({message : "Login successful",Goto:go});  
    }
    catch(error) {
        console.error("Error fetching account:", error);
        return res.status(500).json({message: "Internal server error"});
    }
});

// update Account
router.put('/update',checklogin,async(req,res)=>{
    var {password,email} = req.body;
    var decode = req.decode;
    try{
        if(password){
            await Account.updateOne({username: decode.username},{$set:{password:password}});
        }
        if(email){
           await Account.updateOne({username: decode.username},{$set:{email:email}});
        }
        return res.status(200).json({message:" Update successful"});
    }
    catch(error){
        return res.status(401).json({message:`Error $(error.message)`});
    }

});

// delete Account
router.delete('/delete',checklogin,async (req,res)=>{
    var decode = req.decode;
    try{
        await Account.deleteOne({username:decode.username});
        return res.status(200).json({message:" delete acc successfully"});
    }
    catch(error){
        console.error(error);
        return res.status(401).json({message:" delete failed"});
    }
});
// get Account
router.get('/getAcc',checklogin, async (req,res)=>{
     var decode = req.decode;
    try{
        var Acc  = await Account.findById(decode.id);
        return res.status(200).json({Acc:Acc});
    }
    catch(error){
        console.error(error);
        return res.status(400).json({message: '$(error)'});
    }

});
// get all Account
router.get('/getAllAcc',checklogin,isAdmin, async (req,res)=>{
    try{
        var Acc = await Account.find();
        return res.status(200).json({Acc:Acc});
    }
    catch(error){
        console.error(error);
        return res.status(400).json({message: '$(error)'});
    }
});


// for admin delete Account
router.delete('/admin/delete',checklogin,isAdmin,async (req,res)=>{
    var {username} = req.body;
    try{
        await Account.deleteOne({username:username});
        return res.status(200).json({message:" delete acc successfully"});
    }
    catch(error){   
        console.error(error);
        return res.status(401).json({message:" delete failed"});
    }
});


module.exports = router;