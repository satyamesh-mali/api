const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const model = mongoose.model('users',userModel);

module.exports = model;