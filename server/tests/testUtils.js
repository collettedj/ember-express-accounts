var chalk = require('chalk');

module.exports = {
	cleanDb: function(models, done){
		models.sequelize.sync({force: true, logging: false})
		.then(function () {
			done();
		})
		.catch(function(err){
			console.log(chalk.red(err));	
			done();
		});
	}
};