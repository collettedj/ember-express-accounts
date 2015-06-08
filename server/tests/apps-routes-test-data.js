"use strict";

var _ = require('lodash');
_.templateSettings.interpolate = /[$]{([\s\S]+?)}/g;

var seedRow = {
	name: 'name${i}',
	description: 'description${i}'
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

var seedRowTemplates = null;

function createSeedRowTemplates(){
	if(seedRowTemplates === null){
	 	seedRowTemplates = {};
	 	for(var prop in seedRow){
	 		if(seedRow.hasOwnProperty(prop)){
	 			seedRowTemplates[prop] = _.template(seedRow[prop]);
	 		}
	 	}	
	}
}

function generateData(numRecords){
 	var seedData = [];
 	createSeedRowTemplates();
 	for (var i = 0; i < numRecords; i+=1) {
 		var newSeedRow = {};
 		for(var prop in seedRowTemplates){
 			if(seedRowTemplates.hasOwnProperty(prop)){
 				newSeedRow[prop] = seedRowTemplates[prop]({i:i+1});
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