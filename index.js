#!/usr/bin/env node

// global modules
var express = require('express'),
  nunjucks = require("nunjucks"),
  passportModule = require('passport').Passport,
  bookshelfModule = require('bookshelf'),
  flash= require("connect-flash")

// appconfig
var rc= require("rc")("ridesnag",{port: 4004})

// local modules
var passportLocalStrategy = require('./passport-local'),
  bookshelf= require("./bookshelf")


//
// build express
//

var app= express()
// configure nunjucks as view engine
nunjucks.configure('views', { autoescape: true, express: app })


//
// bring pipe online
//

app.use(express.logger())
app.use(express.cookieParser())
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.static(__dirname + '/public'))
app.use(express.session({ secret: 'y0y0dyn3' }))

app.use("/mat", function(req, res){
	res.locals.user= req.user
	res.render('login')
})


//
// passport
//

// build passport module
var passport = new passportModule()
passport.use("local", passportLocalStrategy())
app.use(flash())
// Initialize Passport!	Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize())
app.use(passport.session())
//app.use(app.router) // TODO: build an application


// POST /
//	 Use passport.authenticate() as route middleware to authenticate the
//	 request.	If authentication fails, the user will be redirected back to the
//	 login page.	Otherwise, the primary route function function will be called,
//	 which, in this example, will redirect the user to the home page.
//
//	 curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
app.post('/',
	passport.authenticate('local', {failureRedirect: '/mat', failureFlash: true, successFlash: "welcome!"}), // TODO: use a custom handler that increments a tock for auth events
	function(req, res){
		res.redirect('/hello')
	})

// POST /login
//	 This is an alternative implementation that uses a custom callback to
//	 acheive the same functionality.
/*
app.post('/login', function(req, res, next) {
	passport.authenticate('local')
	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err) }
		if (!user) {
			req.flash('error', info.message)
			return res.redirect('/login')
		}
		req.logIn(user, function(err) {
			if (err) { return next(err) }
			return res.redirect('/users/' + user.username)
		})
	})(req, res, next)
})
*/


app.get('/logout', function(req, res){
	req.logout()
	res.redirect('/')
})


app.listen(rc.port, function() {
	console.log('Express server listening on port '+rc.port)
})


//
// CONTROLLED ASSETS LINE //
app.use(ensureAuthenticated)
//


// Simple route middleware filter to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next() }
	res.redirect('/login')
}


// user looks at their personalized homepage, sees the trips they are/were associated with
// select * from `user`, `trip` where name = 'bob'
//console.log('selecting bob')
//new User({name: 'bob'}).fetch({
//	withRelated: ['trips.start', 'trips.destination'],
//	require: true
//}).then(function (model) {
//  console.log(JSON.stringify(model))
//})
//console.log('done selecting bob')

// user looks at all trips
// future work: filter by near to A
// future work: filter by upcoming
// future work: filter by going near B

// user 

//
// endpoints
//

function BE_AWESOME(req, res){
	res.locals.user= req.user
	res.render('hello')
}

app.get('/hello', BE_AWESOME)
