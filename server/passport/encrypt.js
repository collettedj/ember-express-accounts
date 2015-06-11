"use strict";

var Promise = require('bluebird');
var bCrypt = require('bcrypt-nodejs');
var genSalt = Promise.promisify(bCrypt.genSalt);
var hash = Promise.promisify(bCrypt.hash);
var compare = Promise.promisify(bCrypt.compare);

module.exports = {
	// need to fix this to be asynchronous
 	createHashSync: function(value){
 		return bCrypt.hashSync(value, bCrypt.genSaltSync(10), null);
 	},

 	createHash: function(value){
 		return genSalt(10)
 			.then(function(salt){
 				return hash(value, salt, null);
 			});
 	},


 	// need to fix this to be asynchronous
 	compareHashSync: function(value, hash){
 		value = value || "";
 		return bCrypt.compareSync(value, hash);
 	},

 	compareHash: function(value, hash){
 		value = value || "";
 		return compare(value, hash);
 	}
};

