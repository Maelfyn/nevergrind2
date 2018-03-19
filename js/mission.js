var mission = {
	data: {},
	loaded: 0,
	zones: [
		{
			name: 'Ashenflow Peak',
			level: 35,
			id: 14,
			isOpen: 0
		},
		{
			name: 'Galeblast Fortress',
			level: 35,
			id: 13,
			isOpen: 0
		},
		{
			name: 'Anuran Ruins',
			level: 32,
			id: 12,
			isOpen: 0
		},
		{
			name: 'Fahlnir Citadel',
			level: 28,
			id: 11,
			isOpen: 0
		},
		{
			name: 'Temple of Prenssor',
			level: 24,
			id: 10,
			isOpen: 0
		},
		{
			name: "Arcturin's Crypt",
			level: 20,
			id: 9,
			isOpen: 0
		},
		{
			name: 'Sylong Mausoleum',
			level: 16,
			id: 8,
			isOpen: 0
		},
		{
			name: 'Kordata Cove',
			level: 12,
			id: 7,
			isOpen: 0
		},
		{
			name: "Babel's Bastille",
			level: 8,
			id: 6,
			isOpen: 0
		},
		{
			name: 'Lanfeld Refuge',
			level: 5,
			id: 5,
			isOpen: 0
		},
		{
			name: 'Riven Grotto',
			level: 5,
			id: 4,
			isOpen: 0
		},
		{
			name: 'Greenthorn Cavern',
			level: 5,
			id: 3,
			isOpen: 0
		},
		{
			name: 'Tendolin Hollow',
			level: 1,
			id: 2,
			isOpen: 0
		},
		{
			name: 'Salubrin Den',
			level: 1,
			id: 1,
			isOpen: 0
		}
	],
	init: function() {
		ng.lock(1);
		$.ajax({
			url: app.url + 'php2/mission/load-mission-data.php'
		}).done(function(data) {
			console.info('load-mission-data', data.mission);
			mission.loaded = 1;
			mission.data = data.mission;
			mission.show();
			$(".mission-zone:first")[0].click();
		}).fail(function(data){
			ng.msg(data.responseText);
			ng.unlock();
		});
		$("#scene-town").on(env.click, '.mission-zone', function() {
			mission.toggleZone($(this));
		}).on(env.click, '.mission-quest-li', function() {
			mission.clickQuest($(this));
		}).on(env.click, '#mission-embark', function(){
			mission.embark();
		});
	},
	getDiffClass: function(minQuestLvl) {
		var resp = 'mission-grey';
		if (minQuestLvl >= my.level + 3) {
			resp = 'mission-red';
		}
		else if (minQuestLvl > my.level) {
			resp = 'mission-yellow';
		}
		else if (minQuestLvl === my.level) {
			resp = 'mission-white';
		}
		else if (minQuestLvl >= ~~(my.level * .88) ) {
			resp = 'mission-high-blue';
		}
		else if (minQuestLvl >= ~~(my.level * .77) ) {
			resp = 'mission-low-blue';
		}
		else if (minQuestLvl >= ~~(my.level * .66) ) {
			resp = 'mission-green';
		}
		return resp;
	},
	asideHtmlHead: function() {
		var helpMsg = my.p_id ?
			'The party leader must select a zone and embark to begin!' :
			'Select a quest from any zone and embark to begin!';
		var s =
		'<div id="mission-wrap" class="aside-frame text-center">' +
			'<div id="mission-title">Select A Mission</div>' +
			'<div id="mission-embark" class="ng-btn">Embark!</div>' +
			'<div id="mission-help">'+ helpMsg +'</div>' +
		'</div>';
		return s;
	},
	asideHtml: function() {
		var s = '';
		mission.zones.forEach(function(v) {
			if (my.level >= v.level) {
				s +=
				'<div class="mission-zone" '+
				'data-id="'+ v.id +'">'+
					'<div class="fa-stack fa fa-mission-stack">'+
						'<i class="fa fa-square fa-stack-1x mission-plus-bg text-shadow"></i>'+
						'<i class="fa fa-plus fa-stack-1x mission-plus text-shadow"></i>'+
					'</div>' +
					'<div>' + v.name + '</div>' +
				'</div>' +
				'<div id="mission-zone-'+ v.id +'" class="mission-quest-list">'+
					ng.loadMsg +
				'</div>'
			}
		});
		return s;
	},
	questHtml: function(data) {
		console.info('load-zone-missions', data);
		var str = '';
		data.quests !== undefined && data.quests.forEach(function(v){
			str +=
				'<div class="mission-quest-li '+ mission.getDiffClass(v.level) +'" '+
					'data-id="'+ v.row +'" ' +
					'data-zone="'+ v.zone +'" ' +
					'data-level="'+ v.level +'">' +
					v.title +
				'</div>';
		});
		if (!str) str = '<div class="mission-quest-li">No missions found.</div>';
		$("#mission-zone-" + data.id).html(str);
	},
	show: function() {
		document.getElementById('mission-counter').innerHTML = mission.asideHtml();
	},
	loadQuests: function(id) {
		// get quests from server side
		// start with salubrin den
		// store in session... return session if it's set for that zone
		console.info("LOADING QUESTS: ", id);
		ng.lock(1);
		$.ajax({
			url: app.url + 'php2/mission/load-zone-missions.php',
			data: {
				id: id
			}
		}).done(function(data) {
			data.id = id;
			ng.unlock();
			console.info('load-zone-missions', data);
			data.quests.forEach(function(v){
				mission.quests[v.row] = v;
			});
			mission.questHtml(data);
		}).fail(function(data){
			ng.msg(data.responseText);
			ng.unlock();
		});
	},
	toggleZone: function(that) {
		console.info("toggleZone: ", that.data('id'), that.data('level'), that.data('zone'));
		var index = mission.findIndexById(that.data('id') * 1),
			id = mission.zones[index].id,
			o = mission.zones[index];
		console.info("isOpen: ", o.isOpen);
		if (o.isOpen) {
			// closed
			var e = that.find('.mission-minus');
			e.removeClass('fa-minus mission-minus').addClass('fa-plus mission-plus');
			$("#mission-zone-" + id).css('display', 'none');
			o.isOpen = 0;
		}
		else {
			// opened
			var e = that.find('.mission-plus');
			console.info('ELEMENT: ', e);
			e.removeClass('fa-plus mission-plus').addClass('fa-minus mission-minus');
			$("#mission-zone-" + id).css('display', 'block');
			o.isOpen = 1;
			mission.loadQuests(id);
		}
	},
	findIndexById: function(id) {
		var resp = 0;
		mission.zones.forEach(function(v, i) {
			if (id === v.id) {
				resp = i;
			}
		});
		return resp;
	},
	quests: [],
	showEmbark: function() {
		$("#mission-help").css('display', 'none');
		$("#mission-embark").css('display', 'block');
	},
	clickQuest: function(that) {
		var id = that.data('id') * 1;
		if (id) {
			my.selectedQuest = id;
			console.info("QUEST SELECTED: ", id);
			if (my.p_id && my.party[0].isLeader || !my.p_id) {
				mission.showEmbark();
			}
		}
	},
	embark: function() {
		ng.lock(1);
		$.ajax({
			url: app.url + 'php2/mission/embark-quest.php',
			data: {
				quest: mission.quests[my.selectedQuest]
			}
		}).done(function(data) {
			mission.embarkHandle(data);
		}).fail(function(data){
			ng.msg(data.responseText);
		}).always(function() {
			ng.unlock();
		});
	},
	embarkHandle: function(data) {
		console.info('embarkHandle ', data);
		my.quest = mission.quests[my.selectedQuest];
		data.zoneMobs.forEach(function(v){
			cache.preload.mob(v);
		});
		battle.go();
	}
}