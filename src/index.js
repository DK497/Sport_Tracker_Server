require('./models/User')
const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const authRoutes=require('./routes/authRoutes')
const requireAuth=require('./middleware/requireAuth')

const app=express()

app.use(bodyParser.json())
app.use(authRoutes)

const mongoUri='mongodb+srv://admin:123admin123@cluster0-8yrgu.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true
})
mongoose.connection.on('connected',()=>{
    console.log('connectd to mongo instance ')
})
mongoose.connection.on('error',()=>{
    console.error('error connecting to mongo',err)
})

app.get('/',requireAuth,(req,res)=>{
    res.send(`your email is:${req.user.email}`)
})

app.listen(3000,()=>{
    console.log('LIstening')
})