const adminAuth = function (req,res,next){
  if(req.session.admin){
    next()
  }else{
    res.redirect('/')
  }
}

module.exports = adminAuth;