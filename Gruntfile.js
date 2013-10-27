'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		qunit: {
			files: ['test/**/*.html']
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				},
			},
			uses_defaults: ['*.js'],
			with_overrides: {
				options: {
					curly: false,
					undef: true,
				},
				files: {
					src: ['*.js']
				},
			}
		},
		watch: {
			src: {
				files: ['<config:jshint.src.src>', "**.js" ],
				tasks: ['jshint:src', '']
			},
			//gruntfile: {
			//	files: '<config:jshint.gruntfile.src>',
			//	tasks: ['lint:gruntfile']
			//},
			//test: {
			//	files: '<config:jshint.test.src>',
			//	tasks: ['lint:test', 'qunit']
			//},
		}
	})

	// Default task.
	grunt.registerTask('default', ['lint', 'qunit', 'concat', 'min'])
	grunt.registerTask('watch', ['watch'])

};
