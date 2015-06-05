
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
		console.log('got here');
		test.cleanDb(models, done);
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

		it("POST /apps", function(done){
	 		var newApp = {
	 			app: {
	 				name: "new app", 
	 				description: "this is the new app", 
	 				createdAt: null, 
	 				updatedAt: null
	 			}
	 		};

			request(app)
				.post('/api/v1/apps')
				.send(newApp)
				.expect(200)
				.end(function(err,res){
					var app = res.body.app;
					assert.equal(null, err);
					assert.equal(app.name, "App1");
					assert.equal(app.description, newApp.app.description);

					models.App.findAll()
						.then(function(apps){
							var app0 = apps[0];
							assert.equal(apps.length, 1);
							assert.equal(app0.name, "App1");
							assert.equal(app0.description, newApp.app.description);
							done();
							
						}, done);

				
				});
		});
		
		it("PUT /apps", function(done){
	 		var newApp = {
	 			app: {
	 				id: 1, 
	 				description: "this is the updated object", 
	 			}
	 		};

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
				.then(function(insertedApps){
					request(app)
						.put('/api/v1/apps/' + insertedApps[0].id)
						.send(newApp)
						.expect(200)
						.end(function(err,res){
							assert.equal(null, err);
							// var jsonRes = JSON.parse(res.text);
							// assert.notStrictEqual(jsonRes.apps, undefined);
							// assert.equal(jsonRes.apps.length, 4);
							done();
						});
				})
		});

	});

});