"use strict";

var express = require('express');
var router = express.Router();
var isAuthenticated = require('../passport/isAuthenticated');

var modelRoute = require('../routeHelpers/modelRoute.js')('User');
var utils = require('../routeHelpers/utils');


router.use(isAuthenticated);

/* GET users listing. */
router.get('/', modelRoute.checkQueryKeys([]), function(req, res) {
	var models = req.app.get('models');
	var users = models.User.findAll()
		.then(function(users){
			res.json(modelRoute.results(users));
		});
});


utils.applyRoute(router, modelRoute.getOne);
utils.applyRoute(router, modelRoute.put);
utils.applyRoute(router, modelRoute.delete);

module.exports = router;
