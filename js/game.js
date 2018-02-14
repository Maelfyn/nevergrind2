// game specific data
var game = {
	maxPlayers: 6,
	init: 0,
	start: function() {
		// only called once
		if (!game.init) {
			game.init = 1;
			game.heartbeat.send();
			game.heartbeat.start();
			game.socket.start();
			game.played.start();
		}
	},
	heartbeat: {
		timer: 0,
		start: function() {
			clearTimeout(game.heartbeat.timer);
			game.heartbeat.timer = setTimeout(function() {
				game.heartbeat.send();
			}, 5000);
		},
		send: function() {
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/heartbeat.php'
			}).done(function () {
				// nothing
			}).fail(function () {
				clearTimeout(game.heartbeat.timer);
				game.heartbeat.timer = setTimeout(function () {
					game.heartbeat.start();
				}, 1000);
			});
		}
	},
	socket: {
		timer: 0,
		start: function() {
			clearInterval(game.socket.timer);
			game.socket.timer = setInterval(function(){
				socket.healthTime = Date.now();
				socket.startHealthCheck();
				socket.zmq.publish('hb:' + my.name, {});
			}, 20000);
		}
	},
	played: {
		timer: 0,
		start: function() {
			clearInterval(game.played.timer);
			game.played.timer = setInterval(function(){
				$.ajax({
					type: 'GET',
					url: app.url + 'php2/update-played.php'
				}).done(function(){
				}).fail(function(){
					setTimeout(function(){
						game.played.start();
					}, 5000);
				});
			}, 60000);
		}
	},
	getGameState: function(){
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

		return s1[~~(Math.random() * s1.length)] +
			s2[~~(Math.random() * s2.length)]+
			s3[~~(Math.random() * s3.length)];
	}
};