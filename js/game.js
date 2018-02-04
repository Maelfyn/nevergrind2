// game specific data
var game = {
	heartbeat: {
		timer: 0,
		start: function() {
			game.heartbeat.send();
			game.heartbeat.update();
			game.played.start();
		},
		update: function() {
			clearTimeout(game.heartbeat.timer);
			game.heartbeat.timer = setTimeout(function(){
				game.heartbeat.send();
				game.heartbeat.update();
			}, 5000);
		},
		send: function() {
			clearTimeout(title.keepAliveTimer);
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/heartbeat.php'
			}).done(function(data){
				console.info('heartbeat ', data);
			})

		}
	},
	played: {
		timer: 0,
		start: function() {
			clearInterval(game.played.timer);
			game.played.timer = setInterval(function(){
				var d = Date.now() - g.idleDate;
				console.info("idleDate", d);
				if (d > 900000) {
					// disconnect - idle 15 minutes
					g.disconnect();
				}
				else {
					$.ajax({
						type: 'GET',
						url: app.url + 'php2/update-played.php'
					});
					!app.isLocal && console.clear();
				}
			}, 60000);
		}

	},
	name: '',
	initialized: false,
	getGameState: function(){
		// use as a reality check in case zmq messes up 
		// or to init game state?
		// or check that players are still online?
		$.ajax({
			type: 'GET',
			url: app.url + 'php/getGameState.php'
		}).done(function(data){
			console.info('getGameState ', data);
			// get tile data
		}).fail(function(data){
			console.info(data.responseText);
		});
	}
};