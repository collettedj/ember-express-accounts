"use strict";

var test = require('../testUtils');
var assert = require("chai").assert;
var app = require("../../app");
var models = app.get('models');
var request = require("supertest").agent(app);
var testData = require("./generators/app-role-users-routes-test-data").createTestData(models);

test.afterAll(models);

describe("routes", function(){

	describe("appRoleUsers Http GET tests", function(){
		before(function(done){
			test.cleanAndGenerateDb(models, testData, done);
	  	});

	  	test.testNotExist(request, "AppRoleUser");
	  	test.testBadQuery(request, "AppRoleUser");	  	

		it("GET One /appRoleUsers", function(done){
			request.get('/api/v1/appRoleUsers/1').expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.notStrictEqual(jsonRes['app-role-user'], undefined);
					assert.equal(jsonRes['app-role-user'].id, 1);
					done();
				});
		});	  	

		it("GET Many /appRoleUsers By App Role Id", function(done){
			request.get('/api/v1/appRoleUsers').query({appRoleId:1}).expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					var appRoleUsers = jsonRes['app-role-users'];

					assert.notStrictEqual(appRoleUsers, undefined);
					assert.equal(appRoleUsers.length, 10);
					assert.equal(appRoleUsers[0].appRoleId, 1);
					assert.equal(appRoleUsers[0].appUserId, 1);
					assert.equal(appRoleUsers[1].appRoleId, 1);
					assert.equal(appRoleUsers[1].appUserId, 2);
					assert.equal(appRoleUsers[2].appRoleId, 1);
					assert.equal(appRoleUsers[2].appUserId, 3);					
					done();
				});
		});

		it("GET Many /appRoleUsers By App User Id", function(done){
			request.get('/api/v1/appRoleUsers').query({appUserId:1}).expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					var appRoleUsers = jsonRes['app-role-users'];

					assert.notStrictEqual(appRoleUsers, undefined);
					assert.equal(appRoleUsers.length, 4);
					assert.equal(appRoleUsers[0].appRoleId, 1);
					assert.equal(appRoleUsers[0].appUserId, 1);
					assert.equal(appRoleUsers[1].appRoleId, 2);
					assert.equal(appRoleUsers[1].appUserId, 1);
					assert.equal(appRoleUsers[2].appRoleId, 3);
					assert.equal(appRoleUsers[2].appUserId, 1);					
					done();
				});
		});	  	

	});

	describe("appRoleUsers route", function(){

		beforeEach(function(done){
			test.cleanAndGenerateDb(models, testData, done);
	  	});


	  	it("Total Rows Generated", function(done){
	  		models.AppRoleUser.findAll()
	  			.then(function(appRoleUsers){
	  				assert.equal(appRoleUsers.length, 22);
	  				done();
	  			})
	  			.catch(done);
	  	});

		it("POST /appRoleUsers", function(done){
			request.post('/api/v1/appRoleUsers').send(testData.newModel).expect(200)
				.end(function(err,res){
					var appRoleUser = res.body["app-role-user"];
					assert.equal(null, err);
					assert.equal(appRoleUser.appRoleId, testData.newModel.appRoleUser.appRoleId);
					assert.equal(appRoleUser.appUserId, testData.newModel.appRoleUser.appUserId);

					models.AppRoleUser.findById(appRoleUser.id)
						.then(function(insertedAppUser){
							assert.equal(insertedAppUser.appRoleId, testData.newModel.appRoleUser.appRoleId);
							assert.equal(insertedAppUser.appUserId, testData.newModel.appRoleUser.appUserId);
							done();
						}, done);
				});
		});
		
		it("PUT /appRoleUsers", function(done){
			request.put('/api/v1/appRoleUsers/1').send(testData.updateModel).expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.equal(jsonRes["app-role-user"].appRoleId, testData.updateModel.appRoleUser.appRoleId);
					assert.equal(jsonRes["app-role-user"].appUserId, testData.updateModel.appRoleUser.appUserId);
					done();
				});
		});

		it("DELETE /appRoleUsers", function(done){
			request.delete('/api/v1/appRoleUsers/1').expect(204)
				.end(function(err,res){
					assert.equal(null, err);
					done();
				});
		});

	});

});