"use strict";

var models = require("../models");
var _ = require("lodash");

module.exports = {
	generateClientModel: function(modelName){
		return models[modelName];
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