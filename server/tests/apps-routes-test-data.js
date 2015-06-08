"use strict";

var getTemplateHash = {
	name: 'name${i}',
	description: 'description${i}'
};

function AppsRoutesTestData(models){
	this.dataTemplate = this.compileTemplates(getTemplateHash);

	this.models = models;
	this.newModel = {
		app: this.generateOne(this.dataTemplate, "N")
	};
	this.updateModel = {
		app: this.generateOne(this.dataTemplate, "U")
	};
}

require('./test-data.js').mixin(AppsRoutesTestData);

AppsRoutesTestData.prototype.seedDatabase = function(numRecords){
	var seedData = this.generateData(this.dataTemplate, numRecords);
	return this.models.App.bulkCreate(seedData);
};

exports.createTestData = function(models){
	return new AppsRoutesTestData(models);
} ;