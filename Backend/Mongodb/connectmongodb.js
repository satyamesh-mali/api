const mongoose = require("mongoose")
let url = 'mongodb+srv://satyamesh:AJTAs@cluster0.pivxf.mongodb.net/AJTAs?retryWrites=true&w=majority'


let connectToDatabase =async ()=>{
    await mongoose.connect(url);
    console.log("hey")
}


module.exports = connectToDatabase;