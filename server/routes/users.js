var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var UserModel = require('../models/user');
var isAuthenticated = require('../passport/isAuthenticated');

router.use(isAuthenticated);

/* GET users listing. */
router.get('/', function(req, res) {
  var users = UserModel.find({}, {password:0}).exec()
  	.then(function(users){
  		res.json({users:users});
  	});
});

router.get('/:userId', function(req, res) {
	var userId = req.params.userId;
	var user = UserModel.findOne({_id:userId}, {password:0}).exec()
		.then(function(user){
			res.json({user:user});
		});
});

// router.post('/', function(req, res){
// 	var newUser = new UserModel(req.body.user);
// 	newUser
// 		.save(function(err){
// 			if(err){
// 				res.status(500).json(err);
// 			}
// 		}).then(function(user){
// 			delete user.password;
// 			res.json({user:user});
// 		});
// });

router.put('/:userId', function(req, res){
	var userId = req.params.userId;
	var user = req.body.user;
	UserModel.findByIdAndUpdate(userId, {$set:req.body.user}, function(err, updatedUser){
		if(err){
			throw new Error(err);
		}
		var updatedUserJson = updatedUser.toJSON();
		delete updatedUserJson.password;
		res.json({user:updatedUserJson});
	});
});

router.delete('/:userId', function(req, res){
	var userId = req.params.userId;
	UserModel.remove({_id:userId}).exec(function(err){
			if(err){
				res.status(500).json(err);
			}
		})
		.then(function(err){
			res.sendStatus(204);
		})
	//UserModel.findByIdAndUpdate(userId, {$set:req.body.user}, function(err, updatedUser){
	//	res.json({user:updatedUser});
	//});
});

module.exports = router;
