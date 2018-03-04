var gulp = require('gulp');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');

var config = {
	dist: 'dist/',
	imgIn: 'images/**/*.{jpg,jpeg,png,gif}',
	jsIn: 'js/**/*.js',
	cssIn: 'css/**/*.css',
	cssOut: 'dist/css/',
	cssOutName: 'style.min.css',
  sassIn: 'scss/**/*.scss',
  sassOut: 'dist/css/',
  sassOutName: 'style-sass.css',
	jsOut: 'dist/js/',
	jsOutName: 'script.min.js',
	imgOut: 'dist/images/'
};

gulp.task('reload', function() {
  browserSync.reload();
});

gulp.task('serve', ['sass'], function() {
  browserSync({
    server: './',
    open:false
  });

  gulp.watch(['index.html', config.jsIn], ['reload']);
  gulp.watch(config.jsIn, ['js']);
  gulp.watch(config.sassIn, ['sass']);
});

gulp.task('css', function() {
  return gulp.src(config.cssIn)
  	.pipe(sourcemaps.init())
  	.pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(concat(config.cssOutName))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.cssOut));
});


gulp.task('sass', function() {
  browserSync.notify("Sass compiling...");
  
  return gulp.src(config.sassIn)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(concat(config.sassOutName))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.sassOut))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src(config.jsIn)
  	.pipe(sourcemaps.init())
    .pipe(concat(config.jsOutName))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.jsOut));
});

gulp.task('img', function() {
  return gulp.src(config.imgIn)
    .pipe(imagemin())
    .pipe(gulp.dest(config.imgOut));
});