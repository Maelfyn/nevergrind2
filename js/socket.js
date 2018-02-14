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
			var channel = 'hb:' + my.name;
			// heartbeat
			console.info("subscribing to heartbeat channel: ", channel);
			socket.zmq.subscribe(channel, function(){
				socket.isHealthy = 1;
				console.info("socket heartbeat received: ", Date.now() - socket.healthTime + 'ms');
			});
			// whisper
			channel = 'name:' + my.name;
			console.info("subscribing to whisper channel: ", channel);
			socket.zmq.subscribe(channel, function(topic, data) {
				if (data.action === 'send') {
					console.info('Sent whisper: ', data);
					// report message
					route.town(data, data.route);
					chat.lastWhisper.name = data.name;
					// callback to sender
					$.ajax({
						url: app.url + 'php2/chat/send.php',
						data: {
							action: 'receive',
							msg: chat.whisper.parse(data.msg),
							class: 'chat-whisper',
							category: 'name:' + data.name
						}
					});
				}
				// receive pong
				else if (data.action === 'receive') {
					data.msg = "You whispered to " + data.name + ": " + chat.whisper.parse(data.msg);
					route.town(data, 'chat->log');
				}
				// party invite
				else if (data.action === 'party-invite') {
					console.info("party invite received! ", data);
					chat.prompt.add(data);
				}
				else if (data.action === 'party-deny') {
					chat.log(data.name + " has denied your party invite.", 'chat-warning');
				}
				else if (data.action === 'party-accept') {
					chat.log(data.name + " has joined the party.", 'chat-warning');
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
		}, 8000);
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