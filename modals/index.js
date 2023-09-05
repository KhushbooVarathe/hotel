const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({ name: String, 
    age:Number,
   email:String,
 password:String,
 admin:Boolean,
 Token:String})
//  const user = mongoose.model('user', userSchema)
 module.exports=mongoose.model('scadmins', userSchema)