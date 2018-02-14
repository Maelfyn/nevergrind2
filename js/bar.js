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
	getPlayerBarHtml: function(p, i) {
		console.info(p);
		var s = '<div id="bar-player-wrap-'+ i +'" class="bar-player-wrap '+ (!i ? 'bar-player-wrap-me' : '') +'">' +
			'<div id="bar-col-icon-'+ i +'" class="bar-col-icon player-icon-'+ p.job +'">' +
				'<div id="bar-level-'+ i +'" class="bar-level-wrap">'+ p.level +'</div>' +
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
				'</div>' +
			'</div>';
		return s;

	},
	html: function() {
		var s = '',
			i = 0;
		// my bar
		s += bar.getPlayerBarHtml(party[my.name], i++);
		// party bars
		for (var key in party) {
			if (key !== my.name) {
				console.info("PARTY MEMBER:", party[key]);
				s += bar.getPlayerBarHtml(party[key], i++);
			}
		}
		return s;
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
			}).done(function(data){
				console.info('GET ALL BARS ', data);
				// continue here
			});
		}
		// actually do it
	},
	get: function() {

	},
	events: function() {

	}
}