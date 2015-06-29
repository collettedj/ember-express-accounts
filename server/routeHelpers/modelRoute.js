"use strict";


var inspect = require('util').inspect;
var chalk = require('chalk');
var error = chalk.yellow;
var format = require('util').format;
var utils = require('./utils');
var Serializer = require('jsonapi-serializer');
var _ = require('lodash');




module.exports = function(modelName){
	var modelRouteInfo = utils.getModelRouteInfo(modelName);

	function handleError(res, errorMessage){
		console.log(error(inspect(errorMessage), { showHidden: true, depth: 1 }));
		res.status(500).send('There was an error updating the model');
	}

	function getIncludes(model){
		var keys = Object.keys(model.associations);
		var includes = _.map(keys,function(key){
			return _.kebabCase(key);
		});
		return includes;
	}

	function checkIncludes(req, res, next){
		var models = req.app.get('models');
	 	var seqModel = models[modelName];
	 	var validIncludes = getIncludes(seqModel);
		var queryIncludes = req.query.include;
		if(!!queryIncludes){
			queryIncludes = queryIncludes.split(',');
			var hasAllIncludes = _.every(queryIncludes, function(queryInclude){
				return _.includes(validIncludes, queryInclude);
			});	
			if(hasAllIncludes){
				req.includes = _.map(queryIncludes, function(include){
					return _.capitalize(_.camelCase(include));
				});
				return next();
			}else{
				return res.status(400).send(format("route for %s does not suppurt all includes", modelRouteInfo.emberModelNamePlural));
			}
		}
		else{
			return next();
		}
	}


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
			handlers: [
				checkIncludes,
				function(req, res) {
					try{
						var models = req.app.get('models');
						var seqModel = models[modelName];
						var includes = getIncludes(seqModel);
						var modelId = req.params[modelRouteInfo.paramName];
						var query = seqModel.findById(modelId);
						
						query = query.then(function(oneModel){
							var result = {
								oneModel: oneModel
							};							
							if(!!req.includes){
								_.forEach(req.includes, function(include){
									result[include] = oneModel['get' + include]();
								});
								return seqModel.sequelize.Promise.props(result);
							}
							else{
								return result;
							}
						});
						

						query
						.then(function(hash){
							return new Serializer(modelRouteInfo.dashName,hash.oneModel.dataValues, {
								topLevelLinks: {self: 'http://localhost:3000/api/v1/' + modelRouteInfo.dashNamePlural},
								dataLinks: {
									self: 'http://localhost:3000/api/v1/' + modelRouteInfo.dashNamePlural + '/' + hash.oneModel.id
								},
								attributes: _.without(Object.keys(seqModel.attributes), 'id')
							});
						})
						.then(function(result){
							result.data.type = modelRouteInfo.dashName;
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
			]
		}, 

		getMany: {
			verb: 'get',
			route: '/',
			handlers: [function(req, res) {
				try{
					var model = req.app.get('models')[modelName];
					var modelId = req.params[modelRouteInfo.paramName];
					model.findAll()
					.then(function(manyModels){

						var mappedModels = _.map(manyModels, function(oneModel){
							return oneModel.dataValues;
						});
						return new Serializer(modelRouteInfo.dashName,mappedModels, {
							topLevelLinks: {self: 'http://localhost:3000/api/v1/' + modelRouteInfo.dashNamePlural},
							dataLinks: {
							    self: function (selfModel) {
							      return 'http://localhost:3000/api/v1/' + modelRouteInfo.dashNamePlural + '/' + selfModel.id;
							    },							
							},
							attributes: _.without(Object.keys(model.attributes), 'id')
						});
					})
					.then(function(result){
						result.data.forEach(function(oneModel){
							oneModel.type = modelRouteInfo.dashName;
						});
						res.json(result);	
					})
					.catch(function(error){
						handleError(res, error);
					});
				}
				catch(error){
					handleError(res, error);
				}
			}]
		},

		put: {
			verb: 'put',
			route: modelRouteInfo.routePath,
			handlers: [function(req, res){
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
			}]
		}, 

		post: {
			verb: 'post', 
			route: "/", 
			handlers: [function(req, res){
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
			}]
		},

		delete: {
			verb: 'delete', 
			route: modelRouteInfo.routePath,
			handlers: [function(req, res){
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
			}]
		},

		checkQueryKeys:function(validQueryKeys){
			return function(req, res, next){
				var hasEveryKey = _.every(Object.keys(req.query), function(key){
					return _.includes(validQueryKeys, key);
				});	
				if(hasEveryKey){
					next();
				}else{
					res.status(404).send(format("Invalid query for %s", modelRouteInfo.emberModelNamePlural));
				}

			};
		},

	};
};