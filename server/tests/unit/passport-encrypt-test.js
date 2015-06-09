"use strict";
var assert = require("assert");
var encrypt = require("../../passport/encrypt");

describe("passport encrypt", function(){
	it("createHash should match compareHash", function(){
		var password = "mypassword";
		var passwordHash = encrypt.createHash(password);
		assert.ok(encrypt.compareHash(password, passwordHash));
	});
});