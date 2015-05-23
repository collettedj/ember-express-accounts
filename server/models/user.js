"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    testField1: DataTypes.STRING,
    testField2: DataTypes.STRING,
    testField3: DataTypes.STRING,
    testField4: DataTypes.STRING,    
    testField5: DataTypes.STRING,
  }, {
    classMethods: {
      // associate: function(models) {
      //   Task.belongsTo(models.User);
      // }
    }
  });

  return User;
};


