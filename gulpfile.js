
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
var imageResize = require('gulp-image-resize');

// classic NG
gulp.task('build-ng1', function(){
	// css minify/rename
	gulp.src([
		'./classic/css/nevergrind.css'
	])
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename('nevergrind.min.css'))
		.pipe(gulp.dest('./classic/css'));

	// javascript minify/concat
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

var fwJsFiles = [
	'./games/firmament-wars/js/beginWrap.js',
	'./games/firmament-wars/js/maps.js',
	'./games/firmament-wars/js/bible.js',
	'./games/firmament-wars/js/ui.js',
	'./games/firmament-wars/js/lang.js',
	'./games/firmament-wars/js/stats.js',
	'./games/firmament-wars/js/animate.js',
	'./games/firmament-wars/js/my.js',
	'./games/firmament-wars/js/core.js',
	'./games/firmament-wars/js/game.js',
	'./games/firmament-wars/js/title.js',
	'./games/firmament-wars/js/lobby.js',
	'./games/firmament-wars/js/ws.js',
	'./games/firmament-wars/js/audio.js',
	'./games/firmament-wars/js/map.js',
	'./games/firmament-wars/js/actions.js',
	'./games/firmament-wars/js/events.js',
	'./games/firmament-wars/js/ai.js',
	'./games/firmament-wars/js/endWrap.js'
];

gulp.task('minify-fw-js', function(){
// FW
	gulp.src(fwJsFiles)
		.pipe(concat('firmament-wars.js'))
		.pipe(gulp.dest('./games/firmament-wars/js'))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(rename('firmament-wars.min.js'))
		.pipe(gulp.dest('./games/firmament-wars/js'));
});

gulp.task('minify-fw-js-sdk', function(){
// FW
	// remove wrapper files for easy debug
	var files = fwJsFiles;
	files.shift();
	files.pop();
	gulp.src(files)
		.pipe(concat('firmament-wars.js'))
		.pipe(gulp.dest('./games/firmament-wars/js'))
		//.pipe(stripDebug())
		//.pipe(uglify())
		.pipe(rename('firmament-wars.min.js'))
		.pipe(gulp.dest('./games/firmament-wars/js'));
});

gulp.task('minify-ng2-js', function() {
return gulp.src([
	'./js/beginWrap.js',
	'./js/init.js',
	'./js/create.js',
	'./js/ng.js',
	'./js/env.js',
	'./js/my.js',
	'./js/dom.js',
	'./js/modal.js',
	'./js/audio.js',
	'./js/game.js',
	'./js/title.js',
	'./js/context.js',
	'./js/events.js',
	'./js/socket.js',
	'./js/chat.js',
	'./js/bar.js',
	'./js/battle.js',
	'./js/mobs.js',
	'./js/mob.js',
	'./js/town.js',
	'./js/guild.js',
	'./js/cache.js',
	'./js/route.js',
	'./js/mission.js',
	'./js/dungeon.js',
	'./js/skills.js',
	'./js/zone.js',
	'./js/party.js',
	'./js/button.js',
	'./js/test.js',
	'./js/endWrap.js'
])
.pipe(concat('nevergrind-2.js'))
.pipe(gulp.dest('./js'))
.pipe(stripDebug()) // watch out for this for nwjs
.pipe(uglify())
.pipe(rename('nevergrind-2.min.js'))
.pipe(gulp.dest('./js'));

});

gulp.task('minify-png', function(){
	var img = 'dragon-fire',
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
	var img = 'toadlok';
	var promise = new Promise(function(resolve) {
		gulp.src('./mobs-huge/' + img + '/*')
			.pipe(imageResize({
				imageMagick: true,
				width: 3000,
				height: 1500
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
/*
gulp.task('resize-sprite', function(){
	// add minify-png pipe
	var img = 'dragon',
		h = 2100,
		w = 1500,
		totalHeight = h * 15,
		totalWidth = w * 7;
	var promise = new Promise(function(resolve) {
		gulp.src('./mobs-huge/' + img + '.png')
			.pipe(imageResize({
				imageMagick: true,
				width: totalHeight,
				height: totalWidth
			}))
			.pipe(gulp.dest('./mobs/' + img))
			.on('end', resolve);
	});

	promise.then(function(data){
		imagemin(['./mobs/'+ img], './mobs/'+ img, {
			use: [imageminPngquant({
				floyd: 1,
				nofs: true, // disable FS
				quality: '90',
				speed: 1
			})]
		}).then(function(){
			console.info("Spritemap minified with quant: " + img)
		});
	});
});*/

gulp.task('minify-css', function(){
	gulp.src([
		'./css/ng2.css'
	])
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename('ng2.min.css'))
		.pipe(gulp.dest('./css'));

	gulp.src([
		'./games/firmament-wars/css/firmament-wars.css'
	])
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename('firmament-wars.min.css'))
		.pipe(gulp.dest('./games/firmament-wars/css'));
});

gulp.task('clean-ng2', [], function(){
	console.info("Cleaning out ng2 build directory...");
	return gulp.src("./build-ng2/*", {
		read: false
	}).pipe(clean());
});

gulp.task('clean-fw', [], function(){
	console.info("Cleaning out fw build directory...");
	return gulp.src("./build-fw/*", {
		read: false
	}).pipe(clean());
});

gulp.task('build-ng2', [
	'minify-css',
	'minify-ng2-js',
	'clean-ng2'
], function(){
	// move app files
	gulp.src([
		'./index.html',
		'./package.json',
		'./greenworks.js',
		'./steam_appid.txt',
		'./nwjs/**/*'
	]).pipe(gulp.dest('./build-ng2'));

	gulp.src([
		'./lib/*'
	]).pipe(gulp.dest('./build-ng2/lib'));

	gulp.src([
		'./js/nevergrind-2.min.js'
	]).pipe(gulp.dest('./build-ng2/js'));

	gulp.src([
		'./css/**/*'
	]).pipe(gulp.dest('./build-ng2/css'));

	gulp.src([
		'./fonts/*'
	]).pipe(gulp.dest('./build-ng2/fonts'));

	gulp.src([
		'./sound/*'
	]).pipe(gulp.dest('./build-ng2/sound'));

	gulp.src([
		'./music/*'
	]).pipe(gulp.dest('./build-ng2/music'));

	gulp.src([
		'./img2/**/*'
	]).pipe(gulp.dest('./build-ng2/img2'));

	gulp.src([
		'./mobs/**/*'
	]).pipe(gulp.dest('./build-ng2/mobs'));
	/*
	gulp.src([
		'./mobs/*'
	]).pipe(gulp.dest('./build-ng2/mobs'));
	*/
});

gulp.task('build-fw-sdk', [
	'minify-css',
	'minify-fw-js-sdk',
	'clean-fw'
], function(){
	// move app files
	gulp.src([
		'./games/firmament-wars/index.html',
		'./games/firmament-wars/package.json',
		'./games/firmament-wars/steam_appid.txt',
		'./greenworks.js',
		'./nwjs-sdk/**/*'
	]).pipe(gulp.dest('./build-fw'))
		.pipe(gulp.dest('./build-fw'))
			.on('end', function() {
				gulp.src("./build-fw/nw.exe")
					.pipe(clean())
					.pipe(rename("firmament-wars.exe"))
					.pipe(gulp.dest("./build-fw"));
			});

	gulp.src([
		'./lib/*'
	]).pipe(gulp.dest('./build-fw/lib'));

	gulp.src([
		'./games/firmament-wars/css/**/*'
	]).pipe(gulp.dest('./build-fw/css'));

	gulp.src([
		'./games/firmament-wars/fonts/*'
	]).pipe(gulp.dest('./build-fw/fonts'));

	gulp.src([
		'./games/firmament-wars/images/**/*'
	]).pipe(gulp.dest('./build-fw/images'));

	gulp.src([
		'./games/firmament-wars/js/libs/*',
	]).pipe(gulp.dest('./build-fw/js/libs'));

	gulp.src([
		'./games/firmament-wars/js/maps/*',
	]).pipe(gulp.dest('./build-fw/js/maps'));

	gulp.src([
		'./games/firmament-wars/js/firmament-wars.min.js'
	]).pipe(gulp.dest('./build-fw/js'));

	gulp.src([
		'./games/firmament-wars/music/*'
	]).pipe(gulp.dest('./build-fw/music'));

	gulp.src([
		'./games/firmament-wars/sound/*'
	]).pipe(gulp.dest('./build-fw/sound'));

});

gulp.task('build-fw', [
	'minify-css',
	'minify-fw-js',
	'clean-fw'
], function(){
	// move app files
	gulp.src([
		'./games/firmament-wars/index.html',
		'./games/firmament-wars/package.json',
		'./games/firmament-wars/steam_appid.txt',
		'./greenworks.js',
		'./nwjs/**/*'
	]).pipe(
		gulp.dest('./build-fw'))
			.on('end', function() {
				gulp.src("./build-fw/nw.exe")
					.pipe(clean())
					.pipe(rename("firmament-wars.exe"))
					.pipe(gulp.dest("./build-fw"));
			});

	gulp.src([
		'./lib/*'
	]).pipe(gulp.dest('./build-fw/lib'));

	gulp.src([
		'./games/firmament-wars/css/**/*'
	]).pipe(gulp.dest('./build-fw/css'));

	gulp.src([
		'./games/firmament-wars/fonts/*'
	]).pipe(gulp.dest('./build-fw/fonts'));

	gulp.src([
		'./games/firmament-wars/images/**/*'
	]).pipe(gulp.dest('./build-fw/images'));

	gulp.src([
		'./games/firmament-wars/js/libs/*',
	]).pipe(gulp.dest('./build-fw/js/libs'));

	gulp.src([
		'./games/firmament-wars/js/maps/*',
	]).pipe(gulp.dest('./build-fw/js/maps'));

	gulp.src([
		'./games/firmament-wars/js/firmament-wars.min.js'
	]).pipe(gulp.dest('./build-fw/js'));

	gulp.src([
		'./games/firmament-wars/music/*'
	]).pipe(gulp.dest('./build-fw/music'));

	gulp.src([
		'./games/firmament-wars/sound/*'
	]).pipe(gulp.dest('./build-fw/sound'));

});

gulp.task('rename', function() {
	gulp.src("./build-fw/nw.exe")
		.pipe(clean())
		.pipe(rename("firmament-wars.exe"))
		.pipe(gulp.dest("./build-fw"));
})

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
	gulp.run('minify-css', 'minify-ng2-js');
});