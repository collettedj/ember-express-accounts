"use strict";

var test = require('./testUtils');
var assert = require("assert");
var chalk = require("chalk");
var utils = require("../modelHelpers/utils.js");
var app = require("../app");
var models = app.get('models');
var request = require("supertest").agent(app);
var appsRoutesTestData = require("./apps-routes-test-data");
var testData = appsRoutesTestData.createTestData(models);


after(function(){
	models.sequelize.close();
	test.logDb('the database has been closed');
});

describe("routes", function(){
	describe("apps route", function(){

		beforeEach(function(done){
			test.testAndCleanDb(models, testData, done);
	  	});

		it("GET /apps", function(done){
			test.routeGet(request, '/api/v1/apps')
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.notStrictEqual(jsonRes.apps, undefined);
					assert.equal(jsonRes.apps.length, 4);
					done();
				});
		});

		it("POST /apps", function(done){
	 		var newApp = {
	 			app: {
	 				name: "new app", 
	 				description: "this is the new app", 
	 			}
	 		};

			test.routePost(request, '/api/v1/apps', newApp)
				.end(function(err,res){
					var app = res.body.app;
					assert.equal(null, err);
					assert.equal(app.name, "App1");
					assert.equal(app.description, newApp.app.description);

					models.App.findById(app.id)
						.then(function(insertedApp){
							assert.equal(insertedApp.name, "App1");
							assert.equal(insertedApp.description, newApp.app.description);
							done();
						}, done);
				});
		});
		
		it("PUT /apps", function(done){
	 		var appUpdate = {
	 			app: {
	 				id: 1, 
	 				description: "this is the updated object", 
	 			}
	 		};

			test.routePut(request,'/api/v1/apps/1', appUpdate)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.equal(jsonRes.app.description, "this is the updated object");
					done();
				});
		});

		it("Delete /apps", function(done){
			test.routeDelete(request,'/api/v1/apps/1')
				.end(function(err,res){
					assert.equal(null, err);
					done();
				});
		});

	});

});