// chat.js
var chat = {
	prefix: 't:',
	getChannel: function() {
		return chat.prefix + my.channel;
	},
	// receives channel prop from index.php
	html: function() {
		var s =
			'<div id="chat-present-wrap">' +
				'<div id="chat-header">&nbsp;</div>' +
				'<div id="chat-room"></div>' +
			'</div>' +
			'<div id="chat-log-wrap">' +
				'<div id="chat-log">' +
					'<div>Welcome to Vandamor.</div>' +
					'<div class="chat-warning">Nevergrind 2 is still in development, but feel free to test it out!</div>' +
					'<div class="chat-emote">Type /help or /h for a list of chat commands.</div>' +
				'</div>' +
				'<input id="chat-input" type="text" maxlength="240" autocomplete="off" spellcheck="false" />' +
			'</div>';

		return s;
	},
	initialized: 0,
	isClicked: false,
	hasFocus: false,
	count: 1, // total msgs in chat; used to count messages in memory instead of by DOM
	players: [],
	lastWhisper: {
		timestamp: Date.now(),
		account: '',
		msg: ''
	},
	dom: {},
	init: function(z) {
		// default initialization of chat
		if (z && !chat.initialized) {
			var e = document.getElementById('chat-wrap');
			e.innerHTML = '';
			e.style.display = z ? 'flex' : 'none';
			e.innerHTML = chat.html();

			chat.initialized = 1;
			// show
			// prevents auto scroll while scrolling
			$("#chat-log").on('mousedown', function(){
				chat.isClicked = 1;
			}).on('mouseup', function(){
				chat.isClicked = 0;
			});
			$("#chat-input").on('focus', function(){
				chat.hasFocus = 1;
			}).on('blur', function(){
				chat.hasFocus = 0;
			});
		}
		else {
			// hide
		}
		// dom cache
		chat.dom.chatRoom = document.getElementById('chat-room');
		chat.dom.chatHeader = document.getElementById('chat-header');
		chat.dom.chatLog = document.getElementById('chat-log');
		chat.dom.chatInput = document.getElementById('chat-input');
	},
	// report to chat-log
	log: function(msg, route){
		if (msg){
			while (chat.dom.chatLog.childElementCount >= 500) {
				chat.dom.chatLog.removeChild(chat.dom.chatLog.firstChild);
			}
			var z = document.createElement('div');
			if (route){
				z.className = route;
			}
			z.innerHTML = msg;
			chat.dom.chatLog.appendChild(z);
			chat.scrollBottom();
		}
	},
	parseMsg: function(msg) {
		var arr = msg.split(" ");
		var o = {
			first: arr[0].trim().toLowerCase()
		}
		arr.shift();
		o.command = arr.join(' ');
		return o;
	},
	// send to server
	getMsgObject: function(msg){
		var o = {
				msg: msg,
				class: 'chat-normal',
				category: chat.getChannel()
			};
		var parse = chat.parseMsg(msg);

		// is it a command?
		if (parse.first === '/p' || parse.first === '/party'){
			o.category = my.party;
			o.msg = parse.command;
			o.class = 'chat-party';
		}
		else if (parse.first === '/g' || parse.first === '/guild'){
			o.category = my.guild;
			o.msg = parse.command;
			o.class = 'chat-guild';
		}
		else if (parse.first === '/ooc'){
			o.msg = parse.command;
			o.class = 'chat-ooc';
		}
		else if (parse.first === '/s' || parse.first === '/shout'){
			o.msg = parse.command;
			o.class = 'chat-shout';
		}
		else if (parse.first[0] === '`'){
			o.msg = msg.substr(1);
			o.class = 'chat-hidden';
		}
		else if (parse.first === '/me') {
			o.msg = parse.command;
			o.class = 'chat-emote';
		}
		else if (parse.first === '/broadcast'){
			o.category = 'admin:broadcast';
			o.msg = parse.command;
			o.class = 'chat-broadcast';
		}
		return o;
	},
	historyIndex: 0,
	history: [],
	updateHistory: function(msg) {
		chat.history.push(msg);
		chat.historyIndex = chat.history.length;
	},
	help: function() {
		var z = 'class="chat-emote"',
			s = [
				'<div class="chat-warning">Chat Commands:</div>',
				'<div '+ z +'>/party /p : Message your party : /p hail</div>',
				'<div '+ z +'>/guild /g : Message your guild : /g hail</div>',
				'<div '+ z +'>/ooc : Send a message out of character : /ooc hail</div>',
				'<div '+ z +'>/shout /s : Shout a message : /s hail</div>',
				'<div '+ z +'>/join /j : Join a channel : /j bros</div>',
				'<div '+ z +'>/me : Send an emote : /me waves</div>',
				'<div '+ z +'>@ : Send a private message by name : @bob hi</div>',
				'<div '+ z +'>/flist or /f : Show your friends\' online status</div>',
				'<div '+ z +'>/f add : Add a friend : /f add Bob</div>',
				'<div '+ z +'>/f remove : Remove a friend : /f remove Bob</div>',
				'<div '+ z +'>/ignore or /i : Show your ignore list</div>',
				'<div '+ z +'>/i add : Add someone to your ignore list</div>',
				'<div '+ z +'>/i remove : Remove someone from your ignore list</div>',
				'<div '+ z +'>/who : Show all players currently playing</div>',
				'<div '+ z +'>/who class : Show current players by class : /who warrior</div>',
				'<div '+ z +'>/clear: clear the chat log</div>',
				'<div '+ z +'>/played: Show character creation, session duration, and total playtime</div>',
			];
		for (var i=0, len=s.length; i<len; i++) {
			chat.log(s[i]);
		}
	},
	// player hit ENTER
	sendMsg: function(bypass){
		var msg = chat.dom.chatInput.value.trim(),
			msgLower = msg.toLowerCase();

		// bypass via ENTER or chat has focus
		if (msg === '/h' || msg === '/help') {
			chat.updateHistory(msg);
			chat.help();
		}
		/*
		/chat
		/invite
		/disband
		/random
		/surname
		update /help
		create placards!
		allow to form parties
			invite
			disband
			leader
		allow to form guilds
			invite
			disband
			leader
		 */
		else if (msgLower === '/played') {
			chat.updateHistory(msgLower);
			chat.played();
		}
		else if (msgLower.indexOf('/j') === 0 || msgLower.indexOf('/join') === 0) {
			chat.updateHistory(msgLower);
			chat.join.channel(chat.join.parse(msg));
		}
		else if (msgLower === '/clear') {
			chat.updateHistory(msgLower);
			chat.clearChatLog();
		}
		else if (msgLower === '/w' || msgLower === '/who') {
			chat.updateHistory(msgLower);
			chat.who.all();
		}
		else if ( (msgLower.indexOf('/w ') === 0 || msgLower.indexOf('/who ') === 0) && msgLower.length > 5) {
			chat.updateHistory(msg);
			chat.who.class(chat.who.parse(msg));
		}
		else if (msgLower === '/i' || msgLower === '/ignore') {
			chat.updateHistory(msgLower);
			chat.ignore.list();
		}
		else if (msgLower.indexOf('/i remove') === 0 || msgLower.indexOf('/ignore remove') === 0) {
			chat.updateHistory(msg);
			chat.ignore.remove(chat.friend.parse(msg));
		}
		else if (msgLower.indexOf('/i add') === 0 || msgLower.indexOf('/ignore add') === 0) {
			chat.updateHistory(msg);
			chat.ignore.add(chat.friend.parse(msg));
		}
		else if (msgLower === '/f' || msgLower === '/friend' || msgLower === '/flist') {
			chat.updateHistory(msgLower);
			chat.friend.list();
		}
		else if (msgLower.indexOf('/f remove') === 0 || msgLower.indexOf('/friend remove') === 0) {
			chat.updateHistory(msg);
			chat.friend.remove(chat.friend.parse(msg));
		}
		else if (msgLower.indexOf('/f add') === 0 || msgLower.indexOf('/friend add') === 0) {
			chat.updateHistory(msg);
			chat.friend.add(chat.friend.parse(msg));
		}
		else if (msg[0] === '@'){
			// whisper
			var parse = chat.parseMsg(msg),
				name = parse.first.substr(1);
			name = name.toLowerCase();
			name = name[0].toUpperCase() + name.substr(1);
			if (my.name !== name) {
				// date stamp for callback
				var d = Date.now();
				chat.whispers[d] = {
					msg: 'You told ' + name + ': ' + parse.command,
					class: 'chat-whisper'
				};
				chat.updateHistory(msg);

				$.ajax({
					url: app.url + 'php2/chat/send.php',
					data: {
						date: d,
						action: 'send',
						msg: parse.command,
						class: 'chat-whisper',
						category: 'name:' + name
					}
				});
			}
		}
		else {
			if (bypass || chat.hasFocus) {
				if (msg) {
					var o = chat.getMsgObject(msg);
					if (o.msg[0] !== '/') {
						chat.updateHistory(msg);
						$.ajax({
							url: app.url + 'php2/chat/send.php',
							data: {
								msg: o.msg,
								class: o.class,
								category: o.category
							}
						});
					}
				}
			}
		}
		chat.clear();
	},
	getPrefix: function() {
		var z = p[my.name],
			s = '[' + z.level + ':<span class="chat-' + z.job + '">' + z.name + '</span>] ';
		return s;
	},
	whispers: {},
	clear: function() {
		chat.dom.chatInput.value = '';
	},
	clearChatLog: function(){
		chat.dom.chatLog.innerHTML = '';
	},
	ignore: {
		init: function() {
			g.ignore = JSON.parse(localStorage.getItem('ignore')) || g.ignore;
		},
		list: function() {
			if (g.ignore.length) {
				var s = '<div class="chat-warning">Checking ignore list...</div>';
				g.ignore.forEach(function(v) {
					s += '<div class="chat-emote">' + v + '</div>';
				});
				chat.log(s);
			}
			else {
				chat.log("Nobody is on your friends list yet.", 'chat-warning');
			}
		},
		add: function(o) {
			if (o !== my.name) {
				g.ignore.push(o);
				localStorage.setItem('ignore', JSON.stringify(g.ignore));
				chat.log('You have added ' + o + ' to your ignore list.', 'chat-warning');
			}
		},
		remove: function(o) {
			while (g.ignore.indexOf(o) > -1) {
				var index = g.ignore.indexOf(o);
				g.ignore.splice(index, 1);
			}
			localStorage.setItem('ignore', JSON.stringify(g.ignore));
			chat.log('You have removed ' + o + ' from your ignore list.', 'chat-warning');
		}
	},
	friend: {
		parse: function(o) {
			var a = o.split(" ");
			return a[2][0].toUpperCase() + a[2].substr(1);
		},
		init: function() {
			g.friends = g.friends || [];
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/chat/friend-get.php',
			}).done(function(data){
				g.friends = data;
			});
		},
		list: function() {
			chat.log('<div class="chat-warning">Checking friends list...</div>');
			if (g.friends.length){
				$.ajax({
					type: 'GET',
					url: app.url + 'php2/chat/friend-status.php'
				}).done(function(r){
					g.friends = r.friends;
					console.info(r);
					var str = '<div>Friend List ('+ r.friends.length +')</div>';

					g.friends.forEach(function(name, i){
						var index = r.players.indexOf(name);
						if (index > -1){
							var s = r.stats[index];
							// online
							str +=
								'<div class="chat-whisper">[' +
								s.level +' '+ g.jobLong[s.job] +'] '+ g.friends[i] + ' ('+ s.race +
								')</div>';
						} else {
							// offline
							str += '<div class="chat-emote">[Offline] ' + name +'</div>';
						}
					});

					chat.log(str);
				});
			} else {
				chat.log("<div>You don't have any friends!</div>");
				chat.log("<div class='chat-emote'>Use /friend [name] to add a new friend.</div>");
			}
		},
		add: function(o) {
			if (o.length > 1 && o !== my.name) {
				$.ajax({
					url: app.url + 'php2/chat/friend-add.php',
					data: {
						friend: o
					}
				}).done(function(data){
					if (data.error) {
						chat.log(data.error, 'chat-warning');
					}
					else {
						chat.log('You have added ' + o + ' to your friends list.', 'chat-warning');
						g.friends.push(o);
						socket.zmq.subscribe('friend:'+ o, function(topic, data) {
							chat.friend.notify(topic, data);
						});
					}
				});
			}
		},
		remove: function(o) {
			if (o.length > 1) {
				$.ajax({
					url: app.url + 'php2/chat/friend-remove.php',
					data: {
						friend: o
					}
				}).done(function(data){
					if (data.error) {
						chat.log(data.error, 'chat-warning');
					}
					else {
						chat.log('You have removed ' + o + ' from your friends list.', 'chat-warning');
						while (g.friends.indexOf(o) > -1) {
							var index = g.friends.indexOf(o);
							g.friends.splice(index, 1);
						}
						socket.unsubscribe('friend:'+ o);
					}
				});
			}
		},
		notify: function(topic, data) {
			if (data.route === 'on') {
				chat.log(data.name + ' has come online.', 'chat-warning');
			}
			else {
				chat.log(data.name + ' has gone offline.', 'chat-warning');
			}
		}
	},
	toPlaytime: function(minLeft) {
		var d = 0,
			h = 0;

		if (minLeft >= 1440) {
			d = Math.floor(minLeft / 1440);
			minLeft = (minLeft % 1440);
		}
		if (minLeft >= 60) {
			h = Math.floor(minLeft / 60);
			minLeft = (minLeft % 60);
		}
		var m = minLeft,
			dayStr = '',
			hourStr = '',
			minStr = '';
		if (d) {
			dayStr += d + (d > 1 ? ' days' : ' day');
		}
		if (h) {
			hourStr += h + (h > 1 ? ' hours' : ' hour');
		}
		// minutes
		minStr = m;
		if (m !== 1) {
			minStr += ' minutes';
		}
		else {
			minStr += ' minute';
		}

		if (d && h && m) {
			dayStr += ', ';
		}
		else if (d) {
			dayStr += ' ';
		}

		if (h) {
			hourStr += ', ';
		}

		if (d || h) {
			minStr = 'and ' + minStr;
		}
		return dayStr + hourStr + minStr;
	},
	toCreateString: function(d) {
		d = new Date(d);
		return d.toDateString() + ' ' + d.toLocaleTimeString();
	},
	played: function() {
		$.ajax({
			type: 'GET',
			url: app.url + 'php2/chat/played.php'
		}).done(function(r) {
			var sessionLen = Date.now() - JSON.parse(sessionStorage.getItem('startTime')),
				durationStr = chat.toPlaytime(~~(sessionLen / 100000));
			chat.log("Character created: " + chat.toCreateString(r.created), 'chat-warning');
			chat.log("Current session duration: " + durationStr, 'chat-whisper');
			chat.log("Total character playtime: " + chat.toPlaytime(r.playtime), 'chat-whisper');
		});
	},
	who: {
		parse: function(msg) {
			var a = msg.split(" "),
				job = a[1],
				longJob = job[0].toUpperCase() + job.substr(1);

			// long name?
			if (g.jobs.indexOf(longJob) > -1) {
				// convert to short
				return g.jobShort[longJob];
			}
			else {
				var shortJobs = Object.keys(g.jobLong),
					job = job.toUpperCase();
				if (shortJobs.indexOf(job)) {
					// is it on the short job list?
					return job;
				}
				else {
					return '';
				}
			}
		},
		all: function(){
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/chat/who-all.php'
			}).done(function(r){
				console.info('who ', r);
				if (r.len) {
					chat.log("There " + (r.len > 1 ? "are" : "is") +" currently "+
						r.len + " "+ (r.len > 1 ? "players" : "players") +" in Vandamor.", "chat-warning");
					// online
					var str = '';
					r.players.forEach(function(v, i){
						str +=
							'<div class="chat-whisper">[' +
							v.level +' '+ g.jobLong[v.job] +'] '+ v.name + ' ('+ v.race +
							')</div>';
					});
					chat.log(str, 'chat-whisper');
				}
				else {
					chat.log("Nobody is currently in Vandamor.", "chat-warning");
				}
			});
		},
		class: function(job){
			console.info('who.class ', job);
			$.ajax({
				url: app.url + 'php2/chat/who-class.php',
				data: {
					job: job
				}
			}).done(function(r){
				console.info('r ', r);
				var jobLong = g.toJobLong(job);
				if (r.len) {
					chat.log("There " + (r.len > 1 ? "are" : "is") +" currently "+
						r.len + " "+ (r.len > 1 ? jobLong + 's' : jobLong) +" in Vandamor.", "chat-warning");
					// online
					var str = '';
					r.players.forEach(function(v, i){
						str +=
							'<div class="chat-whisper">[' +
							v.level +' '+ g.jobLong[v.job] +'] '+ v.name + ' ('+ v.race +
							')</div>';
					});
					chat.log(str, 'chat-whisper');
				}
				else {
					chat.log("Currently there are no " + jobLong + "s in Vandamor.", "chat-warning");
				}


			});
		},
	},
	scrollBottom: function(){
		if (!chat.isClicked){
			chat.dom.chatLog.scrollTop = chat.dom.chatLog.scrollHeight;
		}
	},
	inChannel: [],
	setRoom: function(data) {
		console.info('setRoom', data);
		var s = '';
		chat.inChannel = [];
		data.forEach(function(v){
			chat.inChannel.push(v.id * 1);
			s +=
			'<div id="chat-room-'+ v.id +'">'+
				'<span class="chat-room-player">['+ v.level +':<span class="chat-'+ v.job +'">'+ v.name +'</span>]</span>'+
			'</div>';
		});
		if (s) {
			chat.dom.chatRoom.innerHTML = s;
		}
	},
	setHeader: function() {
		chat.dom.chatHeader.innerHTML = my.channel + '&thinsp;(' + chat.inChannel.length + ')';
	},
	join: {
		parse: function(msg) {
			var c = msg.split(" ");
			return c[1].toLowerCase().trim();
		},
		channel: function(channel) {
			if (g.view === 'town' && channel){
				console.info("JOINING: ", channel);
				// remove from channel
				if (channel !== my.channel){
					$.ajax({
						url: app.url + 'php2/chat/set-channel.php',
						data: {
							channel: channel
						}
					}).done(function(data){
						chat.broadcast.remove();
						console.info("You have changed channel to: ", data);
						chat.setRoom(data.players);
						// removes id
						//socket.removePlayer(my.account);
						// unsubs
						my.channel && socket.unsubscribe(chat.getChannel());
						// set new channel data
						my.channel = data.channel;
						chat.log('You have joined channel: ' + data.channel, 'chat-warning');
						socket.zmq.subscribe(data.fullChannel, function(topic, data) {
							socket.routeMainChat(topic, data);
						});
						// add to chat channel
						chat.setHeader();
						chat.broadcast.add();
					});
				}
			}
		}
	},
	// players receive update from socket
	addPlayer: function(v) {
		console.info('chat.inChannel', v.row, chat.inChannel);
		if (chat.inChannel.indexOf(v.row) === -1) {
			var e = document.createElement('div');
			e.innerHTML =
			'<div id="chat-room-'+ v.row +'">'+
				'<span class="chat-room-player">['+ v.level +':<span class="chat-'+ v.job +'">'+ v.name +'</span>]</span>'+
			'</div>';
			chat.dom.chatRoom.appendChild(e);
			chat.inChannel.push(v.row);
			chat.setHeader();
		}
	},
	removePlayer: function(v) {
		var e = document.getElementById('chat-room-' + v.row);
		e !== null && e.parentNode.removeChild(e);
		var index = chat.inChannel.indexOf(v.row);
		chat.inChannel.splice(index, 1);
		chat.setHeader();
	},
	// player broadcasts updates from client
	broadcast: {
		add: function() {
			console.info('broadcast.add');
			socket.zmq.publish(chat.getChannel(), {
				route: 'chat->add',
				row: my.row,
				level: my.level,
				job: my.job,
				name: my.name
			});
		},
		remove: function() {
			console.info('broadcast.remove');
			socket.zmq.publish(chat.getChannel(), {
				route: 'chat->remove',
				row: my.row
			});
		}
	}
};