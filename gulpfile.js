
const gulp = require('gulp');
var minifyHTML = require('gulp-minify-html'); // Minify HTML
var minifyCSS = require('gulp-minify-css'); // Minify the CSS
var minify = require('gulp-minify');
var stripDebug = require('gulp-strip-debug'); // Remove debugging stuffs
var concat = require('gulp-concat'); // Join all JS files together to save space
var uglify = require('gulp-uglify'); // Minify JavaScript

gulp.task('js', function() {
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
        .pipe(concat('nevergrind-online.min.js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});
gulp.task('default', function(){

});


gulp.task('default', ['']);