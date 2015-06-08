"use strict";
process.env.NODE_ENV = 'test';
var debug = require('debug');
var logDb = debug("tests:db");
var logRoute = debug("tests:route");
var chalk = require('chalk');
//var afterAllDefined = false;

var test = 
{
	afterAll: function(models){
		after(function(){
			models.sequelize.close();
			test.logDb('the database has been closed');
		});		
		test.afterAll = function(){};
	},

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

	logDb: logDb,
	logRoute: logRoute,

	logError: function(message){
		console.log(chalk.red(message));
	}
};

module.exports = test;