"use strict";
var getTemplateHash = {
	username: 'username${i}',
	password: 'password${i}',
	email: 'email${i}',
	firstName: 'firstName${i}',
	lastName: 'lasteName${i}',		
};

var newModel = {
	user: {
		username: 'usernameN',
		password: 'passwordN',
		email: 'email1N',
		firstName: 'firstNameN',
		lastName: 'lasteNameN',		
	}
};

var updateModel = {
	user: {
		username: 'usernameU',
		password: 'passwordU',
		email: 'email1U',
		firstName: 'firstNameU',
		lastName: 'lasteNameU',	
	}
};


function UsersRoutesTestData(models){
	this.getTemplate = this.compileTemplates(getTemplateHash);

	this.models = models;
	this.newModel = newModel;
	this.updateModel = updateModel;
}

require('./test-data.js').mixin(UsersRoutesTestData);

UsersRoutesTestData.prototype.seedDatabase = function(numRecords){
	var seedData = this.generateData(this.getTemplate, numRecords);	
	return this.models.User.bulkCreate(seedData);
};

exports.createTestData = function(models){
	return new UsersRoutesTestData(models);
} ;