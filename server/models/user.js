var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String
});

module.exports = mongoose.model('user', userSchema);


