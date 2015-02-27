module.exports = function(grunt) {

    grunt.initConfig({
        jasmine_node: {
            jupiter_test: {
                options: {
                    coverage: {
                        reportFile: 'coverage.json',
                        savePath: 'coverage',
                        report: ['lcov']
                    },
                    forceExit: true,
                    match: '.',
                    matchAll: false,
                    specFolders: ['spec'],
                    extensions: 'js',
                    specNameMatcher: 'spec',
                    captureExceptions: true,
                    junitreport: {
                        report: false
                    }
                },
                src: ['jupiter.js', 'lib/type-of.js']
            }
        },
        coveralls: {
            jupiter_test: {
                src: 'coverage/lcov.info',
                force: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-jasmine-node-coverage');
    grunt.loadNpmTasks('grunt-coveralls');

    grunt.registerTask('jastest', 'jasmine_node:jupiter_test');
    grunt.registerTask('coverload', 'coveralls:jupiter_test');
};
