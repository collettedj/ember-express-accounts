"use strict";
var bCrypt = require('bcrypt-nodejs');

module.exports = {
 	createHash: function(value){
 		return bCrypt.hashSync(value, bCrypt.genSaltSync(10), null);
 	},

 	compareHash: function(value, hash){
 		value = value || "";
 		return bCrypt.compareSync(value, hash);
 	}
};

