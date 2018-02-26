// chat.js
var chat = {
	prefix: 'ng2:',
	default: 'town',
	getChannel: function() {
		return chat.prefix + my.channel;
	},
	// receives channel prop from index.php
	html: function() {
		var s =
			'<div id="chat-present-wrap" class="no-select">' +
				'<div id="chat-header">town</div>' +
				'<div id="chat-room"></div>' +
			'</div>' +
			'<div id="chat-log-wrap">' +
				'<div id="chat-log">' +
					'<div>Welcome to Vandamor.</div>' +
					'<div class="chat-warning">Nevergrind 2 is still in development, but feel free to test it out!</div>' +
					'<div class="chat-emote">Type /help or /h for a list of chat commands.</div>' +
				'</div>' +
				'<div id="chat-prompt" class="no-select">'+
				'</div>' +
				'<div id="chat-input-wrap">' +
					'<div id="chat-input-mode" class="chat-white no-select">'+
						'<span id="chat-mode-msg" class="ellipsis">To town:</span>' +
					'</div>' +
					'<input id="chat-input" type="text" maxlength="240" autocomplete="off" spellcheck="false" />' +
				'</div>' +
			'</div>';

		return s;
	},
	initialized: 0,
	isClicked: false,
	hasFocus: false,
	count: 1, // total msgs in chat; used to count messages in memory instead of by DOM
	players: [],
	lastWhisper: {
		name: ''
	},
	mode: {
		types: [
			'/say',
			'/party',
			'/gsay'
		],
		command: '/say',
		name: '',
		change: function(h){
			// only trim leading spaces
			var mode = h === undefined ? (chat.dom.chatInput.value + ng.lastKey) : h.mode,
				mode = mode.replace(/^\s+/g, '');

			// known standard mode
			if (chat.mode.types.indexOf(mode) > -1) {
				chat.mode.command = mode;
				chat.mode.set(mode);
				if (!h) {
					chat.dom.chatInput.value = '';
				}
				return true;
			}
			// it's a whisper
			else if ( (h && mode[0]) === '@' ||
				(!h && mode[0] === '@' && ng.lastKey === ' ') ) {
				// history mode and mode is @
				// or not history mode and mode is @ and just hit space!
				if (h) {
					name = h.name;
				}
				else {
					var parse = chat.parseMsg(mode),
						name = parse.first.substr(1);

					name = name.toLowerCase();
					name = name[0].toUpperCase() + name.substr(1);
				}
				chat.mode.command = '@';
				chat.mode.name = name;
				chat.mode.set(chat.mode.command);
				if (!h) {
					chat.dom.chatInput.value = '';
				}
				return true;
			}
			else {
				return false;
			}
		},
		set: function(mode) {
			if (mode === '/say') {
				chat.dom.chatInputMode.className = 'chat-white';
				chat.dom.chatModeMsg.textContent = 'To ' + my.channel + ':';
			}
			else if (mode === '/party') {
				chat.dom.chatInputMode.className = 'chat-party';
				chat.dom.chatModeMsg.textContent = 'To party:';
			}
			else if (mode === '/gsay') {
				chat.dom.chatInputMode.className = 'chat-guild';
				chat.dom.chatModeMsg.textContent = 'To guild:';
			}
			else if (mode === '@') {
				chat.dom.chatInputMode.className = 'chat-whisper';
				chat.dom.chatModeMsg.textContent = 'To '+ chat.mode.name +':';
			}
		},
	},
	dom: {},
	init: function() {
		// default initialization of chat
		if (!chat.initialized) {
			var e = document.getElementById('chat-wrap');
			e.innerHTML = '';
			e.style.display = 'flex';
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

			$("#chat-prompt").on(env.click, '.chat-prompt-yes', function(e){
				chat.prompt.confirm($(this).data());
			});

			$("#chat-prompt").on(env.click, '.chat-prompt-no', function(e){
				chat.prompt.deny($(this).data());
			});

			$("#chat-room").on(env.context, '.chat-player', function() {
				var id = $(this).parent().attr('id'),
					arr = id.split("-"),
					playerId = arr[2] * 1,
					text = $(this).text(),
					a2 = text.split(":"),
					name = a2[1].replace(/\]/g, '').trim();

				// console.info('id name ', playerId, name);
				context.getChatMenu(name);
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
		chat.dom.chatInputMode = document.getElementById('chat-input-mode');
		chat.dom.chatModeMsg = document.getElementById('chat-mode-msg');
		chat.dom.chatPrompt = document.getElementById('chat-prompt');

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
	historyIndex: 0,
	history: [],
	updateHistory: function(msg) {
		var o = {
			msg: msg,
			mode: chat.mode.command
		};
		if (chat.mode.command === '@') {
			o.name = chat.mode.name;
		}
		chat.history.push(o);
		chat.historyIndex = chat.history.length;
	},
	help: function() {
		var z = 'class="chat-emote"',
			h = 'class="chat-help-header"',
			s = [
				'<div '+ h +'>Main Chat Channels:</div>',
				'<div '+ z +'>/say : Say a message in your current chat channel : /say hail</div>',
				'<div '+ z +'>/party : Message your party : /party hail</div>',
				'<div '+ z +'>/gsay : Message your guild : /gsay hail</div>',
				'<div '+ z +'>@ : Send a private message by name : @bob hi</div>',
				'<div '+ h +'>Change Channels:</div>',
				'<div '+ z +'>/join channel : Join a channel : /join bros</div>',
				'<div '+ h +'>Social Commands:</div>',
				'<div '+ z +'>/flist or /friends : Show your friends\' online status</div>',
				'<div '+ z +'>/friend add : Add a friend : /friend add Bob</div>',
				'<div '+ z +'>/friend remove : Remove a friend : /friend remove Bob</div>',
				'<div '+ z +'>/ignore : Show your ignore list</div>',
				'<div '+ z +'>/ignore add : Add someone to your ignore list</div>',
				'<div '+ z +'>/ignore remove : Remove someone from your ignore list</div>',
				'<div '+ z +'>/who : Show all players currently playing</div>',
				'<div '+ z +'>/who class : Show current players by class : /who warrior</div>',
				'<div '+ h +'>Party Commands</div>',
				'<div '+ z +'>/invite: Invite a player to your party : /invite Bob</div>',
				'<div '+ z +'>/disband: Leave your party</div>',
				'<div '+ z +'>/promote: Promote a player in your party to leader : /promote Bob</div>',
				'<div '+ z +'>/boot: Boot a player from the party: /boot Bob</div>',
				'<div '+ h +'>Miscellaneous Commands:</div>',
				'<div '+ z +'>/clear: clear the chat log</div>',
				'<div '+ z +'>/played: Show character creation, session duration, and total playtime</div>',
				'<div '+ z +'>/me : Send an emote to your current chat channel : /me waves</div>',
				'<div '+ z +'>/camp: Exit the game.</div>',
			];
		for (var i=0, len=s.length; i<len; i++) {
			chat.log(s[i]);
		}
	},
	// player hit ENTER
	sendMsg: function(input){
		var msg = input || chat.dom.chatInput.value.trim(),
			msgLower = msg.toLowerCase();

		// bypass via ENTER or chat has focus
		if (msg === '?' || msg === '/h' || msg === '/help') {
			chat.updateHistory(msg);
			chat.help();
		}
		/*
		/random
		/surname
		allow to form parties
			invite
			disband
			leader
			boot
		allow to form guilds
			invite
			disband
			leader
			boot
		 */
		else if (msgLower === '/gmotd') {
			chat.invite();
		}
		else if (msgLower === '/gleader') {
			chat.invite();
		}
		else if (msgLower === '/gremove') {
			chat.invite();
		}
		else if (msgLower === '/ginvite') {
			chat.invite();
		}
		else if (msgLower.indexOf('/promote') === 0) {
			chat.promote(chat.party.parse(msg));
		}
		else if (msgLower.indexOf('/boot') === 0) {
			chat.boot(chat.party.parse(msg));
		}
		else if (msgLower === '/disband') {
			chat.disband();
		}
		else if (msgLower.indexOf('/invite') === 0) {
			chat.invite(chat.party.parse(msg));
		}
		else if (msgLower === '/camp') {
			chat.camp();
		}
		else if (msgLower === '/played') {
			chat.played();
		}
		else if (msgLower.indexOf('/join') === 0) {
			chat.join.channel(chat.join.parse(msg));
		}
		else if (msgLower === '/clear') {
			chat.clearChatLog();
		}
		else if (msgLower === '/who') {
			chat.who.all();
		}
		else if (msgLower.indexOf('/who ') === 0 && msgLower.length > 5) {
			chat.who.class(chat.who.parse(msg));
		}
		else if (msgLower === '/ignore') {
			chat.ignore.list();
		}
		else if (msgLower.indexOf('/ignore remove') === 0) {
			chat.ignore.remove(chat.friend.parse(msg));
		}
		else if (msgLower.indexOf('/ignore add') === 0) {
			chat.ignore.add(chat.friend.parse(msg));
		}
		else if (msgLower === '/friends' || msgLower === '/flist') {
			chat.friend.list();
		}
		else if (msgLower.indexOf('/friend remove') === 0) {
			chat.friend.remove(chat.friend.parse(msg));
		}
		else if (msgLower.indexOf('/friend add') === 0) {
			chat.friend.add(chat.friend.parse(msg));
		}
		else if (msgLower.indexOf('/me') === 0 || msgLower.indexOf('/em') === 0) {
			chat.emote(msg);
		}
		else if (chat.mode.command === '@'){
			// whisper
			if (my.name !== chat.mode.name) {
				if (~ng.ignore.indexOf(chat.mode.name)) {
					chat.log('You sent ' + chat.mode.name + ' a whisper, but you are currently ignoring him.', 'chat-warning');
				}
				$.ajax({
					url: app.url + 'php2/chat/send.php',
					data: {
						action: 'send',
						msg: msg,
						class: 'chat-whisper',
						category: 'name:' + chat.mode.name
					}
				});
			}
		}
		else {
			if (msg) {
				var o = chat.getMsgObject(msg);
				if (o.msg[0] !== '/') {
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
		chat.updateHistory(msg);
		chat.clear();
	},
	parseMsg: function(msg) {
		var arr = msg.replace(/ +/g, " ").split(" ");
		var o = {
			first: arr[0].trim().toLowerCase()
		}
		arr.shift();
		o.command = arr.join(' ');
		return o;
	},
	getMsgObject: function(msg){
		var o = {
			category: chat.getChannel(),
			msg: msg,
			class: 'chat-normal'
		},
			parse = chat.parseMsg(msg),
			a = msg.split(" ");

		a.shift();
		var shortCommandMsg = a.join(" ");

		// is it a command?
		if (parse.first === '/s') {
			o.category = chat.getChannel();
			o.msg = shortCommandMsg;
			o.class = 'chat-normal';
		}
		else if (parse.first === '/p') {
			o.category = 'party:' + my.p_id;
			o.msg = shortCommandMsg;
			o.class = 'chat-party';
		}
		else if (chat.mode.command === '/party'){
			o.category = 'party:' + my.p_id;
			o.msg = msg;
			o.class = 'chat-party';
		}
		else if (parse.first === '/g') {
			o.category = 'guild:' + my.guild.id;
			o.msg = shortCommandMsg;
			o.class = 'chat-guild';
		}
		else if (chat.mode.command === '/gsay'){
			o.category = 'guild:' + my.guild.id;
			o.msg = msg;
			o.class = 'chat-guild';
		}
		else if (parse.first === '/broadcast'){
			o.category = 'admin:broadcast';
			o.msg = parse.command;
			o.class = 'chat-broadcast';
		}
		return o;
	},
	whispers: {},
	clear: function() {
		chat.dom.chatInput.value = '';
	},
	clearChatLog: function(){
		chat.dom.chatLog.innerHTML = '';
	},
	emote: function(msg) {
		var a = msg.split(" ");
		a.shift();
		msg = a.join(" ");
		if (msg[0] !== '/') {
			$.ajax({
				url: app.url + 'php2/chat/send.php',
				data: {
					msg: msg,
					class: 'chat-emote',
					category: chat.getChannel()
				}
			});
		}
	},
	ignore: {
		init: function() {
			ng.ignore = JSON.parse(localStorage.getItem('ignore')) || ng.ignore;
		},
		list: function() {
			if (ng.ignore.length) {
				var s = '<div class="chat-warning">Checking ignore list...</div>';
				ng.ignore.forEach(function(v) {
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
				ng.ignore.push(o);
				localStorage.setItem('ignore', JSON.stringify(ng.ignore));
				chat.log('You have added ' + o + ' to your ignore list.', 'chat-warning');
			}
		},
		remove: function(o) {
			while (ng.ignore.indexOf(o) > -1) {
				var index = ng.ignore.indexOf(o);
				ng.ignore.splice(index, 1);
			}
			localStorage.setItem('ignore', JSON.stringify(ng.ignore));
			chat.log('You have removed ' + o + ' from your ignore list.', 'chat-warning');
		}
	},
	promote: function(name, bypass) {
		console.info('/promote ', name, bypass);
		// must be leader or bypass by auto-election when leader leaves
		var id = my.getPartyMemberIdByName(name);
		if ((my.party[0].isLeader || bypass) && my.p_id && id) {
			$.ajax({
				url: app.url + 'php2/chat/promote.php',
				data: {
					name: name,
					leaderId: id
				}
			}).done(function (data) {
				// console.info('promote ', data);
			}).fail(function (r) {
				chat.log(r.responseText, 'chat-warning');
			});
		}
	},
	disband: function() {
		if (my.p_id) {
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/chat/disband.php'
			}).done(function(r){
				console.info('disband ', r);
				bar.disband();
			}).fail(function(r) {
				chat.log(r.responseText, 'chat-warning');
			});
		}
	},
	boot: function(name, bypass) {
		console.info('/promote ', name, bypass);
		// must be leader or bypass by auto-election when leader leaves
		var id = my.getPartyMemberIdByName(name);
		if ((my.party[0].isLeader || bypass) && my.p_id && id) {
			$.ajax({
				url: app.url + 'php2/chat/boot.php',
				data: {
					name: name,
					id: id
				}
			}).done(function (data) {
				console.info('boot ', data);
			}).fail(function (r) {
				chat.log(r.responseText, 'chat-warning');
			});
		}
	},
	invite: function(p) {
		if (my.name === p) {
			chat.log("You can't invite yourself to a party.", "chat-warning");
		}
		else if (my.p_id && !my.party[0].isLeader) {
			chat.log("You're still in a party! Try /disband to leave your party.", "chat-warning");
		}
		else {
			if (p) {
				chat.log('Sent party invite to '+ p +'.', 'chat-warning');
				$.ajax({
					url: app.url + 'php2/chat/invite.php',
					data: {
						player: p
					}
				}).done(function(r){
					console.info('invite ', r);
					if (r.newParty) {
						my.party[0].isLeader = 1;
						bar.updatePlayerBar(0);
					}
					chat.party.subscribe(r.p_id);
				}).fail(function(r){
					chat.log(r.responseText, 'chat-warning');
				});
			}
			else {
				chat.log("Syntax: /invite [player_name]", "chat-warning");
			}
		}
	},
	camp: function() {
		chat.log('Camping...', 'chat-warning');
		game.exit();
		setTimeout(function(){
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/chat/camp.php'
			}).done(function(){
				location.reload();
			}).fail(function(){
				chat.log('Failed to camp successfully.', 'chat-alert');
			});
		}, 1000);
	},
	reply: function() {
		if (chat.lastWhisper.name) {
			var o = {
				mode: '@',
				name: chat.lastWhisper.name
			}
			chat.mode.change(o);
			chat.dom.chatInput.focus();
		}
	},
	prompt: {
		add: function(data) {
			var s = '',
				e = document.createElement('div'),
				id = ng.getId();

			e.id = 'party-invite-'+ data.row;
			e.className = 'prompt-row prompt-row-' + id + ' ' + data.css;
			// write innerHTML
			s +=
				'<div class="chat-prompt-msg">'+ data.msg +'</div>' + // col 1
				'<div class="chat-prompt-options">'+ // col 2
					'<span data-row="'+ data.row +'" '+
						'data-id="'+ id +'" '+
						'data-action="'+ data.action +'" '+
						'class="chat-prompt-btn chat-prompt-yes">'+
						'<i class="fa fa-check chat-prompt-yes-icon"></i>&thinsp;Confirm'+
					'</span>' +
					'<span data-row="'+ data.row +'" '+
						'data-id="'+ id +'" '+
						'data-name="'+ data.name +'"'+
						'data-action="'+ data.action +'" '+
						'class="chat-prompt-btn chat-prompt-no">'+
						'<i class="fa fa-times chat-prompt-no-icon"></i>&thinsp;Deny'+
					'</span>' +
				'</div>';

			e.innerHTML = s;
			// remove double invites?
			$('#'+ data.action +'-' + data.row).remove();
			chat.dom.chatPrompt.appendChild(e);
			setTimeout(function() {
				$("#" + e.id).remove();
			}, 30000);

			chat.log(data.msg, 'chat-warning');
		},
		confirm: function(data){
			// join party by player id?
			$("#"+ data.action +"-"+ data.row).remove();
			/*
			action: "party-invite"
			id: 2
			row: 188
			 */
			// use data.row to join ng2_parties
			// actually add me to the party and ZMQ msg on callback success
			// and call a method to draw the whole party including hp, mp, names etc
			// party table needs extra values... hp, mp, buffs, etc
			console.info('Joining party: ', data.row, data);
			chat.party.join(data);
		},
		deny: function(data){
			console.info('deny ', data);
			$("#"+ data.action +"-"+ data.row).remove();
			socket.zmq.publish("name:"+ data.name, {
				action: 'party-deny',
				name: my.name
			});
		}
	},
	party: {
		subscribe: function(row) {
			socket.initParty(row);
		},
		join: function(z) {
			// clicked CONFIRM
			console.info('party.join: ', z);
			$.ajax({
				url: app.url + 'php2/chat/party-join.php',
				data: {
					row: z.row
				}
			}).done(function(data){
				console.info("party-join.php ", data);
				chat.log("You have joined the party.", "chat-warning");
				chat.party.subscribe(z.row);
				bar.getParty();
			}).fail(function(data){
				console.info("Oh no", data);
				chat.log(data.responseText, 'chat-warning');
			});
		},
		parse: function(msg) { // 2-part upper case
			var a = msg.replace(/ +/g, " ").split(" ");
			return a[1] === undefined ?
				'' : (a[1][0].toUpperCase() + a[1].substr(1).toLowerCase()).trim();
		},

	},
	whisper: {
		parse: function(msg) { // 2-part parse lower case
			var a = msg.split("whispers: ");
			return a[1];
		},
		prefix: function() {
			return '[' + my.level +':<span class="chat-'+ my.job +'">'+ my.name + '</span>]';
		}
	},
	friend: {
		parse: function(o) { // 3-part parse
			var a = o.replace(/ +/g, " ").split(" ");
			return a[2][0].toUpperCase() + a[2].substr(1);
		},
		init: function() {
			ng.friends = ng.friends || [];
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/chat/friend-get.php',
			}).done(function(data){
				ng.friends = data;
			});
		},
		list: function() {
			chat.log('<div class="chat-warning">Checking friends list...</div>');
			if (ng.friends.length){
				$.ajax({
					type: 'GET',
					url: app.url + 'php2/chat/friend-status.php'
				}).done(function(r){
					ng.friends = r.friends;
					console.info(r);
					var str = '<div>Friend List ('+ r.friends.length +')</div>';

					ng.friends.forEach(function(name, i){
						var index = r.players.indexOf(name);
						if (index > -1){
							var s = r.stats[index];
							// online
							str +=
								'<div class="chat-whisper">[' +
								s.level +' '+ ng.jobLong[s.job] +'] '+ ng.friends[i] + ' ('+ s.race +
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
			if (~ng.friends.indexOf(o)) {
				chat.log(o + " is already your friend.", 'chat-warning');
			}
			else if (o.length > 1 && o !== my.name) {
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
						chat.log('You have added ' + o + ' to your friend list.', 'chat-warning');
						socket.zmq.subscribe('friend:'+ o, function(topic, data) {
							chat.friend.notify(topic, data);
						});

						if (!~ng.friends.indexOf(o)) {
							socket.zmq.publish('name:' + o, {
								name: my.name,
								route: "friend>addedMe"
							});
						}

						ng.friends.push(o);
					}
				});
			}
		},
		remove: function(o) {
			if (o.length > 1 && o !== my.name && ng.friends.indexOf(o) > -1) {
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
						chat.log('You have removed ' + o + ' from your friend list.', 'chat-warning');
						while (ng.friends.indexOf(o) > -1) {
							var index = ng.friends.indexOf(o);
							ng.friends.splice(index, 1);
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
		parse: function(msg) { // complex parse for class names
			var a = msg.replace(/ +/g, " ").split(" "),
				job = a[1],
				longJob = job[0].toUpperCase() + job.substr(1);

			// long name?
			if (ng.jobs.indexOf(longJob) > -1) {
				// convert to short
				return ng.jobShort[longJob];
			}
			else {
				var shortJobs = Object.keys(ng.jobLong),
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
							v.level +' '+ ng.jobLong[v.job] +'] '+ v.name + ' ('+ v.race +
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
				var jobLong = ng.toJobLong(job);
				if (r.len) {
					chat.log("There " + (r.len > 1 ? "are" : "is") +" currently "+
						r.len + " "+ (r.len > 1 ? jobLong + 's' : jobLong) +" in Vandamor.", "chat-warning");
					// online
					var str = '';
					r.players.forEach(function(v, i){
						str +=
							'<div class="chat-whisper">[' +
							v.level +' '+ ng.jobLong[v.job] +'] '+ v.name + ' ('+ v.race +
							')</div>';
					});
					chat.log(str, 'chat-whisper');
				}
				else if (!jobLong) {
					chat.log("No results found. Try searching by a class name /who cleric.", "chat-warning");
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
			'<div id="chat-player-'+ v.id +'">'+
				'<span class="chat-player">['+ v.level +':<span class="chat-'+ v.job +'">'+ v.name +'</span>]</span>'+
			'</div>';
		});
		if (s) {
			chat.dom.chatRoom.innerHTML = s;
		}
	},
	setHeader: function() {
		// or chat.inChannel.length ?
		chat.dom.chatHeader.innerHTML = my.channel + '&thinsp;(' + $(".chat-player").length + ')';
	},
	join: {
		parse: function(msg) { // 2 part parse lower case
			var c = msg.replace(/ +/g, " ").split(" ");
			return c[1] === undefined ?
				'' : c[1].toLowerCase().trim();
		},
		channel: function(channel) {
			if (ng.view === 'town') {
				if (channel) {
					// remove from channel
					if (channel !== my.channel) {
						$.ajax({
							url: app.url + 'php2/chat/set-channel.php',
							data: {
								channel: channel
							}
						}).done(function (data) {
							chat.join.changeCallback(data);
						});
					}
				}
				else {
					chat.join.default();
				}
			}
		},
		default: function() {
			if (my.channel !== chat.default) {
				$.ajax({
					url: app.url + 'php2/chat/set-channel.php',
					data: {
						channel: chat.default
					}
				}).done(function (data) {
					chat.join.changeCallback(data);
				});
			}
		},
		changeCallback: function(data) {
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
			socket.zmq.subscribe(data.fullChannel, function (topic, data) {
				socket.routeMainChat(topic, data);
			});
			// add to chat channel
			chat.setHeader();
			chat.broadcast.add();
		}
	},
	// players receive update from socket
	addPlayer: function(v) {
		// console.info('chat.inChannel', v.row, chat.inChannel);
		if (chat.inChannel.indexOf(v.row) === -1) {
			var e = document.createElement('div');
			e.innerHTML =
			'<div id="chat-player-'+ v.row +'">'+
				'<span class="chat-player">['+ v.level +':<span class="chat-'+ v.job +'">'+ v.name +'</span>]</span>'+
			'</div>';
			chat.dom.chatRoom.appendChild(e);
			chat.inChannel.push(v.row);
			chat.setHeader();
		}
	},
	removePlayer: function(v) {
		var e = document.getElementById('chat-player-' + v.row);
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