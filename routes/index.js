//Express router
var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

//root route
router.get("/", function(req, res){
   res.render("landing"); 
});


//===========================
//Auth Routes
//===========================

//show registration form
router.get("/register", function(req, res) {
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    if(req.body.adminCode === 'admin123') {
      newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Hi, " + user.username + "...Welcome to Field Rover!!");
            res.redirect("/grounds");
        });
    });
}); 


//show login form
router.get("/login", function(req, res) {
   res.render("login"); 
});

//handle login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/grounds", 
        failureRedirect: "/login"
        
    }), function(req, res) {
    
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You Logged out!!");
    res.redirect("/grounds");
});

module.exports  = router;