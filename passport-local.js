var express= require("express"),
  passport= require("passport"),
  when= require("when"),
  LocalStrategy = require("passport-local").Strategy

var bookshelf= require("./bookshelf")

function findById(id, fn) {
	return new bookshelf.User({id: id}).fetch({withRelated: bookshelf.WITH_RELATED.User})
}

function findByUsername(username, fn) {
	return new bookshelf.User({username: username}).fetch({withRelated: bookshelf.WITH_RELATED.User})
}


// Passport session setup.
//	 To support persistent login sessions, Passport needs to be able to
//	 serialize users into and deserialize users out of the session.	Typically,
//	 this will be as simple as storing the user ID when serializing, and finding
//	 the user by ID when deserializing.
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	whenWhenThenNode(findById(id), done)	
});

function whenWhenThenNode(w,done){
	when(w).then(_deglom1,done)
}

function _deglom1(fn){
	return function(data){
		fn(null,data)
	}
}


// Create a copy of the LocalStrategy within Passport.
//	 Strategies in passport require a `verify` function, which accept
//	 credentials (in this case, a username and password), and invoke a callback
//	 with a user object.	In the real world, this would query a database;
//	 however, in this example we are using a baked-in set of users.
module.exports= function(){
	return new LocalStrategy(
		function(username, password, done) {

			// Find the user by username.	If there is no user with the given
			// username, or the password is not correct, set the user to `false` to
			// indicate failure and set a flash message.	Otherwise, return the
			// authenticated `user`.
			whenWhenThenNode(findByUsername(username), done)
		}
	)
}
