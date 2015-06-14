"use strict";
process.env.NODE_ENV = 'test';
var format = require('util').format;
var debug = require('debug');
var logDb = debug("tests:db");
var logRoute = debug("tests:route");
var chalk = require('chalk');
var assert = require("chai").assert;
var routeUtils = require('../routeHelpers/utils.js');


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

	cleanAndGenerateDb: function(models, testData, done){
		test.cleanDb(models)
			.then(function(){
				test.logDb('Database seed start');
				try{
					return testData.seedDatabase();	
				}
				catch(err){
					done(err);
				}
			}).then(function(){
				test.logDb('Database seed complete');
				done();
			})
			.catch(function(err){
				test.logError(err);
				done(err);
			});
	},

	logDb: logDb,
	logRoute: logRoute,

	logError: function(message){
		console.log(chalk.red(message));
	},

	testNotExist: function(request, modelName){
		var routeInfo = routeUtils.getModelRouteInfo(modelName);
		var emberModelNamePlural = routeInfo.emberModelNamePlural;
		it(format("GET One does not exist /%s", emberModelNamePlural), function(done){
			request.get(format('/api/v1/%s/999999', emberModelNamePlural)).expect(404)
				.end(function(err,res){
					assert.equal(null, err);
					assert.equal(res.text, format("%s not found", emberModelNamePlural));
					done();
				});
		});	  		
	},

	testBadQuery: function(request, modelName){
		var routeInfo = routeUtils.getModelRouteInfo(modelName);
		var emberModelNamePlural = routeInfo.emberModelNamePlural;		
		it(format("GET Many /%s bad query", emberModelNamePlural), function(done){
			request.get(format('/api/v1/%s', emberModelNamePlural)).query({wrongQueryParamForModel:1}).expect(404)
				.end(function(err,res){
					assert.equal(null, err);
					assert.equal(res.text, format("Invalid query for %s", emberModelNamePlural));
					done();
				});
		});
	}
		
};

module.exports = test;