const mongoose = require('mongoose');

const Account = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    totalEvent :{
        type: Number,
        default: 0
    },
    role:{
        type: String,
        default: 'user'
    }
});




module.exports = mongoose.model('Account', Account);