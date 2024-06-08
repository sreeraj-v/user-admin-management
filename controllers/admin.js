const userSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')

async function adminPage(req,res){
  if(req.session.admin){
    const allUsers = await userSchema.find({role:"user"}).lean()
    return res.render('admin',{users:allUsers})
  }else{
    res.redirect('/')
  }
}

async function userDelete(req,res){
  const userId = req.params.id
  console.log(userId)
  const deletedUser = await userSchema.deleteOne({_id:userId})
  console.log(deletedUser);
  if(deletedUser){
    res.redirect('/admin')
  }else{
    res.send('failed to delete')
  }
}

async function searching(req,res){
  const word = req.body.keyword
  const allUsers = await userSchema.find({username:{$regex:`^${word}`,$options:'i'}}).lean()
  res.render('admin',{users:allUsers})
}

async function userEdit(req,res){
 const userId = req.params.id
 const user = await userSchema.findOne({_id:userId}).lean()
res.render("editUser", {data:user});
}

async function updateEdit(req,res){
 const userId= req.params.id
 const username = req.body.username
 const email = req.body.email
 const gender = req.body.gender
 const phone = req.body.phone

 const updateUser=await userSchema.findOneAndUpdate({_id:userId},{$set:{username:username,email:email,gender:gender,phone:phone}})
 if(updateUser){
  res.redirect('/admin')
 }
}

async function userAdd(req,res){
  const username = req.body.username
  const email = req.body.email
  const gender = req.body.gender
  const phone = req.body.phone
  const password = req.body.password
  const role = "user"

  const hashedPwd = await bcrypt.hash(password,10)
  const dbEmail = await userSchema.findOne({email:email})

  if(dbEmail===null){
    const user = await userSchema.create({
      username:username,
      email:email,
      phone:phone,
      password:hashedPwd,
      gender:gender,
      role:role 
    })
    // user.save();
    if(user){
      console.log(user+"created")
      res.redirect('/admin')
    }
  }else{
    res.render("admin",{errmsg:"user already exits"})
  }
}



module.exports={adminPage,userDelete,searching,userEdit,updateEdit,userAdd}