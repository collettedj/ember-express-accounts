"use strict";

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var isAuthenticated = require('../passport/isAuthenticated');

var modelRoute = require('../routeHelpers/modelRoute.js')('AppRoleUser');
var utils = require('../routeHelpers/utils');

router.use(isAuthenticated);

var checkQueryKeys = function(validQueryKeys){
	return function(req, res, next){
		var hasEveryKey = _.every(Object.keys(req.query), function(key){
			return _.includes(validQueryKeys, key);
		});	
		if(hasEveryKey){
			next();
		}else{
			res.status(404).send("Invalid query for model");
		}

	};
};

/* GET apps listing. */
router.get('/', checkQueryKeys(['appUserId', 'appRoleId']), function(req, res) {
	var appUserId = req.query.appUserId;
	var appRoleId = req.query.appRoleId;
	var models = req.app.get('models');
	var query;

	if(!_.isEmpty(appUserId)){
		query = models.AppRoleUser.findAll({
			where: {appUserId:appUserId}
		});
	}
	else if (!_.isEmpty(appRoleId)){
		query = models.AppRoleUser.findAll({
			where: {appRoleId:appRoleId}
		});
	}

	if(!_.isEmpty(query)){
		query.then(function(appRoleUsers){
			res.json(modelRoute.results(appRoleUsers));
		});		
	}
});

utils.applyRoute(router, modelRoute.getOne);
utils.applyRoute(router, modelRoute.put);
utils.applyRoute(router, modelRoute.post);
utils.applyRoute(router, modelRoute.delete);

module.exports = router;
