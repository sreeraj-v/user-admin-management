const router = require("express").Router();
const { adminPage, userDelete, searching ,userEdit,updateEdit,userAdd } = require("../controllers/admin");
const adminAuth = require("../middleware/adminAuth");


router.get("/",adminAuth, adminPage);

router.get("/deleteUser/:id",adminAuth, userDelete);

router.post("/search",adminAuth, searching);

router.get("/editUser/:id",adminAuth, userEdit)

router.post("/editUser/:id",adminAuth,updateEdit)

router.post('/addUser',adminAuth,userAdd)



module.exports = router;


// edit user oyike ellethinum auth vekkanm