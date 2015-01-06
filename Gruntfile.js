module.exports = function(grunt) {

	grunt.initConfig({
		jasmine_node: {
			jupiter_test: {
				options: {
					coverage: {},
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
			jupiter_test: {
				src: 'coverage/lcov.info'
			}
		}
	});

	grunt.loadNpmTasks('grunt-jasmine-node-coverage');
	grunt.loadNpmTasks('grunt-coveralls');

	grunt.registerTask('dotest', ['jasmine_node:jupiter_test', 'coveralls:jupiter_test']);
};
