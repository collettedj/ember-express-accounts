"use strict";

var getTemplateHash = {
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

function AppsRoutesTestData(models){
	this.getTemplate = this.compileTemplates(getTemplateHash);

	this.models = models;
	this.newModel = newModel;
	this.updateModel = updateModel;
}

require('./test-data.js').mixin(AppsRoutesTestData);

AppsRoutesTestData.prototype.seedDatabase = function(numRecords){
	var seedData = this.generateData(this.getTemplate, numRecords);
	return this.models.App.bulkCreate(seedData);
};

exports.createTestData = function(models){
	return new AppsRoutesTestData(models);
} ;