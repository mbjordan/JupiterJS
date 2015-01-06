module.exports = function(grunt) {

    grunt.initConfig({
        jasmine_node: {
            task_name: {
                options: {
                    coverage: {},
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
                src: ['jupiter.js']
            }
        },
        coveralls: {
            options: {
                src: 'coverage/lcov.info',
                force: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-jasmine-node-coverage');
    grunt.loadNpmTasks('grunt-coveralls');

    grunt.registerTask('test', ['jasmine_node', 'coveralls']);
};
