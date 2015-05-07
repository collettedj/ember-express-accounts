var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: { type: String, default: '' },
  lastname: { type: String, default: '' },
  email: { type: String, default: '', index: { unique: true } },
  username: { type: String, default: '' },
});

module.exports = mongoose.model('user', userSchema);


