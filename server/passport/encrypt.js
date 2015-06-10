"use strict";
var bCrypt = require('bcrypt-nodejs');

module.exports = {
	// need to fix this to be asynchronous
 	createHash: function(value){
 		return bCrypt.hashSync(value, bCrypt.genSaltSync(10), null);
 	},

 	// need to fix this to be asynchronous
 	compareHash: function(value, hash){
 		value = value || "";
 		return bCrypt.compareSync(value, hash);
 	}
};
