var create = {
	selected: 0,
	base: {
		str: 0,
		sta: 0,
		agi: 0,
		dex: 0,
		wis: 0,
		intel: 0,
		cha: 0
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
		cha: 0,
		left: 10,
		maxLeft: 10
	},
	possibleJobs: {},
	raceAttrs: {},
	jobAttrs: {},
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
	events: function(x){
		$("#logout").on(x, function() {
			ng.logout();
		});
		$("#ch-card-base").on(x, '.ch-card', function(){
			$('.ch-card').removeClass('ch-card-active');
			$(this).addClass('ch-card-active');
		});
		$('.ch-card:first').trigger(x);
		// create character
		$("#go-create-character").on(x, function(){
			ng.goCreateCharacter();
		});
		$("#delete-character").on(x, function(){
			modal.show({
				key: 'delete-character'
			});
		});
		$(".select-race").on(x, function(e){
			var race = $(this).text();
			$('.select-race').removeClass('active');
			$(this).addClass('active');
			create.setRandomClass(race);
			create.set('race', race);
		});
		$(".select-class").on(x, function(e){
			if ($(this).get(0).className.indexOf('disabled') === -1){
				var job = $(this).text();
				$('.select-class').removeClass('active');
				$(this).addClass('active');
				create.set('job', job);
			}
		});
		$(".select-gender").on(x, function(){
			var gender = $(this).attr('id');
			$(".select-gender").removeClass('active');
			$(this).addClass('active');
			create.set('gender', gender);
		});
		$("#create-character-name").on('change textInput input', function(){
			create.form.name = $(this).val().trim().replace(/ /g, '');
		});
		$(".attr-minus-1").on(x, function(){
			var attr = $(this).data('id');
			if (create.form.left < 10 && 
				(create.form[attr] - create.base[attr] > 0) ){
				document.getElementById('create-points-' + attr).innerHTML = --create.form[attr];
				document.getElementById('create-points-remaining').innerHTML = ++create.form.left;
			}
		});
		$(".attr-add-1").on(x, function(){
			var attr = $(this).data('id');
			if (create.form.left){
				document.getElementById('create-points-' + attr).innerHTML = ++create.form[attr];
				document.getElementById('create-points-remaining').innerHTML = --create.form.left;
			}
		});
		$("#create-character-back").on(x, function(){
			ng.lock(1);
			ng.initGame();
			var z = document.getElementById('scene-title-create-character');
			TweenMax.to(z, .6, {
				y: 20,
				opacity: 0,
				onComplete: function(){
					TweenMax.set(z, {
						display: 'none',
						opacity: 1
					});
					TweenMax.to('#scene-title-select-character', .6, {
						startAt: {
							display: 'block',
							y: 20,
							opacity: 0
						},
						y: 0,
						opacity: 1,
						onComplete: function(){
							ng.unlock();
						}
					});
				}
			});
		});
		$("#create-character-btn").on(x, function(){
			//client-side validation
			if (ng.locked) return;
				
			ng.lock(1);
			var f = create.form,
				err = '';
			if (!f.name){
				err = 'Your character needs a name!';
				$("#create-character-name").focus();
			}
			else if(f.name.length > 16){
				err = "Your character name must be 16 characters or less!";
			}
			else if(f.left){
				err = 'You must spend all of your ability points!';
			}
			if (err){
				ng.msg(err);
				ng.unlock();
			} else {
				// final adds
				f.shortJob = ng.toJobShort(f.job);
				// send to server
				$.ajax({
					url: app.url + 'php2/create/create-character.php',
					data: {
						form: f
					}
				}).done(function(r){
					console.info('Created character: ', r);
					ng.msg(r.hero.name + ' has been created!');
					$("#create-character-back").trigger(x);
				}).fail(function(r){
					ng.msg(r.responseText, 8);
					ng.unlock();
				});
			}
		});
		$("#ch-card-list").on(x, '.select-player-card', function(){
			var z = $(this);
			var id = create.selected = z.data('row');
			var id = create.name = z.data('name');
			if (ng.playerCardClicks++ === 1) {
				$.ajax({
					type: 'GET',
					url: app.url + 'php2/session/init-character.php'
				})
			}
		});
	},
	deleteCharacter: function(){
		// send to server
		if (ng.locked) return;
		ng.lock();
		$.ajax({
			url: app.url + 'php2/create/delete-character.php',
			data: {
				row: create.selected
			}
		}).done(function(r){
			console.info('Deleted character: ', r);
			ng.msg(create.name + ' has been deleted!');
			modal.hide();
			ng.initGame();
		}).fail(function(r){
			ng.msg(r.responseText, 8);
			ng.unlock();
		});
	},
	msg: function(key, val){
		var z = {
			gender: {
				Male: "Males have strong cold and arcane resistance.",
				Female: "Females receive a boost to bleed and poison resistance."
			},
			race: {
				Barbarian: 'Barbarians are a hardy race that benefit from high strength and stamina. Living through harsh winters in Fenwoven has given them strong cold resistance and above-average scouting skills.',
				'Dark Elf': 'Dark Elves are an evil race from Vedria that excel in a variety of roles. They boast strong blood and arcane resistance along with good trap and scouting skills.',
				Dwarf: 'Dwarves hail from Dunhoven, a mountainous region of Vandamor. They are a stout, loyal race with strong resistances to arcane and poison magic. They are also known for unearthing hidden treasures where others would not.',
				Erudite: 'Erudites are a learned race hailing from the remote island city of Wexxen. Generations of intense academic pursuit has made their bodies weak, but their minds strong. They also boast higher than normal pulling skills, which helps them avoid unnecessary conflicts in dungeons.',
				Gnome: 'Gnomes hail from Brindomir, a mountainous city on the eastern outskirts of Vandamor. Due to their extensive tinkering and scientific experimentation, they have high lightning resistance and are immune to silence. They also have a small bonus to treasure-finding.',
				'Half Elf': 'Half Elves are a hybrid of Humans and Wood Elves that primarily dwell in Prentia, a city in western Vandamor. They share a blend of traits from both races and a love of the great outdoors. They have a minor boost to all resists and strong dungeon skills.',
				Halfling: 'Halflings dwell in Aspen Grove, a hamlet on the southern coast of Vandamor. They are a race of nimble pranksters with high agility and dexterity. They are adept treasure-finders with strong bonuses to disarming traps and pulling. Their unique ability to escape from combat is unmatched.',
				'High Elf': 'High Elves live in Kaedorn, a walled kingdom ruled by a monarchy for thousands of years. Despite their resemblance to Wood Elves, their strengths are in spellcasting due to their diligent study of magic. They regenerate magic faster than any other race.',
				Human: 'Humans are a swashbuckling, fearless race hailing from Edenberg, the trade capital of the world. Despite their average attributes, their fearless leadership is legendary throughout Vandamor. Humans are immune to fear, have a bonus to treasure, and the best pulling in the game.',
				Ogre: 'Ogres hail from Gorgek, a city on an isolated peninsula of southern Vandamor. A brutish and violent race, Ogres have the highest strength and stamina among all races. Furthermore, they are immune to stuns which makes them powerful allies in any party.',
				Troll: 'Trolls are a savage race from the swaps of Slagnon. Their strength and stamina is second only to Ogres. They uniquely regenerate health faster than any other race, but they are weak to fire magic.',
				'Wood Elf': 'Wood Elves are a race from the city of Artremia. Their knowledge of the great outdoors is unmatched, giving them strong cold resistance, fire resistance, and the best scouting skills among all races. They are also skilled at disarming traps.'
			},
			job: {
				Bard: 'Bards are a utility class that can wear plate armor. They can fill in almost any role in a pinch, but their true strength lies in making everyone in their party better. Their charm and crowd control skills make them a boon to any party. They also have very strong all-around dungeon skills.',
				Cleric: "Clerics are a healing class that can wear plate armor. They specialize in directly healing their allies in combat. They boast powerful support spells that buff their party's health and armor. They also have strong magic-based stuns and they can do modest magic damage in a pinch.",
				Druid: 'Druids are a healing class that can wear leather armor. They have strong direct healing skills and HoT spells. Druids also have powerful elemental spells that make them highly adaptive. Their strong support spells and exception dungeon skills make them an asset to any party.',
				Enchanter: 'Enchanters are a utility class that can only wear cloth armor. Among the cloth-wearing casters, their magic does the least amount of damage, but they have the strongest support spells in the game. Their ability to crowd control is unmatched, and they have the ability to charm mobs when you really need to turn the tables.',
				Magician: 'Magicians are a magical DPS class that can only wear cloth armor. They boast the strongest pets in the game due to their ability to summon four types of pets. They also wield powerful elemental magic and some of the most useful support spells in the game.',
				Monk: "Monks are a physical DPS class that can wear leather armor. Monks practice martial arts to deliver powerful punches and kicks. Monks deliver top-tier physical DPS with hand-to-hand or blunt weapons. They have solid dungeon skills and the best pulling ability among all classes.",
				Necromancer: 'Necromancers are a magical DPS class that can only wear cloth armor. They have powerful skeleton pets that make quick work of their enemies. Powerful DoT spells, fear, and life tap make them a formidable addition to any party.',
				Paladin: 'Paladins are a tank class that can wear plate armor. Paladins have the unique ability to lay hands, healing themselves when they need it most. Paladins also have strong stuns and healing spells which make them very difficult to kill.',
				Ranger: "Rangers are a physical DPS class that can wear chain armor. They're the only class that can use bows, which help them inflict massive damage. A diverse arsenal of magic also aids them in battle. Notably, Rangers have the strongest overall dungeon skills, including the best scouting skills.",
				Rogue: 'Rogues are a physical DPS class that can wear chain armor. Their combination of stealth and bursts of damage make them deadly on the battlefield. Rogues have unparalleled disarm trap skills, along with very strong treasure and scouting skills.',
				Shadowknight: 'Shadowknights are a tank class that can wear plate armor. They have the unique ability to harm touch a mob, dealing a large amount of damage to a single target. They have the strongest offensive potential among all tanks along with deadly abilities like fear and life tap.',
				Shaman: 'Shaman are a healing class that can wear chain armor. Their ability to buff their party and debuff mobs is capable of shifting the odds with ease. Their poison and frost spells make them both versatile and deadly in combat.',
				Warrior: 'Warriors are a tank class that can wear plate armor. Warriors have the strongest physical defense and the highest hit points in the game. They can also dish out a solid amount of physical DPS. Their exceptional pulling skills help keep their party out of trouble.',
				Wizard: 'Wizards are a magical DPS class that can only wear cloth armor. Instead of opting for trickery or pets, they focus on raw magical power. Wizards have a powerful and diverse arsenal of spells at their disposal that make quick work of their prey.'
			}
		};
		return z[key][val];
	},
	getPossibleJobs: function(race){
		return create.possibleJobs[race];
	},
	getRaceAttrs: function(race){
		return create.raceAttrs[race];
	},
	getJobAttrs: function(job){
		return create.jobAttrs[job];
	},
	set: function(key, val){
		document.getElementById(key + '-value').innerHTML = create.form[key] = val;
		// details
		ng.split('create-details', create.msg(key, val));
		if (key === 'job'){
			document.getElementById('type-value').innerHTML = create.types[val];
		}
		// resists
		ng.resists.forEach(function(v, i){
			document.getElementById(v + '-value').innerHTML = create.getResist(v);
		});
		// dungeon
		ng.dungeon.forEach(function(v, i){
			document.getElementById(v + '-value').innerHTML = create.getDungeon(v);
		});
		// reset attr
		if (key !== 'gender' && create.form.race){
			var raceAttr = ng.copy(create.getRaceAttrs(create.form.race)),
				jobAttr = ng.copy(create.getJobAttrs(create.form.job));
			jobAttr.forEach(function(v, i){
				raceAttr[i] += v;
			});
			// set initial attr values
			$(".create-attr-value").removeClass('active');
			ng.attrs.forEach(function(v, i){
				var e = document.getElementById('create-points-' + v);
				e.innerHTML = create.form[v] = create.base[v] = raceAttr[i];
				if (jobAttr[i]){
					e.className = e.className + ' active';
				}
				document.getElementById('create-points-remaining').innerHTML = create.form.left = 10;
			});
			// reset form bonuses
		}
	},
	// gender and race
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
	// race and job
	getDungeon: function(type){
		var v = 15,
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
				f.job === 'Shaman'){
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
			else if (f.job === 'Bard'){
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
		e.length && e.trigger(env.click);
	},
	setRandomRace: function(){
		var e = $(".select-race:eq("+ ~~(Math.random() * 12) +")");
		e.length && e.trigger(env.click);
	},
	// triggered by clicking race
	setRandomClass: function(race){
		// back to default
		$(".select-class").removeClass().addClass('select-class disabled');
		// remove disabled from possibles
		var ids = '',
			jobs = create.getPossibleJobs(race),
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
		e.length && e.trigger(env.click);
	}
};

