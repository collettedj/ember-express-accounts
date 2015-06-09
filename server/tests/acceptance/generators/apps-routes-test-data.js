"use strict";

var appSeedTemplateHash = {
	name: 'name${i}',
	description: 'description${i}'
};

function AppsRoutesTestData(models){
	this.dataTemplate = this.compileTemplates(appSeedTemplateHash);

	this.models = models;
	this.newModel = {
		app: this.generateApp("N")
	};
	this.updateModel = {
		app: this.generateApp("U")
	};
}

require('./test-data.js').mixin(AppsRoutesTestData);

AppsRoutesTestData.prototype.generateApp = function(value){
	return this.generateOne(this.dataTemplate, value);
};

AppsRoutesTestData.prototype.generateApps = function(numRecords){
	return this.generateData(this.dataTemplate, numRecords);
};

AppsRoutesTestData.prototype.seedDatabase = function(numRecords){
	var seedData = this.generateApps(numRecords);
	return this.models.App.bulkCreate(seedData, {returning: true});
};

exports.createTestData = function(models){
	return new AppsRoutesTestData(models);
} ;