// ws.js
var socket = {
	removePlayer: function(account){
		// instant update of clients
		var o = {
			type: 'remove',
			account: my.account
		}
		// removes id
		socket.zmq.publish('title:' + my.channel, o);
		delete title.players[account];
	},
	addPlayer: function(account, flag){
		// instant update of clients
		var o = {
			type: 'add',
			account: my.account,
			flag: my.flag,
			rating: my.rating
		}
		socket.zmq.publish('title:' + my.channel, o);
		title.players[account] = {
			flag: flag
		}
	},
	unsubscribe: function(channel){
		try {
			socket.zmq.unsubscribe(channel);
		} catch(err){
			console.info(err);
		}
	},
	setChannel: function(channel){
		// change channel on title screen
		if (g.view === 'title'){
			// remove from channel
			channel = chat.channel.trim();
			if (channel !== my.channel){
				$.ajax({
					type: "POST",
					url: g.url + 'php/titleChangeChannel.php',
					data: {
						channel: channel
					}
				}).done(function(data){
					console.info("You have changed channel to: ", data.channel);
					// removes id
					//socket.removePlayer(my.account);
					// unsubs
					my.channel && socket.unsubscribe('title:' + my.channel);
					// set new channel data
					my.channel = data.channel;
					for (var key in title.players){
						delete title.players[key];
					}
					data.skip = true;
					data.message = "You have joined channel: " + data.channel;
					data.type = "chat-warning";
					chat.log(data);
					socket.zmq.subscribe('title:' + data.channel, function(topic, data) {
						console.info("title:' + data.channel ", topic, data);
						if (g.ignore.indexOf(data.account) === -1){
							chat.log(data);
						}
					});
					// add id
					socket.addPlayer(my.account, my.flag);
					// update display of channel
					if (g.view === 'title'){
						//document.getElementById('titleChatHeaderChannel').textContent = data.channel;
						//document.getElementById('titleChatBody').innerHTML = '';
					}
					//chat.updatePlayers(0);
				});
			}
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
	initWhisper: function() {
		if (socket.enabled) {
			var channel = 'name:' + my.name;
			console.info("subscribing to whisper channel: ", channel);
			socket.zmq.subscribe(channel, function(topic, data) {
				console.info('rx ', topic, data);
				if (data.action === 'send') {
					route.town(data, data.route);
					data.action = 'receive';
					socket.zmq.publish(data.from, data);
				}
				else if (data.action === 'receive') {
					console.info('received whisper ', data);
					route.town(chat.whispers[data.date], 'chat.log');
				}
			});
		}
	},
	enabled: false,
	init: function(bypass){
		// is player logged in?
		if (bypass || !socket.enabled) {
			socket.zmq = new ab.Session('wss://' + g.socketUrl + '/wss2/', function () {
				// on open
				socket.connectionSuccess();
			}, function () {
				// on close/fail
				socket.reconnect();
			}, {
				// options
				'skipSubprotocolCheck': true
			});
		}
	},
	initialConnection: true,
	connectionSuccess: function(){
		socket.enabled = true;
		console.info("Socket connection established with server");
		// chat updates
		if (socket.initialConnection){
			socket.initialConnection = false;
			// subscribe to town-1 default channel - general chat
			var town = 'ng2:town-1';
			console.info("subscribing to channel: ", town);
			chat.log("You have joined channel: town-1", 'chat-warning');
			my.channel = town;
			socket.zmq.subscribe(town, function(topic, data) {
				console.info('rx ', topic, data);
				route.town(data, data.route);
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
				} else {
					setTimeout(repeat, 200);
				}
			})();
		}
		socket.setChannel(chat.channel);
	},
	connectionTries: 0,
	connectionRetryDuration: 100,
	reconnect: function(){
		console.warn('WebSocket connection failed. Retrying...');
		socket.enabled = false;
		setTimeout(socket.init, socket.connectionRetryDuration);
	}
}