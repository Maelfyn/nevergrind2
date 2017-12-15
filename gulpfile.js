
const gulp = require('gulp');
// var minifyHTML = require('gulp-minify-html'); // Minify HTML
var cleanCSS = require('gulp-clean-css'); // Minify the CSS
var stripDebug = require('gulp-strip-debug'); // Remove debugging stuffs
var concat = require('gulp-concat'); // Join all JS files together to save space
var uglify = require('gulp-uglify'); // Minify JavaScript
var rename = require('gulp-rename');
var imagemin = require('imagemin');
var imageminPngquant = require('imagemin-pngquant');

gulp.task('minify-ng-classic-js', function(){
// classic NG
	gulp.src([
		'./classic/scripts/beginWrap.js',
		'./classic/scripts/functions4.js',
		'./classic/scripts/core.js',
		'./classic/scripts/battle.js',
		'./classic/scripts/skills.js',
		'./classic/scripts/monsters.js',
		'./classic/scripts/quests.js',
		'./classic/scripts/town.js',
		'./classic/scripts/items.js',
		'./classic/scripts/ui.js',
		'./classic/scripts/endWrap.js'
	])
		.pipe(concat('nevergrind.js'))
		.pipe(gulp.dest('./classic/scripts'))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(rename('nevergrind.min.js'))
		.pipe(gulp.dest('./classic/scripts'));
});

gulp.task('minify-fw-js', function(){
// FW
	gulp.src([
		'./games/firmament-wars/js/beginWrap.js',
		'./games/firmament-wars/js/ui.js',
		'./games/firmament-wars/js/payment.js',
		'./games/firmament-wars/js/stats.js',
		'./games/firmament-wars/js/animate.js',
		'./games/firmament-wars/js/core.js',
		'./games/firmament-wars/js/title.js',
		'./games/firmament-wars/js/lobby.js',
		'./games/firmament-wars/js/ws.js',
		'./games/firmament-wars/js/audio.js',
		'./games/firmament-wars/js/map.js',
		'./games/firmament-wars/js/actions.js',
		'./games/firmament-wars/js/events.js',
		'./games/firmament-wars/js/ai.js',
		'./games/firmament-wars/js/endWrap.js'
	])
		.pipe(concat('firmament-wars.js'))
		.pipe(gulp.dest('./games/firmament-wars/js'))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(rename('firmament-wars.min.js'))
		.pipe(gulp.dest('./games/firmament-wars/js'));
});

gulp.task('minify-js', function() {
return gulp.src([
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
'./js/mob.js',
'./js/test.js',
'./js/endWrap.js'
])
.pipe(concat('nevergrind-online.js'))
.pipe(gulp.dest('./js'))
.pipe(stripDebug())
.pipe(uglify())
.pipe(rename('nevergrind-online.min.js'))
.pipe(gulp.dest('./js'));

});

gulp.task('minify-png', function(){
	return imagemin(['./mobs/huge/*.png'], './mobs/', {
		use: [imageminPngquant({
			floyd: 1,
			nofs: true, // disable FS
			quality: '90',
			speed: 1
		})
		]
	}).then(function(){
		console.info("Image(s) minified with quant!")
	});
});

gulp.task('minify-css', function(){
    gulp.src([
        './css/ng2.css'
    ])
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('ng2.min.css'))
        .pipe(gulp.dest('./css'));

    gulp.src([
        './classic/css/nevergrind.css'
    ])
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('nevergrind.min.css'))
        .pipe(gulp.dest('./classic/css'));

    gulp.src([
        './games/firmament-wars/css/firmament-wars.css'
    ])
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('firmament-wars.min.css'))
        .pipe(gulp.dest('./games/firmament-wars/css'));
});

gulp.task('default', function(){
	gulp.run('minify-css', 'minify-js');
});