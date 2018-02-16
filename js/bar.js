var bar = {
	init: function() {
		console.info("init bar.js");
		var e = document.getElementById('bar-wrap');
		e.innerHTML = bar.html();
		e.style.display = 'block';

		bar.dom.playerWrap = [];
		bar.dom.name = [];
		bar.dom.hpFg = [];
		bar.dom.hpBg = [];
		bar.dom.mpWrap = [];
		bar.dom.mpFg = [];
		for (var i=0; i<game.maxPlayers; i++) {
			bar.dom.playerWrap = document.getElementById('bar-player-wrap-' + i);
			bar.dom.name = document.getElementById('bar-name-' + i);
			bar.dom.hpFg = document.getElementById('bar-hp-fg-' + i);
			bar.dom.hpBg = document.getElementById('bar-hp-bg-' + i);
			bar.dom.mpWrap = document.getElementById('bar-mp-wrap-' + i);
			bar.dom.mpFg = document.getElementById('bar-mp-fg-' + i);
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
		var s =
		'<div id="bar-col-icon-'+ i +'" class="bar-col-icon player-icon-'+ p.job +'">' +
			'<div id="bar-level-'+ i +'" class="bar-level">'+ p.level +'</div>' +
			'<div id="bar-is-leader-'+ i +'" class="bar-is-leader '+ (p.isLeader ? 'block' : 'none') +'"></div>' +
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
		var s = bar.getPlayerHtml(my.party[my.index], my.index);
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
						bar.updatePlayerBar(0);
					}
					else {
						my.party[npIndex] = v;
						bar.updatePlayerBar(npIndex++);
					}
				});
				// continue here
				// TODO: /disband remove bar when person leaves party
				// TODO: leader leaves? New leader logic
				// TODO: add/remove people from party
				// TODO: /promote leader

			});
		}
	},
	get: function() {

	},
	events: function() {

	}
}