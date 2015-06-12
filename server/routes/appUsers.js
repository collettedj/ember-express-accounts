"use strict";

var express = require('express');
var _ = require('lodash');
var router = express.Router();
var isAuthenticated = require('../passport/isAuthenticated');

var modelRoute = require('../routeHelpers/modelRoute.js')('AppUser');
var utils = require('../routeHelpers/utils');

router.use(isAuthenticated);

/* GET apps listing. */
router.get('/', modelRoute.checkQueryKeys(['appId', 'userId']),  function(req, res) {
	var appId = req.query.appId;
	var userId = req.query.userId;
	var models = req.app.get('models');
	var query;

	if(!_.isEmpty(appId)){
		query = models.AppUser.findAll({
			where: {appId:appId}
		});
	}
	else if (!_.isEmpty(userId)){
		query = models.AppUser.findAll({
			where: {userId:userId}
		});
	}

	if(!_.isEmpty(query)){
		query.then(function(appUsers){
			res.json(modelRoute.results(appUsers));
		});		
	}

});

utils.applyRoute(router, modelRoute.getOne);
utils.applyRoute(router, modelRoute.put);
utils.applyRoute(router, modelRoute.post);
utils.applyRoute(router, modelRoute.delete);

module.exports = router;
