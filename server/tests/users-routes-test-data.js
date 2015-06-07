"use strict";
var usersSeedData = [
	{
		name: "name1",
		description: "description1"				
	},
	{
		name: "name2",
		description: "description2"				
	},
	{
		name: "name3",
		description: "description3"				
	},
	{
		name: "name4",
		description: "description4"				
	}
];


function UsersRoutesTestData(models){
	this.models = models;
}

UsersRoutesTestData.prototype.seedDatabase = function(){
	return this.models.App.bulkCreate(usersSeedData);
};

exports.createTestData = function(models){
	return new UsersRoutesTestData(models);
} ;