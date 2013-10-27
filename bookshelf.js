var bookshelf= require("bookshelf")
  rcModule= require("rc"),
  rc= rcModule("ridesnag-bookshelf", rcPrime= rcModule("ridesnag").bookshelf)


// initialize bookshelf
var orm = bookshelf.initialize(rc)
module.exports= orm
module.exports.orm= orm
var rel= module.exports.WITH_RELATED= {}

// User
var User = orm.Model.extend({
	tableName: "user",
	idAttribute: "id", // TODO: necessary?
	timestamp: true,
	username: "username",
	name: "name",
	trips: function(){
		return this.hasMany(Trip, "owner")
	},
	rate_gotten: function(){
		return this.belongsTo(Rate, "ratee")
	},
	rate_given: function(){
		return this.belongsTo(Rate, "rater")
	}
})
var Users= orm.Collection.extend({
	model: User
})
module.exports.User= User
module.exports.Users= Users
rel.User= ["trips"] // RATES NOT INCLUDED

// Trip
var Trip = orm.Model.extend({
	tableName: "trip",
	idAttribute: "id", // TODO: necessary?
	timestamp: true,
	state: "state",
	owner: function () {
		return this.hasOne(User, "owner")
	},
	fulfiller: function(){
		return this.hasOne(Trip, "fulfiller")
	},
	fulfils: function(){
		return this.belongsToMany(Trip, "fulfils")
	},
	a: function(){
		return this.hasOne(Meet, "a")
	},
	b: function(){
		return this.hasOne(Meet, "b")
	}
})
var Trips= orm.Collection.extend({
	model: Trip
})
module.exports.Trip= Trip
module.exports.Trips= Trips
rel.Trip= ["fulfils", "fulfiller", "a", "b"]

// Meet
var Meet = orm.Model.extend({
	tableName: "meet",
	idAttribute: "id", // TODO: necessary?
	timestamp: true,
	text: "text",
	lat: "lat",
	lng: "lng",
	trip: function() {
		return this.belongsToOne()
	},
	t_s: "t_s",
	t_e: "t_e"
})
var Meets= orm.Collection.extend({
	model: Meet
})
module.exports.Meet= Meet
module.exports.Meets= Meets
rel.Meet= ["Trip"]

// Rating
var Rating = orm.Model.extend({
	tableName: "rating",
	idAttribute: "id", // TODO: necessary?
	timestamp: true,
	rater: function(){
		return this.hasOne(Trip, "rater")
	},
	ratee: function(){
		return this.hasOne(Trip, "ratee")
	},
	general: "general"
})
var Ratings= orm.Collection.extend({
	model: Rating
})
module.exports.Rating= Rating
module.exports.Ratings= Ratings
rel.Rating= ["rater","ratee"]
