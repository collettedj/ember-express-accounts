"use strict";
var assert = require("chai").assert;
var utils = require("../../modelHelpers/utils.js");

describe("model helper utils", function(){
	it("get max number should get maximum number + 1", function(){
		var roleNames = [
			"Role3",
			"Role6",
			"Role9"
		];
 		var appRoleNameNumReg = /Role([0-9]+)$/;
 		var maxAppRoleNumber = utils.getMaxNumber(appRoleNameNumReg, roleNames);
 		assert.equal(10, maxAppRoleNumber);
	});
});