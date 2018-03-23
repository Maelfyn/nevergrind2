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
	resetMissionLists: function() {
		mission.zones.forEach(function(v) {
			v.isOpen = 0;
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
	init: function() {
		ng.lock(1);
		$.ajax({
			url: app.url + 'php2/mission/load-mission-data.php'
		}).done(function(data) {
			console.info('load-mission-data', data.mission);
			mission.loaded = 1;
			mission.data = data.mission;
			mission.show();
			mission.openFirstTwoZones();
			ng.unlock();
		}).fail(function(data){
			chat.log(data.responseText, 'chat-alert');
			ng.unlock();
		});
		// delegation
		$("#scene-town").on(env.click, '.mission-zone', function() {
			mission.toggleZone($(this));
		}).on(env.click, '.mission-quest-li', function() {
			mission.clickQuest($(this));
		}).on(env.click, '#mission-embark', function(){
			mission.embark();
		}).on(env.click, '#mission-abandon', function() {
			mission.abandon();
		});
	},
	showEmbark: function() {
		$("#mission-help").css('display', 'none');
		$("#mission-embark").css('display', 'block');
	},
	updateTitle: function() {
		$("#mission-title").html(mission.quests[my.selectedQuest].title);
	},
	asideHtmlHead: function() {
		var headMsg = 'Mission Counter',
			helpMsg = 'The party leader must select a zone and embark to begin!',
			embarkClass = 'none',
			helpClass = 'block';

		if (party.isSoloOrLeading()) {
			// is solo or a leader
			headMsg = 'Select A Mission';
			helpMsg = 'Select a quest from any zone and embark to venture forth!';
		}
		if (my.quest.level) {
			headMsg = my.quest.title;
			embarkClass = 'block';
			helpClass = 'none';
		}

		var s =
		'<div id="mission-wrap" class="aside-frame text-center">' +
			'<div id="mission-title">'+ headMsg +'</div>' +
			'<div id="mission-embark" class="ng-btn '+ embarkClass +'">Embark!</div>' +
			'<div id="mission-help" class=" '+ helpClass +'">'+ helpMsg +'</div>' +
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
	asideFooter: function() {
		var s = '';
		if (party.isSoloOrLeading()) {
			s +=
			'<div id="mission-footer" class="aside-frame text-shadow">' +
				'<div id="mission-abandon" class="ng-btn ng-btn-alert">Abandon Mission</div>' +
			'</div>';
		}
		return s;
	},
	questHtml: function(data) {
		console.info('load-zone-missions', data);
		var str = '';
		data.quests !== undefined &&
		data.quests.forEach(function(v){
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
		$('#mission-counter').html(mission.asideHtml());
	},
	updateTitle: function() {
		$("#mission-title").html(my.quest.title);
	},
	updateAll: function() {
		$("#aside-menu").html(town.aside.menu['town-mission']());
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
		// console.info("toggleZone: ", that.data('id'), that.data('level'), that.data('zone'));
		var index = mission.findIndexById(that.data('id') * 1),
			id = mission.zones[index].id,
			o = mission.zones[index];
		// console.info("isOpen: ", o.isOpen);
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
	clickQuest: function(that) {
		var id = that.data('id') * 1;
		if (id && party.isSoloOrLeading()) {
			my.selectedQuest = id;
			console.info("QUEST SELECTED: ", id);
			mission.showEmbark();
			mission.updateTitle();
		}
		else {
			// TODO: non-party member needs to see something... EMBARK?
		}
	},
	embark: function() {
		if (party.isSoloOrLeading()) {
			ng.lock(1);
			$.ajax({
				url: app.url + 'php2/mission/embark-quest.php',
				data: {
					quest: mission.quests[my.selectedQuest]
				}
			}).done(function(data) {
				console.info('embark isLeader! ', data);
				mission.setQuest(mission.quests[my.selectedQuest]);
				my.zoneMobs = data.zoneMobs;
				dungeon.go();
			}).fail(function(data){
				ng.msg(data.responseText);
			}).always(function() {
				ng.unlock();
			});
		}
		else {
			// joining
			if (my.quest.level) {
				dungeon.go();
				$.ajax({
					url: app.url + 'php2/mission/notify-party-embarked.php'
				}).done(function(data) {
					console.info(data);
				});
			}
			else {
				chat.log("Quest data not found.", "chat-alert")
			}
		}
	},
	initQuest: function() {
		my.selectedQuest = '';
		my.quest = {};
		mission.updateAll();
	},
	setQuest: function(quest) {
		console.info("SETTING QUEST", quest);
		my.selectedQuest = quest.row;
		my.quest = quest;
	},
	abandon: function() {
		if (my.quest.level && party.isSoloOrLeading()) {
			ng.lock(1);
			$.ajax({
				url: app.url + 'php2/mission/abandon-quest.php'
			}).done(function (data) {
				console.info('abandon ', data);
				mission.initQuest();
			}).fail(function (data) {
				chat.log(data.responseText, 'chat-alert');
			}).always(function () {
				ng.unlock();
			});
		}
	},
	openFirstTwoZones: function() {
		for (var i=0; i<2; i++) {
			var e = $(".mission-zone").eq(i).get(0);
			if (e !== undefined) {
				e.click();
			}
		}
	}
}