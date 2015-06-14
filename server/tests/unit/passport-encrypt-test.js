"use strict";
var assert = require("chai").assert;
var encrypt = require("../../passport/encrypt");

describe("passport encrypt", function(){
	it("createHash should match compareHash", function(){
		var password = "mypassword";
		var passwordHash = encrypt.createHashSync(password);
		assert.ok(encrypt.compareHashSync(password, passwordHash));
	});
});