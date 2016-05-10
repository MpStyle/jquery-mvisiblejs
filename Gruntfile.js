module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            default: {
                files: [{src: ['typings/main/**/*.ts','src/mvisiblejs.ts'], dest: 'dist/jquery.mvisiblejs.js'}],
                options: {
                    sourceMap: false,
                    module: 'amd'
                }
            }
        },
        uglify: {
            default: {
                files: {
                    'dist/jquery.mvisiblejs.min.js': ['dist/jquery.mvisiblejs.js']
                }
            },
            options: {
                compress: {
                    drop_console: true
                },
                banner: '/* \n' +
                '* jQuery MVisibleJS - v<%= pkg.version %> \n' +
                '* On screen element library. \n' +
                '* https://github.com/MpStyle/jquery-mvisiblejs \n' +
                '* \n' +
                '* Powered by Michele Pagnin \n' +
                '* Licensed under a LGPL 3.0 license \n' +
                '* http://www.gnu.org/licenses/lgpl-3.0.html \n' +
                '*/ \n\n'
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', [
        'ts', 'uglify'
    ]);

};