//Collections of middleware/helper functions/methods
//=====================
//Middlewares
//=====================

var Ground = require("../models/ground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkGroundOwnership = function(req, res, next){
    //check if the user is logged in
    if(req.isAuthenticated()){
        Ground.findById(req.params.id, function(err, foundGround){
            if(err || !foundGround){
                req.flash("error", "Could not find the Ground!");
                res.redirect("back");
                } else {
                    //does the user own the ground?
                    //can't compare obj with string so use the method equals()
                        if(foundGround.author.id.equals(req.user._id) || req.user.isAdmin){
                            next();
                        } else{
                            req.flash("error", "Access Denied!");
                            res.redirect("back");
                    }
                }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    //check if the user is logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found!!");
                res.redirect("back");
            } else {
                //does the user own the comment?
                //can't compare obj with string so use the method equals()
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                } else{
                    req.flash("error", "Access Denied!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please login to complete such actions!");
        res.redirect("back");
    }
};


//custom middleware to pass user info to every single template
middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
        }
        req.flash("error", "Crendential required for such actions..please, Login!!")
        res.redirect("/login");
    };


module.exports  = middlewareObj;