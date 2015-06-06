
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



	describe("apps route", function(){
		var appsSeedData = [{
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
			}];


		beforeEach(function(done){
			console.log('got here');
			var promise = test.cleanDb(models)
				.then(function(){
					return models.App.bulkCreate(appsSeedData);
				})

			test.finish(promise, done);
	  	});

	  	afterEach(function(){
	  		//models.sequelize.close();
	  	})


		it("GET /apps", function(done){
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
		});

		it("POST /apps", function(done){
	 		var newApp = {
	 			app: {
	 				name: "new app", 
	 				description: "this is the new app", 
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

					models.App.findById(app.id)
						.then(function(insertedApp){
							assert.equal(insertedApp.name, "App1");
							assert.equal(insertedApp.description, newApp.app.description);
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

			request(app)
				.put('/api/v1/apps/1')
				.send(newApp)
				.expect(200)
				.end(function(err,res){
					assert.equal(null, err);
					var jsonRes = JSON.parse(res.text);
					assert.equal(jsonRes.app.description, "this is the updated object");
					done();
				});
		});

		it("Delete /apps", function(done){
			request(app)
				.delete('/api/v1/apps/1')
				.expect(204)
				.end(function(err,res){
					assert.equal(null, err);
					//var jsonRes = JSON.parse(res.text);
					//assert.equal(jsonRes.app.description, "this is the updated object");
					done();
				});
		});

	});

});