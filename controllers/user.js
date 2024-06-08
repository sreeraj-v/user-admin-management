
const products = require("../utils/products")
const userSchema = require("../models/userSchema")
const bcrypt = require("bcrypt")


//     ...............register cheyyal..................
async function userRegister(req, res) {
  try {
    const username = req.body.username.trim()
    const email = req.body.email.trim()
    const phone = req.body.phone.trim()
    const password = req.body.password.trim()
    const gender = req.body.gender.trim()

    if (username === "" || phone === "" || email === "" || password === "" || gender === "") {
      return res.render("register", {errorMessage: "All fields require"})
    }
    if (phone.length < 8 || phone.length > 10) {
      return res.render("register", {errorMessage: "phone no. must be 10 to 12 digits"})
    }
    if (gender !== "male" && gender !== "female") {
      return res.render("register", {errorMessage: "gender must be male or female" })
    }
    // email checking that the email already inside dtabase or not
    const dbEmail = await userSchema.findOne({ email: email })

    if (dbEmail === null) {

      const hashedPwd = await bcrypt.hash(password, 10)
      const user = await userSchema.create({
        username: username,
        phone: phone,
        gender: gender,
        password: hashedPwd,
        email: email,
        role: "user"
      })
      if (user) {
        console.log("account created")
        req.session.user = user
        req.session.loggedIn = true
        req.session.username=username
        console.log("user created and signuped");
        return res.redirect("/home")
      }
    } else {
      return res.render("register", { errorMessage: "user already exist,kindly login"})
    }
  } catch (err) {
    console.log(err);
  }
} 

//     ...............login cheyyal..................

async function userLogin(req, res) {
  try {
    const email = req.body.email
    const password = req.body.password

    const user = await userSchema.findOne({ email: email, role: "user" })
    const admin = await userSchema.findOne({ email: email, role: "admin" })

    if (user || admin) {
      const currentUser = user || admin
      // Compare the plain text password with the hashed password using bcrypt
      const passwordMatch = await bcrypt.compare(password, currentUser.password)
      if (passwordMatch) {
        console.log(currentUser.role + "  login success")
        req.session.user = user
        req.session.admin = admin
        req.session.loggedIn = true;
        req.session.username=currentUser.username
        if (req.session.user) {
          console.log("user authentication successs");
         return res.redirect("/home")
        } else if (req.session.admin) {
          console.log("admin authentication successs");
         return res.redirect("/admin")
        }
      } else {
        console.log("invalid password")
        return res.render("login", { errorMessage: "invalid password" })
      }
    } else {
      console.log("user not found");
      return res.render("login", { errorMessage: "user not found" })
    }
  } catch (err) {
    console.log(err);
  }
}

//     ...............loginpage get cheyyal..................

const loginpage=function(req,res){
  if(req.session.user){
    return res.redirect('/home')
  }
  if(req.session.admin){
   return res.redirect('/admin')
  }
  else{
   return res.render('login')
  }
}

//     ...............register page get cheyyal..................

const registerPage=function(req,res){
  if(req.session.loggedIn){
   return res.redirect('/home')
  }else{
   return res.render('register')
  }
}

//     ...............homepage get cheyyal..................

const homePage=function(req,res){
  res.render('home',{data:products,name:req.session.username})
}

//     ...............logout cheyyal..................

const logout=function(req,res){
  req.session.destroy()
  res.redirect('/');
}

module.exports = { userRegister, userLogin ,loginpage,registerPage,logout,homePage}


// doubts
// req.sesin.uname setup in both

// const express =require("express")
// const app = express() needed

// admin login role seting up

