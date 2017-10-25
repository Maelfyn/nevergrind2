// chat.js
chat = Object.assign(chat, {
	// receives channel prop from index.php
	players: [],
	lastWhisper: {
		timestamp: Date.now(),
		account: '',
		message: ''
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
		var flag = my.flag.split(".");
		flag = flag[0].replace(/ /g, "-");
		$.ajax({
			url: 'php/insertWhisper.php',
			data: {
				account: account,
				flag: flag,
				playerColor: my.playerColor,
				message: msg,
				action: 'send'
			}
		});
	},
	// send to server
	sendMsg: function(bypass){
		var msg = $dom.chatInput.val().trim();
		// bypass via ENTER or chat has focus
		if (bypass || title.chatOn){
			if (msg){
				// is it a command?
				if (msg === '/friend'){
					chat.listFriends();
				} else if (msg.indexOf('/friend ') === 0){
					chat.toggleFriend(msg.slice(8));
				} else if (msg.indexOf('/unignore ') === 0){
					var account = msg.slice(10);
					chat.removeIgnore(account);
				} else if (msg === '/ignore'){
					chat.listIgnore();
				} else if (msg.indexOf('/ignore ') === 0){
					var account = msg.slice(8);
					chat.addIgnore(account);
				} else if (msg.indexOf('/join ') === 0){
					chat.changeChannel(msg, '/join ');
				} else if (msg.indexOf('#') === 0){
					chat.changeChannel(msg, '#');
				} else if (msg.indexOf('/j ') === 0){
					chat.changeChannel(msg, '/j ');
				} else if (msg.indexOf('/whisper ') === 0){
					chat.sendWhisper(msg , '/whisper ');
				} else if (msg.indexOf('/w ') === 0){
					chat.sendWhisper(msg , '/w ');
				} else if (msg.indexOf('@') === 0){
					chat.sendWhisper(msg , '@');
				} else if (msg.indexOf('/who ') === 0){
					chat.who(msg);
				} else if (msg.indexOf('/broadcast ') === 0){
					chat.broadcast(msg);
				} else if (msg.indexOf('/url ') === 0){
					chat.url(msg);
				} else if (msg.indexOf('/img ') === 0){
					chat.img(msg);
				} else if (msg.indexOf('/video ') === 0){
					chat.video(msg);
				} else if (msg.indexOf('/fw-paid ') === 0){
					var account = msg.slice(8);
					chat.fwpaid(account);
				} else {
					if (msg.charAt(0) === '/' && msg.indexOf('/me') !== 0 || msg === '/me'){
						// skip
					} else {
						$.ajax({
							url: 'php/insertTitleChat.php',
							data: {
								message: msg
							}
						});
					}
				}
			}
			dom.chatInput.val('');
		}
	},
	// report to client
	send: function(msg, type){
		var o = {
			message: msg,
			type: type
		};
		if (o.message && dom.chatLog !== null){
			while (dom.chatLog.childNodes.length > 500) {
				dom.chatLog.removeChild(dom.chatLog.firstChild);
			}
			if (o.type === 'inserted-image'){
				(function repeat(count){
					if (++count < 10){
						chat.scrollBottom();
						setTimeout(repeat, 200, count);
					}
				})(0);
			}
			var z = document.createElement('div'); 
			if (o.type){
				z.className = o.type;
			}
			z.innerHTML = o.message;
			dom.chatLog.appendChild(z);
			chat.scrollBottom();
			if (o.notify){
				g.sendNotification(data);
			}
		}
	},
	// routing
	chatReceive: function(data){
		if (g.view === 'title'){
			// title
			if (data.type === 'remove'){
				title.removePlayer(data);
			} else if (data.type === 'add'){
				title.addPlayer(data.account, data.flag, data.rating);
			} else {
				if (data.message !== undefined){
					title.chat(data);
				}
			}
		} else if (g.view === 'lobby'){
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
				if (data.message !== undefined){
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
			
			if (data.message){
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
	chatDrag: false,
	chatOn: false,
	scrollBottom: function(){
		if (!title.chatDrag){
			dom.chatLog.scrollTop = dom.chatLog.scrollHeight;
		}
	},
	chat: function (data){
		if (g.view === 'title' && data.message){
			while (dom.chatLog.childNodes.length > 500) {
				dom.chatLog.removeChild(dom.chatLog.firstChild);
			}
			if (data.type === 'inserted-image'){
				(function repeat(count){
					if (++count < 10){
						chat.scrollBottom();
						setTimeout(repeat, 200, count);
					}
				})(0);
			}
			var z = document.createElement('div'); 
			if (data.type){
				z.className = data.type;
			}
			z.innerHTML = data.message;
			dom.chatLog.appendChild(z);
			chat.scrollBottom();
			if (!data.skip){
				g.sendNotification(data);
			}
		}
	},
	listFriends: function(){
		var len = g.friends.length;
		g.chat('<div>Checking friends list...</div>');
		if (g.friends.length){
			$.ajax({
				url: 'php/friendStatus.php',
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
			url: 'php/friendGet.php',
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
				url: 'php/friendToggle.php',
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
			url: 'php/whoUser.php',
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
			message: str,
			type: 'chat-muted'
		};
		title.chat(o);
	},
	broadcast: function(msg){
		$.ajax({
			url: 'php/insertBroadcast.php',
			data: {
				message: msg
			}
		});
	},
	url: function(url){
		$.ajax({
			url: 'php/insertUrl.php',
			data: {
				url: url
			}
		});
	},
	img: function(url){
		$.ajax({
			url: 'php/insertImg.php',
			data: {
				url: url
			}
		});
	},
	video: function(url){
		$.ajax({
			url: 'php/insertVideo.php',
			data: {
				url: url
			}
		});
	},
	fwpaid: function(msg){
		$.ajax({
			url: 'php/fwpaid.php',
			data: {
				message: msg
			}
		});
	}
});