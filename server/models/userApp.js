"use strict";
//var _ = require('lodash');
//var modelUtils = require('../modelHelpers/utils');
//var appRoleNameNumReg = /Role([0-9]+)$/;

module.exports = function(sequelize, DataTypes) {
	var UserApp = sequelize.define("UserApp", {
        userId: {type:DataTypes.INTEGER, unique: "unique1", allowNull: false},
		appId: {type:DataTypes.INTEGER, unique: "unique1", allowNull: false},
		name: {type: DataTypes.STRING},
		description: DataTypes.STRING,
	}, 
	{
		classMethods: {
			associate: function(models) {
				UserApp.belongsTo(models.App, {
					foreignKey:'appId'
				});

				UserApp.belongsTo(models.User, {
					foreignKey:'userId'
				});				
			}
		},

	});

	return UserApp;
};


