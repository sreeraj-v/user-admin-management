const mongoose = require("mongoose")

function connectDb(){
  mongoose.connect('mongodb://127.0.0.1:27017/usermanage')
  .then(() => console.log('Connected to database!'))
  .catch((err)=>{
    console.log("mongodb connection error:",err)
  })
}
module.exports=connectDb