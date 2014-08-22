var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var webpack = require('gulp-webpack');
var gulpConfig = require('./gulp.config');

// Tasks
gulp.task('default', ['hint', 'scripts', 'styles', 'images', 'html']);

// JS packaging
gulp.task('scripts', function() {
	return gulp.src(gulpConfig.scripts.paths.entry)
		.pipe(webpack(gulpConfig.webpack))
		.pipe(gulp.dest(gulpConfig.scripts.paths.output.dev))
		.pipe(connect.reload())
		.pipe(uglify())
		.pipe(gulp.dest(gulpConfig.scripts.paths.output.prod));
});

gulp.task('hint', function() {
	return gulp.src(gulpConfig.scripts.paths.all)
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'));
});

gulp.task('styles', function() {
	return gulp.src(gulpConfig.styles.paths.entry)
		.pipe(sass())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest(gulpConfig.styles.paths.output.dev))
		.pipe(connect.reload())
		.pipe(sass())
		.pipe(minifycss())
		.pipe(gulp.dest(gulpConfig.styles.paths.output.prod));
});

gulp.task('images', function() {
	return gulp.src(gulpConfig.images.paths.all)
		.pipe(gulp.dest(gulpConfig.images.paths.output.dev))
		.pipe(connect.reload())
		.pipe(imagemin({
			optimizationLevel: gulpConfig.images.compression,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(gulpConfig.images.paths.output.prod));
});

gulp.task('html', function() {
	return gulp.src(gulpConfig.html.paths.entry)
		.pipe(gulp.dest(gulpConfig.html.paths.output.dev))
		.pipe(connect.reload())
		.pipe(gulp.dest(gulpConfig.html.paths.output.prod));
});

gulp.task('clean', function() {
	return gulp.src(['./build/dev', './build/prod'], {
			read: false
		})
		.pipe(clean());
});

gulp.task('watch', ['default'], function() {
	gulp.watch(gulpConfig.scripts.paths.all, ['scripts']);
	gulp.watch(gulpConfig.styles.paths.all, ['styles']);
	gulp.watch(gulpConfig.html.paths.entry, ['html']);
	gulp.watch(gulpConfig.images.paths.all, ['images']);
	connect.server({
		port: gulpConfig.connect.port,
		root: './build/dev',
		livereload: true
	});
});