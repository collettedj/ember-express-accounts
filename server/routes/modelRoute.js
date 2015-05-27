"use strict";

function lowerFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function dasherize(string){
	return string.replace(/[A-Z]/g, function(char, index) {
  		return (index !== 0 ? '-' : '') + char.toLowerCase();
	});
}

module.exports = function(modelName){
	var modelDashName = dasherize(lowerFirstLetter(modelName));
	var modelDashNamePlural = modelDashName + "s";
	var paramName = lowerFirstLetter(modelName) + "Id";
	var routePath = "/:" + paramName;

	return {
		getOne : function(router){
			router.get(routePath, function(req, res) {
				var models = req.app.get('models');
				var modelId = req.params[paramName];
				models[modelName].findById(modelId)
				.then(function(oneModel){
					var result = {};
					result[modelDashName] = oneModel;
					res.json(result);
				});
			});
		}, 

		put: function(router){
			router.put('/:userId', function(req, res){
				var models = req.app.get('models');	
				var modelId = req.params[paramName];
				var updates = req.body[modelDashName];

				models[modelName].findById(modelId)
				.then(function(modelToUpdate){
					if(modelToUpdate){
						modelToUpdate.updateAttributes(updates)
						.then(function(updatedModel){
							var result = {};
							var updatedModelJson = updatedModel.toJSON();
							delete updatedModelJson.password;
						
							result[modelDashName] = updatedModelJson;
							res.json(result);
						});
					}
				});
			});
		}
	};

};