"use strict";

var _ = require('lodash');
var Promise = require('sequelize').Promise;

var appRoleUserTemplateHash = {
	appRoleId: 1,
	appUserId: 1
};

function AppRoleUsersTestData(models, appRolesTestData, appUsersTestData){
	this._appRolesTestData = appRolesTestData;
	this._appUsersTestData = appUsersTestData;

	this.dataTemplate = this.compileTemplates(appRoleUserTemplateHash);
	this.models = models;
	this.newModel = {
		"appRoleUser": this.generateAppRoleUser(4, 4)	
	};
	this.updateModel = {
		"appRoleUser": this.generateAppRoleUser(1, 1)
	};
}

require('./test-data.js').mixin(AppRoleUsersTestData);

AppRoleUsersTestData.prototype.generateAppRoleUser = function(appRoleId, appUserId){
	var appRoleUser = this.generateOne(this.dataTemplate, null);
	appRoleUser.appRoleId = appRoleId;
	appRoleUser.appUserId = appUserId;
	return appRoleUser;
};

AppRoleUsersTestData.prototype.generateAppRoleUsers = function(appRoleId, appUserIds){
	var numRecords = appUserIds.length;
	var appRoleUsers = this.generateData(this.dataTemplate, numRecords);
	_.forEach(appRoleUsers, function(appRoleUser, index){
			appRoleUser.appRoleId = appRoleId;
			appRoleUser.appUserId = appUserIds[index];
		});
	return appRoleUsers;
};

AppRoleUsersTestData.prototype.seedDatabase = function(numRecords){
	var self = this;
	return self._appUsersTestData.seedDatabase(4)
	.then(function(appUsers){
		var appIds = _(appUsers).pluck('appId').uniq().value();
		var appRoles =_.flatten([
			self._appRolesTestData.generateAppRoles(4, appIds[0]),
			self._appRolesTestData.generateAppRoles(3, appIds[1]),
			self._appRolesTestData.generateAppRoles(2, appIds[2]),
			self._appRolesTestData.generateAppRoles(1, appIds[3]),
		]);
		return Promise.props({
				appUsers: appUsers,
				appRoles: self.models.AppRole.bulkCreate(appRoles, {returning: true})
		});
	})
	.then(function(result){
		var appUserIds = _.pluck(result.appUsers, 'id');
		var appRoleIds = _.pluck(result.appRoles, 'id');
		var seedData = _.flatten([
			self.generateAppRoleUsers(appRoleIds[0], appUserIds),
			self.generateAppRoleUsers(appRoleIds[1], _.dropRight(appUserIds, 3)),
			self.generateAppRoleUsers(appRoleIds[2], _.dropRight(appUserIds, 6)),
			self.generateAppRoleUsers(appRoleIds[3], _.dropRight(appUserIds, 9)),
		]);
		return self.models.AppRoleUser.bulkCreate(seedData, {returning: true});
	});
};

exports.createTestData = function(models){
	var appRolesTestData = require("./app-roles-routes-test-data").createTestData(models);
	var appUsersTestData = require("./app-users-routes-test-data").createTestData(models);
	return new AppRoleUsersTestData(models, appRolesTestData, appUsersTestData);
};