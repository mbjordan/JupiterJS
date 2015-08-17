module.exports = function(grunt) {

    grunt.initConfig({
        jasmine_node: {
            jupiter: {
                options: {
                    coverage: {
                        reportFile: 'coverage.json',
                        savePath: 'coverage',
                        report: ['lcov']
                    },
                    forceExit: true,
                    match: '.',
                    matchAll: false,
                    specFolders: ['test'],
                    extensions: 'js',
                    specNameMatcher: 'spec',
                    captureExceptions: true,
                    junitreport: {
                        report: false
                    }
                },
                src: ['src/jupiter.js']
            }
        },
        coveralls: {
            jupiter: {
                src: 'coverage/lcov.info',
                force: true
            }
        },
        uglify: {
            jupiter: {
                src: 'src/jupiter.js',
                dest: 'dist/jupiter.min.js',
                options:{
                    banner: [
                        '/**',
                        ' * JupiterJS - 1.3.1-dev',
                        ' * https://github.com/mbjordan/JupiterJS',
                        ' * MIT License (http://honyovk.com/mit.txt).',
                        ' */',
                        ';'
                    ].join('\n')
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jasmine-node-coverage');
    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // The coveralls report task is hard coded in package.json
    grunt.registerTask('test', 'jasmine_node:jupiter');
    grunt.registerTask('min', 'uglify:jupiter');
};
