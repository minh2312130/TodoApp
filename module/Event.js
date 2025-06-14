const mongoose  = require("mongoose");

const Event = mongoose.Schema({
    id_user:{
        type: String,
        required: true,
        index: true // Index for faster queries
    },
    id:{
        type : Number
    },
    name:{
        type: String,
        required: true
    },
    tag:{
        type: String
    },
    deadline:{
        type : Date,
        required: true
    },
    describe: String,
    option: {},

});




module.exports = mongoose.model('Event', Event);