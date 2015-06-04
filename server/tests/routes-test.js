var assert = require("assert");
var chalk = require("chalk");
var utils = require("../modelHelpers/utils.js");
var models = require("../models");

describe("routes", function(){

	beforeEach(function(done){
		models.sequelize.sync({force: true, logging: false})
		.then(function () {
			console.log(chalk.green('	database sync complete'));
			models.sequelize.close();
			done();
		})
		.catch(function(err){
			console.log(chalk.red(err));	
			models.sequelize.close();
			done();
		});
  	});

	describe("user route", function(){
		it("do something", function(){
	 		assert.equal(1, 1);
		});

	});
});