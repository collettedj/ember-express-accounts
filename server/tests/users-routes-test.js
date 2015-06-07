"use strict";

var test = require('./testUtils');
var assert = require("assert");
var chalk = require("chalk");
var utils = require("../modelHelpers/utils.js");
var app = require("../app");
var models = app.get('models');
var request = require("supertest").agent(app);
var usersRoutesTestData = require("./users-routes-test-data");
var testData = usersRoutesTestData.createTestData(models);


after(function(){
	models.sequelize.close();
	test.logDb('the database has been closed');
});

describe("routes", function(){
	describe("users route", function(){

		beforeEach(function beforeEachUserTest(done){
			test.testAndCleanDb(models, testData, done);
	  	});

		it("GET /users", function getUsers(done){
			test.routeGet(request, '/api/v1/users')
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.notStrictEqual(jsonRes.users, undefined);
					assert.equal(jsonRes.users.length, 4);
					done();
				});
		});

		it("POST /users", function postUsers(done){
	 		var newApp = {
	 			app: {
	 				name: "new app", 
	 				description: "this is the new app", 
	 			}
	 		};

			test.routePost(request, '/api/v1/users', newApp)
				.end(function(err,res){
					var app = res.body.app;
					assert.equal(null, err);
					assert.equal(app.name, "App1");
					assert.equal(app.description, newApp.app.description);

					model.User.findById(app.id)
						.then(function(insertedApp){
							assert.equal(insertedApp.name, "App1");
							assert.equal(insertedApp.description, newApp.app.description);
							done();
						}, done);
				});
		});
		
		it("PUT /users", function putUsers(done){
	 		var appUpdate = {
	 			app: {
	 				id: 1, 
	 				description: "this is the updated object", 
	 			}
	 		};

			test.routePut(request,'/api/v1/users/1', appUpdate)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.equal(jsonRes.app.description, "this is the updated object");
					done();
				});
		});

		it("Delete /users", function deleteUsers(done){
			test.routeDelete(request,'/api/v1/users/1')
				.end(function(err,res){
					assert.equal(null, err);
					done();
				});
		});

	});

});