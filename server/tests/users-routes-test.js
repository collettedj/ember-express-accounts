"use strict";

var test = require('./testUtils');
var assert = require("assert");
var app = require("../app");
var models = app.get('models');
var request = require("supertest").agent(app);
var appsRoutesTestData = require("./users-routes-test-data");
var testData = appsRoutesTestData.createTestData(models);

test.afterAll(models);

describe("routes", function(){
	describe("users route", function(){

		beforeEach(function(done){
			test.cleanAndGenerateDb(models, testData, 4, done);
	  	});

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

		it("PUT /users", function(done){
			request.put('/api/v1/users/1').send(testData.updateModel).expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.equal(jsonRes.user.username, "usernameU");
					assert.strictEqual(jsonRes.user.password, undefined);
					assert.equal(jsonRes.user.email, "emailU");
					assert.equal(jsonRes.user.firstName, "firstNameU");
					assert.equal(jsonRes.user.lastName, "lasteNameU");
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