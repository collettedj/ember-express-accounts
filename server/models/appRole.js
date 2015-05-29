"use strict";

module.exports = function(sequelize, DataTypes) {
  var AppRole = sequelize.define("AppRole", {
      appId: {type:DataTypes.INTEGER, unique: "unique1"},
      name: {type: DataTypes.STRING, unique: "unique1"},
      description: DataTypes.STRING,
    }, 
    {
      classMethods: {
        associate: function(models) {
          AppRole.belongsTo(models.App);
        }
      }
    });

  return AppRole;
};


