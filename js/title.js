// title.js
var title = {
	init: (function(){
		$(document).ready(function(){
			// console.info("Initializing title screen...");
			g.initGame();
			clearTimeout(game.heartbeat.timer);
			game.heartbeat.timer = setTimeout(function(){
				g.keepAlive();
			}, 180000);
			// init events
			var x = env.click;
			g.events(x);
			create.events(x);
			audio.events();
		});
	})(),
	test: function() {
		// nada
	}
};