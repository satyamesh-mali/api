const mongoose = require("mongoose");

const commentsModel = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:Date.now()
    }
})

const model = mongoose.model("comments",commentsModel);

module.exports = model;

