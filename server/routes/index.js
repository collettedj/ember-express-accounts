"use strict";
var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);

module.exports = {
	useRoutes: function(app, passport){
		// app.use('/api/v1/auth', require('./authentication'));
		// app.use('/api/v1/users', require('./users'));
		// app.use('/api/v1/apps', require('./apps'));
		// app.use('/api/v1/appRoles', require('./appRoles'));
		// app.use('/api/v1/appUsers', require('./appUsers'));		

		fs.readdirSync(__dirname)
			.filter(function(file) {
			  	return (file.indexOf('.') !== 0) && (file !== basename);
			})
			.forEach(function(file) {
			    var basename = path.basename(file, '.js');
			    var router = require('./' + basename);
			    app.use('/api/v1/' + basename, router);
			});

	}
};