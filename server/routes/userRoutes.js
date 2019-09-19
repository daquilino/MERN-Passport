const router = require('express').Router();

router.route("/signup")
.post((req,res)=>res.send("signing up..."));

router.route("/login")
.post((req,res)=>res.send("logging in..."));

router.route("/logout")
.post((req,res)=>res.send("logging OUT..."));



module.exports = router;