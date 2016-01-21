var browserify = require('browserify'),
	parcelify = require('parcelify'),
	gulp = require('gulp'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	webserver = require('gulp-webserver'),
	buffer = require('vinyl-buffer'),
	source = require('vinyl-source-stream');

var prod = true;

gulp.task('dev', function () {
	prod = false;
});

gulp.task('build', function () {
	bundlejs();
	views();
});

gulp.task('serve', function() {
	gulp.src('./build')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('browserify', bundlejs);
function bundlejs() {
	var parcelifyDest = 'build/bundle.css';
	var b = browserify({
	        entries: './app/app.js',
	        debug: true
	    })

	parcelify(b, {
            bundles : {
  				style : parcelifyDest   // bundle `style` assets and output here
			}
    })
	b.bundle()
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(gulpif(prod, uglify({"mangle":false})))
	.pipe(gulp.dest('./build'));
}

gulp.task('views', views);
function views() {
	gulp.src(['./app/index.html', './app/app.js'])
		.pipe(gulp.dest('./build'));
}