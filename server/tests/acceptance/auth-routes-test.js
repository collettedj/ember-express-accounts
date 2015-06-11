"use strict";

var test = require('../testUtils');
var assert = require("assert");
var app = require("../../app");
var models = app.get('models');
var request = require("supertest").agent(app);
var userRoutesTestData = require("./generators/users-routes-test-data");
var testData = userRoutesTestData.createTestData(models);

test.afterAll(models);

describe("routes", function(){
	describe("auth route", function(){

		beforeEach(function(done){
			test.cleanAndGenerateDb(models, testData, done);
	  	});

		it("Login to website", function(done){
			request.post('/api/v1/auth/login')
			.send({username: "username1", password: "password1"})
				.expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					// var jsonRes = JSON.parse(res.text);
					// assert.notStrictEqual(jsonRes.user, undefined);
					// assert.equal(jsonRes.user.id, 1);
					done();
				});
		});	  	

		it("Register for an account", function(done){
			var registerInfo = {
					username:"user2",
					email:"user@email.com",
					password:"2wsx3edc@WSX#EDC",
					firstName:"John",
					lastName:"Doe",
				};

			request.post('/api/v1/auth/signup')
				.send(registerInfo)
				.expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.ok(jsonRes.id > 0);
					assert.equal(jsonRes.username, registerInfo.username);
					assert.equal(jsonRes.email, registerInfo.email);
					assert.equal(jsonRes.firstName, registerInfo.firstName);
					assert.equal(jsonRes.lastName, registerInfo.lastName);
					done();
				});
		});	  		

	


	});

});