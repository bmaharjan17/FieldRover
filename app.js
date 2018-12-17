//importing packages
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Ground          = require("./models/ground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

//importing routes    
var commentRoutes   = require("./routes/comments"),
    groundRoutes    = require("./routes/grounds"),
    indexRoutes     = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/field_rover", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));   //the directory this script is running
app.use(methodOverride("_method"));
app.use(flash());

//seeding init data
// seedDB();

//Passport Config
app.use(require("express-session")({
    secret: "Secret key to encode and decode hashed values in a session",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//custom middleware to pass current user info to every single template
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use(groundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Field Rover Server has started!!"); 
});