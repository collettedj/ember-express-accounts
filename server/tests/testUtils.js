process.env.NODE_ENV = 'test';
var chalk = require('chalk');

module.exports = {
	cleanDb: function(models){
		return models.sequelize.sync({force: true, logging: false})
	}, 

	finish: function(promise, done){
		promise.then(function(){
			done();
		})
		.catch(function(err){
			test.logError(err);
			done();
		});
	},

	logError: function(message){
		console.log(chalk.red(message));
	}
};