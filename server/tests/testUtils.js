process.env.NODE_ENV = 'test';
var debug = require('debug');
var chalk = require('chalk');

var test = 
{
	cleanDb: function(models){
		test.logDb('Database clean start');
		return models.sequelize.sync({force: true, logging: false})
			.then(function(){
				test.logDb('Database clean complete');
			})
	}, 

	logDb: debug('tests:db'),

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

module.exports = test;