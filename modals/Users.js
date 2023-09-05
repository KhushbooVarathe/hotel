const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        // required:true
    },
    DOB:{
        type:String,
        // required:true
    },
    DOJ:{
        type:String,
       
    },
    password:{
        type:String,
        required:true
    },
    city:{
        type:String,
        // required:true
    },
    address:{
        type:String,
        
    },
    distance:{
        type:String,
        
    },
    photos: [
        {
          filename: String,
          path: String,
        },
      ],
    desc:{
        type:String,
       
    },
    rating:{
        type:Number,
        min:0,
        max:5
    },
   
    cheapestPrice:{
        type:Number,
        
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    refreshToken:{
        type:String 
    }
    

},
{timestamps:true})
module.exports=mongoose.model('userschema', UserSchema)