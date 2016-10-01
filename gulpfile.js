var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	changed = require('gulp-changed'),
	imagemin = require('gulp-imagemin'),
	minifyCSS = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync'),
	concatJS = require('gulp-concat'),
	concatCss = require('gulp-concat-css'),
	fileinclude = require('gulp-file-include');


var reload = browserSync.reload;
var SRC = './scripts/*.js';
var DEST = 'dist/scripts';



gulp.task('serve', function (){
	browserSync.init({
		server: "./dist/"
	});

	gulp.watch('./css/*.css', ['concatCss']);
	gulp.watch('./scripts/*.js', ['concatJS']);
	gulp.watch('./images/*', ['compress-images']);
	gulp.watch('./views/*.html', ['fileinclude']);
	gulp.watch(['./views/*.html', './css/*.css', './scripts/*.js', 'images/*/**']).on('change', reload);
});

gulp.task('fileinclude', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('concatCss', function () {
   	gulp.src('./css/*.css')
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-css', function(){
	gulp.src('/dist/css/bundle.css')
	.pipe(minifyCSS('bundle.min.css'))
	.pipe(gulp.dest('dist/css/'))
});

gulp.task('compress-images', function(){
		return gulp.src('images/*')
		.pipe(imagemin({progressive: true, optimizationlevel: 7}))
		.pipe(gulp.dest('dist/images/'));
});
gulp.task('concatJS', function (){
	 gulp.src(['./scripts/jquery-1.11.1.min.js', './scripts/jquery.themepunch.tools.min.js', './scripts/jquery.themepunch.revolution.min.js', './scripts/jquery.cubeportfolio.min.js', './scripts/jquery.mmenu.min.js', './scripts/jquery.sticky.js', './scripts/bootstrap.min.js', './scripts/moderniz.js', './scripts/owl.carousel.js', './scripts/app.js'])
	.pipe(concatJS('bundle.js'))
	.pipe(gulp.dest('dist/scripts'));
});

gulp.task('compressJS', function (){
	return gulp.src('./scripts/*')
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'));
});

gulp.task('changed', function(){
	return gulp.src(SRC)
	.pipe(changed(DEST))
	.pipe(gulp.dest(DEST));
});

gulp.task('jshint', function (){
	gulp.src('./scripts/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});



gulp.task('watch', function(){
	gulp.watch(SRC, ['concatCss', 'concatJS', 'compress-images', 'fileinclude']);
});

gulp.task('default', ['serve']);




