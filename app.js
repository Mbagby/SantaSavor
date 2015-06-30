var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require("./models"),
    methodOverride = require("method-override"),
    session = require("cookie-session"),
    morgan = require("morgan"),
    loginMiddleware = require("./middleware/loginHelper");
    routeMiddleware = require("./middleware/routeHelper");

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));


app.use(session({
  maxAge: 3600000,
  secret: 'nosecrets',
  name: "allthesecrets"
}));

app.use(loginMiddleware);

//1
app.get("/", routeMiddleware.ensureLoggedIn, function(req,res){
  res.render('users/login.ejs');
});

//2
app.get("/signup", routeMiddleware.preventLoginSignup ,function(req,res){
  res.render('users/signup.ejs');
});

//3
app.post("/signup", function(req,res){
   db.User.create(req.body.user, function(err, user){
    if (user) {
      console.log(user)
      req.login(user)
      res.redirect("/children")
    } else {
      console.log(err)
      res.render("errors/404.ejs");
    }
  })
});

//4
app.get("/login", routeMiddleware.preventLoginSignup, function (req, res) {
  res.render("users/login.ejs");
});

//5
app.post("/login", function (req, res) {
  db.User.authenticate(req.body.user,
  function (err, user) {
    if (!err && user !== null) {
      req.login(user);
      res.redirect("/children");
    } else {
      res.render("users/login.ejs");
    }
  });
});


//6
//index for children
app.get("/children", routeMiddleware.ensureLoggedIn, function(req, res){
  db.User.findById(req.session.id, function(err, user){
    if(user.userType === "Parent"){
    db.Child.find({}, function(err, children){
    res.render("parentUser/index.ejs", {children: children});
    });
  } else{
    db.Child.find({}, function(err, children){
    res.render("santaUser/index.ejs", {children: children});
  });
  }
  })
  
});

//7
//new
//add if you are a parent add a child else you do not have access to this page
app.get("/children/new", function(req,res){
	res.render("parentUser/new.ejs")
});

//8
//post
//only applies to the new route 
app.post("/children", routeMiddleware.ensureLoggedIn, function(req,res){
	var child = new db.Child(req.body.child);
	child.contactId = req.session.id;
	child.save(function(err, child){
		res.redirect("/children")
	})
});

//9
//show
//Dependent of userType
app.get("/children/:id", routeMiddleware.ensureLoggedIn, function(req, res){
  db.User.findById(req.session.id, function(err, user){
    if(err){
      res.render("errors/404/ejs");
    } else if(user.userType === "Parent"){
      db.Child.findById(req.params.id, function(err, foundChild){
      res.render("parentUser/show.ejs", {child: foundChild});
      });
    } else{
      db.Child.findById(req.params.id, function(err, foundChild){
      res.render("santaUser/show.ejs", {child: foundChild});
      });
    }
  })
});


//10
//edit (only if it is your child)
app.get("/children/:id/edit", routeMiddleware.ensureLoggedIn, routeMiddleware.ensureCorrectUser, function(req, res){
	db.User.findById(req.session.id, function(err, user){
    if(err){
      res.render("errors/404.ejs");
    } else if(user.userType === "Parent"){
        db.Child.findById(req.params.id, function(err, foundChild){
        res.render("parentUser/edit.ejs", {child: foundChild});
        });
		} else {
        db.Child.findById(req.params.id, function(err, foundChild){
        res.render("santaUser/edit.ejs", {child: foundChild});
		    });
    }
  });
});

//11
//put
app.put('/children/:id', routeMiddleware.ensureLoggedIn, function(req,res){
    db.Child.findByIdAndUpdate(req.params.id, req.body.child, function(err, foundChild){
      if(err){
        res.render("errors/404.ejs");
    } else {
        res.redirect("/children");
    }
  })
});

//12
//delete child
app.delete('/children/:id', routeMiddleware.ensureLoggedIn, routeMiddleware.ensureCorrectUser, function(req,res){
  db.Child.findByIdAndRemove(req.params.id, function(err, foundChild){
      if(err){
        res.render("errors/404.ejs");
    } else{
        res.redirect("/children");
    }
  })
});

//13
//logout
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

//error if any case
app.get('*', function(req,res){
  res.render('errors/404.ejs');
});

//start server
app.listen(3000, function() {
  console.log("You started the server on port 3000, well done!");
});