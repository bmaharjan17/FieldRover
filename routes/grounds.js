//Express router
var express = require("express");
var router  = express.Router();
var Ground  = require("../models/ground");
var Comment  = require("../models/comment");
var middleware = require("../middleware"); //auto imports index.js
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY, 
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

//INDEX route --show all grounds
router.get("/grounds", function(req, res) {
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all grounds from DB
        Ground.find({name: regex}, function(err, allGrounds){
           if(err){
               console.log(err);
           } else {
              if(allGrounds.length < 1) {
                  noMatch = "No grounds match your search, please try again.";
              }
              res.render("grounds/index",{grounds:allGrounds, noMatch: noMatch});
           }
        });
    } else {
    //Get all grounds from db
    Ground.find({}, function(err, allGrounds){
        if(err){
            console.log(err);
            } else{
                res.render("grounds/index", {grounds: allGrounds});
            }
        });
    } 
});

//CREATE route ---add new grounds to DB
// router.post("/grounds", middleware.isLoggedIn, function(req, res){
//     //get data from form and add to grounds array
//     var name = req.body.name;
//     var price = req.body.price;
//     var image = req.body.image;
//     var desc = req.body.description;
//     var author = {
//         id: req.user._id,
//         username: req.user.username
//     }
//     var newGround = {name: name, price: price, image: image, description: desc, author:author};
    
//     //create a new ground and save to DB
//     Ground.create(newGround, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect back to list of grounds page
//             console.log(newlyCreated);
//             res.redirect("/grounds");
//         }
//     });
// });

router.post("/grounds", middleware.isLoggedIn, function(req, res){
  // get data from form and add to grounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  };
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      console.log(err);
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newGround = {name: name, image: image, description: desc, author:author, location: location, lat: lat, lng: lng};
    // Create a new ground and save to DB
    Ground.create(newGround, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to grounds page
            console.log(newlyCreated);
            res.redirect("/grounds");
        }
    });
  });
});

//NEW route --show form to create new ground
router.get("/grounds/new", middleware.isLoggedIn, function(req, res) {
    res.render("grounds/new");
});


//SHOW route --shows more info about one ground(entry)
router.get("/grounds/:id", function(req, res) {
    //find the ground with provided ID
    Ground.findById(req.params.id).populate("comments").exec(function(err, foundGround){
        if(err || !foundGround){
            req.flash("error", "Ground not found!!");
            res.redirect("back");
        } else{
            console.log(foundGround);
            //render show template with that ground
            res.render("grounds/show", {ground: foundGround});
        }
    });
});

//Edit Ground Route
router.get("/grounds/:id/edit", middleware.checkGroundOwnership, function(req, res) {
        Ground.findById(req.params.id, function(err, foundGround){
            res.render("grounds/edit", {ground: foundGround});
        });
});

//Update Ground Route
// router.put("/grounds/:id", middleware.checkGroundOwnership, function(req, res){
//     //find and update the corresponding ground
//     Ground.findByIdAndUpdate(req.params.id, req.body.ground, function(err, updatedGround){
//         if(err){
//             res.redirect("/grounds");
//         } else{
//             //redirect to show page
//             res.redirect("/grounds/" + req.params.id);
//         }
//     });
// });

// UPDATE GROUND ROUTE
router.put("/grounds/:id", middleware.checkGroundOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.ground.lat = data[0].latitude;
    req.body.ground.lng = data[0].longitude;
    req.body.ground.location = data[0].formattedAddress;

    Ground.findByIdAndUpdate(req.params.id, req.body.ground, function(err, ground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/grounds/" + ground._id);
        }
    });
  });
});

//Destroy Ground Route
router.delete("/grounds/:id", middleware.checkGroundOwnership, function(req, res){
    Ground.findByIdAndRemove(req.params.id, function(err) {
        if(err){
            res.redirect("/grounds");
        } else {
            res.redirect("/grounds");
        }
    });
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports  = router;