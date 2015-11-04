module.exports = function (grunt) {
   grunt.initConfig({
      browserify: {
         dist: {
            options: {
               transform: [
                  ["babelify", {
                     loose: "all"
                  }]
               ]
            },
            files: {
               // if the source file has an extension of es6 then
               // we change the name of the source file accordingly.
               // The result file's extension is always .js
               "dist/scripts/app.js": ["src/scripts/app.js"]
            }
         }
      },
	   
	  uglify: {
			dist: {
				files: {
					'dist/scripts/app.min.js': ['dist/scripts/app.js']
				}
			}
	  },
	   
	  cssmin: {
		   dist: {
			  files: {
				 'dist/css/style.min.css': ['src/css/**/*.css']
			  }
		  }
	  },
	   
      watch: {
         scripts: {
            files: ["./modules/*.js"],
            tasks: ["browserify"]
         }
      }
   });

   grunt.loadNpmTasks("grunt-browserify");
   grunt.loadNpmTasks("grunt-contrib-uglify");
   grunt.loadNpmTasks("grunt-contrib-cssmin");
   grunt.loadNpmTasks("grunt-contrib-watch");

   grunt.registerTask("default", ["watch"]);
   grunt.registerTask("build", ["browserify", "uglify", "cssmin"]);
  
};

//grunt build