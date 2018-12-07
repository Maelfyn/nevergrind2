
// player data values
var my = {
	lastDifficulty: 'Very Easy',
	mouse: {
		x: 0,
		y: 0
	},
	channel: '',
	lastReceivedWhisper: '',
	p_id: 0,
	leader: '',
	isLeader: 0,
	zoneMobs: [],
	party: [],
	guild: {
		id: 0,
		rank: '',
		memberNumber: 0,
		motd: '',
		members: 0,
		name: ''
	},
	guildChannel: function() {
		return 'guild:' + my.guild.id;
	},
	getPartyNames: function(){
		var a = [];
		my.party.forEach(function(v){
			v.name && a.push(v.name);
		});
		return a;
	},
	isLowestPartyIdMine: function() {
		var lowestId = my.party[0].id;
		my.party.forEach(function(v) {
			if (v.id && v.id < lowestId) {
				lowestId = v.id;
			}
		});
		return lowestId === my.party[0].id;
	},
	getNewLeaderName: function() {
		var lowestId = my.party[0].id,
			name = my.party[0].name;
		my.party.forEach(function(v) {
			if (v.id && v.id < lowestId) {
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
	getPartySlotByRow: function(id) {
		var slot = 0;
		my.party.forEach(function(v, i) {
			if (v.id === id) {
				slot = i;
			}
		});
		return slot;
	},
	partyCount: function() {
		var count = 0;
		my.party.forEach(function(v, i) {
			if (v.name) {
				count++;
			}
		});
		return count;
	},
	Party: function() {
		return {
			row: 0, // not updated from server - failing at life
			id: 0, // when updated
			name: '',
			isLeader: 0,
			job: '',
			level: 0,
			hp: 0,
			maxHp: 0,
			mp: 0,
			maxMp: 0,
			heartbeat: Date.now()
		}
	},
	resetClientPartyValues: function(s) {
		my.party[s].heartbeat = Date.now();
		my.party[s].linkdead = 0;
	},
	team: 0,
	slot: 1,
	tgt: 1,
	attackOn: false,
	hudTimer: ng.TDC(),
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
		if (ng.view === 'game'){
			var r = confirm("Are you sure you want to surrender?");
		}
		if (r || bypass || ng.view !== 'game'){
			ng.lock(1);
			$.ajax({
				url: app.url + 'php/exitGame.php',
				data: {
					view: ng.view
				}
			}).always(function(){
				location.reload();
			});
		}
	},
	selectedQuest: '',
	quest: {},
};