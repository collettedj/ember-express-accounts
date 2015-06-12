"use strict";
var _ = require('lodash');
var modelUtils = require('../modelHelpers/utils');
var appRoleNameNumReg = /Role([0-9]+)$/;

module.exports = function(sequelize, DataTypes) {
	var AppRole = sequelize.define("AppRole", {
		appId: {type:DataTypes.INTEGER, unique: "unique1", allowNull: false},
		name: {type: DataTypes.STRING, unique: "unique1"},
		description: DataTypes.STRING,
	}, 
	{
		classMethods: {
			associate: function(models) {
				AppRole.belongsTo(models.App, {
					foreignKey:'appId'
				});

                AppRole.hasMany(models.AppRoleUser, {
                    foreignKey:'appRoleId'
                });                
			}
		},
        hooks: {
            beforeCreate: function(appRoleModel, options, done){
                var appRoleName = appRoleModel.get('name');

                AppRole.findAll({
                    attributes:['name'],
                    where:{
                    	appId: appRoleModel.get('appId'),
                        name:{
                            $like:'Role%'
                        }
                    }
                })
                .then(function(appRoleModels){
                    var maxAppRoleNumber = modelUtils.getMaxNumber(appRoleNameNumReg, _.pluck(appRoleModels, "name"));
                    appRoleModel.set('name', 'Role' + maxAppRoleNumber);
                    done(null);
                })
                .catch(function(error){
                    done(error);    
                });

            }
        }		
	});

	return AppRole;
};


