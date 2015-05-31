"use strict";

var _ = require('lodash');

module.exports = {
	getMaxNumber: function(numRegex, names){
	    var numbers = _(names)
	    .map(function(name){
	        var nameNumStr = _.last(numRegex.exec(name));
	        return nameNumStr;
	    })
	    .filter(function(nameNumStr){
	        return !!nameNumStr;
	    })
	    .map(function(nameNumStr){
	        return _.parseInt(nameNumStr);
	    })
	    .value();
	    return Math.max(_.max(numbers), 0) + 1;
	}
};
