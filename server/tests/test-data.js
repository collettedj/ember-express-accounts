"use strict";
var _ = require('lodash');

_.templateSettings.interpolate = /[$]{([\s\S]+?)}/g;

function TestData(){
}

TestData.prototype.compileTemplates = function(seedRow){
 	var seedRowTemplates = {};
 	for(var prop in seedRow){
 		if(seedRow.hasOwnProperty(prop)){
 			seedRowTemplates[prop] = _.template(seedRow[prop]);
 		}
 	}
 	return seedRowTemplates;
};

TestData.prototype.generateData = function(seedTemplate, numRecords){
 	var seedData = [];
 	numRecords = numRecords || 4;

 	for (var i = 0; i < numRecords; i+=1) {
 		var newSeedRow = {};
 		for(var prop in seedTemplate){
 			if(seedTemplate.hasOwnProperty(prop)){
 				newSeedRow[prop] = seedTemplate[prop]({i:i+1});
 			}
 		}
 		seedData.push(newSeedRow);
 	}
 	return seedData;
};

TestData.mixin = function(destObject){
	['generateData', 'compileTemplates'].forEach(function(property){
		destObject.prototype[property] = TestData.prototype[property];
	});
};

exports.mixin = TestData.mixin;

