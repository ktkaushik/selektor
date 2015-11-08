/**
 *
 */

module.exports = function(grunt) {

    var timestamp = new Date().getTime() + "";

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['src/*.js'],
                tasks: ['js-task']
            },
            css: {
                files: ['src/*.css'],
                tasks: ['css-task']
            }
        },
        uglify: {
            options: {
                mangle: true,
                preserveComments: 'some',
                banner: '/* <%= pkg.name %> - v<%= pkg.version %>*/\n'
            },
            my_target: {
                files: {
                    'dist/editor.min.js' : ['src/*.js']
                }
            }
        },
        cssmin: {
            options: {
              shorthandCompacting: false
           },
           plugin: {
              files: {
                 'dist/editor.min.css': ['src/editor.css']
              }
           }
        }
    });
    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    require('time-grunt')(grunt);
    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['uglify', 'cssmin']);
    grunt.registerTask('js-task', ['uglify']);
    grunt.registerTask('css-task', ['cssmin']);
};
