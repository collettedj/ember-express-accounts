"use strict";

var _ = require('lodash');
// var appsSeedData = [
// 	{
// 		name: "name1",
// 		description: "description1"				
// 	},
// 	{
// 		name: "name2",
// 		description: "description2"				
// 	},
// 	{
// 		name: "name3",
// 		description: "description3"				
// 	},
// 	{
// 		name: "name4",
// 		description: "description4"				
// 	}
// ];



var seedRow = {
	name: "name",
	description: "description"
};

var newModel = {
	app: {
		name: "new app", 
		description: "this is the new app", 
	}
};

var updateModel = {
	app: {
		id: 1, 
		name: "updated name",
		description: "this is the updated object", 
	}
};

function generateData(numRecords){
 	var seedData = [];
 	for (var i = 0; i < numRecords; i+=1) {
 		var newSeedRow = _.clone(seedRow);
 		for(var prop in newSeedRow){
 			if(newSeedRow.hasOwnProperty(prop)){
 				newSeedRow[prop] = seedRow[prop] + i;
 			}
 		}
 		seedData.push(newSeedRow);
 	}
 	return seedData;
}


function AppsRoutesTestData(models){
	this.models = models;
	this.newModel = newModel;
	this.updateModel = updateModel;
}


AppsRoutesTestData.prototype.seedDatabase = function(numRecords){
	numRecords = numRecords || 4;
	var appsSeedData = generateData(numRecords);
	return this.models.App.bulkCreate(appsSeedData);
};

exports.createTestData = function(models){
	return new AppsRoutesTestData(models);
} ;