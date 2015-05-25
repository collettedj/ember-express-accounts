"use strict";

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var isAuthenticated = require('../passport/isAuthenticated');

router.use(isAuthenticated);

/* GET users listing. */
router.get('/', function(req, res) {
	var models = req.app.get('models');
	var users = models.User.findAll()
		.then(function(users){
			res.json({users:users});
		});
});

router.get('/:userId', function(req, res) {
	var models = req.app.get('models');
	var userId = req.params.userId;
	var user = models.User.findById(userId)
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
	var models = req.app.get('models');	
	var userId = req.params.userId;
	var userUpdates = req.body.user;

	models.User.findById(userId)
		.then(function(user){
			if(user){
				user.updateAttributes(userUpdates)
				.then(function(updatedUser){
					var updatedUserJson = updatedUser.toJSON();
					delete updatedUserJson.password;
					res.json({user:updatedUserJson});
				});

			}

		});

	
	// UserModel.findByIdAndUpdate(userId, {$set:req.body.user}, function(err, updatedUser){
	// 	if(err){
	// 		throw new Error(err);
	// 	}
	// 	var updatedUserJson = updatedUser.toJSON();
	// 	delete updatedUserJson.password;
	// 	res.json({user:updatedUserJson});
	// });
});

router.delete('/:userId', function(req, res){
	var models = req.app.get('models');	
	var userId = req.params.userId;
	models.User.destroy({ where: { id: userId}})
		.then(function(){
			res.sendStatus(204);
		})
		.catch(function(err){
			res.status(500).json(err);
		});
	// UserModel.remove({_id:userId}).exec(function(err){
	// 		if(err){
	// 			res.status(500).json(err);
	// 		}
	// 	})
	// 	.then(function(err){
	// 		res.sendStatus(204);
	// 	})
	//UserModel.findByIdAndUpdate(userId, {$set:req.body.user}, function(err, updatedUser){
	//	res.json({user:updatedUser});
	//});
});

module.exports = router;
