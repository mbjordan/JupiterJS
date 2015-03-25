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
        }
    });

    grunt.loadNpmTasks('grunt-jasmine-node-coverage');
    grunt.loadNpmTasks('grunt-coveralls');

    grunt.registerTask('test', ['jasmine_node:jupiter', 'coveralls:jupiter']);
};
