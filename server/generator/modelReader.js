"use strict";

var models = require("../models");
var fs = require('fs-extra');
var _ = require("lodash");
var chalk = require("chalk");
var dasherize = models.sequelize.Utils.inflection.dasherize;
var singularize =models.sequelize.Utils.inflection.singularize;


function getEmberType(sqlType){
	var emberType= sqlType;
	switch(sqlType.toUpperCase()){
		case 'INTEGER':
			emberType = "number";
			break;
		case 'STRING':
			emberType = "string";
			break;			
		case 'DATE':
			emberType = "date";
			break;
	}
	return emberType;
}

function getEmberAttrName(attr){
	var name = attr.field;
	if(!!attr.references && _.endsWith(name,'Id')){
		name = _.trimRight(name, 'Id');
	}
	return name;
}

function getEmberModelName(attr){
	return _.kebabCase(singularize(attr.references.model));
}


module.exports = {
	generateClientModel: function(modelName){
		var model = models[modelName];
		if(!model){
			console.log(chalk.bold.red("Could not find model " + modelName));
			return;
		}

		var modelDashName = _.kebabCase(modelName);
		fs.readFile('./generator/templates/clientModel.js', function(err, templateStr){
			if(err){
				console.log(err);
				return;
			}

			var compileTemplate = _.template(templateStr,{
				imports:{
					getEmberType:getEmberType,
					getEmberAttrName:getEmberAttrName,
					getEmberModelName:getEmberModelName
				}
			});
			var result = compileTemplate({model:model});
			var outputFile = '../client/app/models/' + modelDashName + '.js';

			fs.writeFile(outputFile, result, function(err){
				if(err){
					console.log(chalk.bold.red("Error writing file: " + err));
				}
				console.log("file created: " + chalk.bold.green(outputFile))
			})
		});
		//console.log(currentModel);

		// var compiled = _.template('module.exports = { \
		// 		<%= user %>: "this is a test", \
		// 	};');
		// var test = compiled({ 'user': 'fred' });
		// console.log(test);

		// for(var attr in currentModel.attributes){
		// 	console.log(attr);
		// }
	}
}