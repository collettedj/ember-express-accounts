"use strict";

var test = require('../testUtils');
var assert = require("chai").assert;
var app = require("../../app");
var models = app.get('models');
var request = require("supertest").agent(app);
var userRoutesTestData = require("./generators/users-routes-test-data");
var testData = userRoutesTestData.createTestData(models);

test.afterAll(models);

describe("routes", function(){
	describe("apps Http GET tests", function(){
		before(function(done){
			test.cleanAndGenerateDb(models, testData, done);
	  	});		

	  	test.testNotExist(request, "User");
	  	test.testBadQuery(request, "App");

		it("GET One /users", function(done){
			request.get('/api/v1/users/1').expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.notStrictEqual(jsonRes.user, undefined);
					assert.equal(jsonRes.user.id, 1);
					done();
				});
		});	  	

		it("GET Many /users", function(done){
			request.get('/api/v1/users').expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.notStrictEqual(jsonRes.users, undefined);
					assert.equal(jsonRes.users.length, 4);
					done();
				});
		});	  	
	});

	describe("users route", function(){

		beforeEach(function(done){
			test.cleanAndGenerateDb(models, testData, done);
	  	});

		it("PUT /users", function(done){
			request.put('/api/v1/users/1').send(testData.updateModel).expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.equal(jsonRes.user.username, "usernameU");
					assert.strictEqual(jsonRes.user.password, undefined);
					assert.equal(jsonRes.user.email, "emailU");
					assert.equal(jsonRes.user.firstName, "firstNameU");
					assert.equal(jsonRes.user.lastName, "lastNameU");
					done();
				});
		});

		it("Delete /users", function(done){
			request.delete('/api/v1/users/1').expect(204)
				.end(function(err,res){
					assert.equal(null, err);
					done();
				});
		});

	});

});