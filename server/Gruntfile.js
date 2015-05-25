"use strict";


module.exports = function(grunt) {

  var jshintFiles = ['Gruntfile.js', 'routes/**/*.js', 'models/**/*.js', 'passport/**/*.js'];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options:{
        jshintrc:true, 
        //reporter: require('jshint-stylish')
      },
      
      all: jshintFiles
    }, 

    watch: {

      // for scripts, run jshint and uglify
      scripts: {
        files: jshintFiles,
        tasks: ['jshint']
      }
    },    

    nodemon: {
      script: './bin/www',
      options: {
        nodeArgs: ['--debug'],

        callback: function(nodemon){
          nodemon.on('log', function(event){
            console.log(event.colour);          
          });
        }
      }
    },

    concurrent: {
      tasks: ['nodemon', 'jshint', 'watch'],
      options: {
        logConcurrentOutput: true
      }      
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  // Default task(s).
  grunt.registerTask('default', ['concurrent']);

  grunt.registerTask('default', '', function() {
      var taskList = [
          'concurrent',
          'jshint',
          'nodemon',
          'watch'
      ];
      grunt.task.run(taskList);
  });  

};