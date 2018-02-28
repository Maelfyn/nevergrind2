var bar = {
	init: function() {
		var e = document.getElementById('bar-wrap');
		e.innerHTML = bar.html();
		e.style.display = 'block';

		for (var i=0; i<game.maxPlayers; i++) {
			bar.dom[i] = {
				playerWrap: document.getElementById('bar-player-wrap-' + i),
				name: document.getElementById('bar-name-' + i),
				hpFg: document.getElementById('bar-hp-fg-' + i),
				hpBg: document.getElementById('bar-hp-bg-' + i),
				mpWrap: document.getElementById('bar-mp-wrap-' + i),
				mpFg: document.getElementById('bar-mp-fg-' + i),
			}
		}
		// bar events
		$("#bar-wrap").on(env.context, '.bar-col-icon', function(e){
			var id = $(this).attr('id'),
				arr = id.split("-"),
				slot = arr[3] * 1;

			console.info(id, slot, my.party[slot].name);
			context.getPartyMenu(my.party[slot].name);
		});
	},
	dom: {},
	getPlayerHtml: function(p, i, ignoreWrap) {
		// get bar for one player
		var s = '';
		if (!ignoreWrap) {
			s += '<div id="bar-player-wrap-' + i + '" '+
			'class="bar-player-wrap' + (!i ? ' bar-player-wrap-me' : '') + '" ' +
				'style="display: '+ (i === 0 ? 'flex' : 'none') +'">';
		}
		s += bar.getPlayerInnerHtml(p, i);
		if (!ignoreWrap) {
			s += '</div>';
		}
		return s;
	},
	getPlayerInnerHtml: function(p, i) {
		var s =
		'<div id="bar-col-icon-'+ i +'" class="bar-col-icon player-icon-'+ p.job +'">' +
			'<div id="bar-level-'+ i +'" class="bar-level no-pointer">'+ p.level +'</div>' +
			'<div id="bar-is-leader-'+ i +'" class="bar-is-leader '+ (p.isLeader ? 'block' : 'none') +' no-pointer"></div>' +
		'</div>' +
		'<div class="bar-col-data">' +
			'<div id="bar-name-'+ i +'" class="bar-hp-name">'+ p.name +'</div>' +
			'<div id="bar-hp-wrap-'+ i +'" class="bar-any-wrap">' +
				'<div id="bar-hp-fg-'+ i +'" class="bar-hp-fg"></div>' +
				'<div id="bar-hp-bg-'+ i +'" class="bar-any-bg"></div>' +
			'</div>' +
			'<div id="bar-mp-wrap-'+ i +'" class="bar-any-wrap">' +
				'<div id="bar-mp-fg-'+ i +'" class="bar-mp-fg"></div>' +
			'</div>' +
		'</div>';
		return s;
	},
	html: function() {
		// my bar
		var s = bar.getPlayerHtml(my.party[0], 0);
		// party bars
		for (var i=0; i<game.maxPlayers; i++) {
			if (my.party[i].name !== my.name) {
				s += bar.getPlayerHtml(my.party[i], i);
			}
		}
		return s;
	},
	updatePlayerBar: function(index) {
		var e = document.getElementById('bar-player-wrap-' + index);
		e.style.display = 'flex';
		e.innerHTML = bar.getPlayerInnerHtml(my.party[index], index);
	},
	party: {
		join: function(data) {
			console.info('bar.party.join ', data);
			chat.log(data.msg, 'chat-warning');
			// refresh party bars
			bar.getParty();
		},
		disband: function(data) {
			var index = 0,
				name = '',
				electNewLeader = 0;
			// did the leader disband or somehow get booted?
			my.party.forEach(function(v, i) {
				if (data.row === v.id) {
					index = i;
					name = v.name;
					if (v.isLeader) {
						electNewLeader = 1;
					}
				}
			});
			// disbanded player found
			if (index) {
				// reset client data to default
				my.party[index] = my.Party();
				document.getElementById('bar-player-wrap-' + index).style.display = 'none';
				chat.log(name + " has disbanded the party.", 'chat-warning');
				// elect new leader if client's id is lowest
				if (electNewLeader && my.isLowestPartyIdMine()) {
					chat.promote(my.getNewLeaderName(), 1);
				}
			}
			// disband if it's me
			// console.info('disband: ', data.row, my.id);
			data.row === my.row && chat.sendMsg('/disband');

		},
		promote: function(data) {
			chat.log(data.name + " has been promoted to party leader.", 'chat-warning');
			// refresh party bars
			bar.getParty();
		},
		boot: function(data) {
			console.info('bar.party.boot ', data);
			chat.log(data.name + " has been booted from the party.", 'chat-warning');
			// refresh party bars
			data.row *= 1;
			bar.party.disband(data);
			bar.getParty();
		}
	},
	getParty: function() {
		console.info("Drawing all bars!");
		if (my.p_id) {
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/chat/party-get-all.php'
			}).done(function (data) {
				console.info('getParty ', data.party);
				var npIndex = 1;
				data.party.forEach(function(v, i){
					console.info('SET BARS ', i, v);
					if (v.name === my.name) {
						my.party[0] = v;
						my.resetClientPartyValues(0);
						bar.updatePlayerBar(0);
					}
					else {
						my.party[npIndex] = v;
						my.resetClientPartyValues(npIndex);
						bar.updatePlayerBar(npIndex++);
					}
				});
				// hide empty rows
				var len = data.party.length;
				for (var i=len; i<game.maxPlayers; i++) {
					document.getElementById('bar-player-wrap-' + i).style.display = 'none';
					my.party[i] = my.Party();
				}
				// continue here
				// TODO: /disband remove bar when person leaves party
				// TODO: leader leaves? New leader logic
				// TODO: add/remove people from party
				// TODO: /promote leader

			});
		}
	},
	disband: function() {
		my.party.forEach(function(v, i){
			if (i) {
				// set client value
				v = my.Party();
			}
		});
		bar.hideParty();
		// update server
		socket.unsubscribe('party:'+ my.p_id);
		my.p_id = 0;
		my.isLeader = 0;
		document.getElementById('bar-is-leader-0').style.display = 'none';
	},
	hideParty: function() {
		my.party.forEach(function(v, i){
			if (i) {
				document.getElementById('bar-player-wrap-' + i).style.display = 'none';
			}
		});
	},
	heartbeat: {
		receive: function(data) {
			console.info('heartbeat.receive', data);
			var index = 0;
			for (var i=1; i<6; i++) {
				if (data.id === my.party[i].id) {
					index = i;
				}
			}
			if (index) {
				my.resetClientPartyValues(index);
			}
		},
		linkdead: function(data) {
			chat.log(data.name + ' has gone linkdead.', 'chat-warning');
		}
	},
	get: function() {

	},
	events: function() {

	}
}