var db = require("../models");

var routeHelpers = {
  ensureLoggedIn: function(req, res, next) {
    if (req.session.id !== null && req.session.id !== undefined) {
      return next();
    }
    else {
     res.redirect('/login');
    }
  },

  ensureCorrectUser: function(req, res, next) {
    db.User.findById(req.session.id, function(err, user){   
      if(user.userType === "Santa"){
        return next();
      } else {
        db.Child.findById(req.params.id, function(err,child){
          if (child.contactId !== req.session.id) {
            // alert("You Cannot Edit This Child's Information");
            res.redirect('/children');
          } else {
            return next();
          }
        });
      }
    });
  },

  preventLoginSignup: function(req, res, next) {
    if (req.session.id !== null && req.session.id !== undefined) {
      res.redirect('/children');
    }
    else {
     return next();
    }
  }
};
module.exports = routeHelpers;