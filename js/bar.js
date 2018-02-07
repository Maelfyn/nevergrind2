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
	html: function() {
		var s = '';
		for (var i=0; i<game.maxPlayers; i++) {
			var c = g.toJobShort(g.jobs[~~(Math.random() * 14)]);
			s +=
				'<div id="bar-player-wrap-'+ i +'" class="bar-player-wrap">' +
					'<div id="bar-col-icon-'+ i +'" class="bar-col-icon player-icon-'+ c +'"></div>' +
					'<div class="bar-col-data">' +
						'<div id="bar-name-'+ i +'" class="bar-hp-name">'+ game.getPetName() +'</div>' +
						'<div id="bar-hp-wrap-'+ i +'" class="bar-hp-wrap">' +
							'<div id="bar-hp-fg-'+ i +'" class="bar-hp-fg"></div>' +
							'<div id="bar-hp-bg-'+ i +'" class="bar-hp-bg"></div>' +
						'</div>' +
						'<div id="bar-mp-wrap-'+ i +'" class="bar-mp-wrap">' +
							'<div id="bar-mp-fg-'+ i +'" class="bar-mp-fg"></div>' +
						'</div>' +
					'</div>' +
				'</div>';
		}

		return s;
	},
	update: function() {

	},
	get: function() {

	},
	events: function() {

	}
}