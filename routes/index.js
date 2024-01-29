var express = require('express');
var router = express.Router();
const jwtTokenVerify = require('../jwt/verifyAndUnpack')

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.cookies.access_to_resource) {
    return res.render("lockpage.html")
  }
  const data = jwtTokenVerify(req.cookies.access_to_resource)
  switch (data.status) {
    case "ok":
      return res.render("mainmenu.html")
    case "error":
      return res.status(403).json({message:"Opps...,Your cookies is invalid or expired or is already tampered!, remove the old cookies and login again"})
  }
  // res.render('index', { title: 'nextgen Gateway' });
});

module.exports = router;
