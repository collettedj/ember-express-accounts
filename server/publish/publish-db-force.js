var models = require("../models");
var chalk = require("chalk");

process.env.NODE_ENV = 'development';
models.sequelize.sync({force: true})
	.then(function () {
		console.log(chalk.green('database sync complete'));
		models.sequelize.close();
	})
	.catch(function(err){
		console.log(chalk.red(err));	
		models.sequelize.close();
	});


