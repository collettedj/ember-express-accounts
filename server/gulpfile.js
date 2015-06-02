"use strict";

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var stylish = require('jshint-stylish');

gulp.task('default', function() {
  // place code for your default task here
});

var jshintFiles = ['gulpfile.js', 'routes/**/*.js', 'models/**/*.js', 'passport/**/*.js', 'routeHelpers/**/*.js'];

gulp.task('lint', function() {
  return gulp.src(jshintFiles)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
}); 

gulp.task('default', function () {
  nodemon({ script: './bin/www.js',
        ext: 'html js',
        tasks: ['lint'],
        execMap: {'js':'node --harmony --debug'}
    })
    .on('restart', function () {
      console.log('restarted!');
    });
});