// game specific data
var game = {
	maxPlayers: 6,
	init: 0,
	session: {
		timer: 0
	},
	questDelay: 3000,
	ping: {
		start: Date.now(),
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
		fails: 0,
		start: function() {
			game.heartbeat.send();
		},
		send: function() {
			console.info("%c Last heartbeat interval: ", "background: #ff0", Date.now() - game.ping.start +'ms');
			game.ping.start = Date.now();
			clearTimeout(game.heartbeat.timer);
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/heartbeat.php'
			}).done(function (data) {
				if (game.heartbeat.fails) {
					// this does nothing right now
					game.resync();
				}
				game.heartbeat.fails = 0;
				console.info("%c Ping: ", 'background: #0f0', game.ping.oneWay() +'ms');
				// console.info("HB DATA: ", data);
				data.name = my.name;
				console.info('heartbeatCallback', data);
				bar.updateBars(data);
			}).fail(function(data){
				game.heartbeat.fails++;
				game.heartbeat.fails > 1 && ng.disconnect(data.responseText);
			}).always(function() {
				game.heartbeat.timer = setTimeout(game.heartbeat.send, 5000);
			});
		}
	},
	socket: {
		timer: 0,
		sendTime: Date.now(),
		timeout: 25000,
		interval: 20000,
		checkTolerance: 1000,
		start: function() {
			clearInterval(game.socket.timer);
			game.socket.timer = setInterval(game.socket.send, game.socket.interval);
		},
		send: function() {
			// console.info("%c Last socket send: ", "background: #0ff", Date.now() - game.socket.sendTime);
			game.socket.sendTime = Date.now();
			socket.zmq.publish('hb:' + my.name, {});
		},
		checkDifference: function() {
			console.info("%c Socket ping: ", "background: #08f", Date.now() - game.socket.sendTime + 'ms');
			// longer than interval plus checkTolerance? disconnect (failed 2x)
			if (game.socket.isHealthy()) {
				ng.disconnect();
			}
		},
		isHealthy: function() {
			return Date.now() - game.socket.sendTime > game.socket.interval + game.socket.checkTolerance;
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
				try {
					socket.zmq.publish('party:' + my.p_id, {
						id: my.row,
						route: 'party->hb'
					});
				} catch (err) {
					console.info('sanity.party.send', err);
				}
			},
			check: function() {
				var now = Date.now(),
					linkdead = [];
				for (var i=1; i<6; i++) {
					console.info("Checking: ", my.party[i].id, now - my.party[i].heartbeat > game.socket.interval * 2)
					if (my.party[i].id &&
						!my.party[i].linkdead &&
						(now - my.party[i].heartbeat > game.socket.interval * 2)) {
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
				/*
				socket.zmq.publish('party:' + my.p_id, {
					id: my.row,
					name: my.name,
					route: 'party->bootme'
				});
				*/
			}
			// notify friends
			socket.zmq.publish('friend:' + my.name, {
				name: my.name,
				route: 'off'
			});
			socket.zmq.close();
		}
	},
	resync: function() {
		// do nothing!
	},
	getGameState: function(){
	},
	scenes: [
		'scene-town',
		'scene-dungeon',
		'scene-battle'
	],
	emptyScenesExcept: function(scene) {
		game.scenes.forEach(function(v) {
			if (v === scene) {
				document.getElementById(v).style.opacity = 0;
			}
			else {
				document.getElementById(v).innerHTML = '';
			}
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

		return s1[~~(Math.random() * s1.length)] +
			s2[~~(Math.random() * s2.length)]+
			s3[~~(Math.random() * s3.length)];
	}
};