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
        }
    });

    grunt.loadNpmTasks('grunt-jasmine-node-coverage');

    grunt.registerTask('test', 'jasmine_node');
};
