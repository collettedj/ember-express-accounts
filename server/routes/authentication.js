"use strict";

var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()){
		return next();
	}
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
};

module.exports = function(passport){

	/* Handle Login POST */
	// router.post('/login', 
	// 	passport.authenticate('login'), 
	// 	function(req, res){
	// 		res.status(200).json(req.user);
	// 	}
	// );

	router.post('/login', function(req, res, next) {
	  passport.authenticate('login', function(err, user, info) {
	    if (err) {
	      return next(err);
	    }
	    if (!user) {
	    	res.status(401).send(info);
	    }
	    req.logIn(user, function(err) {
	      if (err) { return next(err); }
	      return res.send(user);
	    });
	  })(req, res, next);
	});

	router.get('/user', function(req, res) {
		res.status(200).json(req.user);
	});	

	/* Handle Registration POST */
	router.post('/signup', 
		passport.authenticate('signup'), 
		function(req, res){
			res.status(200).json(req.user);
		}
	);

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.sendStatus(200);
	});

	return router;
};