//Express router
var express = require("express");
var router  = express.Router();
var Ground  = require("../models/ground");
var Comment  = require("../models/comment");
var middleware = require("../middleware"); //auto imports index.js

//New comments
router.get("/grounds/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    //find ground by id
    Ground.findById(req.params.id, function(err, ground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {ground: ground});
        }
    });
    
});

//Create Comment
router.post("/grounds/:id/comments", middleware.isLoggedIn, function(req, res){
    //lookup ground using ID
    Ground.findById(req.params.id, function(err, ground) {
        if(err) {
            req.flash("error", "Oops..something went wrong, please try again!");
            console.log(err);
            res.redirect("/grounds");
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    //add username and id to a comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // console.log("new cmt user: " + req.user.username);
                    //save the obj comment
                    comment.save();
                    ground.comments.push(comment);
                    ground.save();
                    req.flash("success", "Your comment has been added succesfully!!");
                    res.redirect("/grounds/" + ground._id);
                }
            });
            
        }
    });
       
   });

//Edit comments route
router.get("/grounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Ground.findById(req.params.id, function(err, foundGround) {
        if(err || !foundGround){
            req.flash("error", "Ground not found!!");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                res.redirect("back");
            } else {
                res.render("comments/edit", {ground_id: req.params.id, comment: foundComment});
            }
        });
    });
});

//Update comments route
router.put("/grounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/grounds/" + req.params.id);
        }
    });
});


//Destroy comment route
router.delete("/grounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //find by id and remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
             res.redirect("back");
        } else {
            req.flash("success", "Your comment has been succesfully deleted!!");
            res.redirect("/grounds/" + req.params.id );
        }
    });
});

module.exports  = router;  