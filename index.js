var express= require("express"),
  passportModule= require("passport").Passport

var passport = new Passport()
passport.use("local", null); // TODO: define a login strategy


var app= express()
app.post("/login", passort.authenticate('local', { failureRedirect: '/unauth' }, function(req,res) {
	req.passedport= true
}))
