"use strict";

var isAuthenticated;

if(process.env.NODE_ENV === "test"){
	isAuthenticated = function (req, res, next) {
		return next();
	};
}else{
	isAuthenticated = function (req, res, next) {
		if (req.isAuthenticated()){
			return next();
		}
		res.sendStatus('401');
	};
}

module.exports = isAuthenticated;
