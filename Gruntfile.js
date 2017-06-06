// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {
   'use strict';

   var BUILD_JS_DIR  = 'dist/'

   // ===========================================================================
   // CONFIGURE GRUNT ===========================================================
   // ===========================================================================
   grunt.initConfig({

      // get the configuration info from package.json ----------------------------
      // this way we can use things like name and version (pkg.name)
      pkg: grunt.file.readJSON('package.json'),
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
         '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
         '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
         ' Licensed <%= pkg.license %> */\n',
      // all of our configuration will go here
      less: {
         build: {
            files: {
               'dist/videojs.markers.css': 'src/videojs.markers.less'
            }
         },
      },
      // configure cssmin to minify css files ------------------------------------
      cssmin: {
         options: {
            banner: '<%= banner %>'
         },
         build: {
            files: {
               'dist/videojs.markers.min.css': 'dist/videojs.markers.css'
            }
         }
      },
      concat: {
         options: {
            banner: '<%= banner %>',
            stripBanners: true
         },
         dist: {
            src: 'src/*.js',
            dest: 'dist/<%= pkg.name %>.js'
         }
      },
      babel: {
          options: {
            sourceMap: true,
            presets: ['es2015'],
            "plugins": [
              ["transform-es2015-modules-umd", {
                "globals": {
                  "video.js": "videojs"
                },
                "exactGlobals": true
              }],
              "transform-flow-strip-types",
              "syntax-trailing-function-commas"
            ]
          },
          dist: {
            src: 'dist/<%= pkg.name %>.js',
            dest: 'dist/<%= pkg.name %>.js',
          }
      },
      uglify: {
         options: {
            banner: '<%= banner %>'
         },
         dist: {
            src: '<%= concat.dist.dest %>',
            dest: 'dist/<%= pkg.name %>.min.js'
         }
      },
      watch: {
        scripts: {
          files: ['src/*.js'],
          tasks: ['compile'],
        }
      }
   });

   // ===========================================================================
   // LOAD GRUNT PLUGINS ========================================================
   // ===========================================================================
   // we can only load these if they are in our package.json
   // make sure you have run npm install so our app can find these
   grunt.loadNpmTasks('grunt-contrib-less');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-babel')

   // ===========================================================================
   // CREATE TASKS ==============================================================
   // ===========================================================================

   grunt.registerTask('css', ['less', 'cssmin']);
   grunt.registerTask('compile', ['css','concat', 'babel:dist', 'uglify'])

};
