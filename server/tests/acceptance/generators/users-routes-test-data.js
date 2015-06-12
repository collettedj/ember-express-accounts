"use strict";

var _ = require('lodash');
var encrypt = require('../../../passport/encrypt');

var getTemplateHash = {
	username: 'username${i}',
	password: encrypt.createHashSync('password1'),
	email: 'email${i}',
	firstName: 'firstName${i}',
	lastName: 'lastName${i}',		
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

UsersRoutesTestData.prototype.generateUsers = function(numRecords){
	var users = this.generateData(this.dataTemplate, numRecords);
	_.forEach(users, function(user, index){
	});
	return users;
};


UsersRoutesTestData.prototype.seedDatabase = function(numRecords){
	var seedData = this.generateUsers(numRecords);	
	return this.models.User.bulkCreate(seedData, {returning: true});
};

exports.createTestData = function(models){
	return new UsersRoutesTestData(models);
} ;