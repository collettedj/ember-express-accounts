var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var UserModel = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res) {
  var users = UserModel.find().exec()
  	.then(function(users){
  		res.json({users:users});
  	});
});

router.post('/', function(req, res){
	var newUser = new UserModel({firstname:'New', lastname:'User'});
	newUser
		.save(function(err){
			console.log('done saving new user');
		}).then(function(user){
			res.json({user:user});
		});
})

module.exports = router;
