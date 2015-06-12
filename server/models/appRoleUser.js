"use strict";

module.exports = function(sequelize, DataTypes) {
	var AppRoleUser = sequelize.define("AppRoleUser", {
		appRoleId: {type: DataTypes.INTEGER, unique: "unique1", allowNull: false},
		appUserId: {type: DataTypes.INTEGER, unique: "unique1", allowNull: false},
	}, 
	{
		classMethods: {
			associate: function(models) {
				AppRoleUser.belongsTo(models.AppRole, {
					foreignKey:'appRoleId'
				});

                AppRoleUser.belongsTo(models.AppUser, {
                    foreignKey:'appUserId'
                });                
			}
		},
        hooks: {
        }		
	});

	return AppRoleUser;
};


