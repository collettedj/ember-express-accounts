"use strict";

module.exports = function(sequelize, DataTypes) {
  var App = sequelize.define("App", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        App.hasMany(models.AppRole);
      }
    }
  });

  return App;
};


