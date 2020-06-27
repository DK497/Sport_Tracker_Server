const express=require('express')
const jwt=require('jsonwebtoken')

const mongoose=require('mongoose')
const User=mongoose.model('User')
//Using model created by mongoose

const router=express.Router()

router.post('/signup',async (req,res)=>{
    const {email,password}=req.body
    try
   {   const user1=new User({email,password})
       await user1.save()
       const token=jwt.sign({userId:user1._id},'My Secret Key')
       res.send({token:token})
   }
     catch(err){
         return res.status(422).send(err.messsage)
     }
})

router.post('/signin',async (req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(422).send({error:'Must provide email and password'})
    }
    const user= await User.findOne({email})
    if(!user){
        return res.status(404).send({error:'Email not found'})
    }
    try
    {await user.comparePassword(password)
    const token=jwt.sign({userId:user._id},'My Secret Key')
    res.send({token:token})
    }
    catch(err){
        return res.status(422).send({error:'Invalid paswoed or email'})
    }
})

module.exports=router