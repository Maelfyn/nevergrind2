// ws.js
var socket = {
	initialConnection: true,
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
					socket.removePlayer(my.account);
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
	enableWhisper: function(){
		var channel = 'account:' + my.account;
		console.info("subscribing to whisper channel: ", channel);
		socket.zmq.subscribe(channel, function(topic, data) {
			console.info(channel, data.action);
			if (data.message){
				if (data.action === 'send'){
					console.info("SENT: ", topic, data);
					// message sent to user
					var flag = my.flag.split(".");
					flag = flag[0].replace(/ /g, "-");
					my.lastReceivedWhisper = data.account;
					$.ajax({
						url: g.url + 'php/insertWhisper.php',
						data: {
							action: "receive",
							flag: data.flag,
							playerColor: data.playerColor,
							account: data.account,
							message: data.message
						}
					});
					data.type = 'chat-whisper';
					data.msg = data.message;
					data.message = data.chatFlag + data.account + ' whispers: ' + data.message;
					chat.log(data);
				} else {
					// message receive confirmation to original sender
					console.info("CALLBACK: ", topic, data);
					if (data.timestamp - chat.lastWhisper.timestamp < 500 &&
						data.account === chat.lastWhisper.account &&
						data.message === chat.lastWhisper.message){
						// skip message
					} else {
						// reference values to avoid receiving double messages when a player is in the lobby multiple times
						// this causes multiple response callbacks
						chat.lastWhisper.account = data.account;
						chat.lastWhisper.timestamp = data.timestamp;
						chat.lastWhisper.message = data.message;
						// send message
						data.msg = data.message;
						data.message = data.chatFlag + 'To ' + data.account + ': ' + data.message;
						data.type = 'chat-whisper';
						chat.receiveWhisper(data);
					}
				}
			}
		});
		/*
		(function keepAliveWs(){
			socket.zmq.publish('admin:broadcast', {
				time: Date.now()
			});
			setTimeout(keepAliveWs, 30000);
		})();
		*/
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
	enabled: false,
	init: function(){
		// is player logged in?
		socket.zmq = new ab.Session('wss://' + g.socketUrl + '/wss2/', function(){
			// on open
			socket.connectionSuccess();
		}, function(){
			// on close/fail
			socket.reconnect();
		}, {
			// options
			'skipSubprotocolCheck': true
		});
	},
	connectionSuccess: function(){
		socket.enabled = true;
		console.info("Socket connection established with server");
		// chat updates
		if (socket.initialConnection){
			var town = 'ng2:town-1';
			console.info("subscribing to channel: ", town);
			chat.log("You have joined channel: town-1", 'chat-warning');
			socket.zmq.subscribe(town, function(topic, data) {
				console.info("ng2:town-1: ", topic, data);
				route.town(data, data.route);
			});
			var admin = 'admin:broadcast';
			console.info("subscribing to channel: ", admin);
			socket.zmq.subscribe(admin, function(topic, data) {
				console.info("socket rx time: ", Date.now() - chat.sendTimer, topic, data);
				if (data.msg){
					g.chat(data.msg, data.type);
				}
			});
			(function repeat(){
				if (my.account){
					socket.enableWhisper();
				}
				else {
					setTimeout(repeat, 1000);
				}
			})();
		}
		socket.initialConnection = false;
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