var models = require("../models");

process.env.NODE_ENV = 'development';
models.sequelize.sync({force: true}).then(function () {
	console.log('database sync complete');
});


