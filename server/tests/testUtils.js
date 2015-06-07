"use strict";
process.env.NODE_ENV = 'test';
var debug = require('debug');
var chalk = require('chalk');

var test = 
{
	cleanDb: function(models){
		test.logDb('Database clean start');
		return models.sequelize.sync({force: true, logging: false})
			.then(function(){
				test.logDb('Database clean complete');
			});
	}, 

	testAndCleanDb: function(models, testData, done){
		test.cleanDb(models)
			.then(function(){
				test.logDb('Database seed start');
				return testData.seedDatabase();
			}).then(function(){
				test.logDb('Database seed complete');
				done();
			})
			.catch(function(err){
				test.logError(err);
				done();
			});
	},

	logDb: debug('tests:db'),

	routeGet: function(request, url){
		return request
			.get(url)
			.expect(200);
	},

	routePut: function(request, url, updateModel){
		return 	request.put(url)
				.send(updateModel)
				.expect(200);
	},

	routePost: function(request, url, newModel){
		return request.post(url)
			.send(newModel)
			.expect(200);
	},

	routeDelete: function(request, url){
		return request
			.delete(url)
			.expect(204);
	},


	logError: function(message){
		console.log(chalk.red(message));
	}
};

module.exports = test;