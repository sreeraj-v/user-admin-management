const express = require("express");
const session = require("express-session")
const path = require("path")
const cookieParser = require('cookie-parser')
const hbs = require("express-handlebars")
// port setup
require('dotenv').config()
var PORT= process.env.PORT || 3001

const connectDb = require("./config/config");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter")

const app =express()

// session creation
app.use(session({
  secret:"sj-432",
  resave:false,
  saveUninitialized:false,
  cookie:{maxAge:600000}
}))

// view engine setting
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine("hbs", hbs.engine({
  extname:"hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname+ "/views/layout"
}));

// body parser alternative
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// public accessible to evryting so to access folders inside public avoid public and  starts from stylesheet or js
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next){
  res.setHeader('Cache-control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader("Expires", '0')
  next()
})




app.use('/',userRouter)
app.use('/admin',adminRouter)


// connecting to db
connectDb()
app.listen(PORT, ()=>{
  console.log("running on this port:"+PORT)
});



module.exports = app;






// removeditems
//1. const bodyParser = require('body-parser')
//2. app.use(bodyParser.json())
//3. app.use(bodyParser.urlencoded({extended:true}))
