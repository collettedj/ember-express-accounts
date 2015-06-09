"use strict";


var inspect = require('util').inspect;
var chalk = require('chalk');
var error = chalk.yellow;
var utils = require('./utils');



function handleError(res, errorMessage){
	console.log(error(inspect(errorMessage), { showHidden: true, depth: 1 }));
	res.status(500).send('There was an error updating the model');
}

module.exports = function(modelName){
	var modelRouteInfo = utils.getModelRouteInfo(modelName);

	return {

		routeInfo: modelRouteInfo,

		result: function(resObj){
			var result = {};
			result[modelRouteInfo.dashName]  = resObj;
			return result;
		},

		results: function(resObj){
			var result = {};
			result[modelRouteInfo.dashNamePlural]  = resObj;
			return result;			
		},

		getOne : {
			verb: 'get',
			route: modelRouteInfo.routePath,
			handler: function(req, res) {
				try{
					var models = req.app.get('models');
					var modelId = req.params[modelRouteInfo.paramName];
					models[modelName].findById(modelId)
					.then(function(oneModel){
						var result = {};
						result[modelRouteInfo.dashName] = oneModel;
						res.json(result);
					})
					.catch(function(error){
						handleError(res, error);
					});
				}
				catch(error){
					handleError(res, error);
				}
			}
		}, 

		put: {
			verb: 'put',
			route: modelRouteInfo.routePath,
			handler: function(req, res){
				try{
					var models = req.app.get('models');	
					var modelId = req.params[modelRouteInfo.paramName];
					var updates = req.body[modelRouteInfo.emberModelName];					
					models[modelName]
						.update(updates, {
							hooks: true,
							returning: true,
							validate: true,
							where: {id: modelId}
						})
						.then(function(updateInfo){
							var updatedModel = updateInfo[1][0];
							var result = {};
							var updatedModelJson = updatedModel.toJSON();
							delete updatedModelJson.password;
						
							result[modelRouteInfo.dashName] = updatedModelJson;
							res.json(result);						
						})
						.catch(function(error){
							handleError(res, error);
						});
				}
				catch(error){
					handleError(res, error);
				}
			}
		}, 

		post: {
			verb: 'post', 
			route: "/", 
			handler: function(req, res){
				try{
					var models = req.app.get('models');
					models[modelName].create(req.body[modelRouteInfo.emberModelName])
						.then(function(newApp){
							var result = {};
							result[modelRouteInfo.dashName] = newApp;
							res.json(result);
						})
						.catch(function(error){
							handleError(res, error);
						});
				}
				catch(error){
					handleError(res, error);
				}
			}
		},

		delete: {
			verb: 'delete', 
			route: modelRouteInfo.routePath,
			handler: function(req, res){
				try{
					var models = req.app.get('models');	
					var modelId = req.params[modelRouteInfo.paramName];
					models[modelName].destroy({ where: { id: modelId}})
						.then(function(){
							res.sendStatus(204);
						})
						.catch(function(error){
							handleError(res, error);
						});
				}
				catch(error){
					handleError(res, error);
				}
			}
		}

	};
};