"use strict";

var test = require('../testUtils');
var assert = require("chai").assert;
var app = require("../../app");
var models = app.get('models');
var request = require("supertest").agent(app);
var testData = require("./generators/app-roles-routes-test-data").createTestData(models);

test.afterAll(models);

describe("routes", function(){

  	describe("appRoles Http GET tests", function(){
		before(function(done){
			test.cleanAndGenerateDb(models, testData, done);
	  	});

	  	test.testNotExist(request, "AppRole");
  		test.testBadQuery(request, "AppRole");

		it("GET One /appRoles", function(done){
			request.get('/api/v1/appRoles/1').expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.notStrictEqual(jsonRes['app-role'], undefined);
					assert.equal(jsonRes['app-role'].id, 1);
					done();
				});
		});	  	


		it("GET Many /appRoles", function(done){
			request.get('/api/v1/appRoles').query({appId:1}).expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					var appRoles = jsonRes['app-roles'];

					assert.notStrictEqual(appRoles, undefined);
					assert.equal(appRoles.length, 4);
					assert.equal(appRoles[0].name, "name1");
					done();
				});
		});	  		
  	});


	describe("appRoles tests", function(){

		beforeEach(function(done){
			test.cleanAndGenerateDb(models, testData, done);
	  	});

	  	it("Total Rows Generated", function(done){
	  		models.AppRole.findAll()
	  			.then(function(appRoles){
	  				assert.equal(appRoles.length, 10);
	  				done();
	  			})
	  			.catch(done);
	  	});		

		it("POST /appRoles", function(done){
			request.post('/api/v1/appRoles').send(testData.newModel).expect(200)
				.end(function(err,res){
					var app = res.body["app-role"];
					assert.equal(null, err);
					assert.equal(app.name, "Role1");
					assert.equal(app.description, testData.newModel.appRole.description);

					models.AppRole.findById(app.id)
						.then(function(insertedApp){
							assert.equal(insertedApp.name, "Role1");
							assert.equal(insertedApp.description, testData.newModel.appRole.description);
							done();
						}, done);
				});
		});
		
		it("PUT /appRoles", function(done){
			request.put('/api/v1/appRoles/1').send(testData.updateModel).expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.equal(jsonRes["app-role"].name, testData.updateModel.appRole.name);
					assert.equal(jsonRes["app-role"].description, testData.updateModel.appRole.description);
					done();
				});
		});

		it("Delete /appRoles", function(done){
			request.delete('/api/v1/appRoles/1').expect(204)
				.end(function(err,res){
					assert.equal(null, err);
					done();
				});
		});

	});

});