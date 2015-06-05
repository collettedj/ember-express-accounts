'use strict';

var fs        = require('fs');
var path      = require('path');
var debug     = require('debug')('server:db');
var Sequelize = require('sequelize');
var setLogger = function(config){
    if(config.logging !== false){
        config.logging = debug;
    }
    return config;
};

module.exports = {};
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = setLogger(require(__dirname + '/../config/config.json')[env]);
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
