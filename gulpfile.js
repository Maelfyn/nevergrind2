
const gulp = require('gulp');
// var minifyHTML = require('gulp-minify-html'); // Minify HTML
var cleanCSS = require('gulp-clean-css'); // Minify the CSS
// var minify = require('gulp-minify');
var stripDebug = require('gulp-strip-debug'); // Remove debugging stuffs
var concat = require('gulp-concat'); // Join all JS files together to save space
var uglify = require('gulp-uglify'); // Minify JavaScript
var rename = require('gulp-rename');

gulp.task('minify-js', function() {
    gulp.src([
            './js/beginWrap.js',
            './js/init.js',
            './js/create.js',
            './js/g.js',
            './js/env.js',
            './js/my.js',
            './js/dom.js',
            './js/modal.js',
            './js/video.js',
            './js/audio.js',
            './js/game.js',
            './js/title.js',
            './js/events.js',
            './js/socket.js',
            './js/chat.js',
            './js/payment.js',
            './js/endWrap.js'
        ])
        .pipe(concat('nevergrind-online.js'))
        .pipe(gulp.dest('./js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(rename('nevergrind-online.min.js'))
        .pipe(gulp.dest('./js'));
});

gulp.task('minify-css', function(){
    return gulp.src([
            './css/ng2.css'
        ])
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('ng2.min.css'))
        .pipe(gulp.dest('./css'));
});


gulp.task('default', ['minify-css, minify-js']);