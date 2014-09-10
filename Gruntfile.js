module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			fileChanged: {
				files: 
					[
						'config/*.js',
						'controllers/*.js',
						'models/*.js',
						'public/javascript/*.js',
						'app.js',
						'Gruntfile.js',
						'public/css/*.css'
					],
					tasks: [
						"jshint", "cssmin", "uglify"
					]
			}
		},
		cssmin: {
			combine: {
				files: {
					'public/release/css/layout.min.css' : [
						'public/css/bootstrap.min.css',
						'public/css/main.css'
					],
					'public/release/css/addShots.min.css': [
						'public/css/add.css'
					], 
					'public/release/css/practiceShots.min.css': [
						'public/css/practice.css'
					]
				}
			}
		},
		uglify: {
			js_files: {
				files: {
					'public/release/js/layout.min.js': [
						"public/javascript/jquery-2.1.1.min.js",
						"public/javascript/bootstrap.min.js",
						"public/javascript/underscore.min.js",
						"public/javascript/handlebars-v1.3.0.js",
						"public/javascript/main.js"
						],
					'public/release/js/addShots.min.js': [
						'public/javascript/serializeObject.min.js',
						'public/javascript/CSSPlugin.min.js',
						'public/javascript/EasePack.min.js',		
						'public/javascript/TweenLite.min.js',
						'public/javascript/add.js'		
					],
					'public/release/js/practiceShots.min.js': [
						"public/javascript/practice.js"
					]					
				}
			}
		},
		jshint: {
			all: [
				'Gruntfile.js',
				'config/*.js',
				'controllers/*.js',
				'models/*.js',
				'public/javascript/add.js',
				'public/javascript/main.js',
				'public/javascript/practice.js',
				'app.js'
			]
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
};

