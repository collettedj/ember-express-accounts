"use strict";
var usersSeedData = [
	{
		username: 'username1',
		password: 'password1',
		email: 'email1',
		firstName: 'firstName1',
		lastName: 'lasteName1',			
	},
	{
		username: 'username2',
		password: 'password2',
		email: 'email2',
		firstName: 'firstName2',
		lastName: 'lasteName2',					
	},
	{
		username: 'username3',
		password: 'password3',
		email: 'email3',
		firstName: 'firstName3',
		lastName: 'lasteName3',				
	},
	{
		username: 'username4',
		password: 'password4',
		email: 'email14',
		firstName: 'firstName4',
		lastName: 'lasteName4',					
	}
];

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
	this.models = models;
	this.newModel = newModel;
	this.updateModel = updateModel;
}

UsersRoutesTestData.prototype.seedDatabase = function(){
	return this.models.User.bulkCreate(usersSeedData);
};

exports.createTestData = function(models){
	return new UsersRoutesTestData(models);
} ;