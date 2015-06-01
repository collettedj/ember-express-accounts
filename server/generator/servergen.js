#! /usr/bin/env node

var program = require('commander');
var modelReader = require('./modelReader');

program
	.version('0.0.1')
	.option('-m, --client-model [model]', 'Add an ember model to the client side project based on the server model')
	.parse(process.argv);

if(program.clientModel){
	modelReader.generateClientModel(program.clientModel);
}

