var create = {
	events: function(){
		$("img").on('dragstart', function(e) {
			e.preventDefault();
		});
		$("#logout").on(env.click, function() {
			g.logout();
		});
		$("#ch-card-base").on(env.click, '.ch-card', function(){
			$('.ch-card').removeClass('ch-card-active');
			$(this).addClass('ch-card-active');
		});
		$('.ch-card:first').trigger('click');
		// create character
		$("#go-create-character").on(env.click, function(){
			g.goCreateCharacter();
		});
		$(".select-race").on(env.click, function(e){
			var race = $(this).text();
			$('.select-race').removeClass('active');
			$(this).addClass('active');
			create.setRandomClass(race);
			create.set('race', race);
		});
		$(".select-class").on(env.click, function(e){
			if ($(this).get(0).className.indexOf('disabled') === -1){
				var job = $(this).text();
				$('.select-class').removeClass('active');
				$(this).addClass('active');
			create.set('job', job);
			}
		});
		$(".select-gender").on(env.click, function(){
			var gender = $(this).attr('id');
			$(".select-gender").removeClass('active');
			$(this).addClass('active');
			create.set('gender', gender);
		});
	},
	form: {
		race: '',
		job: '',
		gender: '',
		name: '',
		str: 0,
		sta: 0,
		agi: 0,
		dex: 0,
		wis: 0,
		intel: 0,
		cha: 0
	},
	getPossibleClasses: function(race){
		var z = {
			'Barbarian': [
				'Rogue', 
				'Shaman',
				'Warrior' 
			],
			'Dark Elf': [
				'Cleric',
				'Enchanter',
				'Magician',
				'Necromancer',
				'Rogue', 
				'Shadowknight',
				'Warrior', 
				'Wizard'
			],
			'Dwarf': [
				'Cleric',
				'Paladin',
				'Rogue',
				'Warrior'
			],
			'Erudite': [
				'Cleric',
				'Enchanter',
				'Magician',
				'Necromancer',
				'Paladin',
				'Shadowknight',
				'Wizard'
			],
			'Gnome': [
				'Cleric',
				'Enchanter',
				'Magician',
				'Necromancer',
				'Rogue',
				'Warrior',
				'Wizard'
			],
			'Half Elf': [
				'Bard',
				'Druid',
				'Paladin',
				'Ranger',
				'Rogue',
				'Warrior'
			],
			'Halfling': [
				'Druid',
				'Cleric',
				'Rogue',
				'Warrior'
			],
			'High Elf': [
				'Cleric',
				'Enchanter',
				'Magician',
				'Paladin',
				'Wizard'
			],
			'Human': [
				'Bard',
				'Cleric',
				'Druid',
				'Enchanter',
				'Magician',
				'Monk',
				'Necromancer',
				'Paladin',
				'Ranger',
				'Rogue',
				'Shadowknight',
				'Warrior',
				'Wizard'
			],
			'Ogre': [
				'Shadowknight',
				'Shaman',
				'Warrior'
			],
			'Troll': [
				'Shadowknight',
				'Shaman',
				'Warrior'
			],
			'Wood Elf': [
				'Bard',
				'Druid',
				'Ranger',
				'Rogue',
				'Warrior'
			]
		};
		return z[race];
	},
	set: function(key, val){
		console.info('Setting ', key, 'to: ', val);
		console.info(create.form);
		create.form[key] = val;
		document.getElementById(key + '-value').innerHTML = val;
		if (key === 'job'){
			document.getElementById('type-value').innerHTML = create.types[val];
			// ratings
			['tank',
			'physical',
			'magical',
			'healer',
			'utility'].forEach(function(v, i){
				document.getElementById(v + '-value').innerHTML = create.getRatings[val][i];
			});
		}
		// resists
		['bleed',
		'poison',
		'arcane',
		'lightning',
		'fire',
		'cold'
		].forEach(function(v, i){
			document.getElementById(v + '-value').innerHTML = create.getResist(v);
		});
		// dungeon
		['traps',
		'treasure',
		'scout',
		'pulling'
		].forEach(function(v, i){
			document.getElementById(v + '-value').innerHTML = create.getDungeon(v);
		});
	},
	types: {
		Bard: 'Utility',
		Cleric: 'Healer',
		Druid: 'Healer',
		Enchanter: 'Utility',
		Magician: 'Magical DPS',
		Monk: 'Physical DPS',
		Necromancer: 'Magical DPS',
		Paladin: 'Tank',
		Ranger: 'Physical DPS',
		Rogue: 'Physical DPS',
		Shadowknight: 'Tank',
		Shaman: 'Healer',
		Warrior: 'Tank',
		Wizard: 'Magical DPS'
	},
	getRatings: { // tank, phy, mag, heal, utility
		Warrior: 		[10, 7, 1, 1, 1],
		Paladin: 		[9, 7, 3, 4, 3],
		Shadowknight: 	[9, 8, 3, 2, 2],
		Monk: 			[6, 10, 1, 3, 2],
		Rogue: 			[6, 10, 1, 1, 4],
		Ranger: 		[6, 9, 3, 3, 3],
		Bard: 			[5, 5, 5, 5, 9],
		Cleric: 		[4, 3, 6, 10, 6],
		Druid: 			[4, 3, 8, 9, 7],
		Shaman: 		[4, 4, 7, 9, 8],
		Enchanter: 		[1, 1, 7, 3, 10],
		Magician: 		[1, 1, 8, 2, 8],
		Necromancer: 	[1, 1, 9, 3, 6],
		Wizard: 		[1, 1, 10, 1, 5]
	},
	getResist: function(type){
		var v = 15,
			f = create.form;
		if (type === 'bleed'){
			if (f.gender === 'Female'){
				v += 5;
			}
			if (f.race === 'Dark Elf'){
				v += 10;
			}
			else if (f.race === 'Half Elf'){
				v += 3;
			}
		}
		else if (type === 'poison'){
			if (f.gender === 'Female'){
				v += 5;
			}
			if (f.race === 'Dwarf'){
				v += 10;
			}
			else if (f.race === 'Half Elf'){
				v += 3;
			}
		}
		else if (type === 'arcane'){
			if (f.gender === 'Male'){
				v += 5;
			}
			if (f.race === 'Erudite'){
				v += 25;
			}
			else if (f.race === 'Dark Elf' || f.race === 'Dwarf'){
				v += 10;
			}
			else if (f.race === 'Half Elf'){
				v += 3;
			}
		}
		else if (type === 'lightning'){
			if (f.race === 'Gnome'){
				v += 20;
			}
			else if (f.race === 'Half Elf'){
				v += 3;
			}
		}
		else if (type === 'fire'){
			if (f.race === 'Half Elf'){
				v += 3;
			}
			else if (f.race === 'Troll'){
				v -= 10;
			}
			else if (f.race === 'Wood Elf'){
				v += 10;
			}
		}
		else if (type === 'cold'){
			if (f.gender === 'Male'){
				v += 5;
			}
			if (f.race === 'Barbarian'){
				v += 25;
			}
			else if (f.race === 'Half Elf'){
				v += 3;
			}
			else if (f.race === 'Wood Elf'){
				v += 10;
			}
		}
		return v;
	},
	getDungeon: function(type){
		var v = 20,
			f = create.form;
		
		if (type === 'traps'){
			// traps
			if (f.race === 'Dark Elf'){
				v += 5;
			}
			else if (f.race === 'Halfling' || f.race === 'Wood Elf'){
				v += 10;
			}
			else if (f.race === 'Half Elf'){
				v += 7;
			}
			// class
			if (f.job === 'Shadowknight' || 
				f.job === 'Shaman' || 
				f.job === 'Wizard' || 
				f.job === 'Cleric'){
				v += 5;
			}
			else if (f.job === 'Druid' || 
				f.job === 'Enchanter' || 
				f.job === 'Paladin' ||
				f.job === 'Warrior'){
				v += 10;
			}
			else if (f.job === 'Monk'){
				v += 20;
			}
			else if (f.job === 'Bard' || 
				f.job === 'Ranger'){
				v += 30;
			}
			else if (f.job === 'Rogue'){
				v += 50;
			}
		}
		else if (type === 'treasure'){
			// treasure
			if (f.race === 'Gnome'){
				v += 5;
			}
			else if (f.race === 'Dwarf' || f.race === 'Human'){
				v += 10;
			}
			else if (f.race === 'Halfling'){
				v += 20;
			}
			else if (f.race === 'Half Elf'){
				v += 7;
			}
			// class
			if (f.job === 'Magician' || 
				f.job === 'Necromancer' || 
				f.job === 'Paladin' || 
				f.job === 'Shaman'){
				v += 5;
			}
			else if (f.job === 'Enchanter' || 
				f.job === 'Monk' ||
				f.job === 'Warrior' ||
				f.job === 'Shadowknight'){
				v += 10;
			}
			else if (f.job === 'Bard' ||
				f.job === 'Druid'){
				v += 20;
			}
			else if (f.job === 'Rogue' || 
				f.job === 'Ranger'){
				v += 30;
			}
		}
		else if (type === 'scout'){
			// scout
			if (f.race === 'Wood Elf'){
				v += 15;
			}
			else if (f.race === 'Dark Elf'){
				v += 8;
			}
			else if (f.race === 'Half Elf'){
				v += 7;
			}
			else if (f.race === 'Barbarian'){
				v += 5;
			}
			// class
			if (f.job === 'Cleric' || 
				f.job === 'Shadowknight' || 
				f.job === 'Warrior' || 
				f.job === 'Wizard'){
				v += 5;
			}
			else if (f.job === 'Enchanter' || 
				f.job === 'Paladin' ||
				f.job === 'Shaman'){
				v += 10;
			}
			else if (f.job === 'Bard' ||
				f.job === 'Monk'){
				v += 20;
			}
			else if (f.job === 'Rogue' ||
				f.job === 'Druid'){
				v += 25;
			}
			else if (f.job === 'Ranger'){
				v += 50;
			}
		}
		else if (type === 'pulling'){
			// pulling
			if (f.race === 'Human'){
				v += 20;
			}
			else if (f.race === 'Halfling'){
				v += 10;
			}
			else if (f.race === 'Half Elf'){
				v += 7;
			}
			else if (f.race === 'Erudite'){
				v += 5;
			}
			// class
			if (f.job === 'Magician' || 
				f.job === 'Necromancer' || 
				f.job === 'Shaman' || 
				f.job === 'Wizard'){
				v += 5;
			}
			else if (f.job === 'Enchanter' || 
				f.job === 'Rogue' ||
				f.job === 'Shadowknight' ||
				f.job === 'Paladin'){
				v += 10;
			}
			else if (f.job === 'Druid'){
				v += 15;
			}
			else if (f.job === 'Bard' ||
				f.job === 'Monk'){
				v += 20;
			}
			else if (f.job === 'Ranger'){
				v += 30;
			}
			else if (f.job === 'Warrior'){
				v += 40;
			}
			else if (f.job === 'Monk'){
				v += 50;
			}
		}
		return v;
	},
	setRandomGender: function(){
		var e = $(".select-gender:eq("+ ~~(Math.random() * 2) +")");
		e.length && e.trigger('click');
	},
	setRandomRace: function(){
		var e = $(".select-race:eq("+ ~~(Math.random() * 12) +")");
		e.length && e.trigger('click');
	},
	// triggered by clicking race
	setRandomClass: function(race){
		// back to default
		$(".select-class").removeClass().addClass('select-class disabled');
		// remove disabled from possibles
		var ids = '',
			jobs = create.getPossibleClasses(race),
			len = jobs.length;
		jobs.forEach(function(v, i){
			ids += '#create-' + v;
			if (i < len-1){
				ids += ', ';
			}
		});
		$(ids).removeClass('disabled');
		// add active to selection
		var e = $(".select-class:not(.disabled)"),
			len = e.length;
		e = e.eq(~~(Math.random() * len));
		e.length && e.trigger('click');
	}
};

