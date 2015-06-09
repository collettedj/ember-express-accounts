"use strict";

var test = require('../testUtils');
var assert = require("assert");
var app = require("../../app");
var models = app.get('models');
var request = require("supertest").agent(app);
var testData = require("./generators/app-users-routes-test-data").createTestData(models);

test.afterAll(models);

describe("routes", function(){
	describe("appUsers route", function(){

		beforeEach(function(done){
			test.cleanAndGenerateDb(models, testData, done);
	  	});

	  	it("Total Rows Generated", function(done){
	  		models.AppUser.findAll()
	  			.then(function(appUsers){
	  				assert.equal(appUsers.length, 10);
	  				done();
	  			})
	  			.catch(done);
	  	});

		it("GET One /appUsers", function(done){
			request.get('/api/v1/appUsers/1').expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.notStrictEqual(jsonRes['app-user'], undefined);
					assert.equal(jsonRes['app-user'].id, 1);
					done();
				});
		});	  	

		it("GET Many /appUsers By App Id", function(done){
			request.get('/api/v1/appUsers').query({appId:1}).expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					var appUsers = jsonRes['app-users'];

					assert.notStrictEqual(appUsers, undefined);
					assert.equal(appUsers.length, 4);
					assert.equal(appUsers[0].appId, 1);
					assert.equal(appUsers[0].userId, 1);
					assert.equal(appUsers[1].appId, 1);
					assert.equal(appUsers[1].userId, 2);
					done();
				});
		});

		it("GET Many /appUsers By User Id", function(done){
			request.get('/api/v1/appUsers').query({userId:2}).expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					var appUsers = jsonRes['app-users'];

					assert.notStrictEqual(appUsers, undefined);
					assert.equal(appUsers.length, 3);
					assert.equal(appUsers[0].appId, 1);
					assert.equal(appUsers[0].userId, 2);
					assert.equal(appUsers[1].appId, 2);
					assert.equal(appUsers[1].userId, 2);
					done();
				});
		});		

		// it("POST /appUsers", function(done){
		// 	request.post('/api/v1/appUsers').send(testData.newModel).expect(200)
		// 		.end(function(err,res){
		// 			var app = res.body["app-role"];
		// 			assert.equal(null, err);
		// 			assert.equal(app.name, "Role1");
		// 			assert.equal(app.description, testData.newModel.appRole.description);

		// 			models.AppRole.findById(app.id)
		// 				.then(function(insertedApp){
		// 					assert.equal(insertedApp.name, "Role1");
		// 					assert.equal(insertedApp.description, testData.newModel.appRole.description);
		// 					done();
		// 				}, done);
		// 		});
		// });
		
		// it("PUT /appUsers", function(done){
		// 	request.put('/api/v1/appUsers/1').send(testData.updateModel).expect(200)
		// 		.end(function(err,res){
		// 			assert.equal(null, err);
		// 			var jsonRes = JSON.parse(res.text);
		// 			assert.equal(jsonRes["app-role"].name, testData.updateModel.appRole.name);
		// 			assert.equal(jsonRes["app-role"].description, testData.updateModel.appRole.description);
		// 			done();
		// 		});
		// });

		// it("Delete /appUsers", function(done){
		// 	request.delete('/api/v1/appUsers/1').expect(204)
		// 		.end(function(err,res){
		// 			assert.equal(null, err);
		// 			done();
		// 		});
		// });

	});

});