const mongoose  = require("mongoose");

const Event = mongoose.Schema({
    userId:{
        type: String,
        required: true,
        index: true // Index for faster queries
    },
    name:{
        type: String,
        default:""
    },
    tag:{
        type: String,
        default:""
    },
    deadline:{
        type : Date,
        required: true
    },
    describe: String,
    option: {
        type: String,
        defaul:""
    }

});




module.exports = mongoose.model('Event', Event);