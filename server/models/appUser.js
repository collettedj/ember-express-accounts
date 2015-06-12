"use strict";
//var _ = require('lodash');
//var modelUtils = require('../modelHelpers/utils');
//var appRoleNameNumReg = /Role([0-9]+)$/;

module.exports = function(sequelize, DataTypes) {
	var AppUser = sequelize.define("AppUser", {
        userId: {type:DataTypes.INTEGER, unique: "unique1", allowNull: false},
		appId: {type:DataTypes.INTEGER, unique: "unique1", allowNull: false},
	}, 
	{
		classMethods: {
			associate: function(models) {
				AppUser.belongsTo(models.App, {
					foreignKey:'appId'
				});

				AppUser.belongsTo(models.User, {
					foreignKey:'userId'
				});		

				AppUser.hasMany(models.AppRoleUser, {
                    foreignKey:'appRoleId'
                });   
			}
		},

	});

	return AppUser;
};


