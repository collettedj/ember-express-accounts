"use strict";

var express = require('express');
var router = express.Router();
var isAuthenticated = require('../passport/isAuthenticated');

var modelRoute = require('../routeHelpers/modelRoute.js')('AppRole');
var utils = require('../routeHelpers/utils');

router.use(isAuthenticated);

/* GET apps listing. */
router.get('/', modelRoute.checkQueryKeys(['appId']), function(req, res) {
	var appId = req.query.appId;
	var models = req.app.get('models');
	models.AppRole.findAll({
		where: {appId:appId}
	})
	.then(function(appRoles){
		res.json(modelRoute.results(appRoles));
	});
});

utils.applyRoute(router, modelRoute.getOne);
utils.applyRoute(router, modelRoute.put);
utils.applyRoute(router, modelRoute.post);
utils.applyRoute(router, modelRoute.delete);

module.exports = router;
