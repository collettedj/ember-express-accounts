"use strict";

var test = require('../testUtils');
var assert = require("chai").assert;
var app = require("../../app");
var models = app.get('models');
var request = require("supertest").agent(app);
var appsRoutesTestData = require("./generators/apps-routes-test-data");
var testData = appsRoutesTestData.createTestData(models);

test.afterAll(models);

describe("routes", function(){
	describe("apps Http GET tests", function(){

		before(function(done){
			test.cleanAndGenerateDb(models, testData, done);
	  	});

	  	test.testNotExist(request, "App");
	  	test.testBadQuery(request, "App");

		it("GET One /apps", function(done){
			request.get('/api/v1/apps/1').expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.notStrictEqual(jsonRes.app, undefined);
					assert.equal(jsonRes.app.id, 1);
					done();
				});
		});	  	

		it("GET Many /apps", function(done){
			request.get('/api/v1/apps').expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.notStrictEqual(jsonRes.apps, undefined);
					assert.equal(jsonRes.apps.length, 4);
					assert.equal(jsonRes.apps[0].name, "name1");
					done();
				});
		});		
	});

	describe("apps route", function(){

		beforeEach(function(done){
			test.cleanAndGenerateDb(models, testData, done);
	  	});

		it("POST /apps", function(done){
			request.post('/api/v1/apps').send(testData.newModel).expect(200)
				.end(function(err,res){
					var app = res.body.app;
					assert.equal(null, err);
					assert.equal(app.name, "App1");
					assert.equal(app.description, testData.newModel.app.description);

					models.App.findById(app.id)
						.then(function(insertedApp){
							assert.equal(insertedApp.name, "App1");
							assert.equal(insertedApp.description, testData.newModel.app.description);
							done();
						}, done);
				});
		});
		
		it("PUT /apps", function(done){
			request.put('/api/v1/apps/1').send(testData.updateModel).expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.equal(jsonRes.app.name, testData.updateModel.app.name);
					assert.equal(jsonRes.app.description, testData.updateModel.app.description);
					done();
				});
		});

		it("Delete /apps", function(done){
			request.delete('/api/v1/apps/1').expect(204)
				.end(function(err,res){
					assert.equal(null, err);
					done();
				});
		});

	});

});