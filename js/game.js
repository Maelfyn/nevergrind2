// game specific data
var game = {
	maxPlayers: 6,
	init: 0,
	session: {
		timer: 0
	},
	ping: {
		start: 0,
		oneWay: function() {
			return ~~((Date.now() - game.ping.start) / 2);
		},
		roundTrip: function() {
			return Date.now() - game.ping.start;
		}
	},
	start: function() {
		// only called once
		if (!game.init) {
			game.init = 1;
			clearTimeout(game.session.timer);
			game.heartbeat.start();
			game.socket.start();
			game.played.start();
			game.sanity.party.start();
			game.sanity.chat.start();
		}
	},
	heartbeat: {
		timer: 0,
		start: function() {
			game.heartbeat.send();
			clearInterval(game.heartbeat.timer);
			game.heartbeat.timer = setInterval(game.heartbeat.send, 5000);
		},
		send: function() {
			game.ping.start = Date.now();
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/heartbeat.php'
			}).done(function () {
				console.info("%c Ping: ", 'background: #0f0', game.ping.oneWay());
			});
		}
	},
	socket: {
		timer: 0,
		start: function() {
			clearInterval(game.socket.timer);
			game.socket.timer = setInterval(game.socket.send, 20000);
		},
		send: function() {
			socket.healthTime = Date.now();
			socket.startHealthCheck();
			socket.zmq.publish('hb:' + my.name, {});
		}
	},
	played: {
		timer: 0,
		start: function() {
			clearInterval(game.played.timer);
			game.played.timer = setInterval(game.played.send, 60000);
		},
		send: function() {
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/update-played.php'
			}).always(function(){
				!app.isLocal && console.clear();
			});
		}
	},
	sanity: {
		party: {
			timer: 0,
			start: function() {
				clearInterval(game.sanity.party.timer);
				game.sanity.party.timer = setInterval(function(){
					if (my.p_id) {
						game.sanity.party.send();
						game.sanity.party.check();
					}
				}, 5000);
			},
			send: function() {
				console.info("Sending party heartbeats....");
				socket.zmq.publish('party:' + my.p_id, {
					id: my.row,
					route: 'party->hb'
				});

				/*$.ajax({
					type: 'GET',
					url: app.url + 'php2/chat/sanity-party.php'
				}).done(function (data) {
					for (var i = 0, len = data.players.length; i < len; i++) {
						data.players[i] *= 1;
					}
					var newChatArray = [];
					chat.inChannel.forEach(function (v) {
						if (!~data.players.indexOf(v)) {
							$("#chat-player-" + v).remove();
						}
						else {
							newChatArray.push(v);
						}
					});
					if (newChatArray.length) {
						chat.inChannel = newChatArray;
						chat.setHeader();

					}
				});*/
			},
			check: function() {
				var now = Date.now(),
					linkdead = [];
				for (var i=1; i<6; i++) {
					console.info("Checking: ", my.party[i].id, now - my.party[i].heartbeat > 15000)
					if (my.party[i].id &&
						!my.party[i].linkdead &&
						(now - my.party[i].heartbeat > 15000)) {
						linkdead.push(my.party[i].name);
						my.party[i].linkdead = 1;
					}
				}
				linkdead.forEach(function(name){
					socket.zmq.publish('party:' + my.p_id, {
						name: name,
						route: 'party->linkdead'
					});
				});
			}
		},
		chat: {
			timer: 0,
			start: function() {
				clearInterval(game.sanity.chat.timer);
				game.sanity.chat.timer = setInterval(game.sanity.chat.send, 60000);
			},
			send: function() {
				if (ng.view === 'town') {
					$.ajax({
						type: 'GET',
						url: app.url + 'php2/chat/sanity-chat.php'
					}).done(function (data) {
						for (var i = 0, len = data.players.length; i < len; i++) {
							data.players[i] *= 1;
						}
						var newChatArray = [];
						chat.inChannel.forEach(function (v) {
							if (!~data.players.indexOf(v)) {
								$("#chat-player-" + v).remove();
							}
							else {
								newChatArray.push(v);
							}
						});
						if (newChatArray.length) {
							chat.inChannel = newChatArray;
							chat.setHeader();

						}
					});
				}
			}
		}
	},
	exit: function() {
		// from town
		if (socket.enabled) {
			chat.broadcast.remove();
			if (my.p_id) {
				// boot from party
				socket.zmq.publish('party:' + my.p_id, {
					id: my.row,
					name: my.name,
					route: 'party->bootme'
				});
			}
			// notify friends
			socket.zmq.publish('friend:' + my.name, {
				name: my.name,
				route: 'off'
			});
			socket.zmq.close();
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