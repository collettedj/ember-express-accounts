"use strict";
var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);

module.exports = {
	useRoutes: function(app, passport){
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