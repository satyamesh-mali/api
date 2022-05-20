const express = require('express');
const router = express.Router();
const userSchema = require('../Mongodb/mongomodel/commentsSchema');
const commentsSchema = require("../Mongodb/mongomodel/commentsSchema")
const nestedCommetSchema = require("../Mongodb/mongomodel/Nestedcommentschema")
const { body, validationResult } = require("express-validator");

const checkuser = require('../Middleware/checkuser')

router.get("/fetchallcomments",checkuser(),async (req,res)=>{
    if(req.success){
        const comments =await commentsSchema.find();
        return res.json({msg:'successfully rendered all the messages',success:true,comments});
    }
    else{
        return res.json({msg:"Hey please login with proper credentials",success:false});
    }
})

router.post("/add-a-comment",checkuser(),[
    body('title').isLength({min:3}),
    body('description').isLength({min:5}),
    body('userName').isLength({min:3}),
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(),success:false });
    }
    if(req.success){
        const data = req.userdata
        const user = await userSchema.findById(data.user.id);
         console.log(user)
        const userComment = await commentsSchema.create({
            user:data.user.id,
            userName:req.body.userName,
            title:req.body.title,
            description:req.body.description,

        })
        return res.json({userComment,success:true,msg:'hey your comment has been added successfully'});
    }
    else{
        res.json({msg:"hey some error occured",success:false})
    }
})

router.post("/add-a-nested-commment/:id",checkuser(),[
    body('description').isLength({min:5})
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(),success:false ,msg:'hey some error occured please try again!..'});
    }
    if(req.success){
        console.log('dd')
        const nestedComment =await nestedCommetSchema.create({
            commentid:req.params.id,
            description:req.body.description,
        })
        return res.json({nestedComment,success:true,msg:"hey your comment has been added successfully"})
    }
    else{
        return res.json({msg:'hey some error occured please try again!..',success:true})
    }
}
)

router.get("/get-all-the-nested-comment/:id",checkuser(),async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(),success:false ,msg:'hey some error occured please try again!..'});
    }
    try{
        if(req.success){
            console.log("entered")
            const comments = await nestedCommetSchema.find({commentid:req.params.id});
            res.json({comments,success:true,msg:"hey everything went correct"});
        }
    }catch(err){
        console.log(err);
    }
})

module.exports = router;