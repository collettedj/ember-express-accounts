
var test = require('./testUtils');
var assert = require("assert");
var chalk = require("chalk");
var request = require("supertest");
var utils = require("../modelHelpers/utils.js");
var app = require("../app");
var models = app.get('models');

after(function(done){
	models.sequelize.close();
	done();
});


describe("routes", function(){
	beforeEach(function(done){
		
		models.sequelize.sync({force: true, logging: false})
		.then(function () {
			done();
		})
		.catch(function(err){
			console.log(chalk.red(err));	
			done();
		});
  	});

  	afterEach(function(){
  		//models.sequelize.close();
  	})

	describe("user route", function(){
		it("GET /apps", function(done){
			models.App.bulkCreate([{
					name: "name1",
					description: "description1"				
				},{
					name: "name2",
					description: "description2"				
				},{
					name: "name3",
					description: "description3"				
				},{
					name: "name4",
					description: "description4"				
				}])
				.then(function(){
					request(app)
						.get('/api/v1/apps')
						.expect(200)
						.end(function(err,res){
							assert.equal(null, err);
							var jsonRes = JSON.parse(res.text);
							assert.notStrictEqual(jsonRes.apps, undefined);
							assert.equal(jsonRes.apps.length, 4);
							done();
						});
				})
		});

	});

	describe("user route 2", function(){
		it("do something", function(){
	 		assert.equal(1, 1);
		});

	});
});