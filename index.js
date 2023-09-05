var express = require('express')
const app = express()
require('dotenv').config();
const auth=require('./routes/auth')
const hotels=require('./routes/hotels')
const rooms=require('./routes/rooms')
const users=require('./routes/users')
const path=require('path')
var cors = require('cors')
app.use(express.json())
app.use(cors())

// const HotelSchema=require('./modals/Hotels')
var cookieParser = require('cookie-parser')
// console.log("hello world")
require('./modals/config')
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    console.log('__dirname', path.join(__dirname));
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
// Serve the static files from the public folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api',hotels)

app.use('/api',users)

app.use((err,req,res,next)=>{
    // console.log("i am middleware",err,"errrrrrrrrrr",req.body)
    const errorStatus=err.status || 500
    const errMessage=err.message||"something went wrong"
    next();
    // return res.send("okkkkk")
//    return res.status(errorStatus).json({success:false,
// status:errorStatus,
// message:errMessage,
// stack:err.stack
// })

})
app.use('/api',rooms)
app.use('/api',auth)
app.listen(7000,()=>{
    console.log("runnig at port 7000")
})