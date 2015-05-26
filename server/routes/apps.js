"use strict";

var express = require('express');
var router = express.Router();
var isAuthenticated = require('../passport/isAuthenticated');

router.use(isAuthenticated);

/* GET apps listing. */
router.get('/', function(req, res) {
	var models = req.app.get('models');
	var apps = models.App.findAll()
		.then(function(apps){
			res.json({apps:apps});
		});
});

router.get('/:appId', function(req, res) {
	var models = req.app.get('models');
	var appId = req.params.appId;
	var app = models.app.findById(appId)
		.then(function(app){
			res.json({app:app});
		});
});

router.post('/', function(req, res){
	var models = req.app.get('models');
	models.App.create(req.body.app)
		.then(function(newApp){
			res.json({app:newApp});
		})
		.catch(function(err){
			res.status(500).json(err);
		});
});


router.put('/:appId', function(req, res){
	var models = req.app.get('models');	
	var appId = req.params.appId;
	var appUpdates = req.body.app;

	models.App.findById(appId)
		.then(function(app){
			if(app){
				app.updateAttributes(appUpdates)
				.then(function(updatedapp){
					var updatedappJson = updatedapp.toJSON();
					delete updatedappJson.password;
					res.json({app:updatedappJson});
				});

			}

		});
});

router.delete('/:appId', function(req, res){
	var models = req.app.get('models');	
	var appId = req.params.appId;
	models.App.destroy({ where: { id: appId}})
		.then(function(){
			res.sendStatus(204);
		})
		.catch(function(err){
			res.status(500).json(err);
		});
});

module.exports = router;
