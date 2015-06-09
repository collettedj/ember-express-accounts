"use strict";

var _ = require('lodash');
var Promise = require('sequelize').Promise;

var appUserTemplateHash = {
	appId: 1,
	userId: 1
};

function AppUsersRoutesTestData(models, appsTestData, usersTestData){
	this._appsTestData = appsTestData;
	this._usersTestsData = usersTestData;

	this.dataTemplate = this.compileTemplates(appUserTemplateHash);
	this.models = models;
	this.newModel = {
		"appUser": this.generateAppUser(4, 4)	
	};
	this.updateModel = {
		"appUser": this.generateAppUser(1, 1)
	};
}

require('./test-data.js').mixin(AppUsersRoutesTestData);

AppUsersRoutesTestData.prototype.generateAppUser = function(appId, userId){
	var appUser = this.generateOne(this.dataTemplate, null);
	appUser.appId = appId;
	appUser.userId = userId;
	return appUser;
};

AppUsersRoutesTestData.prototype.generateAppUsers = function(appId, userIds){
	var numRecords = userIds.length;
	var appUsers = this.generateData(this.dataTemplate, numRecords);
	_.forEach(appUsers, function(appUser, index){
			appUser.appId = appId;
			appUser.userId = userIds[index];
		});
	return appUsers;
};

AppUsersRoutesTestData.prototype.seedDatabase = function(numRecords){
	var self = this;
	return Promise.props({
		users: self._usersTestsData.seedDatabase(4),
		apps: self._appsTestData.seedDatabase(4)
	})
	.then(function(result){
		var appIds = _.pluck(result.apps, 'id');
		var userIds = _.pluck(result.users, 'id');
		var seedData = _.flatten([
			self.generateAppUsers(appIds[0], userIds),
			self.generateAppUsers(appIds[1], _.dropRight(userIds, 1)),
			self.generateAppUsers(appIds[2], _.dropRight(userIds, 2)),
			self.generateAppUsers(appIds[3], _.dropRight(userIds, 3)),
		]);
		return self.models.AppUser.bulkCreate(seedData, {returning: true});
	});
};

exports.createTestData = function(models){
	var appsTestData = require("./apps-routes-test-data").createTestData(models);
	var usersTestData = require("./users-routes-test-data").createTestData(models);
	return new AppUsersRoutesTestData(models, appsTestData, usersTestData);
};