var bar = {
	init: function() {
		var e = document.getElementById('bar-wrap');
		e.innerHTML = bar.html();
		e.style.display = 'block';

		for (var i=0; i<game.maxPlayers; i++) {
			bar.setEvents(i);
		}
		// draw all bars
		bar.setAllBars();
		// bar events
		$("#bar-wrap").on(env.context, '.bar-col-icon', function(e){
			var id = $(this).attr('id'),
				arr = id.split("-"),
				slot = arr[3] * 1;

			console.info(id, slot, my.party[slot].name);
			context.getPartyMenu(my.party[slot].name);
		});
	},
	setEvents: function(i) {
		bar.dom[i] = {
			playerWrap: document.getElementById('bar-player-wrap-' + i),
			name: document.getElementById('bar-name-' + i),
			hpFg: document.getElementById('bar-hp-fg-' + i),
			// hpBg: document.getElementById('bar-hp-bg-' + i),
			mpWrap: document.getElementById('bar-mp-wrap-' + i),
			mpFg: document.getElementById('bar-mp-fg-' + i),
		}
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
		// inner portion of getPlayerHtml
		var s =
		'<div id="bar-col-icon-'+ i +'" class="bar-col-icon player-icon-'+ p.job +'">' +
			'<div id="bar-level-'+ i +'" class="bar-level no-pointer">'+ p.level +'</div>' +
			'<div id="bar-is-leader-'+ i +'" class="bar-is-leader '+ (p.isLeader ? 'block' : 'none') +' no-pointer"></div>' +
		'</div>' +
		'<div class="bar-col-data">' +
			'<div id="bar-name-'+ i +'" class="bar-hp-name">'+ p.name +'</div>' +
			'<div id="bar-hp-wrap-'+ i +'" class="bar-any-wrap">' +
				'<div id="bar-hp-fg-'+ i +'" class="bar-hp-fg"></div>' +
				//'<div id="bar-hp-bg-'+ i +'" class="bar-any-bg"></div>' +
			'</div>' +
			'<div id="bar-mp-wrap-'+ i +'" class="bar-any-wrap">' +
				'<div id="bar-mp-fg-'+ i +'" class="bar-mp-fg"></div>' +
			'</div>' +
		'</div>';
		return s;
	},
	html: function() {
		// my bar
		var s = '';
		// party bars
		for (var i=0; i<game.maxPlayers; i++) {
			s += bar.getPlayerHtml(my.party[i], i);
		}
		return s;
	},
	updatePlayerBar: function(index) {
		bar.dom[index].playerWrap.style.display = 'flex';
		bar.dom[index].playerWrap.innerHTML = bar.getPlayerInnerHtml(my.party[index], index);
		bar.setEvents(index);
		bar.setBars(index, 0);
	},
	setAllBars: function() {
		// draw all hp/mp values using my.party data
		for (var i=0; i<game.maxPlayers; i++) {
			bar.setHp(i);
			bar.setMp(i);
		}
	},
	setBars: function(index, delay) {
		bar.setHp(index, delay);
		bar.setMp(index, delay);
	},
	updateBars: function(data) {
		for (var i=0, len=my.party.length; i<len; i++) {
			if (data.name === my.party[i].name) {
				if (data.hp) {
					my.party[i].hp = data.hp;
					bar.setHp(i);
				}
				if (data.mp) {
					my.party[i].mp = data.mp;
					bar.setMp(i);
				}
			}
		}
	},
	setHp: function(index, delay) {
		if (!my.party[index].name) return;
		var percent = ~~((my.party[index].hp / my.party[index].maxHp) * 100) + '%',
				delay = delay === undefined ? .3 : delay;
		TweenMax.to(bar.dom[index].hpFg, delay, {
			width: percent
		});
		/*TweenMax.to(bar.dom[index].hpBg, .5, {
			width: percent
		});*/
	},
	setMp: function(index, delay) {
		if (!my.party[index].name) return;
		if (my.party[index].maxMp) {
			var percent = ~~((my.party[index].mp / my.party[index].maxMp) * 100) + '%',
				delay = delay === undefined ? .3 : delay;
			TweenMax.to(bar.dom[index].mpFg, delay, {
				width: percent
			});
		}
		else {
			bar.dom[index].mpWrap.style.display = 'none';
		}
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
				console.info('getParty ', data);
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
			console.info('%c heartbeat.receive id:', "background: #0ff", data.id);
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