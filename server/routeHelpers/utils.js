"use strict";

module.exports = {
	lowerFirstLetter: function (string) {
	    return string.charAt(0).toLowerCase() + string.slice(1);
	},

	dasherize: function (string){
		return string.replace(/[A-Z]/g, function(char, index) {
	  		return (index !== 0 ? '-' : '') + char.toLowerCase();
		});
	},

	getModelRouteInfo: function(modelName){
		var modelDashName = this.dasherize(this.lowerFirstLetter(modelName));
		var modelDashNamePlural = modelDashName + "s";
		var paramName = this.lowerFirstLetter(modelName) + "Id";
		var routePath = "/:" + paramName;
		var emberModelName = this.lowerFirstLetter(modelName);
		var emberModelNamePlural = emberModelName + "s";
 
		return {
			dashName: modelDashName,
			dashNamePlural: modelDashNamePlural,
			paramName: paramName,
			routePath: routePath,
			emberModelName: emberModelName,
			emberModelNamePlural: emberModelNamePlural
		};
	},

	applyRoute: function(router, routeInfo){
		router[routeInfo.verb](routeInfo.route, routeInfo.handler);
	}
};
