// ws.js
var socket = {
	unsubscribe: function(channel){
		try {
			socket.zmq.unsubscribe(channel);
		} catch(err) {
			console.warn(err);
		}
	},
	joinGame: function(){
		(function repeat(){
			if (socket.enabled){
				socket.unsubscribe('title:' + my.channel);
				socket.unsubscribe('game:' + game.id);
				// game updates
				console.info("Subscribing to game:" + game.id);
				socket.zmq.subscribe('game:' + game.id, function(topic, data) {
					if (g.ignore.indexOf(data.account) === -1){
						title.chatReceive(data);
					}
				});
			} else {
				setTimeout(repeat, 100);
			}
		})();
	},
	isHealthy: 0,
	initWhisper: function() {
		if (socket.enabled) {
			var channel = 'name:' + my.name;
			console.info("subscribing to whisper channel: ", channel);
			socket.zmq.subscribe(channel, function(topic, data) {
				console.info('rx ', topic, data);
				if (data.action === 'send') {
					// report message
					route.town(data, data.route);
					// callback to sender
					// data.action = 'receive';
					//socket.zmq.publish('name:' + data.name, data);
					// callback to sender
					$.ajax({
						url: app.url + 'php2/chat/send.php',
						data: {
							date: data.date,
							action: 'receive',
							msg: 'x',
							class: 'chat-whisper',
							category: 'name:' + data.name
						}
					});
				}
				// receive pong
				else if (data.action === 'receive') {
					route.town(chat.whispers[data.date], 'chat->log');
				}
				// receive keep alive
				else if (data.action === 'ping') {
					console.info("Socket is healthy! ", Date.now() - socket.healthTime);
					socket.isHealthy = 1;
				}
			});
		}
	},
	healthTime: 0,
	startHealthCheck: function() {
		socket.healthTime = Date.now();
		socket.isHealthy = 0;
		setTimeout(function() {
			socket.checkHealth();
		}, 5000);
	},
	checkHealth: function(){
		if (!socket.isHealthy) {
			g.disconnect();
		}
	},
	enabled: 0,
	init: function(bypass){
		// is player logged in?
		socket.zmq = new ab.Session('wss://' + app.socketUrl + '/wss2/', function () {
			// on open
			socket.connectionSuccess();
		}, function (code, reason) {
			console.info('Websocket connection closed. Code: '+code+'; reason: '+reason);
			// on close/fail
			console.warn('WebSocket connection failed. Retrying...');
			socket.enabled = 0;
			setTimeout(socket.init, 100);
		}, {
			// options
			'skipSubprotocolCheck': true
		});
	},
	initialConnection: 1,
	routeMainChat: function(topic, data) {
		console.info('rx ', topic, data);
		route.town(data, data.route);
	},
	connectionSuccess: function(){
		socket.enabled = 1;
		console.info("Socket connection established with server");
		// chat updates
		if (socket.initialConnection) {
			socket.initialConnection = 0;
			// subscribe to town-1 default channel - general chat
			var town = chat.getChannel();
			console.info("subscribing to channel: ", town);
			chat.log("You have joined channel: " + my.channel, 'chat-warning');
			socket.zmq.subscribe(town, function(topic, data) {
				socket.routeMainChat(topic, data);
			});

			// subscribe to admin broadcasts
			var admin = 'admin:broadcast';
			console.info("subscribing to channel: ", admin);
			socket.zmq.subscribe(admin, function(topic, data) {
				console.info('rx ', topic, data);
				route.town(data, data.route);
			});

			// subscribe to test guild for now
			var guild = 'guild:' + Date.now();
			my.guild = guild;
			console.info("subscribing to channel: ", guild);
			socket.zmq.subscribe(guild, function(topic, data) {
				console.info('rx ', topic, data);
				route.town(data, data.route);
			});

			// subscribe to test party for now
			var party = 'party:' + Date.now();
			my.party = party;
			console.info("subscribing to channel: ", party);
			socket.zmq.subscribe(party, function(topic, data) {
				console.info('rx ', topic, data);
				route.town(data, data.route);
			});

			(function repeat(){
				if (my.name){
					socket.initWhisper();
					socket.initFriendAlerts();
				} else {
					setTimeout(repeat, 200);
				}
			})();

			// keep alive?
			// let everyone know I am here
			chat.broadcast.add();
			chat.setHeader();
			// notify friends I'm online
			socket.zmq.publish('friend:' + my.name, {
				name: my.name,
				route: 'on'
			});
		}
	},
	initFriendAlerts: function() {
		g.friends.forEach(function(v){
			socket.zmq.subscribe('friend:' + v, function(topic, data) {
				chat.friend.notify(topic, data);
			});
		});
	}
}