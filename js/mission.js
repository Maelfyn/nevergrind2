var mission = {
	data: {},
	loaded: 0,
	zones: [
		{
			name: 'Ashenflow Peak',
			level: 35,
			id: 16,
			isOpen: 0
		},
		{
			name: 'Galeblast Fortress',
			level: 35,
			id: 15,
			isOpen: 0
		},
		{
			name: 'Anuran Ruins',
			level: 32,
			id: 14,
			isOpen: 0
		},
		{
			name: 'Fahlnir Citadel',
			level: 28,
			id: 13,
			isOpen: 0
		},
		{
			name: 'Temple of Prenssor',
			level: 24,
			id: 12,
			isOpen: 0
		},
		{
			name: "Arcturin's Crypt",
			level: 20,
			id: 11,
			isOpen: 0
		},
		{
			name: 'Sylong Mausoleum',
			level: 16,
			id: 10,
			isOpen: 0
		},
		{
			name: 'Kordata Cove',
			level: 12,
			id: 9,
			isOpen: 0
		},
		{
			name: "Babel's Bastille",
			level: 8,
			id: 8,
			isOpen: 0
		},
		{
			name: 'Lanfeld Refuge',
			level: 5,
			id: 7,
			isOpen: 0
		},
		{
			name: 'Riven Grotto',
			level: 5,
			id: 6,
			isOpen: 0
		},
		{
			name: 'Greenthorn Cavern',
			level: 5,
			id: 5,
			isOpen: 0
		},
		{
			name: 'Tendolin Hollow',
			level: 1,
			id: 4,
			isOpen: 0
		},
		{
			name: 'Salubrin Den',
			level: 1,
			id: 3,
			isOpen: 0
		}
	],
	init: function() {
		ng.lock();
		$.ajax({
			url: app.url + 'php2/mission/load-mission-data.php'
		}).done(function(data) {
			console.info('load-mission-data', data.mission);
			mission.loaded = 1;
			mission.data = data.mission;
			mission.show();
		}).fail(function(data){
			ng.msg(data.responseText);
		}).always(function(){
			ng.unlock();
		});
		$("#scene-town").on(env.click, '.mission-zone', function() {
			mission.loadMission($(this));
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
	asideHtml: function() {
		var s = '<div>Mission Data</div>';
		mission.zones.forEach(function(v) {
			//if (my.level >= v.level) {
				s += '<div class="mission-zone '+ mission.getDiffClass(v.level) +'" '+
				'data-id="'+ v.id +'">'+
					'<span class="fa-stack fa fa-mission-stack">'+
						'<i class="fa fa-square fa-stack-1x mission-plus-bg text-shadow"></i>'+
						'<i class="fa fa-plus fa-stack-1x mission-plus text-shadow"></i>'+
					'</span>' + v.name +'</div>' +
					'<div id="mission-zone-'+ v.id +'" class="mission-quest-list">'+
						ng.loadMsg +
					'</div>'
			//}
		});
		return s;
	},
	show: function() {
		document.getElementById('mission-counter').innerHTML = mission.asideHtml();
	},
	loadMission: function(that) {
		console.info("ZONE ID: ", that.data('id'));
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
	loadQuests: function(id) {
		// get quests from server side
		// start with salubrin den
		// store in session... return session if it's set for that zone
		console.info("LOADING QUESTS: ", id);
	}
}