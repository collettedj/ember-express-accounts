"use strict";

var _ = require('lodash');

var appRoleTemplateHash = {
	name: 'name${i}',
	description: 'description${i}'
};

function AppRolesRoutesTestData(models, appsTestData){
	this.dataTemplate = this.compileTemplates(appRoleTemplateHash);

	this._appsTestData = appsTestData;
	this.models = models;
	this.newModel = {
		"appRole": this.generateAppRole("N", 1)	
	};
	this.updateModel = {
		"appRole": this.generateAppRole("U", 1)
	};
}

require('./test-data.js').mixin(AppRolesRoutesTestData);

AppRolesRoutesTestData.prototype.generateAppRole = function(value, appId){
	var appRole = this.generateOne(this.dataTemplate, value);
	appRole.appId = appId;
	return appRole;
};

AppRolesRoutesTestData.prototype.generateAppRoles = function(numRecords, appId){
	var appRoles = this.generateData(this.dataTemplate, numRecords);
	_.forEach(appRoles, 
		function(appRole){
			appRole.appId = appId;
		}, 
		this);
	return appRoles;
};

AppRolesRoutesTestData.prototype.seedDatabase = function(numRecords){
	return this._appsTestData.seedDatabase(4)
		.spread(function(app1, app2, app3, app4){
			var seedData = _.flatten([
				this.generateAppRoles(4, app1.id),
				this.generateAppRoles(3, app2.id),
				this.generateAppRoles(2, app3.id),
				this.generateAppRoles(1, app4.id),
			]);
			return this.models.AppRole.bulkCreate(seedData, {returning: true});
		}.bind(this));
};

exports.createTestData = function(models){
	var appsTestData = require("./apps-routes-test-data").createTestData(models);
	return new AppRolesRoutesTestData(models, appsTestData);
} ;