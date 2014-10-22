'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      libs: {
        src: [
          'public/js/libs/jquery-2.1.1.min.js',
          'public/js/libs/bootstrap.min.js',
          'public/js/libs/angular.js',
          'public/js/libs/angular-sanatize.js'
        ],

        dest: 'public/js/dist/libs.js'
      },

      build: {
        options: {
          separator: '\n\n',

          banner: grunt.file.read('public/js/partials/intro.js'),

          footer: grunt.file.read('public/js/partials/outro.js'),

          //Adds the file name in a comment before the module and properly tabs the code
          process: function(src, filepath) {
            return '  // Source: ' + filepath + '\n' +
              src.replace(/^/gm, '  ');
          }
        },

        src: [
          'public/js/modules/**/*-module.js',
          
          'public/js/plugins/**/*-module.js',

          'public/js/modules/**/*.js',

          'public/js/plugins/**/*.js',

          'public/js/app.js',
          
          '!public/js/dist/*'
        ],

        dest: 'public/js/dist/app.js'
      }
    },

    watch: {
      build: {
        files: ['public/js/**/*.js', '!public/js/libs/**/*.js', '!public/js/dist/*'],

        tasks: ['concat']
      }
    },

    nodemon: {
      dev: {
        script: 'app.js',

        options: {
          ext: 'js,json',

          ignore: ['node_modules/**', 'public/**']
        }
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },

      dev: {
        tasks: ['watch:build', 'nodemon:dev']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['concat']);
  grunt.registerTask('run', ['concurrent']);

};