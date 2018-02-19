
// player data values
var my = {
	mouse: {
		x: 0,
		y: 0
	},
	channel: 'town-1',
	lastReceivedWhisper: '',
	p_id: 0,
	g_id: 0,
	index: 0,
	leader: '',
	isLeader: 0,
	party: [],
	guild: [],
	isLowestPartyIdMine: function() {
		var lowestId = my.party[0].id;
		my.party.forEach(function(v) {
			if (v.id < lowestId) {
				lowestId = v.id;
			}
		});
		return lowestId === my.party[0].id;
	},
	getNewLeaderName: function() {
		var lowestId = my.party[0].id,
			name = my.party[0].name;
		my.party.forEach(function(v) {
			if (v.id < lowestId) {
				name = v.name;
			}
		});
		return name;
	},
	getPartyMemberIdByName: function(name) {
		var id = 0;
		my.party.forEach(function(v) {
			if (v.name === name) {
				id = v.id;
			}
		});
		return id;
	},
	partyDefault: function() {
		return {
			row: 0,
			name: '&nbsp;',
			isLeader: 0,
			job: '',
			level: 0,
			hp: 0,
			maxHp: 0,
			mp: 0,
			maxMp: 0
		}
	},
	team: 0,
	slot: 1,
	tgt: 1,
	attackOn: false,
	hudTimer: g.TDC(),
	hud: function(msg, d){
		my.hudTimer.kill();
		DOM.hud.style.visibility = 'visible';
		DOM.hud.textContent = msg;
		if (d){
			timer.hud = TweenMax.to(DOM.hud, 5, {
				onComplete: function(){
					DOM.hud.style.visibility = 'hidden';
				}
			});
		}
	},
	clearHud: function(){
		my.hudTimer.kill();
		DOM.hud.style.visibility = 'hidden';
	},
	nextTarget: function(backwards){},
	exitGame: function(bypass){
		if (g.view === 'game'){
			var r = confirm("Are you sure you want to surrender?");
		}
		if (r || bypass || g.view !== 'game'){
			g.lock(1);
			$.ajax({
				url: app.url + 'php/exitGame.php',
				data: {
					view: g.view
				}
			}).always(function(){
				location.reload();
			});
		}
	}
};