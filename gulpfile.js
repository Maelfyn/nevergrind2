
const gulp = require('gulp');
// var minifyHTML = require('gulp-minify-html'); // Minify HTML
var clean = require('gulp-rimraf'); // delete folder contents
var cleanCSS = require('gulp-clean-css'); // Minify the CSS
var stripDebug = require('gulp-strip-debug'); // Remove debugging stuffs
var concat = require('gulp-concat'); // Join all JS files together to save space
var uglify = require('gulp-uglify'); // Minify JavaScript
var rename = require('gulp-rename');
var imagemin = require('imagemin');
var imageminPngquant = require('imagemin-pngquant');
var fs = require('fs');
// var resizeImg = require('resize-img');
var imageResize = require('gulp-image-resize');

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
'./js/battle.js',
'./js/mobs.js',
'./js/mob.js',
'./js/town.js',
'./js/route.js',
'./js/test.js',
'./js/endWrap.js'
])
.pipe(concat('nevergrind-2.js'))
.pipe(gulp.dest('./js'))
//.pipe(stripDebug())
.pipe(uglify())
.pipe(rename('nevergrind-2.min.js'))
.pipe(gulp.dest('./js'));

});

gulp.task('minify-png', function(){
	var img = 'beholder',
		source = 'mobs';
	return imagemin(['./mobs/'+ img +'/*'], './mobs/'+ img +'/', {
		use: [imageminPngquant({
			floyd: 1,
			nofs: true, // disable FS
			quality: '90',
			speed: 1
		})]
	}).then(function(){
		console.info("Images minified with quant: " + img)
	});
});

gulp.task('resize-png', function(){
	// add minify-png pipe
	var img = 'wolf';
	var promise = new Promise(function(resolve) {
		gulp.src('./mobs-huge/' + img + '/*')
			.pipe(imageResize({
				imageMagick: true,
				width: 3000,
				height: 600
			}))
			.pipe(gulp.dest('./mobs/' + img + '/'))
			.on('end', resolve);
	});

	promise.then(function(data){
		imagemin(['./mobs/'+ img +'/*'], './mobs/'+ img +'/', {
			use: [imageminPngquant({
				floyd: 1,
				nofs: true, // disable FS
				quality: '90',
				speed: 1
			})]
		}).then(function(){
			console.info("Images minified with quant: " + img)
		});
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

gulp.task('clean', [], function(){
	console.info("Cleaning out build directory...");
	return gulp.src("./build/*", {
		read: false
	}).pipe(clean());
})

gulp.task('build-ng2', [
	'minify-css',
	'minify-js',
	'clean'
], function(){
	// move app files
	gulp.src([
		'./index.html',
		'./package.json',
		'./nwjs/**/*'
	]).pipe(gulp.dest('./build'));

	gulp.src([
		'./css/**/*.*'
	]).pipe(gulp.dest('./build/css'));

	gulp.src([
		'./fonts/*.*'
	]).pipe(gulp.dest('./build/fonts'));

	gulp.src([
		'./js/**/*.*'
	]).pipe(gulp.dest('./build/js'));

	gulp.src([
		'./sound/*.*'
	]).pipe(gulp.dest('./build/sound'));

	gulp.src([
		'./music/*.*'
	]).pipe(gulp.dest('./build/music'));

	gulp.src([
		'./img2/*.*'
	]).pipe(gulp.dest('./build/img2'));

	gulp.src([
		'./mobs/*.*'
	]).pipe(gulp.dest('./build/mobs'));
});

gulp.task("build-icon", function(){
	// I think I used resource hacker instead?
	require('winresourcer')({
		operation: "Update",
		exeFile: "./build/nw.exe",
		resourceType: "Icongroup",
		resourceName: "IDR_MAINFRAME",
		lang: 1033,
		resourceFile: "./build/img2/desktop.ico"
	}, function(error){
		//stuff
	});
})

gulp.task('default', function(){
	gulp.run('minify-css', 'minify-js');
});