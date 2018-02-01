// chat.js
var chat = {
	channel: "town",
	// receives channel prop from index.php
	html: function() {
		var s =
			'<div id="chat-log">' +
				'<div>Welcome to Vandamor.</div>' +
				'<div class="chat-emote">Type /help or /h for a list of chat commands.</div>' +
			'</div>' +
			'<input id="chat-input" type="text" maxlength="240" autocomplete="off" spellcheck="false" />';

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
		// dom
		dom.chatLog = document.getElementById('chat-log');
		dom.chatInput = document.getElementById('chat-input');
		chat.count = dom.chatLog.childElementCount;
	},
	// report to chat-log
	log: function(msg, route){
		if (msg){
			if (chat.count >= 500) {
				dom.chatLog.removeChild(dom.chatLog.firstChild);
			}
			else {
				chat.count++;
			}
			var z = document.createElement('div');
			if (route){
				z.className = route;
			}
			z.innerHTML = msg;
			dom.chatLog.appendChild(z);
			chat.scrollBottom();
		}
	},
	parseMsg: function(msg) {
		var arr = msg.split(" ");
		var o = {
			first: arr[0].trim()
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
				category: my.channel
			};
		var parse = chat.parseMsg(msg);

		console.info("getMsgObject: ", parse.first, parse.command);

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
	help: function() {
		var z = 'class="chat-emote"',
			s = [
				'<div class="chat-warning">Chat Commands:</div>',
				'<div '+ z +'>/p : Message your party : /p hail</div>',
				'<div '+ z +'>/g : Message your guild : /g hail</div>',
				'<div '+ z +'>@ : Send a private message by name : @bob hi</div>',
				'<div '+ z +'>/ooc : Send a message out of character : /ooc hail</div>',
				'<div '+ z +'>/shout : Shout a message : /shout hail</div>',
				'<div '+ z +'>/me : Send an emote : /me waves</div>',
				'<div '+ z +'>/friend : Show your friends\' online status</div>'
			];
		for (var i=0, len=s.length; i<len; i++) {
			chat.log(s[i]);
		}
	},
	// player hit ENTER
	sendMsg: function(bypass){
		var msg = dom.chatInput.value.trim();
		// bypass via ENTER or chat has focus
		if (msg === '/h' || msg === '/help') {
			chat.help();
		}
		/*
		allow to form parties
			invite
			disband
			leader
		allow to form guilds
			invite
			disband
			leader
		 */
		else if (msg === '/i' || msg === '/ignore') {
			chat.ignore.list();
		}
		else if (msg.indexOf('/i remove') === 0 || msg.indexOf('/ignore remove') === 0) {
			chat.ignore.remove(chat.friend.parse(msg));
		}
		else if (msg.indexOf('/i add') === 0 || msg.indexOf('/ignore add') === 0) {
			chat.ignore.add(chat.friend.parse(msg));
		}
		else if (msg === '/f' || msg === '/friend') {
			chat.friend.list();
		}
		else if (msg.indexOf('/f remove') === 0 || msg.indexOf('/friend remove') === 0) {
			chat.friend.remove(chat.friend.parse(msg));
		}
		else if (msg.indexOf('/f add') === 0 || msg.indexOf('/friend add') === 0) {
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

				$.ajax({
					url: g.url + 'php2/chat/send.php',
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
						chat.history.push(msg);
						chat.historyIndex = chat.history.length;
						$.ajax({
							url: g.url + 'php2/chat/send.php',
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
		dom.chatInput.value = '';
	},
	changeChannel: function(msg, splitter){
		var arr = msg.split(splitter);
		socket.setChannel(arr[1]);
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
			g.ignore.push(o);
			localStorage.setItem('ignore', JSON.stringify(g.ignore));
			chat.log('You have added ' + o + ' to your ignore list.', 'chat-warning');
		},
		remove: function(o) {
			var index = g.ignore.indexOf(o);
			g.ignore.splice(index, 1);
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
				url: g.url + 'php2/chat/friend-get.php',
			}).done(function(data){
				g.friends = data;
			});
		},
		list: function() {
			var len = g.friends.length;
			chat.log('<div class="chat-warning">Checking friends list...</div>');
			if (g.friends.length){
				$.ajax({
					url: g.url + 'php2/chat/friend-status.php',
					data: {
						friends: g.friends
					}
				}).done(function(data){
					var p = data.players;
					console.info(data);
					var str = '<div>Friend List ('+ len +')</div>';
					for (var i=0; i<len; i++){
						var index = p.indexOf(g.friends[i]);
						if (index > -1){
							var s = data.stats[i];
							// online
							str +=
								'<div class="chat-whisper">[' +
								s.level +' '+ g.jobLong[s.job] +'] '+ g.friends[i] + ' ('+ s.race +
								')</div>';
						} else {
							// offline
							str += '<div class="chat-emote">' + g.friends[i] +' [Offline]</div>';
						}
					}
					chat.log(str);
				});
			} else {
				chat.log("<div>You don't have any friends!</div>");
				chat.log("<div class='chat-emote'>Use /friend [name] to add a new friend.</div>");
			}
		},
		add: function(o) {
			if (o.length > 1) {
				$.ajax({
					url: g.url + 'php2/chat/friend-add.php',
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
					}
				});
			}
		},
		remove: function(o) {
			if (o.length > 1) {
				$.ajax({
					url: g.url + 'php2/chat/friend-remove.php',
					data: {
						friend: o
					}
				}).done(function(data){
					if (data.error) {
						chat.log(data.error, 'chat-warning');
					}
					else {
						chat.log('You have removed ' + o + ' from your friends list.', 'chat-warning');
						var index = g.friends.indexOf(o);
						g.friends.splice(index, 1);
					}
				});
			}
		}
	},
	listIgnore: function(){
		var len = g.ignore.length;
		var str = '<div>Ignore List ('+ len +')</div>';
		for (var i=0; i<len; i++){
			str += '<div><span class="chat-muted titlePlayerAccount">' + g.ignore[i] +'</span></div>';
		}
		g.chat(str);
	},
	addIgnore: function(account){
		account = account.trim();
		g.chat('<div>Ignoring '+ account +'</div>');
		if (g.ignore.indexOf(account) === -1 && account){
			if (g.ignore.length < 20){
				if (account !== my.account){
					g.ignore.push(account);
					localStorage.setItem('ignore', JSON.stringify(g.ignore));
					g.chat('Now ignoring account: ' + account, 'chat-muted');
				} else {
					g.chat("<div>You can't ignore yourself!</div><img src='images/chat/random/autism.jpg'>", 'chat-muted');
				}
			} else {
				g.chat('You cannot ignore more than 20 accounts!', 'chat-muted');
			}
		} else {
			g.chat('Already ignoring ' + account +'!', 'chat-muted');
		}
	},
	removeIgnore: function(account){
		account = account.trim();
		g.chat('<div>Unignoring '+ account +'</div>');
		if (g.ignore.indexOf(account) > -1 && account){
			// found account
			var index = g.ignore.indexOf(account);
			g.ignore.splice(index, 1);
			localStorage.setItem('ignore', JSON.stringify(g.ignore));
			g.chat('Stopped ignoring account: ' + account, 'chat-muted');
		} else {
			g.chat(account + ' is not on your ignore list.', 'chat-muted');
		}
	},
	who: function(msg){
		var a = msg.split("/who ");
		$.ajax({
			url: g.url + 'php/who.php',
			data: {
				account: a[1]
			}
		}).done(function(data){
			function getRibbonStr(){
				var str = '';
				if (data.ribbons !== undefined){
					var len = data.ribbons.length;
					if (len){
						str += '<div class="who-ribbon-chat '+ (len >= 24 ? 'wideRack' : 'narrowRack') +'">';
						for (var i=0, len=data.ribbons.length; i<len; i++){
							var z = data.ribbons[i];
							str += '<div class="pointer ribbon ribbon'+ z +'" title="'+ game.ribbonTitle[z] +'" data-ribbon="'+ z +'"></div>';
						}
						str += '</div>';
					}
				}
				return str;
			}
			
			var str = 
			'<div class="row who-wrap">'+
				'<div class="col-xs-8">';
				// left col
				str += data.str;
				if (data.account !== my.account && g.friends.indexOf(data.account) === -1){
					str += '<button style="pointer-events: initial" class="addFriend btn btn-xs fwBlue" data-account="'+ data.account +'">Add Friend</button>';
				}
			str += 
				'</div>'+
				'<div class="col-xs-4">';
				// right col
				str += 
					'<div class="who-avatar-wrap">'+
						data.img +
						'<div class="who-ribbon-wrap">'+
							getRibbonStr()+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>';
			g.chat(str);
		}).fail(function(){
			g.chat('No data found.');
		});
	},
	scrollBottom: function(){
		if (!chat.isClicked){
			dom.chatLog.scrollTop = dom.chatLog.scrollHeight;
		}
	},
	// rx routing - not used now
	chatReceive: function(data){
		if (g.view === 'lobby'){
			// lobby
			//console.info('lobby receive: ', data);
			if (data.type === 'hostLeft'){
				lobby.hostLeft();
			} else if (data.type === 'lobby-set-cpu-difficulty'){
				lobby.updateDifficulty(data);
			} else if (data.type === 'updateGovernment'){
				lobby.updateGovernment(data);
			} else if (data.type === 'updatePlayerColor'){
				lobby.updatePlayerColor(data);
			} else if (data.type === 'updateTeamNumber'){
				lobby.updateTeamNumber(data);
			} else if (data.type === 'countdown'){
				lobby.countdown(data);
			} else if (data.type === 'updateLobbyPlayer'){
				lobby.updatePlayer(data);
			} else if (data.type === 'updateLobbyCPU'){
				lobby.updateCPU(data);
			} else {
				if (data.msg !== undefined){
					lobby.chat(data);
				}
			}
		} else {
			// game
			// console.info('game receive: ', data);
			if (data.type === 'cannons'){
				animate.cannons(data.attackerTile, data.tile, false);
				game.updateTile(data);
			} else if (data.type === 'missile'){
				animate.missile(data.attacker, data.defender, true);
			} else if (data.type === 'nuke'){
				setTimeout(function(){
					animate.nuke(data.tile, data.attacker);
				}, 5000);
			} else if (data.type === 'nukeHit'){
				game.updateTile(data);
				game.updateDefense(data);
			} else if (data.type === 'gunfire'){
				// defender tile update
				animate.gunfire(data.attackerTile, data.tile, data.player === my.player || data.playerB === my.player);
				animate.cannons(data.attackerTile, data.tile, false, 0, .175, 10);
				game.updateTile(data);
				if (data.rewardUnits){
					animate.upgrade(data.tile, 'troops', data.rewardUnits);
				}
			} else if (data.type === 'updateTile'){
				// attacker tile update
				game.updateTile(data);
				game.setSumValues();
				if (data.rewardUnits){
					animate.upgrade(data.tile, 'troops', data.rewardUnits);
				}
				if (data.sfx === 'sniper0'){
					animate.upgrade(data.tile, 'culture');
				}
			} else if (data.type === 'food'){
				if (data.account.indexOf(my.account) > -1){
					audio.play('hup2');
				}
			} else if (data.type === 'upgrade'){
				// fetch updated tile defense data
				game.updateDefense(data);
				animate.upgrade(data.tile, 'shield');
			} else if (data.type === 'eliminated'){
				game.eliminatePlayer(data);
			} else if (data.type === 'endTurnCheck'){
				game.triggerNextTurn(data);
			} else if (data.type === 'disconnect'){
				game.eliminatePlayer(data);
			}

			if (data.msg){
				if (data.type === 'gunfire'){
					// ? when I'm attacked?
					if (data.defender === my.account){
						// display msg?
						game.chat(data);
					}
					// lost attack
				} else {
					game.chat(data);
				}
			}
			if (data.sfx){
				audio.play(data.sfx);
			}
		}
	}
};