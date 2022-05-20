const { urlencoded } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5000
let cors = require("cors")
app.use(express.json())
app.use(cors({
    origin:'http://localhost:3000'
}));
// app.use(express.bodyParser());
// app.use(urlencoded());
const connectTodb = require("./Mongodb/connectmongodb");
connectTodb();

app.use("/api/auth",require('./Routes/authentication'))
app.use("/api/comments",require('./Routes/comments'))
app.use("/users",require("./Routes/user"))

app.listen(port,()=>{
    console.log('hey your sever started')
})