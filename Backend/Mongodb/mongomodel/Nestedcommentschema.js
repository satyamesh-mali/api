const mongoose = require('mongoose');

const model = mongoose.Schema({
    commentid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})
const nestedCommetModel = mongoose.model("nestedcomments",model);

module.exports = nestedCommetModel;