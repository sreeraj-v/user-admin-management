const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true 
  },
  phone:{
    type:Number,
    required:true
  },
  email:{
    type:String,
    required:true 
  },
  gender:{
    type:String,
    required:true,
    enum:['male','female']
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    required:true
  }
})
module.exports= mongoose.model("user",userSchema)




