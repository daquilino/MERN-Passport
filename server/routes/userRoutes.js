const router = require('express').Router();

// user signup  
router.route("/signup")
.post((req,res)=>
{res.send("signing up...")
});

// user login
router.route("/login")
.post((req,res)=>res.send("logging in..."));

// user logout
router.route("/logout")
.post((req,res)=>res.send("logging OUT..."));


module.exports = router;