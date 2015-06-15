"use strict";

var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuthenticated = require('../passport/isAuthenticated');

router.post('/login', function(req, res, next) {
	  passport.authenticate('login', function(err, user, info) {
		    if (err) {
		      	return next(err);
		    }
		    if (!user) {
		    	res.status(401).send(info);
		    }else{
			    req.logIn(user, function(err) {
				    if (err) { return next(err); }
				    return res.send(user);
			    });
		    }
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

// router.put('/changePassword', isAuthenticated, function(req,res){

// });

module.exports = router;