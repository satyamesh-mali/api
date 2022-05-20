const express = require("express");
const router = express.Router();
const userSchema = require("../Mongodb/mongomodel/userschema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = 'AJTAsisthebest'

// route signup for creating user in the database
router.post("/signup", [
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5}),
],async (req, res) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(),success:false });
    }
    // checking whether the user email already exists or not.
    // if exists it will deny the request

    let historyUser = await userSchema.findOne({email:req.body.email});
    if(historyUser){
        return res.json({err:"hey the user already exists!...",success:false})
    }

        // making a secure password
    const salt =await bcrypt.genSalt(10);
    const secPass =await bcrypt.hash(req.body.password,salt);
    let user = await userSchema.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass
    })
    const data = {
      user:{
        id:user.id
      }
    }
    const token = jwt.sign(data,SECRET)
    return res.json({token,success:true,user})

  }catch(err){
    window.alert("there is an error")
      console.log(err)
      return res.send('hey some error occured in the authentication create user')
  }
});

router.post("/login",[
  body('email').isEmail(),
  body('password').isLength({min:5}),
],async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(),success:false,msg:'No such user there please login with proper credentials'});
    }
    const user = await userSchema.findOne({email:req.body.email});
    console.log(user)
    if(!user){
      return res.status(401).json({msg:'No such user there please login with proper credentials',success:false})
    }
    const trueUser = await bcrypt.compare(req.body.password,user.password);
    console.log(trueUser)
    console.log(trueUser);
    if(trueUser){
      const data = {
        user:{
          id:user.id
        }
      }
      const token = jwt.sign(data,SECRET);
      res.json({msg:'you have successfully loged in',token,success:true,user})
    }
    else{
      res.json({msg:"hey please login with the correct credentials",success:false})
    }

    
});

router.post("/fetchallnotes",async (req,res)=>{
    const user = await userSchema.find();
    res.json(user)
    // res.send('hello')
})

module.exports = router;
