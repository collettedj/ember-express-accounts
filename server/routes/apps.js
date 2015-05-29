"use strict";

var express = require('express');
var router = express.Router();
var isAuthenticated = require('../passport/isAuthenticated');

var modelRoute = require('../routeHelpers/modelRoute.js')('App');
var utils = require('../routeHelpers/utils');

router.use(isAuthenticated);

/* GET apps listing. */
router.get('/', function(req, res) {
	var models = req.app.get('models');
	var apps = models.App.findAll()
		.then(function(apps){
			res.json({apps:apps});
		});
});

utils.applyRoute(router, modelRoute.getOne);
utils.applyRoute(router, modelRoute.put);
utils.applyRoute(router, modelRoute.post);
utils.applyRoute(router, modelRoute.delete);

module.exports = router;
