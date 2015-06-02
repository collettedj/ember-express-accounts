"use strict";

var models = require("../models");
var fs = require('fs-extra');
var _ = require("lodash");
var chalk = require("chalk");
var dasherize = models.sequelize.Utils.inflection.dasherize;
var singularize =models.sequelize.Utils.inflection.singularize;
var pluralize =models.sequelize.Utils.inflection.pluralize;


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

function getHasManyInverseName(fkField){
	return _.trimRight(fkField, 'Id');
}

function getEmberModelName(modelName){
	return _.kebabCase(singularize(modelName));
}

function getEmberModelHasManyName(modelName){
	return _.camelCase(pluralize(modelName));
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
					getEmberModelName:getEmberModelName,
					getEmberModelHasManyName:getEmberModelHasManyName,
					getHasManyInverseName: getHasManyInverseName
				}
			});
			var result = compileTemplate({model:model});
			var outputFile = '../client/app/models/' + modelDashName + '.js';
			var customOutputFile = '../client/app/models/custom/' + modelDashName + '.js';

			fs.writeFile(outputFile, result, function(err){
				if(err){
					console.log(chalk.bold.red("Error writing file: " + err));
				}
				console.log("file created: " + chalk.bold.green(outputFile))

				fs.exists(customOutputFile, function(exists){
					if(!exists){
						fs.copy('./generator/templates/customClientModel.js', customOutputFile, function(err){
							if(err){
								console.log(chalk.bold.red("Could not create custom model for" + modelName));	
							}else{
								console.log("file created: " + chalk.bold.green(customOutputFile))								
							}
							
						});
					}
				});

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