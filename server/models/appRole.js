"use strict";

module.exports = function(sequelize, DataTypes) {
  var AppRole = sequelize.define("AppRole", {
    appId: {type:DataTypes.INTEGER, unique: "AK_AppRole_App_Role"},
    roleId: {type:DataTypes.INTEGER, unique: "AK_AppRole_App_Role"},
  }, {
    classMethods: {
      associate: function(models) {
        AppRole.belongsTo(models.App);
        AppRole.belongsTo(models.Role);
      }
    }
  });

  return AppRole;
};


