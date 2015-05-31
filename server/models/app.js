"use strict";
var _ = require('lodash');
var modelUtils = require('../modelHelpers/utils');
var appNameNumReg = /App([0-9]+)$/;

module.exports = function(sequelize, DataTypes) {
    var App = sequelize.define("App", {
        name: {type: DataTypes.STRING, unique: "unique1"},
        description: DataTypes.STRING,
    }, 
    {
        classMethods: {
            associate: function(models) {
                App.hasMany(models.AppRole, {
                    foreignKey:'appId'
                });
            }
        }, 
        hooks: {
            beforeCreate: function(appModel, options, done){
                var appName = appModel.get('name');

                App.findAll({
                    attributes:['name'],
                    where:{
                        name:{
                            $like:'App%'
                        }
                    }
                })
                .then(function(appModels){
                    var maxAppNumber = modelUtils.getMaxNumber(appNameNumReg, _.pluck(appModels, "name"));
                    appModel.set('name', 'App' + maxAppNumber);
                    done(null);
                })
                .catch(function(error){
                    done(error);    
                });

            }
        }
    });
    return App;
};


