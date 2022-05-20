const express = require('express');
const router = express.Router();
const checkuser = require("../Middleware/checkuser")
const userSchema = require("../Mongodb/mongomodel/userschema");

router.get("/getuser",checkuser(),async (req,res)=>{
    try{
        console.log('dd bharat dd india')
    // return res.send("hey you have hitted the getuser")
    console.log('despacito')
    if(req.success){
        const data = req.userdata;
        const user = await userSchema.findById(data.user.id).select("-password");
        console.log(user)
        return res.json({user})
    }
    }catch(err){
        console.log(err);
    }
})

module.exports = router;