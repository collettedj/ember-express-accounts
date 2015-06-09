"use strict";
var getTemplateHash = {
	username: 'username${i}',
	password: 'password${i}',
	email: 'email${i}',
	firstName: 'firstName${i}',
	lastName: 'lasteName${i}',		
};

function UsersRoutesTestData(models){
	this.dataTemplate = this.compileTemplates(getTemplateHash);

	this.models = models;
	this.newModel = {
		user: this.generateOne(this.dataTemplate, "N")	
	};
	this.updateModel = {
		user: this.generateOne(this.dataTemplate, "U")
	};
}

require('./test-data.js').mixin(UsersRoutesTestData);

UsersRoutesTestData.prototype.seedDatabase = function(numRecords){
	var seedData = this.generateData(this.dataTemplate, numRecords);	
	return this.models.User.bulkCreate(seedData, {returning: true});
};

exports.createTestData = function(models){
	return new UsersRoutesTestData(models);
} ;