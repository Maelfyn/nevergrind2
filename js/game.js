// game specific data
var game = {
	maxPlayers: 6,
	init: 0,
	heartbeat: {
		timer: 0,
		start: function() {
			// only called once
			if (!game.init) {
				game.init = 1;
				game.heartbeat.send();
				game.heartbeat.update();
				game.socketRefresh();
				game.played.start();
			}
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
			}).done(function(){
				// nothing
			}).fail(function(){
				clearTimeout(game.heartbeat.timer);
				game.heartbeat.timer = setTimeout(function(){
					game.heartbeat.update();
				}, 1000);
			});

		}
	},
	played: {
		timer: 0,
		start: function() {
			clearInterval(game.played.timer);
			game.played.timer = setInterval(function(){
				var d = Date.now() - g.idleDate;
				console.info("played.timer", d);
				//if (d > 900000 * 4) {
				if (0) {
					// 60 minutes now!
					// disconnect - idle 15 minutes
					g.disconnect();
				}
				else {
					$.ajax({
						type: 'GET',
						url: app.url + 'php2/update-played.php'
					}).done(function(){
						!app.isLocal && console.clear();
						setTimeout(function() {
							socket.zmq.publish('name:' + my.name, {
								ping: 1
							});
						}, 30000);
					}).fail(function(){
						setTimeout(function(){
							game.played.start();
						}, 10000);
					});
				}
			}, 60000);
		}

	},
	socketRefresh: function() {
		setInterval(function() {
			socket.reconnect();
		}, 600000)
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
	},
	getPetName:  function() {
		var s1 = [
				"Jo",
				"Ge",
				"Go",
				"Gi",
				"Ja",
				"Jo",
				"Je",
				"Ji",
				"Ka",
				"Ke",
				"Ko",
				"Ki",
				"La",
				"Le",
				"Lo",
				"Li",
				"Va",
				"Ve",
				"Vo",
				"Xa",
				"Xe",
				"Xo",
				"Za",
				"Ze",
				"Zo",
				"Bo"
			],
			s2 = [
				"bek",
				"ban",
				"bar",
				"bek",
				"bob",
				"rek",
				"rar",
				"nar",
				"ran",
				"sar",
				"sek",
				"sob",
				"n",
				"s",
				"k",
				"n"
			],
			s3 = [
				"er",
				"tik",
				"n",
				"er",
				"ab",
				""
			];

		return s1[~~(Math.random() * s1.length) - 1] +
			s2[~~(Math.random() * s2.length) - 1]+
			s3[~~(Math.random() * s3.length) - 1];
	}
};