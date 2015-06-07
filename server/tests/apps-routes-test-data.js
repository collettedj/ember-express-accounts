"use strict";
var appsSeedData = [
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


function AppsRoutesTestData(models){
	this.models = models;
}

AppsRoutesTestData.prototype.seedDatabase = function(){
	return this.models.App.bulkCreate(appsSeedData);
};

exports.createTestData = function(models){
	return new AppsRoutesTestData(models);
} ;