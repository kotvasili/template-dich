var gulp = require('gulp');
var config = require('../config');
var critical = require('critical').stream;

gulp.task("critical", function(){
	return gulp.src([config.dest.html + "/**/*.html"])
			.pipe(critical({
				base: config.dest.html, 
				inline: true,
				minify: true,
				css: [config.dest.css + "/app.css"]
			}))
			.pipe(gulp.dest(config.dest.html));
});

gulp.task('critical:watch', function() {
	gulp.watch(config.dest.html + '/**/*.html', ['critical']);
});

