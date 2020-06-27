const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const User=mongoose.model('User')

//now a middleware which run "next" if the user has valid web token

module.exports=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
        return res.status(401).send({error:'You must be logged in'})
    }

    const token=authorization.replace('Bearer ','')
    jwt.verify(token,'My Secret Key',async(err,payload)=>{
        if(err){
            return res.status(401).send({error:'you must be logged in'})
        }
        const {userId}=payload
        const u=await User.findById(userId)
        req.user=u //attaching user to req so as to allow easy request processing
        next()
    })

}