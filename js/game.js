// game specific data
var game = {
	heartbeat: {
		timer: 0,
		start: function() {
			game.heartbeat.send();
			game.heartbeat.update();
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
				url: g.url + 'php2/heartbeat.php'
			}).done(function(data){
				console.info('heartbeat ', data);
			})

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
			url: g.url + 'php/getGameState.php'
		}).done(function(data){
			console.info('getGameState ', data);
			// get tile data
		}).fail(function(data){
			console.info(data.responseText);
		});
	}
};