// title.js
var title = {
	init: (function(){
		$(document).ready(function(){
			// console.info("Initializing title screen...");
			setTimeout(function() {
				ng.initGame();
				clearTimeout(game.heartbeat.timer);
				game.heartbeat.timer = setTimeout(function(){
					ng.keepAlive();
				}, 180000);
				// init events
				var x = env.click;
				ng.events(x);
				create.events(x);
				audio.events();
			}, 100);
		});
	})(),
	test: function() {
		// nada
	}
};