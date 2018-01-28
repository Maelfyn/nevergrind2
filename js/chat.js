// chat.js
chat = Object.assign(chat, {
	// receives channel prop from index.php
	html: function() {
		var lorem = '<div>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</div>';

		var s =
			'<div id="chat-log">Welcome to Vandamor.</div>' +
			//'<div id="chat-log">'+ lorem +'</div>' +
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
	// send to server
	getMsgObject: function(msg){
		var o = {
				msg: msg,
				class: 'chat-normal'
			},
			arr = msg.split(" "),
			firstWord = arr[0].trim(),
			commandMsg = arr.shift(),
			commandMsg = arr.join(' ');

		console.info("getMsgObject: ", firstWord, commandMsg);

		// is it a command?
		if (firstWord === '/friend'){
			chat.listFriends();
		}
		else if (firstWord === '/friend '){
			chat.toggleFriend(msg.slice(8));
		}
		else if (firstWord === '/unignore '){
			var account = msg.slice(10);
			chat.removeIgnore(account);
		}
		else if (firstWord === '/ignore'){
			chat.listIgnore();
		}
		else if (msg === '/ignore '){
			chat.addIgnore(msg.slice(8));
		}
		else if (firstWord === '/join ' || firstWord[0] === '#' || firstWord === '/j '){
			chat.changeChannel(msg, firstWord);
		}
		else if (firstWord === '/whisper ' || firstWord === '/w ' || firstWord[0] === '@'){
			chat.sendWhisper(msg , firstWord);
		}
		else if (firstWord[0] === '`'){
			o.msg = msg.substr(1);
			o.class = 'chat-hidden';
		}
		else if (firstWord[0] === '>'){
			o.msg = msg;
			o.class = 'chat-implying';
		}
		else if (firstWord === '/me') {
			o.msg = commandMsg;
			o.class = 'chat-emote';
		}
		return o;
	},
	historyIndex: 0,
	history: [],
	sendMsg: function(bypass){
		var msg = dom.chatInput.value.trim();
		// bypass via ENTER or chat has focus
		if (bypass || chat.hasFocus){
			if (msg){
				var o = chat.getMsgObject(msg);
				if (o.msg[0] !== '/'){
					chat.history.push(msg);
					chat.historyIndex = chat.history.length;
					$.ajax({
						url: g.url + 'php2/chat/send.php',
						data: {
							msg: o.msg,
							class: o.class,
							route: 'chat.log'
						}
					});
				}
				dom.chatInput.value = '';
			}
		}
	},
	// to server
	sendWhisper: function(msg, splitter){
		// account
		var arr = msg.split(splitter);
		var account = arr[1].split(" ").shift();
		// message
		var splitLen = splitter.length;
		var accountLen = account.length;
		var msg = msg.substr(splitLen + accountLen + 1);
		$.ajax({
			url: g.url + 'php/insertWhisper.php',
			data: {
				account: account,
				playerColor: my.playerColor,
				msg: msg,
				action: 'send'
			}
		});
	},
	// rx routing
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
	},
	changeChannel: function(msg, splitter){
		var arr = msg.split(splitter);
		socket.setChannel(arr[1]);
	},
	scrollBottomTimer: 0,
	scrollBottom: function(){
		if (!chat.isClicked){
			clearTimeout(chat.scrollBottomTimer);
			chat.scrollBottomTimer = setTimeout(function(){
				dom.chatLog.scrollTop = dom.chatLog.scrollHeight;
			}, 33);
		}
	},
	listFriends: function(){
		var len = g.friends.length;
		g.chat('<div>Checking friends list...</div>');
		if (g.friends.length){
			$.ajax({
				url: g.url + 'php/friendStatus.php',
				data: {
					friends: g.friends
				}
			}).done(function(data){
				var str = '<div>Friend List ('+ len +')</div>';
				for (var i=0; i<len; i++){
					var index = data.players.indexOf(g.friends[i]);
					if (index > -1){
						// online
						str += '<div><span class="chat-online titlePlayerAccount">' + g.friends[i] + '</span>';
						if (typeof data.locations[index] === 'number'){
							str += ' playing in game: ' + data.locations[index];
						} else {
							str += ' in chat channel: ';
							if (g.view === 'title'){
								// enable clicking to change channel
								str += '<span class="chat-online chat-join">' + data.locations[index] + '</span>';
							} else {
								// not in a game ?
								str += data.locations[index];
							}
						}
						
						str += '</div>';
					} else {
						// offline
						str += '<div><span class="chat-muted titlePlayerAccount">' + g.friends[i] +'</span></div>';
					}
				}
				g.chat(str);
			});
		} else {
			g.chat("<div>You don't have any friends! Use /friend account to add a new friend.</div>", 'chat-muted');
		}
	},
	friendGet: function(){
		// friend list
		g.friends = [];
		$.ajax({
			type: 'GET',
			url: g.url + 'php/friendGet.php',
		}).done(function(data){
			data.friends.forEach(function(friend){
				g.friends.push(friend);
			});
		});
	},
	toggleFriend: function(account){
		account = account.trim();
		if (account !== my.account){
			console.info('toggle: ', account, account.length);
			$.ajax({
				url: g.url + 'php/friendToggle.php',
				data: {
					account: account
				}
			}).done(function(data){
				if (data.action === 'fail'){
					g.chat('You cannot have more than 20 friends!');
				} else if (data.action === 'remove'){
					g.chat('Removed '+ account +' from your friend list');
					chat.friendGet();
				} else if (data.action === 'add'){
					g.chat('Added '+ account +' to your friend list');
					chat.friendGet();
				}
			});
		} else {
			// cannot add yourself
			g.chat("You can't be friends with yourself!", 'chat-muted');
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
			url: g.url + 'php/whoUser.php',
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
	help: function(){
		var str = 
			'<h5 class="chat-warning">Chat Commands:</h5>\
			<div>#channel: join channel</div>\
			<div>@account: whisper user</div>\
			<div>/ignore account: ignore account</div>\
			<div>/unignore account: stop ignoring account</div>\
			<div>/friend account: add/remove friend</div>\
			<div>/who account: check account info (or click account name)</div>\
			<h5 class="chat-warning">Title screen lobbies only:</h5>\
			<div>/url url: share URL</div>\
			<div>/img url: share image</div>\
			<div>/video youtube_url: share video</div>\
			';
		var o = {
			msg: str,
			type: 'chat-muted'
		};
		title.chat(o);
	},
	broadcast: function(msg){
		$.ajax({
			url: g.url + 'php/insertBroadcast.php',
			data: {
				msg: msg
			}
		});
	}
});