"use strict";
var _ = require('lodash');

function getMaxAppNumber(appNames){
    var appNameNumReg = /App([0-9]+)$/;
    var numbers = _(appNames)
    .map(function(appModel){
        var appName = _.last(appNameNumReg.exec(appModel.get('name')));
        return appName;
    })
    .filter(function(appNumber){
        return !!appNumber;
    })
    .map(function(appNumberString){
        return _.parseInt(appNumberString);
    })
    .value();

    return Math.max(_.max(numbers), 0) + 1;
}

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
                    var maxAppNumber = getMaxAppNumber(appModels);
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


