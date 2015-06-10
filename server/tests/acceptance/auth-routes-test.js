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


	});

});