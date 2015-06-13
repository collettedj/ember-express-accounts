"use strict";

module.exports = function(sequelize, DataTypes) {
	var PasswordHistory = sequelize.define("PasswordHistory", {
		userId: {type:DataTypes.INTEGER, unique: "unique1", allowNull: false},
		password: {type:DataTypes.STRING, unique: "unique1", allowNull: false},
	}, 
	{
		classMethods: {
			associate: function(models) {
				PasswordHistory.belongsTo(models.User, {
					foreignKey:'userId'
				});
			}
		}
	});
	return PasswordHistory;
};


