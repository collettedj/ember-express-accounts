"use strict";

var express = require('express');
var router = express.Router();
var isAuthenticated = require('../passport/isAuthenticated');

var modelRoute = require('../routeHelpers/modelRoute.js')('App');
var utils = require('../routeHelpers/utils');

router.use(isAuthenticated);

/* GET apps listing. */
router.get('/', modelRoute.checkQueryKeys([]), function(req, res) {
	try{
		var models = req.app.get('models');
		var apps = models.App.findAll()
			.then(function(apps){
				res.json(modelRoute.results(apps));
			})
			.catch(function(err){
				console.log(err);
			});
	}
	catch(err){
		console.log(err);
		res.sendStatus(500);
	}
});

utils.applyRoute(router, modelRoute.getOne);
utils.applyRoute(router, modelRoute.put);
utils.applyRoute(router, modelRoute.post);
utils.applyRoute(router, modelRoute.delete);

module.exports = router;
