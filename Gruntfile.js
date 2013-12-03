'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configs
    pkg: grunt.file.readJSON('package.json'),
    dev: './public/dev',
    build: './public/build',
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib']
      },
      scripts: {
        files: ['<%= dev %>/js/*.js', '<%= dev %>/scss/*.scss'],
        tasks: ['webpack', 'sass']
      }
    },
    webpack: {
      dist: {
        entry: '<%= dev %>/js/main.js',
        output: {
          path: '<%= build %>/js/',
          filename: 'main.js'
        }
      }
    },
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          '<%= build %>/css/main.css': '<%= dev %>/scss/main.scss'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= build %>/js/main.js': ['<%= build %>/js/main.js']
        }
      }
    },
    jasmine_node: {
      projectRoot: '.',
      requirejs: false,
      forceExit: true
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-sass');

  // Default task.
  grunt.registerTask('default', ['jasmine_node', 'jshint', 'webpack', 'uglify', 'sass']);

};
