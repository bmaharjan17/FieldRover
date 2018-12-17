var mongoose = require("mongoose");
var Ground = require("./models/ground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Pine Banks", 
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "Pine Banks Park is a very popular recreation facility, offering 2 synthetic multi-sport fields and three natural grass fields. Pine Banks’ fields accommodate the following sports: Baseball, Softball, Rugby, Soccer (U12-Adult), Field Hockey, Boys’ and Girls’ Lacrosse, and Track and Field. Additionally, Pine Banks has a several large picnic areas, a pond, playground, and several hiking trails in the woods."
    },
    {
        name: "Bridgewater Commons", 
        image: "https://images.unsplash.com/photo-1529281322535-245b0a3257ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Quarry Street Park", 
        image: "https://images.unsplash.com/photo-1499510318569-1a3d67dc3976?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
function seedDB(){
   //Remove all grounds
   Ground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed grounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few grounds
            data.forEach(function(seed){
                Ground.create(seed, function(err, ground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a ground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there bathrooms here",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    ground.comments.push(comment);
                                    ground.save();
                                    console.log("Created new comment");
                                }
                            });
                    
                        }
                    });
              });
            });
        });
    }


module.exports = seedDB;