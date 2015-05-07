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
	var newUser = new UserModel(req.body.user);
	newUser
		.save(function(err){
			if(err){
				res.status(500).json(err);
			}
		}).then(function(user){
			res.json({user:user});
		});
});

router.put('/:userId', function(req, res){
	var userId = req.params.userId;
	UserModel.findByIdAndUpdate(userId, {$set:req.body.user}, function(err, updatedUser){
		if(err){
			throw new Error(err);
		}
		res.json({user:updatedUser});
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
