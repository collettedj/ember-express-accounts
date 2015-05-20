/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
	isProduction = EmberApp.env() === 'production';

var app = new EmberApp();

// if ( !isProduction ) { 
// 	// app.import( app.bowerDirectory + '/sinonjs/sinon.js', { type: 'test' } );
// 	// app.import( app.bowerDirectory + '/sinon-qunit/lib/sinon-qunit.js', { type: 'test' } );
// 	app.import('bower_components/jquery-mockjax/jquery.mockjax.js', { type: 'test' } );
// }

app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', {
  destDir: 'assets'
});

app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {
  destDir: 'fonts'
});

app.import('bower_components/bootstrap/dist/css/bootstrap.css');

app.import('bower_components/bootstrap/dist/js/bootstrap.js');

app.import('bower_components/underscore/underscore.js');





// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

module.exports = app.toTree();
