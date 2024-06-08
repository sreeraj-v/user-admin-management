const router =require("express").Router()
const userAuth = require("../middleware/userAuth")
const {userRegister,userLogin,loginpage,registerPage,logout,homePage} = require("../controllers/user")



router.get('/',loginpage)

router.get('/register',registerPage)

router.get('/home', userAuth ,homePage)

router.post('/register',userRegister)
  
router.post('/login',userLogin)

router.get('/logout',logout)  




module.exports = router;

