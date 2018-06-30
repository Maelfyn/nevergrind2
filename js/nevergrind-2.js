(function(
	$,
	Math,
	document,
	location,
	TweenMax,
	TimelineMax,
	Power0,
	Power1,
	Power2,
	Power3,
	Power4,
	Back,
	Elastic,
	Bounce,
	SteppedEase,
	Circ,
	Expo,
	Sine,
	setTimeout,
	setInterval,
	clearTimeout,
	clearInterval,
	webkitRequestAnimationFrame,
	webkitCancelAnimationFrame,
	getComputedStyle,
	requestAnimationFrame,
	cancelAnimationFrame,
	window,
	Array,
	JSON,
	Date,
	Object,
	undefined
){
// stuff that must exist before everything
'use strict';
var init = {
	checkMobile: function(){
		var x = false;
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) x = true;
		return x;
	}
};
init.isMobile = init.checkMobile();
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


// core.js
var ng = {
	id: 0,
	getId: function() {
		ng.id++;
		if (ng.id > 999999999) {
			ng.id = 1;
		}
		return ng.id;
	},
	events: function(){
		$(window).focus(function(){
			/*document.title = g.defaultTitle;
			ng.titleFlashing = false;*/
		});
		// should be delegating no drag start
		$("body").on('dragstart', 'img', function(e) {
			e.preventDefault();
		});
		// disable stuff in app to appear more "native"
		if (!app.isLocal) {
			document.addEventListener('contextmenu', function (e) {
				// disable default right-click menu
				context.hideCheck();
				e.preventDefault();
				return false;
			}, false);
			window.addEventListener("wheel", function(e){
				if (e.ctrlKey) {
					// disable wheel zoom
					e.preventDefault();
				}
			}, false);
		}
		$("#enter-world").on(env.click, function(){
			town.go();
		});

		$(window).on('resize orientationchange focus', function() {
			// env.resizeWindow();
			// debounce resize
			clearTimeout(ng.resizeTimer);
			ng.resizeTimer = setTimeout(function(){
				if (chat.initialized) {
					chat.scrollBottom();
				}
				if (ng.view === 'battle') {
					for (var i=0; i<mob.max; i++) {
						mob.sizeMob(i);
					}
				}
			}, 50);
		}).on('load', function(){
			env.resizeWindow();
		});
	},
	disconnect: function(msg) {
		ng.view = 'disconnected';
		// turn off all events
		$(document).add('*').off();
		$("main > *").css('display', 'none');
		var e = document.getElementById('scene-error');
		e.style.display = 'block';
		e.innerHTML = msg || 'You have been disconnected from the server';
		setTimeout(function() {
			location.reload();
		}, 12000);
	},
	resizeTimer: 0,
	races: [
		'Barbarian',
		'Dark Elf',
		'Dwarf',
		'Erudite',
		'Gnome',
		'Half Elf',
		'Halfling',
		'High Elf',
		'Human',
		'Ogre',
		'Troll',
		'Wood Elf'
	],
	jobs: [
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
		'Shaman',
		'Warrior',
		'Wizard'
	],
	jobShort: {
		Bard: 'BRD',
		Cleric: 'CLR',
		Druid: 'DRU',
		Enchanter: 'ENC',
		Magician: 'MAG',
		Monk: 'MNK',
		Necromancer: 'NEC',
		Paladin: 'PLD',
		Ranger: 'RNG',
		Rogue: 'ROG',
		Shadowknight: 'SHD',
		Shaman: 'SHM',
		Warrior: 'WAR',
		Wizard: 'WIZ'
	},
	toJobShort: function(key){
		return ng.jobShort[key];
	},
	jobLong: {
		BRD: 'Bard',
		CLR: 'Cleric',
		DRU: 'Druid',
		ENC: 'Enchanter',
		MAG: 'Magician',
		MNK: 'Monk',
		NEC: 'Necromancer',
		PLD: 'Paladin',
		RNG: 'Ranger',
		ROG: 'Rogue',
		SHD: 'Shadowknight',
		SHM: 'Shaman',
		WAR: 'Warrior',
		WIZ: 'Wizard'
	},
	toJobLong: function(key){
		return ng.jobLong[key];
	},
	getJobShortKeys: function() {
		return Object.keys(ng.jobLong);
	},
	copy: function(o){
		return JSON.parse(JSON.stringify(o));
	},
	loadMsg:
		"<div class='text-shadow text-center now-loading'>Loading... <i class='fa fa-cog fa-spin load-cog'></i></div>",
	attrs: ['str', 'sta', 'agi', 'dex', 'wis', 'intel', 'cha'],
	resists: ['bleed', 'poison', 'arcane', 'lightning', 'fire', 'cold'],
	dungeon: ['traps', 'treasure', 'scout', 'pulling'],
	gameDuration: 0,
	delay: init.isMobile ? 0 : .5,
	modalSpeed: init.isMobile ? 0 : .5,
	friends: [],
	ignore: [],
	joinedGame: false,
	searchingGame: false,
	defaultTitle: 'Nevergrind 2',
	titleFlashing: false,
	name: "",
	password: "",
	view: "title",
	resizeX: 1,
	resizeY: 1,
	chatOn: false,
	lastKey: 0,
	lockOverlay: document.getElementById("lock-overlay"),
	startTime: Date.now(),
	locked: 0,
	loadAttempts: 0,
	isModalOpen: false,
	setScene: function(scene){
		// remove defaults and set via js
		$(".scene").removeClass('none')
			.css('display', 'none');
		document.getElementById('scene-' + scene).style.display = 'block';
		ng.view = scene;
	},
	camel: function(str){
		str = str.split("-");
		for (var i=1, len=str.length; i<len; i++){
			str[i] = str[i].charAt(0).toUpperCase() + str[i].substr(1);
		}
		return str.join("");
	},
	lock: function(hide){
		ng.lockOverlay.style.display = "block";
		ng.lockOverlay.style.opacity = hide ? 0 : 1;
		ng.locked = 1;
	},
	unlock: function(){
		ng.lockOverlay.style.display = "none";
		ng.locked = 0;
	},
	unlockFade: function(d){
		if (!d){
			d = 1;
		}
		TweenMax.to(ng.lockOverlay, d, {
			startAt: {
				opacity: 1,
			},
			ease: Power3.easeIn,
			opacity: 0,
			onComplete: function(){
				ng.lockOverlay.style.display = 'none';
			}
		});
	},
	updateUserInfo: function(){
		if (location.hostname !== 'localhost'){
			$.ajax({
				async: true,
				type: 'GET',
				dataType: 'jsonp',
				url: 'https://geoip-db.com/json/geoip.php?jsonp=?'
			}).done(function(data){
				data.latitude += '';
				data.longitude += '';
				ng.geo = data;
				$.ajax({
					url: app.url + 'php/updateUserInfo.php',
					data: {
						location: ng.geo
					}
				}).done(function(){
					localStorage.setItem('geo', JSON.stringify(ng.geo));
					localStorage.setItem('geoSeason', 1);
					localStorage.setItem('geoTime', Date.now());
				});
				//console.info('loc: ', ng.geo);
			});
		}
	},
	checkPlayerData: function(){
		// not a guest
		var geo = localStorage.getItem(my.account+ '_geo');
		var geoTime = localStorage.getItem(my.account+ '_geoTime');
		var geoSeason = localStorage.getItem(my.account+ '_geoSeason');
		if (geoTime !== null || geoSeason === null){
			// longer than 90 days?
			if ((Date.now() - geoTime) > 7776000 || geoSeason === null){
				ng.updateUserInfo();
			}
		} else if (geo === null){
			ng.updateUserInfo();
		}
		// ignore list
		var ignore = localStorage.getItem('ignore');
		if (ignore !== null){
			ng.ignore = JSON.parse(ignore);
		} else {
			var foo = []; 
			localStorage.setItem('ignore', JSON.stringify(foo));
		}
	},
	TDC: function(){
		return new TweenMax.delayedCall(0, '');
	},
	TM: function(o){
		o = o || {};
		return new TimelineMax(o);
	},
	config: {
		audio: {
			musicVolume: 10,
			soundVolume: 50
		}
	},
	geo: {},
	keepAlive: function(){
		$.ajax({
			type: 'GET',
			url: app.url + "php/keepAlive.php"
		}).always(function() {
			setTimeout(ng.keepAlive, 120000);
		});
	},
	msg: function(msg, d){
		dom.msg.innerHTML = msg;
		if (d === undefined || d < 2){
			d = 2;
		}
		// unlock game modal?
        /*if (msg.indexOf('unlock-game') > -1){
            modal.show({
                key: 'unlock-game',
                focus: 1
            });
            TweenMax.set('#msg', {
                visibility: 'hidden'
            });
        }*/
		TweenMax.to(dom.msg, d, {
			overwrite: 1,
			startAt: {
				visibility: 'visible',
				alpha: 1
			},
			onComplete: function(){
				TweenMax.to(this.target, .2, {
					alpha: 0,
					onComplete: function(){
						TweenMax.set(this.target, {
							visibility: 'hidden',
						});
					}
				});
			}
		});
	},
	split: function(e, msg, d){
		if (d === undefined){
			d = .01;
		}
		var e = document.getElementById(e);
		e.innerHTML = msg;
		if (init.isMobile){
			
		}
		else if (e !== null){
			var split = new SplitText(e, {
					type: "words,chars"
				});
			TweenMax.staggerFromTo(split.chars, d, {
				immediateRender: true,
				alpha: 0
			}, {
				delay: .1,
				alpha: 1
			}, .01);
		}
	},
	logout: function(){
		if (ng.locked) return;
		ng.lock();
		// socket.removePlayer(my.account);
		$.ajax({
			type: 'GET',
			url: app.url + 'php/deleteFromFwtitle.php'
		});
		
		try {
			FB.getLoginStatus(function(ret) {
				ret.authResponse && FB.logout(function(response) {});
			});
		} catch (err){
			console.info('Facebook OAuth error: ', err);
		}
		
		try {
			var auth2 = gapi.auth2.getAuthInstance();
			auth2.signOut().then(function(){
			});
		} catch (err){
			console.info('Google OAuth error: ', err);
		}
		
		setTimeout(function(){
			$.ajax({
				type: 'GET',
				url: app.url + 'php/logout.php'
			}).done(function(data) {
				ng.msg("Logout successful");
				localStorage.removeItem('email');
				localStorage.removeItem('token');
				location.reload();
			}).fail(function() {
				ng.msg("Logout failed.");
			});
		}, 1000);
	},
	goCreateCharacter: function(){
		ng.lock(1);
		var z = '#scene-title-select-character',
			prom = 0,
			allDone = function(){
				if (++prom === 2){
					ng.unlock();
					// init create screen and show
					TweenMax.set(z, {
						display: 'none',
						opacity: 1
					});
					create.setRandomGender();
					create.setRandomRace();
					TweenMax.to('#scene-title-create-character', .6, {
						startAt: {
							display: 'block',
							y: 20,
							opacity: 0
						},
						y: 0,
						opacity: 1,
						onComplete: function(){
                            $("#create-character-name").focus();
							ng.unlock();
						}
					});
				}
			};
		// hide
		TweenMax.to(z, .6, {
			y: 20,
			opacity: 0,
			onComplete: function(){
				allDone();
			}
		});
		
		$.ajax({
			type: 'GET',
			url: app.url + 'php2/create/getStatMap.php'
		}).done(function(r){
			var r = r.statMap;
			ng.races.forEach(function(v){
				create.raceAttrs[v] = r[v].attrs;
				create.possibleJobs[v] = r[v].jobs;
			});
			// job stats
			ng.jobs.forEach(function(v){
				create.jobAttrs[v] = r.jobs[v];
			});
            $("#create-character-name").val('');
			allDone();
		});
	},
	initGame: function(){
		$.ajax({
			type: 'GET',
			url: app.url + 'php2/init-game.php'
		}).done(function(r){
			console.info('init-game', r.account, r);
			console.info(r);
			app.initialized = 1;
			if (r.account) {
				app.account = my.account = r.account; // for global reference
				document.getElementById('logout').textContent = 'Logout ' + r.account;
				ng.displayAllCharacters(r.characterData);
				ng.checkPlayerData();
				$("#login-modal").remove();
			}
			else {
				notLoggedIn();
			}
			document.getElementById('version').textContent = 'Version ' + app.version;

			var h = location.hash;
			if (app.isLocal) {
				// initial hashtag routing
				if (h === '#town' ||
					h === '#battle' ||
					h === '#dungeon') {
					town.go();
				}
			}

			if (r.resetSession === null) {
				sessionStorage.clear();
			}
		});
	},
	playerCardClicks: 0,
	displayAllCharacters: function(r){
		var s = '';
		r.forEach(function(d){
			// #ch-card-list
			s +=
				'<div data-row="'+ d.row +'" '+
				'data-name="'+ d.name +'" '+
				'class="btn btn-lg ch-card center select-player-card">'+
				'<div class="ch-card-name">'+ d.name +'</div>'+
				'<div class="ch-card-details">'+ d.level +' '+ d.race +' '+ ng.toJobLong(d.job) +'</div>'+
				'</div>';
		});
		document.getElementById('ch-card-list').innerHTML = s;
		$(".select-player-card:first").trigger(env.click);
	}
};

ng.init = (function(){
	// console.info("Initializing game...");
	$.ajaxSetup({
		type: 'POST',
		timeout: 5000
	});
	TweenLite.defaultEase = Quad.easeOut;
})();
// env.js

var env = {
	setMobile: function(){
	},
	click: init.isMobile ? 'mousedown' : 'click',
	context: init.isMobile ? 'mousedown' : 'click contextmenu',
	resizeTimer: 0,
	resizeWindow: function() {
		// currently doing nothing
		if (context.isOpen) {
			context.hide();
		}

	},
	isXbox: /Xbox/i.test(navigator.userAgent),
    isPlaystation: navigator.userAgent.toLowerCase().indexOf("playstation") >= 0,
    isNintendo: /Nintendo/i.test(navigator.userAgent),
    isOpera: !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
    isFirefox: typeof InstallTrigger !== 'undefined',
    isSafari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
    isMSIE: /*@cc_on!@*/ false,
    isMSIE11: !!navigator.userAgent.match(/Trident\/7\./)
};
env.isChrome = !!window.chrome && !env.isOpera;

// browser dependent
(function(){
	var x = localStorage.getItem('isMobile');
	if (env.isMSIE || env.isMSIE11){
		//alert("Firmament Wars does not support Internet Explorer. Consider using Chrome or Firefox for an enjoyable experience.");
		//window.stop();
		if (x === null){
			//alert("Oh no! It looks like you're using Internet Explorer! Please consider using Chrome or Firefox for a better experience!");
		}
	} else if (env.isSafari){
		//alert("Firmament Wars does not support Safari. Consider using Chrome or Firefox for an enjoyable experience.");
		//window.stop();
		if (x === null){
			//alert("Oh no! It looks like you're using Safari! Please consider using Chrome or Firefox for a better experience!");
		}
	}
	if (init.isMobile){
		env.setMobile();
	}
	localStorage.setItem('isMobile', init.isMobile);
})();


// player data values
var my = {
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
// dom.js
var dom;
(function(d){
	dom = {
		body: d.getElementById('body'),
		bgmusic: d.getElementById('bgmusic'),
		msg: d.getElementById('msg'),
		chatInput: d.getElementById('chat-input'),
		chatLog: d.getElementById('chat-log')
	}
})(document);
// modal.js
var modal = {
	isOpen: 0,
	overlay: document.getElementById('modal-overlay'),
	wrap: document.getElementById('modal-wrap'),
	show: function(e){
		modal.isOpen = 1;
		e.camelKey = ng.camel(e.key);
		var s = '<div class="stag-blue">'+
					modal.header(e) +
					modal.body(e) +
					(e.hideFooter ? '' : modal.footer(e)) +
				'</div>';
		modal.wrap.innerHTML = s;
		
		modal.isOpen = true;
		TweenMax.to(modal.overlay, .3, {
			startAt: {
				visibility: 'visible',
				alpha: 0
			},
			alpha: 1
		});
		TweenMax.to(modal.wrap, .3, {
			startAt: {
				visibility: 'visible',
				alpha: 0,
				top: 30
			},
			alpha: 1,
			top: 50
		});
		// assign events
		$("#modal-dismiss, #modal-overlay").on(env.click, function(){
			modal.hide();
		});
		// confirm event actions
		$('#modal-wrap').on(env.click, '#delete-character-confirm', function(){
			create.deleteCharacter();
		});
		/*if (e.key === 'unlock-game'){
            payment.init();
		}*/
		if (e.focus) {
            setTimeout(function () {
                $("#modal-wrap input:first").focus();
            }, 100);
        }
    },
	hide: function(){
		TweenMax.to([modal.overlay, modal.wrap], .3, {
			overwrite: 0,
			alpha: 0,
			onComplete: function(){
				modal.isOpen = 0;
				ng.unlock();
				TweenMax.set(this.target, {
					visibility: 'hidden'
				});
			}
		});
		
	},
	header: function(e){
		var z = {
			playerIdleBoot: '<div id="modal-header">Disconnected</div>',
			deleteCharacter: '<div id="modal-header">Delete '+ create.name +'?</div>',
			/*unlockGame: '<div id="modal-header">$5 to purchase Nevergrind 2?</div>',*/
		}
		return z[e.camelKey];
	},
	body: function(e){
		var z = {
			playerIdleBoot:
			'<div id="modal-body">'+
				'<p>You have been disconnected from the server.</p>'+
			'</div>',
			deleteCharacter:
			'<div id="modal-body">'+
				'<p>Are you sure you want to delete this character?</p>'+
			'</div>',
			/*unlockGame:
			'<div id="modal-body">'+
				'<p>Purchasing Nevergrind 2 unlocks:</p>'+
				'<div id="unlock-game-perks">'+
					'<div>8 character slots!</div>'+
					'<div>32-slot inventory per character!</div>'+
					'<div>64-slot bank! Account-shareable items!</div>'+
					'<div>Auction house!</div>'+
					'<div>Sending items by mail to friends!</div>'+
					'<div>Expand your friends list from 5 to 100!</div>'+
            	'</div>'+
				'<div id="unlock-game-card">'+
					'<hr class="fancy-hr">'+
					'<p>'+
						'<label>Card Number (no spaces or hyphens)</label>'+
						'<input id="card-number" type="text" maxlength="16" autocomplete="off" class="form-control ng-blue-input text-shadow"/>'+
					'</p>'+

					'<p>'+
						'<label>CVC (back of your credit card)</label>'+
						'<input id="card-cvc" type="text" maxlength="4" autocomplete="off" class="form-control ng-blue-input text-shadow"/>'+
					'</p>'+

					'<p class="container-fluid snug">'+
						'<div class="row justify-content-between">'+
							'<div class="col">'+
								'<label>Expiration Month (MM) </label>'+
								'<input id="card-month" type="text" maxlength="2" autocomplete="off"  class="form-control ng-blue-input text-shadow"/>'+
							'</div>'+
            				'<div class="col">'+
								'<label>Expiration Year (YYYY) </label>'+
								'<input id="card-year" type="text" maxlength="4" autocomplete="off" class="form-control ng-blue-input text-shadow"/>'+
							'</div>'+
            			'</div>'+
					'</p>'+
				'</div>'+
				'<div id="modal-error"></div>'+
			'</div>'*/
		}
		return z[e.camelKey];
	},
	footer: function(e){
		var str =
			'<div id="modal-footer" class="text-center">'+
				'<a id="modal-dismiss" class="ng-btn modal-buttons">Cancel</a>'+
				'<a id="'+ e.key +'-confirm" class="ng-btn modal-buttons">Confirm</a>'+
			'</div>';
		return str;
	}
};
// audio.js
var audio = {
	events: function(){
		$("#bgmusic").on('ended', function() {
			var x = document.getElementById('bgmusic');
			x.currentTime = 0;
			x.play();
		});
		$("#bgamb1").on('ended', function() {
			var x = document.getElementById('bgamb1');
			x.currentTime = 0;
			x.play();
		});
		$("#bgamb2").on('ended', function() {
			var x = document.getElementById('bgamb2');
			x.currentTime = 0;
			x.play();
		});
	},
	ext: (function(a){
		return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, '')) ? 'mp3' : 'ogg'
	})(document.createElement('audio')),
	on: (function(a){
		return !!a.canPlayType ? true : false;
	})(document.createElement('audio')),
	play: function(foo, bg){
		if (foo) {
			if (bg){
				// music
				if (ng.config.audio.musicVolume){
					dom.bgmusic.pause();
					dom.bgmusic.src = "music/" + foo + ".mp3";
					dom.bgmusic.volume = ng.config.audio.musicVolume / 100;
				}
			} else {
				// sfx
				if (ng.config.audio.soundVolume){
					var sfx = new Audio("sound/" + foo + ".mp3");
					sfx.volume = ng.config.audio.soundVolume / 100;
					sfx.play();
				}
			}
		}
	},
	save: function(){
		// save to storage
		var foo = JSON.stringify(ng.config);
		localStorage.setItem('config', foo);
	},
	setMusicVolume: function(val){
		if (ng.config.audio.musicVolume){
			if (!val){
				audio.pause();
			}
		} else {
			// start playing music
			audio.musicStart();
		}
		dom.bgmusic.volume = val / 100;
		ng.config.audio.musicVolume = val;
		audio.save();
	},
	setSoundVolume: function(val){
		ng.config.audio.soundVolume = val;
		audio.save();
	},
	pause: function(){
		dom.bgmusic.pause();
	},
	gameMusicInit: function(){
		if (ng.config.audio.musicVolume){
			audio.pause();
			dom.bgmusic.loop = false;
			audio.gameMusicPlayNext();
		}
	},
	// rotating music tracks in game
	trackIndex: ~~(Math.random() * 8),
	tracks: [
		'ArcLight',
		'Blackmoor Colossus',
		'Blackmoor Tides',
		'Dark Descent',
		'Heroic Demise',
		"Ireland's Coast",
		'Salt Marsh Birds',
		'Snowland Loop',
		'soliliquoy',
		'The Dark Amulet'
	],
	gameMusicPlayNext: function(){
		// FIX IT SO IT USES BGAUDIO
		audio.totalTracks = audio.tracks.length;
		var nowPlaying = audio.tracks[++audio.trackIndex % audio.totalTracks];
		dom.bgmusic.pause();
		dom.bgmusic.src = "music/" + nowPlaying +".mp3";
		dom.bgmusic.volume = ng.config.audio.musicVolume / 100;
		dom.bgmusic.onended = function(){
			audio.gameMusicPlayNext();
		}
		console.info("PLAYING: ", nowPlaying);
	},
	fade: function(){
		var x = {
			vol: ng.config.audio.musicVolume / 100
		}
		TweenMax.to(x, 2.5, {
			vol: 0,
			ease: Linear.easeNone,
			onUpdate: function(){
				dom.bgmusic.volume = x.vol;
			}
		});
	},
	cache: {},
	load: {
		title: function(){
			var x = [
				'bash'
			];
			for (var i=0, len=x.length; i<len; i++){
				var z = x[i];
				audio.cache[z] = new Audio("sound/" + z + ".mp3");
			}
		},
		game: function(){
			var x = [
				'bash'
			];
			for (var i=0, len=x.length; i<len; i++){
				var z = x[i];
				audio.cache[z] = new Audio("sound/" + z + ".mp3");
			}
		}
	},
	musicStart: function(){
		if (ng.view !== 'game'){
			// audio.play("ArcLight", 1);
			// audio.play("WaitingBetweenWorlds", 1);
		} else {
			audio.gameMusicPlayNext();
		}
	}
}
audio.init = (function(){
	// console.info("Checking local data...");
	var config = localStorage.getItem('config');
	if (config === null){
		// initialize
		audio.save();
	} else {
		var foo = JSON.parse(config);
		if (ng.config.audio.musicOn === undefined){
			ng.config.audio = foo.audio;
		}
	}
	// console.info("Initializing audio...", g.config.audio);
	audio.load.title();
	if (!ng.config.audio.musicVolume){
		audio.pause();
	} else {
		audio.musicStart();
	}
	var initComplete = false;
	var e = $("#musicSlider");
	if (e.length){
		e.slider({
			min  : 0, 
			max  : 100, 
			value: ng.config.audio.musicVolume,
			formatter: function(value) {
				if (initComplete){
					audio.setMusicVolume(value);
					return value;
				} else {
					return ng.config.audio.musicVolume;
				}
			}
		}).slider('setValue', ng.config.audio.musicVolume);
	}
	var e = $("#musicSlider");
	if (e.length){
		$("#soundSlider").slider({
			min  : 0, 
			max  : 100, 
			value: ng.config.audio.soundVolume,
			tooltip_position: 'bottom',
			formatter: function(value) {
				if (initComplete){
					audio.setSoundVolume(value);
					return value;
				} else {
					return ng.config.audio.soundVolume
				}
			}
		}).on('slideStop', function(val){
			audio.play('machine0');
		}).slider('setValue', ng.config.audio.soundVolume);
	}
	initComplete = true;
})();
//audio.gameMusicInit();
// game specific data
var game = {
	maxPlayers: 6,
	init: 0,
	session: {
		timer: 0
	},
	questDelay: 3000,
	ping: {
		start: Date.now(),
		oneWay: function() {
			return ~~((Date.now() - game.ping.start) / 2);
		},
		roundTrip: function() {
			return Date.now() - game.ping.start;
		}
	},
	pingColors: [
		'',
		'chat-warning',
		'chat-alert'
	],
	pingColor: function(ping) {
		var index;
		if (ping < 150) {
			index = 0;
		}
		else if (ping < 350) {
			index = 1;
		}
		else {
			index = 2;
		}
		return game.pingColors[index];
	},
	start: function() {
		// only called once
		if (!game.init) {
			game.init = 1;
			clearTimeout(game.session.timer);
			game.updateChatRoom.start();
			game.heartbeat.start();
			game.socket.start();
			game.played.start();
			game.sanity.party.start();
			game.sanity.chat.start();
		}
	},
	updateChatRoom: {
		start: function() {
			setInterval(chat.updateChannel, 15000);
		}
	},
	heartbeat: {
		enabled: 1,
		timer: 0,
		success: 0,
		fails: 0,
		successiveFails: 0,
		attempts: 0,
		start: function() {
			game.ping.start = Date.now();
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/heartbeat-first.php'
			}).done(function (data) {
				data.name = my.name;
				game.heartbeat.timer = setTimeout(game.heartbeat.send, 5000);
				bar.updateBars(data);
			});
		},
		send: function() {
			console.info("%c Last heartbeat interval: ", "background: #ff0", Date.now() - game.ping.start +'ms');
			game.ping.start = Date.now();
			clearTimeout(game.heartbeat.timer);
			if (game.heartbeat.enabled) {
				$.ajax({
					type: 'GET',
					url: app.url + 'php2/heartbeat.php'
				}).done(function (data) {
					game.heartbeat.success++;
					if (game.heartbeat.successiveFails) {
						// this does nothing right now, but maybe later?!
						game.resync();
					}
					game.heartbeat.successiveFails = 0;
					console.info("heartbeat data: ", data);
					data.name = my.name;
					bar.updateBars(data);
				}).fail(function(data){
					game.heartbeat.callbackFail(data);
				}).always(function() {
					game.heartbeat.timer = setTimeout(game.heartbeat.send, 5000);
					game.heartbeat.attempts++;
					var ping = game.ping.oneWay();
					console.info("%c Ping: ", 'background: #0f0', ping +'ms', "Ratio: " + ((game.heartbeat.success / game.heartbeat.attempts)*100) + "%");

					bar.dom.ping.innerHTML =
						'<span class="'+ game.pingColor(ping) +'">' + (ping) + 'ms</span>';
				});
			}
			else {
				game.heartbeat.callbackFail({
					responseText: "You failed to find your way back to town."
				});
			}
		},
		callbackFail: function(data) {
			console.info('%c heartbeatCallback', 'background: #f00', data.responseText);
			game.heartbeat.fails++;
			game.heartbeat.successiveFails++;
			game.heartbeat.successiveFails > 1 && ng.disconnect(data.responseText);
		}
	},
	socket: {
		timer: 0,
		checkTimer: 0,
		sendTime: 0,
		receiveTime: 0,
		interval: 5000,
		expired: 16000,
		start: function() {
			setTimeout(function() {
				TweenMax.to('#bar-lag', .5, {
					opacity: 1
				});
			}, game.socket.interval);
			game.socket.sendTime = Date.now();
			game.socket.receiveTime = Date.now();
			clearInterval(game.socket.checkTimer);
			game.socket.checkTimer = setInterval(game.socket.checkTimeout, game.socket.interval);
			clearInterval(game.socket.timer);
			game.socket.timer = setInterval(game.socket.send, game.socket.interval);
		},
		send: function() {
			// console.info("%c Last socket send: ", "background: #0ff", Date.now() - game.socket.sendTime);
			game.socket.sendTime = Date.now();
			socket.zmq.publish('hb:' + my.name, {});
		},
		checkTimeout: function() {
			// longer than interval plus checkTolerance? disconnect (failed 2x)
			var diff = Date.now() - game.socket.receiveTime;

			console.info("%c Socket ping: ", "background: #08f", diff + 'ms');
			if (diff > game.socket.expired) {
				ng.disconnect();
			}
		},
		heartbeatCallback: function() {
			game.socket.receiveTime = Date.now();
			var ping = game.socket.receiveTime - game.socket.sendTime;
			bar.dom.socket.innerHTML =
				'<span class="'+ game.pingColor(ping) +'">' + (ping) + 'ms</span>';
		}
	},
	played: {
		timer: 0,
		start: function() {
			clearInterval(game.played.timer);
			game.played.timer = setInterval(game.played.send, 60000);
		},
		send: function() {
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/update-played.php'
			}).always(function(){
				!app.isLocal && console.clear();
			});
		}
	},
	sanity: {
		party: {
			timer: 0,
			start: function() {
				clearInterval(game.sanity.party.timer);
				game.sanity.party.timer = setInterval(function(){
					if (my.p_id) {
						game.sanity.party.send();
						game.sanity.party.check();
					}
				}, 5000);
			},
			send: function() {
				console.info("Sending party heartbeats....");
				try {
					socket.zmq.publish('party:' + my.p_id, {
						id: my.row,
						route: 'party->hb'
					});
				} catch (err) {
					console.info('sanity.party.send', err);
				}
			},
			check: function() {
				var now = Date.now(),
					linkdead = [];
				for (var i=1; i<6; i++) {
					console.info("Checking: ", my.party[i].id, now - my.party[i].heartbeat > game.socket.interval * 2)
					if (my.party[i].id &&
						!my.party[i].linkdead &&
						(now - my.party[i].heartbeat > game.socket.interval * 2)) {
						linkdead.push(my.party[i].name);
						my.party[i].linkdead = 1;
					}
				}
				linkdead.forEach(function(name){
					socket.zmq.publish('party:' + my.p_id, {
						name: name,
						route: 'party->linkdead'
					});
				});
			}
		},
		chat: {
			timer: 0,
			start: function() {
				clearInterval(game.sanity.chat.timer);
				game.sanity.chat.timer = setInterval(game.sanity.chat.send, 60000);
			},
			send: function() {
				if (ng.view === 'town') {
					$.ajax({
						type: 'GET',
						url: app.url + 'php2/chat/sanity-chat.php'
					}).done(function (data) {
						for (var i = 0, len = data.players.length; i < len; i++) {
							data.players[i] *= 1;
						}
						var newChatArray = [];
						chat.inChannel.forEach(function (v) {
							if (!~data.players.indexOf(v)) {
								$("#chat-player-" + v).remove();
							}
							else {
								newChatArray.push(v);
							}
						});
						if (newChatArray.length) {
							chat.inChannel = newChatArray;
							chat.setHeader();
						}
					});
				}
			}
		}
	},
	exit: function() {
		// from town
		if (socket.enabled) {
			chat.broadcast.remove();
			if (my.p_id) {
				// boot from party
				/*
				socket.zmq.publish('party:' + my.p_id, {
					id: my.row,
					name: my.name,
					route: 'party->bootme'
				});
				*/
			}
			// notify friends
			socket.zmq.publish('friend:' + my.name, {
				name: my.name,
				route: 'off'
			});
			socket.zmq.close();
		}
	},
	resync: function() {
		// do nothing!
	},
	getGameState: function(){
	},
	scenes: [
		'scene-town',
		'scene-dungeon',
		'scene-battle'
	],
	emptyScenesExcept: function(scene) {
		game.scenes.forEach(function(v) {
			if (v === scene) {
				document.getElementById(v).style.opacity = 0;
			}
			else {
				document.getElementById(v).innerHTML = '';
			}
		});
	},
	getPetName:  function() {
		var s1 = [
				"Jo",
				"Ge",
				"Go",
				"Gi",
				"Ja",
				"Jo",
				"Je",
				"Ji",
				"Ka",
				"Ke",
				"Ko",
				"Ki",
				"La",
				"Le",
				"Lo",
				"Li",
				"Va",
				"Ve",
				"Vo",
				"Xa",
				"Xe",
				"Xo",
				"Za",
				"Ze",
				"Zo",
				"Bo"
			],
			s2 = [
				"bek",
				"ban",
				"bar",
				"bek",
				"bob",
				"rek",
				"rar",
				"nar",
				"ran",
				"sar",
				"sek",
				"sob",
				"n",
				"s",
				"k",
				"n"
			],
			s3 = [
				"er",
				"tik",
				"n",
				"er",
				"ab",
				""
			];

		return s1[~~(Math.random() * s1.length)] +
			s2[~~(Math.random() * s2.length)]+
			s3[~~(Math.random() * s3.length)];
	}
};
// title.js
var title = {
	init: (function(){
		$(document).ready(function(){
			// console.info("Initializing title screen...");
			setTimeout(function() {
				ng.initGame();
				game.session.timer = setTimeout(function(){
					ng.keepAlive();
				}, 180000);
				// init events
				var x = env.click;
				ng.events(x);
				create.events(x);
				audio.events();
			}, 100);
		});
	})(),
	test: function() {
		// nada
	}
};
var context = {
	timer: 0,
	openDate: 0,
	isInside: 0,
	isOpen: 0,
	init: (function(){
		var e = $("#tooltip-social-wrap");
		e.on(env.click, '.context-items', function(e){
			console.info('context-items clicked: ', $(this).attr('id'));
			context.click($(this).attr('id'));
		});

		e.on('mouseenter', function() {
			context.isInside = 1;
		}).on('mouseleave', function() {
			context.isInside = 0;
			clearTimeout(context.timer);
			setTimeout(function() {
				if (!context.isInside) {
				}
			}, 1000);
		});
	})(),
	click: function(id) {
		console.info("click!", id, context.player);
		context.action[ng.camel(id)]();
		context.hide();
	},
	action: {
		contextWhisper: function() {
			chat.dom.chatInput.value = '';
			chat.mode.change({
				msg: '',
				mode: '@',
				name: context.player
			});
			chat.dom.chatInput.focus();
		},
		contextInvite: function() {
			chat.sendMsg('/invite ' + context.player);
		},
		contextRemoveFriend: function() {
			chat.sendMsg('/friend remove ' + context.player);
		},
		contextAddFriend: function() {
			chat.sendMsg('/friend add ' + context.player);
		},
		contextRemoveIgnore: function() {
			chat.sendMsg('/ignore remove ' + context.player);
		},
		contextAddIgnore: function() {
			chat.sendMsg('/ignore add ' + context.player);
		},
		contextDisband: function() {
			chat.sendMsg('/disband');
		},
		contextPromote: function() {
			chat.sendMsg('/promote ' + context.player);
		},
		contextBoot: function() {
			chat.sendMsg('/boot ' + context.player);
		}
	},
	player: '',
	setPartyMenuHtml: function() {
		if (!context.player) return;
		console.info('setPartyMenuHtml', context.player);

		var z = ' class="context-items"',
			s = '';

		if (context.player === my.name) {
			// commands only for me
			// disband
			if (my.p_id) {
				s += '<div id="context-disband" '+ z +'>Disband</div>';
			}
		} else {
			// promote
			if (my.party[0].isLeader) {
				s += '<div id="context-boot" '+ z +'>Boot</div>';
				s += '<div id="context-promote" '+ z +'>Promote</div>';
			}
			// whisper
			s += '<div id="context-whisper" '+ z +'>Whisper</div>';
			// friend list
			if (~ng.friends.indexOf(context.player)) {
				s += '<div id="context-remove-friend" '+ z +'>Unfriend</div>';
			}
			else {
				s += '<div id="context-add-friend" '+ z +'>Friend</div>';
			}
			// ignore list
			if (~ng.ignore.indexOf(context.player)) {
				s += '<div id="context-remove-ignore" '+ z +'>Unignore</div>';
			}
			else {
				s += '<div id="context-add-ignore" '+ z +'>Ignore</div>';
			}
		}
		s && context.show(s);
	},
	setChatMenuHtml: function() {
		if (!context.player || context.player === my.name) return;

		var z = ' class="context-items"',
			s = '';
		// is this guy in my party?
		if (!~my.getPartyNames().indexOf(context.player)) {
			s += '<div id="context-invite" '+ z +'>Invite</div>';
		}
		s += '<div id="context-whisper" '+ z +'>Whisper</div>';
		// friend list
		if (~ng.friends.indexOf(context.player)) {
			s += '<div id="context-remove-friend" '+ z +'>Unfriend</div>';
		}
		else {
			s += '<div id="context-add-friend" '+ z +'>Friend</div>';
		}
		// ignore list
		if (~ng.ignore.indexOf(context.player)) {
			s += '<div id="context-remove-ignore" '+ z +'>Unignore</div>';
		}
		else {
			s += '<div id="context-add-ignore" '+ z +'>Ignore</div>';
		}
		context.show(s);
	},
	position: {
		padding: 10,
		halfWidth: ~~($("#tooltip-social-wrap").width() / 2),
		x: function() {
			if (my.mouse.x < context.position.halfWidth) {
				// too small
				my.mouse.x += context.position.halfWidth / 2;
				if (my.mouse.x < 80) {
					my.mouse.x = 80;
				}
			}
			else if (my.mouse.x > window.innerWidth - context.position.halfWidth) {
				// too big
				my.mouse.x -= context.position.halfWidth / 2;
				var z = window.innerWidth - 80;
				if (my.mouse.x > z) {
					my.mouse.x = z;
				}

			}
			return my.mouse.x;
		},
		y: function() {
			// determine Y adjustment
			var isMenuAbove = my.mouse.y < window.innerHeight/2,
				yAdjust = isMenuAbove ? 15 : (~~$("#tooltip-social-wrap").height() + 15) * -1;
			return my.mouse.y + yAdjust;
		}
	},
	show: function(s) {
		if (!s) return;
		var e = document.getElementById('tooltip-social-wrap');
		e.innerHTML = s;
		e.style.top = context.position.y() + 'px';
		e.style.left = context.position.x() + 'px';
		e.style.visibility = 'visible';
		context.isOpen = 1;
		context.openDate = Date.now();
	},
	hide: function() {
		document.getElementById('tooltip-social-wrap').style.visibility  = 'hidden';
		context.isOpen = 0;
	},
	hideCheck: function() {
		if (context.isOpen) {
			if (Date.now() - context.openDate > 100 && !context.isInside) {
				context.hide();
			}
		}
	},
	getChatMenu: function(name) {
		context.player = name;
		context.setChatMenuHtml();
	},
	getPartyMenu: function(name) {
		context.player = name;
		context.setPartyMenuHtml();
	}
}

onbeforeunload = function(){
	// attempt to remove player from game
	game.exit();
}

$(document).on(env.click, function(e){
	context.hideCheck();
	e.preventDefault();
	return false;
}).on('keydown', function(e){
	var code = e.keyCode,
		key = e.key;

	ng.lastKey = key;

	app.isLocal && console.info('keydown: ', key, code);
	// local only
	if (app.isLocal) {
		if (!chat.hasFocus && ng.view !== "title") {
			// key input view router
			if (key === 'b') {
				battle.go();
			}
			else if (key === 't') {
				town.go();
			}
			else if (key === 'd') {
				dungeon.go();
			}
		}
	}
	else {
		// not local
		if (code >= 112 && code <= 121 || code === 123) {
			// disable all F keys except F11
			// TODO: Put party targeting in here later
			return false;
		}
	}

	if (e.altKey) {
		return false;
	} else if (e.ctrlKey){
		if (code === 82){
			// ctrl+r refresh
			chat.reply();
			return false;
		}
		else if (!chat.hasFocus && !guild.hasFocus) {
			// no select all of webpage elements
			if (code === 65 || code === 70) {
				e.preventDefault();
			}
			// ctrl A, F
		}
	} else {
		if (!chat.hasFocus && !guild.hasFocus) {
			if (code === 191) {
				var z = $("#chat-input"),
					text = z.val();
				!text && $("#chat-input").focus();
				return;
			}

		}
		if (ng.view === 'title'){
			if (!ng.isModalOpen && !init.isMobile){
				$("#create-character-name").focus();
			}
		} else {
			// always works town, dungeon and combat
			if (chat.hasFocus) {
				if (chat.mode.change()) {
					// changing chat mode - matches possible mode change
					return false;
				}
				// has chat focus
				if (code === 38) {
					// chat focus history nav up
					if (chat.history[chat.historyIndex - 1] !== undefined) {
						var o = chat.history[--chat.historyIndex];
						chat.dom.chatInput.value = o.msg;
						chat.mode.change(o);
					}
				}
				else if (code === 40) {
					// chat focus history nav down
					if (chat.history.length === chat.historyIndex + 1) {
						chat.historyIndex++;
						chat.clear();
					}
					else if (chat.history[chat.historyIndex + 1] !== undefined) {
						var o = chat.history[++chat.historyIndex];
						chat.dom.chatInput.value = o.msg;
						chat.mode.change(o);
					}
				} else if (code === 13) {
					// enter
					my.name && chat.sendMsg();
				}
			}

			if (ng.view === 'town') {
				// town only actions
				if (!chat.hasFocus) {
					// no aside && no chat focus
					!town.aside.selected && chat.dom.chatInput.focus();
					if (guild.hasFocus) {
						if (code === 13) {
							guild.create();
						}
					}
				}
			} else {
				// dungeon & combat
				if (!chat.hasFocus && code === 13 || code === 191) {
					chat.dom.chatInput.focus();
				}
				if (code === 9) {
					// tab
					if (!e.shiftKey) {
						my.nextTarget(false);
					} else {
						my.nextTarget(true);
					}
					e.preventDefault();
				} else if (code === 86) {
					// v
					if (ng.view === 'game' && !ng.chatOn) {
						game.toggleGameWindows(1);
					}
				}
			}
		}
	}
});


$(window).on('mousemove', function(e){
	my.mouse.x = e.clientX;
	my.mouse.y = e.clientY;
}).on('resize', function(){
	context.hide();
	clearTimeout(context.resizeTimer);
	context.resizeTimer = setTimeout(function(){
	}, 100);
});
// ws.js
var socket = {
	unsubscribe: function(channel){
		try {
			socket.zmq.unsubscribe(channel);
		} catch(err) {
			console.info(err);
		}
	},
	joinGame: function(){
		(function repeat(){
			if (socket.enabled){
				socket.unsubscribe('title:' + my.channel);
				socket.unsubscribe('game:' + game.id);
				// game updates
				console.info("Subscribing to game:" + game.id);
				socket.zmq.subscribe('game:' + game.id, function(topic, data) {
					if (ng.ignore.indexOf(data.account) === -1){
						title.chatReceive(data);
					}
				});
			} else {
				setTimeout(repeat, 100);
			}
		})();
	},
	initWhisper: function() {
		if (socket.enabled) {
			var channel = 'hb:' + my.name;
			// heartbeat
			console.info("subscribing to heartbeat channel: ", channel);
			socket.zmq.subscribe(channel, function(){
				// nothin
				game.socket.heartbeatCallback();
			});
			// whisper
			channel = 'name:' + my.name;
			console.info("subscribing to whisper channel: ", channel);
			socket.zmq.subscribe(channel, function(topic, data) {
				if (data.routeTo === 'party') {
					route.party(data, data.route);
				}
				else if (data.action === 'send') {
					console.info('Sent whisper: ', data);
					// report message
					route.town(data, data.route);
					chat.lastWhisper.name = data.name;
					// callback to sender
					$.ajax({
						url: app.url + 'php2/chat/send.php',
						data: {
							action: 'receive',
							msg: chat.whisper.parse(data.msg),
							class: 'chat-whisper',
							category: 'name:' + data.name
						}
					});
				}
				// receive pong
				else if (data.action === 'receive') {
					if (!chat.lastWhisper.name) {
						chat.lastWhisper = {
							name: data.name
						}
					}
					data.msg = chat.whisper.to(data) + chat.whisper.parse(data.msg);
					route.town(data, 'chat->log');
				}
				// guild invite
				else if (data.action === 'guild-invite') {
					console.info("guild invite received! ", data);
					chat.prompt.add(data);
				}
				// party invite
				else if (data.action === 'party-invite') {
					console.info("party invite received! ", data);
					chat.prompt.add(data);
				}
				else if (data.action === 'party-invite-deny') {
					chat.log(data.name + " has denied your party invite.", 'chat-warning');
				}
				else if (data.action === 'guild-invite-deny') {
					chat.log(data.name + " has denied your guild invite.", 'chat-warning');
				}
				else if (data.action === 'party-accept') {
					chat.log(data.name + " has joined the party.", 'chat-warning');
				}
				else if (data.route === 'friend>addedMe') {
					chat.log(data.name + " has added you to their friend list.", 'chat-warning');
				}

			});
		}
	},
	enabled: 0,
	init: function(bypass){
		// is player logged in?
		socket.zmq = new ab.Session('wss://' + app.socketUrl + '/wss2/', function () {
			// on open
			socket.connectionSuccess();
		}, function (code, reason) {
			console.info('Websocket connection closed. Code: '+code+'; reason: '+reason);
			// on close/fail
			console.debug('WebSocket connection failed. Retrying...');
			socket.enabled = 0;
			setTimeout(socket.init, 100);
		}, {
			// options
			'skipSubprotocolCheck': true
		});
	},
	initialConnection: 1,
	routeMainChat: function(topic, data) {
		// console.info('rx ', topic, data);
		route.town(data, data.route);
	},
	connectionSuccess: function(){
		socket.enabled = 1;
		console.info("Socket connection established with server");
		// chat updates
		if (socket.initialConnection) {
			socket.initialConnection = 0;

			// subscribe to admin broadcasts
			var admin = 'admin:broadcast';
			console.info("subscribing to channel: ", admin);
			socket.zmq.subscribe(admin, function(topic, data) {
				console.info('rx ', topic, data);
				route.town(data, data.route);
			});

			(function repeat(){
				if (my.name){
					socket.initWhisper();
					socket.initFriendAlerts();
					socket.initGuild();
				} else {
					setTimeout(repeat, 200);
				}
			})();

			// keep alive?
			// let everyone know I am here
			chat.broadcast.add();
			chat.setHeader();
			// notify friends I'm online
			socket.zmq.publish('friend:' + my.name, {
				name: my.name,
				route: 'on'
			});
		}
	},
	initFriendAlerts: function() {
		ng.friends.forEach(function(v){
			socket.unsubscribe('friend:' + v);
			socket.zmq.subscribe('friend:' + v, function(topic, data) {
				chat.friend.notify(topic, data);
			});
		});
	},
	initParty: function(row) {
		// unsub to current party?
		socket.unsubscribe('party:'+ my.p_id);
		// sub to party
		var party = 'party:' + row;
		my.p_id = row;
		console.info("subscribing to channel: ", party);
		try {
			// for some reason I need this when I rejoin town; whatever
			socket.zmq.subscribe(party, function (topic, data) {
				// console.info('party rx ', topic, data);
				if (data.route === 'chat->log') {
					route.town(data, data.route);
				}
				else {
					route.party(data, data.route);
				}
			});
		} catch (err) {
			console.info('socket.initParty ', err);
		}
	},
	initGuild: function() {
		// subscribe to test guild for now
		if (my.guild.id) {
			console.info("subscribing to guild channel: ", my.guildChannel());
			my.guild.motd && chat.log('Guild Message of the day: ' + my.guild.motd, 'chat-guild');
			socket.zmq.subscribe(my.guildChannel(), function(topic, data) {
				console.info('rx ', topic, data);
				if (data.route === 'chat->log') {
					route.town(data, data.route);
				}
				else {
					route.guild(data, data.route);
				}
			});
		}
	}
}
// chat.js
var chat = {
	prefix: 'ng2:',
	default: 'town',
	getChannel: function() {
		return chat.prefix + my.channel;
	},
	// receives channel prop from index.php
	html: function() {
		var s =
			'<div id="chat-present-wrap" class="no-select">' +
				'<div id="chat-header">&nbsp;</div>' +
				'<div id="chat-room"></div>' +
			'</div>' +
			'<div id="chat-log-wrap">' +
				'<div id="chat-log">' +
					'<div>Welcome to Vandamor.</div>' +
					'<div class="chat-warning">Nevergrind 2 is still in development, but feel free to test it out!</div>' +
					'<div class="chat-emote">Type /help or /h for a list of chat commands.</div>' +
				'</div>' +
				'<div id="chat-prompt" class="no-select">'+
				'</div>' +
				'<div id="chat-input-wrap">' +
					'<div id="chat-input-mode" class="chat-white no-select">'+
						'<span id="chat-mode-msg" class="ellipsis">To town:</span>' +
					'</div>' +
					'<input id="chat-input" type="text" maxlength="240" autocomplete="off" spellcheck="false" />' +
				'</div>' +
			'</div>';

		return s;
	},
	initialized: 0,
	isClicked: false,
	hasFocus: false,
	count: 1, // total msgs in chat; used to count messages in memory instead of by DOM
	players: [],
	lastWhisper: {
		name: ''
	},
	mode: {
		types: [
			'/say',
			'/party',
			'/guild'
		],
		command: '/say',
		name: '',
		change: function(h){
			// only trim leading spaces
			var mode = h === undefined ? (chat.dom.chatInput.value + ng.lastKey) : h.mode,
				mode = mode.replace(/^\s+/g, '');

			if (mode === '/say' && !my.channel) {
				chat.log("You cannot communicate in town while in a dungeon", "chat-warning");
				setTimeout(function() {
					// wipe input after keyup to get rid of /say
					$("#chat-input").val('');
				});
				return false;
			}

			// known standard mode
			if (chat.mode.types.indexOf(mode) > -1) {
				chat.mode.command = mode;
				chat.mode.set(mode);
				if (!h) {
					chat.dom.chatInput.value = '';
				}
				return true;
			}
			// it's a whisper
			else if ( (h && mode[0]) === '@' ||
				(!h && mode[0] === '@' && ng.lastKey === ' ') ) {
				// history mode and mode is @
				// or not history mode and mode is @ and just hit space!
				if (h) {
					name = h.name;
				}
				else {
					var parse = chat.parseMsg(mode),
						name = parse.first.substr(1);

					name = name.toLowerCase();
					name = name[0].toUpperCase() + name.substr(1);
				}
				chat.mode.command = '@';
				chat.mode.name = name;
				chat.mode.set(chat.mode.command);
				if (!h) {
					chat.dom.chatInput.value = '';
				}
				return true;
			}
			else {
				return false;
			}
		},
		set: function(mode) {
			if (mode === '/say') {
				chat.dom.chatInputMode.className = 'chat-white';
				chat.dom.chatModeMsg.textContent = 'To ' + my.channel + ':';
			}
			else if (mode === '/party') {
				chat.dom.chatInputMode.className = 'chat-party';
				chat.dom.chatModeMsg.textContent = 'To party:';
			}
			else if (mode === '/guild') {
				chat.dom.chatInputMode.className = 'chat-guild';
				chat.dom.chatModeMsg.textContent = 'To guild:';
			}
			else if (mode === '@') {
				chat.dom.chatInputMode.className = 'chat-whisper';
				chat.dom.chatModeMsg.textContent = 'To '+ chat.mode.name +':';
			}
		},
	},
	dom: {},
	init: function() {
		// default initialization of chat
		if (!chat.initialized) {
			var e = document.getElementById('chat-wrap');
			e.innerHTML = '';
			e.style.display = 'flex';
			e.innerHTML = chat.html();

			chat.initialized = 1;
			// show
			// prevents auto scroll while scrolling
			$("#chat-log").on('mousedown', function(){
				chat.isClicked = 1;
			}).on('mouseup', function(){
				chat.isClicked = 0;
			});
			$("#chat-input").on('focus', function(){
				chat.hasFocus = 1;
			}).on('blur', function(){
				chat.hasFocus = 0;
			});

			$("#chat-prompt").on(env.click, '.chat-prompt-yes', function(e){
				chat.prompt.confirm($(this).data());
			}).on(env.click, '.chat-prompt-no', function(e){
				chat.prompt.deny($(this).data());
			});

			$("#chat-room").on(env.context, '.chat-player', function() {
				var id = $(this).parent().attr('id'),
					arr = id.split("-"),
					text = $(this).text(),
					a2 = text.split(":"),
					name = a2[1].replace(/\]/g, '').trim();

				// console.info('id name ', playerId, name);
				context.getChatMenu(name);
			});
			// dom cache
			chat.dom.chatRoom = document.getElementById('chat-room');
			chat.dom.chatHeader = document.getElementById('chat-header');
			chat.dom.chatLog = document.getElementById('chat-log');
			chat.dom.chatInput = document.getElementById('chat-input');
			chat.dom.chatInputMode = document.getElementById('chat-input-mode');
			chat.dom.chatModeMsg = document.getElementById('chat-mode-msg');
			chat.dom.chatPrompt = document.getElementById('chat-prompt');
		}
		else {
			// returned from dungeon
			chat.clearChatLog();
		}

	},
	// report to chat-log
	log: function(msg, route){
		if (msg){
			while (chat.dom.chatLog.childElementCount >= 500) {
				chat.dom.chatLog.removeChild(chat.dom.chatLog.firstChild);
			}
			var z = document.createElement('div');
			if (route){
				z.className = route;
			}
			z.innerHTML = msg;
			chat.dom.chatLog.appendChild(z);
			chat.scrollBottom();
		}
	},
	historyIndex: 0,
	history: [],
	updateHistory: function(msg) {
		var o = {
			msg: msg,
			mode: chat.mode.command
		};
		if (chat.mode.command === '@') {
			o.name = chat.mode.name;
		}
		chat.history.push(o);
		chat.historyIndex = chat.history.length;
	},
	divider: '<div class="chat-emote">========================================</div>',
	help: function() {
		var z = 'class="chat-emote"',
			h = 'class="chat-help-header"',
			s = [
				chat.divider,
				'<div '+ h +'>Main Chat Channels:</div>',
				'<div '+ z +'>/say : Say a message in your current chat channel : /say hail</div>',
				'<div '+ z +'>/party : Message your party : /party hail</div>',
				'<div '+ z +'>/guild : Message your guild : /guild hail</div>',
				'<div '+ z +'>@ : Send a private message by name : @bob hi</div>',
				'<div '+ h +'>Guild Commands</div>',
				'<div '+ z +'>/ginvite: Invite a player to your guild: /ginvite Bob</div>',
				'<div '+ z +'>/gpromote: Promote a guild member to Officer: /gpromote Bob</div>',
				'<div '+ z +'>/gleader: Promote a guild member to Leader: /gleader Bob</div>',
				'<div '+ z +'>/gboot: Boot a member from the guild: /gboot Bob</div>',
				'<div '+ z +'>/motd: Set a new message of the day for your guild: /motd message</div>',
				'<div '+ z +'>/gquit: Leave your guild: /gquit</div>',
				'<div '+ z +'>/ginvite: Invite a player to your guild: /ginvite Bob</div>',
				'<div '+ z +'>/ginvite: Invite a player to your guild: /ginvite Bob</div>',
				'<div '+ h +'>Party Commands</div>',
				'<div '+ z +'>/invite: Invite a player to your party : /invite Bob</div>',
				'<div '+ z +'>/disband: Leave your party</div>',
				'<div '+ z +'>/promote: Promote a player in your party to leader : /promote Bob</div>',
				'<div '+ z +'>/boot: Boot a player from the party: /boot Bob</div>',
				'<div '+ h +'>Social Commands:</div>',
				'<div '+ z +'>/flist or /friends : Show your friends\' online status</div>',
				'<div '+ z +'>/friend add : Add a friend : /friend add Bob</div>',
				'<div '+ z +'>/friend remove : Remove a friend : /friend remove Bob</div>',
				'<div '+ z +'>/ignore : Show your ignore list</div>',
				'<div '+ z +'>/ignore add : Add someone to your ignore list</div>',
				'<div '+ z +'>/ignore remove : Remove someone from your ignore list</div>',
				'<div '+ z +'>/who : Show all players currently playing</div>',
				'<div '+ z +'>/who class : Show current players by class : /who warrior</div>',
				'<div '+ h +'>Miscellaneous Commands:</div>',
				'<div '+ z +'>/join channel : Join a channel : /join bros</div>',
				'<div '+ z +'>/clear: clear the chat log</div>',
				'<div '+ z +'>/played: Show character creation, session duration, and total playtime</div>',
				'<div '+ z +'>/me : Send an emote to your current chat channel : /me waves</div>',
				'<div '+ z +'>/camp: Exit the game.</div>',
			];
		for (var i=0, len=s.length; i<len; i++) {
			chat.log(s[i]);
		}
	},
	// player hit ENTER
	sendMsg: function(input){
		var msg = input || chat.dom.chatInput.value.trim(),
			msgLower = msg.toLowerCase();

		// bypass via ENTER or chat has focus
		if (msg === '?' || msg === '/h' || msg === '/help') {
			chat.updateHistory(msg);
			chat.help();
		}
		/*
		/random
		/surname
		allow to form parties
			invite
			disband
			leader
			boot
		allow to form guilds
			invite
			disband
			leader
			boot
		 */
		else if (msgLower.indexOf('/motd') === 0) {
			guild.motd(guild.motdParse(msg));
		}
		else if (msgLower.indexOf('/gleader') === 0) {
			guild.leader(chat.party.parse(msg));
		}
		else if (msgLower.indexOf('/gpromote') === 0) {
			guild.promote(chat.party.parse(msg));
		}
		else if (msgLower.indexOf('/gboot') === 0) {
			guild.boot(chat.party.parse(msg));
		}
		else if (msgLower === '/gquit') {
			guild.quit();
		}
		else if (msgLower.indexOf('/ginvite') === 0) {
			guild.invite(chat.party.parse(msg));
		}
		else if (msgLower.indexOf('/promote') === 0) {
			chat.promote(chat.party.parse(msg));
		}
		else if (msgLower.indexOf('/boot') === 0) {
			chat.boot(chat.party.parse(msg));
		}
		else if (msgLower === '/disband') {
			chat.disband();
		}
		else if (msgLower.indexOf('/invite') === 0) {
			chat.invite(chat.party.parse(msg));
		}
		else if (msgLower === '/camp') {
			chat.camp();
		}
		else if (msgLower === '/played') {
			chat.played();
		}
		else if (msgLower.indexOf('/join') === 0) {
			chat.join.channel(chat.join.parse(msg));
		}
		else if (msgLower === '/clear') {
			chat.clearChatLog();
		}
		else if (msgLower === '/who') {
			chat.who.all();
		}
		else if (msgLower.indexOf('/who ') === 0 && msgLower.length > 5) {
			chat.who.class(chat.who.parse(msg));
		}
		else if (msgLower === '/ignore') {
			chat.ignore.list();
		}
		else if (msgLower.indexOf('/ignore remove') === 0) {
			chat.ignore.remove(chat.friend.parse(msg));
		}
		else if (msgLower.indexOf('/ignore add') === 0) {
			chat.ignore.add(chat.friend.parse(msg));
		}
		else if (msgLower === '/friends' || msgLower === '/flist') {
			chat.friend.list();
		}
		else if (msgLower.indexOf('/friend remove') === 0) {
			chat.friend.remove(chat.friend.parse(msg));
		}
		else if (msgLower.indexOf('/friend add') === 0) {
			chat.friend.add(chat.friend.parse(msg));
		}
		else if (msgLower.indexOf('/me') === 0 || msgLower.indexOf('/em') === 0) {
			chat.emote(msg);
		}
		else if (chat.mode.command === '@'){
			// whisper
			if (my.name !== chat.mode.name) {
				if (~ng.ignore.indexOf(chat.mode.name)) {
					chat.log('You sent ' + chat.mode.name + ' a whisper, but you are currently ignoring him.', 'chat-warning');
				}
				$.ajax({
					url: app.url + 'php2/chat/send.php',
					data: {
						action: 'send',
						msg: msg,
						class: 'chat-whisper',
						category: 'name:' + chat.mode.name
					}
				});
			}
		}
		else {
			if (msg) {
				var o = chat.getMsgObject(msg);
				if (o.msg[0] !== '/') {
					console.info(o);
					if (!my.p_id && o.category.indexOf('party') === 0) {
						chat.log("You are not in a party.", 'chat-warning');
					}
					else if (!my.guild.id && o.category.indexOf('guild') === 0) {
						chat.log("You are not in a guild.", 'chat-warning');
					}
					else {
						if (o.category === 'ng2:') {
							chat.log("You cannot communicate in town while in a dungeon", "chat-warning");
						}
						else {
							$.ajax({
								url: app.url + 'php2/chat/send.php',
								data: {
									msg: o.msg,
									class: o.class,
									category: o.category
								}
							});
						}
					}
				}
			}
		}
		chat.updateHistory(msg);
		chat.clear();
	},
	parseMsg: function(msg) {
		var arr = msg.replace(/ +/g, " ").split(" ");
		var o = {
			first: arr[0].trim().toLowerCase()
		}
		arr.shift();
		o.command = arr.join(' ');
		return o;
	},
	getMsgObject: function(msg){
		var o = {
			category: chat.getChannel(),
			msg: msg,
			class: 'chat-normal'
		},
			parse = chat.parseMsg(msg),
			a = msg.split(" ");

		a.shift();
		var shortCommandMsg = a.join(" ");

		// is it a command?
		if (parse.first === '/s') {
			o.category = chat.getChannel();
			o.msg = shortCommandMsg;
			o.class = 'chat-normal';
		}
		else if (parse.first === '/p') {
			o.category = 'party:' + my.p_id;
			o.msg = shortCommandMsg;
			o.class = 'chat-party';
		}
		else if (chat.mode.command === '/party'){
			o.category = 'party:' + my.p_id;
			o.msg = msg;
			o.class = 'chat-party';
		}
		else if (parse.first === '/g') {
			o.category = 'guild:' + my.guild.id;
			o.msg = shortCommandMsg;
			o.class = 'chat-guild';
		}
		else if (chat.mode.command === '/guild'){
			o.category = 'guild:' + my.guild.id;
			o.msg = msg;
			o.class = 'chat-guild';
		}
		else if (parse.first === '/broadcast'){
			o.category = 'admin:broadcast';
			o.msg = parse.command;
			o.class = 'chat-broadcast';
		}
		return o;
	},
	whispers: {},
	clear: function() {
		chat.dom.chatInput.value = '';
	},
	clearChatLog: function(){
		chat.dom.chatLog.innerHTML = '';
	},
	emote: function(msg) {
		var a = msg.split(" ");
		a.shift();
		msg = a.join(" ");
		if (msg[0] !== '/') {
			$.ajax({
				url: app.url + 'php2/chat/send.php',
				data: {
					msg: msg,
					class: 'chat-emote',
					category: chat.getChannel()
				}
			});
		}
	},
	ignore: {
		init: function() {
			ng.ignore = JSON.parse(localStorage.getItem('ignore')) || ng.ignore;
		},
		list: function() {
			if (ng.ignore.length) {
				var s = chat.divider + '<div class="chat-warning">Checking ignore list...</div>';
				ng.ignore.forEach(function(v) {
					s += '<div class="chat-emote">' + v + '</div>';
				});
				chat.log(s);
			}
			else {
				chat.log("Nobody is on your friends list yet.", 'chat-warning');
			}
		},
		add: function(o) {
			if (o !== my.name) {
				ng.ignore.push(o);
				localStorage.setItem('ignore', JSON.stringify(ng.ignore));
				chat.log('You have added ' + o + ' to your ignore list.', 'chat-warning');
			}
		},
		remove: function(o) {
			while (ng.ignore.indexOf(o) > -1) {
				var index = ng.ignore.indexOf(o);
				ng.ignore.splice(index, 1);
			}
			localStorage.setItem('ignore', JSON.stringify(ng.ignore));
			chat.log('You have removed ' + o + ' from your ignore list.', 'chat-warning');
		}
	},
	promote: function(name, bypass) {
		console.info('/promote ', name, bypass);
		// must be leader or bypass by auto-election when leader leaves
		var id = my.getPartyMemberIdByName(name);
		if ((my.party[0].isLeader || bypass) && my.p_id && id) {
			$.ajax({
				url: app.url + 'php2/chat/promote.php',
				data: {
					name: name,
					leaderId: id
				}
			}).done(function (data) {
				// console.info('promote ', data);
			}).fail(function (r) {
				chat.log(r.responseText, 'chat-warning');
			});
		}
	},
	disband: function() {
		if (ng.view === 'battle') {
			chat.log("You cannot disband the party during battle!", "chat-warning");
		}
		else {
			var count = my.partyCount();
			$.ajax({
				type: 'POST',
				url: app.url + 'php2/chat/disband.php',
				data: {
					count: count
				}
			}).done(function(r){
				// console.info('disband ', r);
				if (count > 1) {

				}
				if (my.p_id) {
					my.quest.level && ng.msg('Mission abandoned: '+ my.quest.title);
				}
				mission.initQuest();
				bar.disband();
				mission.abort();
			}).fail(function(r) {
				chat.log(r.responseText, 'chat-warning');
			}).always(function() {
				ng.unlock();
			});
		}
	},
	boot: function(name, bypass) {
		console.info('/promote ', name, bypass);
		// must be leader or bypass by auto-election when leader leaves
		var id = my.getPartyMemberIdByName(name);
		if ((my.party[0].isLeader || bypass) && my.p_id && id) {
			$.ajax({
				url: app.url + 'php2/chat/boot.php',
				data: {
					name: name,
					id: id
				}
			}).done(function (data) {
				console.info('boot ', data);
			}).fail(function (r) {
				chat.log(r.responseText, 'chat-warning');
			});
		}
	},
	invite: function(p) {
		if (my.name === p) {
			chat.log("You can't invite yourself to a party.", "chat-warning");
		}
		else if (my.p_id && !my.party[0].isLeader) {
			chat.log("Only the party leader may send invites.", "chat-warning");
		}
		else if (my.quest.level) {
			chat.log("You cannot invite adventurers to the party after starting the mission.", "chat-warning");
		}
		else if (!my.channel) {
			chat.log("You cannot invite adventurers from the depths of a dungeon.", "chat-warning");
		}
		else {
			if (p) {
				chat.log('Sent party invite to '+ p +'.', 'chat-warning');
				$.ajax({
					url: app.url + 'php2/chat/invite.php',
					data: {
						player: p
					}
				}).done(function(r){
					console.info('invite ', r);
					if (r.newParty) {
						my.party[0].isLeader = 1;
						bar.updatePlayerBar(0);
					}
					socket.initParty(r.p_id);
				}).fail(function(r){
					chat.log(r.responseText, 'chat-warning');
				});
			}
			else {
				chat.log("Syntax: /invite [player_name]", "chat-warning");
			}
		}
	},
	camp: function() {
		function callbackSuccess() {
			setTimeout(function(){
				$.ajax({
					type: 'GET',
					url: app.url + 'php2/chat/camp.php'
				}).done(function(){
					location.reload();
				}).fail(function(){
					chat.log('Failed to camp successfully.', 'chat-alert');
				});
			}, 500);
		}
		if (ng.view !== 'town') {
			chat.log("You can only camp in town!", "chat-warning");
		}
		else {
			chat.log('Camping...', 'chat-warning');
			game.exit();
			if (my.p_id) {
				if (my.party[0].isLeader) {
					// promote
					party.promotePlayer();
				}
				// disband
				chat.sendMsg('/disband')
			}
			(function repeat(count) {
				if (!my.p_id) {
					// successfully disbanded
					callbackSuccess();
				}
				else {
					if (count < 30) {
						setTimeout(repeat, 100, ++count);
					}
					else {
						chat.log("Failed to camp successfully.", "chat-warning");
					}
				}
			})(0);
		}
	},
	reply: function() {
		console.info('chat.lastWhisper.name', chat.lastWhisper.name);
		if (chat.lastWhisper.name) {
			var o = {
				mode: '@',
				name: chat.lastWhisper.name
			}
			chat.mode.change(o);
			chat.dom.chatInput.focus();
		}
	},
	prompt: {
		add: function(data) {
			var s = '',
				e = document.createElement('div'),
				id = ng.getId();

			console.info('prompt.add', data);
			e.id = data.action +'-'+ data.row;
			e.className = 'prompt-row prompt-row-' + id + ' ' + data.css;
			// write innerHTML
			s +=
				'<div class="chat-prompt-msg stag-blue">'+ data.msg +'</div>' + // col 1
				'<div class="chat-prompt-options stag-blue">'+ // col 2
					'<span data-row="'+ data.row +'" '+
						'data-id="'+ id +'" '+
						'data-action="'+ data.action +'" '+
						'data-c-id="'+ data.cId +'" '+
						'data-guild-name="'+ data.guildName +'" '+
						'class="chat-prompt-btn chat-prompt-yes">'+
						'<i class="fa fa-check chat-prompt-yes-icon"></i>&thinsp;Confirm'+
					'</span>' +
					'<span data-row="'+ data.row +'" '+
						'data-id="'+ id +'" '+
						'data-name="'+ data.name +'"'+
						'data-action="'+ data.action +'" '+
						'class="chat-prompt-btn chat-prompt-no">'+
						'<i class="fa fa-times chat-prompt-no-icon"></i>&thinsp;Deny'+
					'</span>' +
				'</div>';

			e.innerHTML = s;
			// remove double invites?
			$('#'+ data.action +'-' + data.row).remove();
			chat.dom.chatPrompt.appendChild(e);
			setTimeout(function() {
				$("#" + e.id).remove();
			}, 30000);

			chat.log(data.msg, 'chat-warning');
		},
		confirm: function(data){
			// join party by player id?
			$("#"+ data.action +"-"+ data.row).remove();
			/*
			action: "party-invite"
			id: 2
			row: 188
			 */
			// use data.row to join ng2_parties
			// actually add me to the party and ZMQ msg on callback success
			// and call a method to draw the whole party including hp, mp, names etc
			// party table needs extra values... hp, mp, buffs, etc
			console.info('Prompt confirmed: ', data.action, data.row, data);
			if (data.action === 'party-invite') {
				chat.party.join(data);
			}
			else if (data.action === 'guild-invite') {
				guild.join(data);
			}
		},
		deny: function(data){
			console.info('deny ', data);
			$("#"+ data.action +"-"+ data.row).remove();
			socket.zmq.publish("name:"+ data.name, {
				action: data.action + '-deny',
				name: my.name
			});
		}
	},
	party: {
		join: function(z) {
			// clicked CONFIRM
			console.info('party.join: ', z);
			$.ajax({
				url: app.url + 'php2/chat/party-join.php',
				data: {
					row: z.row,
					cId: z.cId
				}
			}).done(function(data){
				console.info("party-join.php ", data);
				chat.log("You have joined the party.", "chat-warning");
				socket.initParty(z.row);
				bar.getParty();
			}).fail(function(data){
				console.info("Oh no", data);
				chat.log(data.responseText, 'chat-warning');
			});
		},
		parse: function(msg) { // 2-part upper case
			var a = msg.replace(/ +/g, " ").split(" ");
			return a[1] === undefined ?
				'' : (a[1][0].toUpperCase() + a[1].substr(1).toLowerCase()).trim();
		},

	},
	whisper: {
		parse: function(msg) { // 2-part parse lower case
			var a = msg.split("whispers: ");
			return a[1];
		},
		prefix: function() {
			return '[' + my.level +':<span class="chat-'+ my.job +'">'+ my.name + '</span>]';
		},
		to: function(data) {
			return 'You whispered to ' + data.name + ': ';
		}
	},
	friend: {
		parse: function(o) { // 3-part parse
			var a = o.replace(/ +/g, " ").split(" ");
			return a[2][0].toUpperCase() + a[2].substr(1).toLowerCase().trim();
		},
		init: function() {
			ng.friends = ng.friends || [];
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/chat/friend-get.php',
			}).done(function(data){
				ng.friends = data;
			});
		},
		list: function() {
			chat.log('<div class="chat-warning">Checking friends list...</div>');
			if (ng.friends.length){
				$.ajax({
					type: 'GET',
					url: app.url + 'php2/chat/friend-status.php'
				}).done(function(r){
					ng.friends = r.friends;
					console.info(r);
					var str = chat.divider + '<div>Friend List ('+ r.friends.length +')</div>';

					ng.friends.forEach(function(name, i){
						var index = r.players.indexOf(name);
						if (index > -1){
							var s = r.stats[index];
							// online
							str +=
								'<div class="chat-whisper">[' +
								s.level +' '+ ng.jobLong[s.job] +'] '+ ng.friends[i] + ' ('+ s.race +
								')' + guild.format(s) + '</div>';
						} else {
							// offline
							str += '<div class="chat-emote">[Offline] ' + name +'</div>';
						}
					});

					chat.log(str);
				});
			} else {
				chat.log("<div>You don't have any friends!</div>");
				chat.log("<div class='chat-emote'>Use /friend [name] to add a new friend.</div>");
			}
		},
		add: function(o) {
			if (~ng.friends.indexOf(o)) {
				chat.log(o + " is already your friend.", 'chat-warning');
			}
			else if (o.length > 1 && o !== my.name) {
				$.ajax({
					url: app.url + 'php2/chat/friend-add.php',
					data: {
						friend: o
					}
				}).done(function(data){
					if (data.error) {
						chat.log(data.error, 'chat-warning');
					}
					else {
						chat.log('You have added ' + o + ' to your friend list.', 'chat-warning');
						socket.zmq.subscribe('friend:'+ o, function(topic, data) {
							chat.friend.notify(topic, data);
						});

						if (!~ng.friends.indexOf(o)) {
							socket.zmq.publish('name:' + o, {
								name: my.name,
								route: "friend>addedMe"
							});
						}

						ng.friends.push(o);
					}
				});
			}
		},
		remove: function(o) {
			if (o.length > 1 && o !== my.name && ng.friends.indexOf(o) > -1) {
				$.ajax({
					url: app.url + 'php2/chat/friend-remove.php',
					data: {
						friend: o
					}
				}).done(function(data){
					if (data.error) {
						chat.log(data.error, 'chat-warning');
					}
					else {
						chat.log('You have removed ' + o + ' from your friend list.', 'chat-warning');
						while (ng.friends.indexOf(o) > -1) {
							var index = ng.friends.indexOf(o);
							ng.friends.splice(index, 1);
						}
						socket.unsubscribe('friend:'+ o);
					}
				});
			}
		},
		notify: function(topic, data) {
			if (data.route === 'on') {
				chat.log(data.name + ' has come online.', 'chat-warning');
			}
			else {
				chat.log(data.name + ' has gone offline.', 'chat-warning');
			}
		}
	},
	toPlaytime: function(minLeft) {
		var d = 0,
			h = 0;

		if (minLeft >= 1440) {
			d = Math.floor(minLeft / 1440);
			minLeft = (minLeft % 1440);
		}
		if (minLeft >= 60) {
			h = Math.floor(minLeft / 60);
			minLeft = (minLeft % 60);
		}
		var m = minLeft,
			dayStr = '',
			hourStr = '',
			minStr = '';
		if (d) {
			dayStr += d + (d > 1 ? ' days' : ' day');
		}
		if (h) {
			hourStr += h + (h > 1 ? ' hours' : ' hour');
		}
		// minutes
		minStr = m;
		if (m !== 1) {
			minStr += ' minutes';
		}
		else {
			minStr += ' minute';
		}

		if (d && h && m) {
			dayStr += ', ';
		}
		else if (d) {
			dayStr += ' ';
		}

		if (h) {
			hourStr += ', ';
		}

		if (d || h) {
			minStr = 'and ' + minStr;
		}
		return dayStr + hourStr + minStr;
	},
	toCreateString: function(d) {
		d = new Date(d);
		return d.toDateString() + ' ' + d.toLocaleTimeString();
	},
	played: function() {
		$.ajax({
			type: 'GET',
			url: app.url + 'php2/chat/played.php'
		}).done(function(r) {
			var sessionLen = Date.now() - JSON.parse(sessionStorage.getItem('startTime')),
				durationStr = chat.toPlaytime(~~(sessionLen / 100000));
			chat.log("Character created: " + chat.toCreateString(r.created), 'chat-warning');
			chat.log("Current session duration: " + durationStr, 'chat-whisper');
			chat.log("Total character playtime: " + chat.toPlaytime(r.playtime), 'chat-whisper');
		});
	},
	who: {
		parse: function(msg) { // complex parse for class names
			var a = msg.replace(/ +/g, " ").split(" "),
				job = a[1],
				longJob = job[0].toUpperCase() + job.substr(1).toLowerCase().trim();

			// long name?
			if (ng.jobs.indexOf(longJob) > -1) {
				// convert to short
				return ng.jobShort[longJob];
			}
			else {
				var shortJobs = Object.keys(ng.jobLong),
					job = job.toUpperCase();
				if (shortJobs.indexOf(job)) {
					// is it on the short job list?
					return job;
				}
				else {
					return '';
				}
			}
		},
		all: function(){
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/chat/who-all.php'
			}).done(function(r){
				console.info('who ', r);
				if (r.len) {
					chat.log(chat.divider + "There " + (r.len > 1 ? "are" : "is") +" currently "+
						r.len + " "+ (r.len > 1 ? "players" : "players") +" in Vandamor.", "chat-warning");
					// online
					var str = '';
					r.players.forEach(function(v, i){
						str +=
							'<div class="chat-whisper">[' +
							v.level +' '+ ng.jobLong[v.job] +'] '+ v.name + ' ('+ v.race +
							')' + guild.format(v) +'</div>';
					});
					chat.log(str, 'chat-whisper');
				}
				else {
					chat.log("Nobody is currently in Vandamor.", "chat-warning");
				}
			});
		},
		class: function(job){
			console.info('who.class ', job);
			$.ajax({
				url: app.url + 'php2/chat/who-class.php',
				data: {
					job: job
				}
			}).done(function(r){
				console.info('r ', r);
				var jobLong = ng.toJobLong(job);
				if (r.len) {
					chat.log(chat.divider + "There " + (r.len > 1 ? "are" : "is") +" currently "+
						r.len + " "+ (r.len > 1 ? jobLong + 's' : jobLong) +" in Vandamor.", "chat-warning");
					// online
					var str = '';
					r.players.forEach(function(v, i){
						str +=
							'<div class="chat-whisper">[' +
							v.level +' '+ ng.jobLong[v.job] +'] '+ v.name + ' ('+ v.race +
							')' + guild.format(v) +'</div>';
					});
					chat.log(str, 'chat-whisper');
				}
				else if (!jobLong) {
					chat.log("No results found. Try searching by a class name /who cleric.", "chat-warning");
				}
				else {
					chat.log("Currently there are no " + jobLong + "s in Vandamor.", "chat-warning");
				}


			});
		},
	},
	scrollBottom: function(){
		if (!chat.isClicked && chat.initialized){
			chat.dom.chatLog.scrollTop = chat.dom.chatLog.scrollHeight;
		}
	},
	inChannel: [],
	setRoom: function(data) {
		console.info('setRoom', data.length, data);
		var s = '';
		chat.inChannel = [];
		data.forEach(function(v){
			chat.inChannel.push(v.id * 1);
			s +=
			'<div id="chat-player-'+ v.id +'">'+
				'<span class="chat-player">['+ v.level +':<span class="chat-'+ v.job +'">'+ v.name +'</span>]</span>'+
			'</div>';
		});
		if (s) {
			chat.dom.chatRoom.innerHTML = s;
		}
	},
	setHeader: function() {
		// or chat.inChannel.length ?
		chat.dom.chatHeader.innerHTML = my.channel + '&thinsp;(' + $(".chat-player").length + ')';
	},
	join: {
		parse: function(msg) { // 2 part parse lower case
			var c = msg.replace(/ +/g, " ").split(" ");
			return c[1] === undefined ?
				'' : c[1].toLowerCase().trim();
		},
		channel: function(channel, bypass) {
			if (ng.view === 'town' || bypass) {
				if (channel) {
					// remove from channel
					if (channel !== my.channel) {
						$.ajax({
							url: app.url + 'php2/chat/set-channel.php',
							data: {
								channel: channel
							}
						}).done(function (data) {
							chat.join.changeCallback(data);
						});
					}
				}
				else {
					chat.join.default();
				}
			}
		},
		default: function() {
			console.info(my.channel, chat.default);
			if (my.channel !== chat.default) {
				$.ajax({
					url: app.url + 'php2/chat/set-channel.php',
					data: {
						channel: chat.default
					}
				}).done(function (data) {
					chat.join.changeCallback(data);
				});
			}
		},
		changeCallback: function(data) {
			chat.broadcast.remove();
			console.info("You have changed channel to: ", data);
			chat.setRoom(data.players);
			// removes id
			//socket.removePlayer(my.account);
			// unsubs
			my.channel && socket.unsubscribe(chat.getChannel());
			// set new channel data
			my.channel = data.channel;
			chat.log('You have joined channel: ' + data.channel, 'chat-warning');
			socket.zmq.subscribe(data.fullChannel, function (topic, data) {
				socket.routeMainChat(topic, data);
			});
			// add to chat channel
			chat.setHeader();
			chat.broadcast.add();
		}
	},
	updateChannel: function() {
		if (ng.view === 'town') {
			$.ajax({
				url: app.url + 'php2/chat/update-channel.php',
				data: {
					channel: chat.default
				}
			}).done(function (data) {
				console.info("updateChannel: ", data);
				chat.setRoom(data.players);
				chat.setHeader();
			});
		}
	},
	// players receive update from socket
	addPlayer: function(v) {
		if (chat.inChannel.indexOf(v.row) === -1) {
			var e = document.createElement('div');
			e.innerHTML =
			'<div id="chat-player-'+ v.row +'">'+
				'<span class="chat-player">['+ v.level +':<span class="chat-'+ v.job +'">'+ v.name +'</span>]</span>'+
			'</div>';
			chat.dom.chatRoom.appendChild(e);
			chat.inChannel.push(v.row);
			chat.setHeader();
		}
	},
	removePlayer: function(v) {
		var e = document.getElementById('chat-player-' + v.row);
		e !== null && e.parentNode.removeChild(e);
		var index = chat.inChannel.indexOf(v.row);
		chat.inChannel.splice(index, 1);
		chat.setHeader();
	},
	// player broadcasts updates from client
	broadcast: {
		add: function() {
			console.info('broadcast.add', chat.getChannel());
			socket.zmq.publish(chat.getChannel(), {
				route: 'chat->add',
				row: my.row,
				level: my.level,
				job: my.job,
				name: my.name
			});
		},
		remove: function() {
			console.info('broadcast.remove');
			try {
				socket.zmq.publish(chat.getChannel(), {
					route: 'chat->remove',
					row: my.row
				});
			} catch (err) {
				console.info('broadcast.remove: ', err);
			}
		}
	},
	size: {
		small: function() {
			TweenMax.set('#chat-present-wrap', {
				display: 'none'
			});
			TweenMax.set('#chat-wrap', {
				height: '25vh',
				width: '35vw'
			});
			TweenMax.set('#chat-log-wrap', {
				flexBasis: '100%'
			});
		},
		large: function() {
			TweenMax.set('#chat-present-wrap', {
				display: 'flex'
			});
			TweenMax.set('#chat-wrap', {
				height: '50vh',
				width: '50vw'
			});
			TweenMax.set('#chat-log-wrap', {
				flexBasis: '70%'
			});
		}
	}
};
var bar = {
	initialized: 0,
	init: function() {
		if (!bar.initialized) {
			bar.initialized = 1;
			var e = document.getElementById('bar-wrap');
			e.innerHTML = bar.html();
			$(".bar-icons").tooltip({
				animation: false
			});
			e.style.display = 'block';

			for (var i = 0; i < game.maxPlayers; i++) {
				bar.setEvents(i);
			}
			// draw all bars
			bar.setAllBars();
			// bar events
			$("#bar-wrap").on(env.context, '.bar-col-icon', function (e) {
				var id = $(this).attr('id'),
					arr = id.split("-"),
					slot = arr[3] * 1;

				console.info(id, slot, my.party[slot].name);
				context.getPartyMenu(my.party[slot].name);
			}).on(env.click, '#bar-camp', function () {
				chat.camp();
			}).on(env.click, '#bar-stats', function () {
				console.info($(this).attr('id'));
			}).on(env.click, '#bar-inventory', function () {
				console.info($(this).attr('id'));
			}).on(env.click, '#bar-options', function () {
				console.info($(this).attr('id'));
			}).on(env.click, '#bar-mission-abandon', function () {
				mission.abandon();
			});
		}
	},
	setEvents: function(i) {
		bar.dom[i] = {
			playerWrap: document.getElementById('bar-player-wrap-' + i),
			name: document.getElementById('bar-name-' + i),
			hpFg: document.getElementById('bar-hp-fg-' + i),
			// hpBg: document.getElementById('bar-hp-bg-' + i),
			mpWrap: document.getElementById('bar-mp-wrap-' + i),
			mpFg: document.getElementById('bar-mp-fg-' + i),
		}

		bar.dom.ping = document.getElementById('bar-ping');
		bar.dom.socket = document.getElementById('bar-socket');
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
	header: function() {
		var s = '';
		s +=
		'<div id="bar-lag">' +
			'<span id="bar-ping"><i class="fa fa-exchange"></i></span>' +
			'<span id="bar-socket"><i class="fa fa-exchange"></i></span>' +
		'</div>' +
		'<div id="bar-header">' +
			'<i id="bar-camp" class="fa fa-power-off bar-icons" title="Camp"></i>' +
			'<i id="bar-stats" class="fa fa-user-circle-o bar-icons" title="Stat Sheet"></i>' +
			'<i id="bar-inventory" class="fa fa-suitcase bar-icons" title="Inventory"></i>' +
			'<i id="bar-options" class="fa fa-gear bar-icons" title="Options"></i>' +
			'<i id="bar-mission-abandon" class="fa fa-flag bar-icons" title="Abandon Mission"></i>' +
		'</div>';
		return s;
	},
	getPlayerInnerHtml: function(p, i) {
		// inner portion of getPlayerHtml
		var s =
		'<div id="bar-col-icon-'+ i +'" class="bar-col-icon player-icon-'+ p.job +'">' +
			//'<div id="bar-level-'+ i +'" class="bar-level no-pointer">'+ p.level +'</div>' +
			'<div id="bar-is-leader-'+ i +'" class="bar-is-leader '+ (p.isLeader ? 'block' : 'none') +' no-pointer"></div>' +
		'</div>' +
		'<div class="'+ (!i ? 'bar-col-data' : 'bar-col-data-sm') +'">' +
			'<div id="bar-name-'+ i +'" class="bar-hp-name ellipsis">'+ p.name +'</div>' +
			'<div id="bar-hp-wrap-'+ i +'" class="bar-any-wrap">' +
				'<div id="bar-hp-fg-'+ i +'" class="bar-hp-fg"></div>' +
				//'<div id="bar-hp-bg-'+ i +'" class="bar-any-bg"></div>' +
			'</div>' +
			'<div id="bar-mp-wrap-'+ i +'" class="bar-any-wrap">' +
				'<div id="bar-mp-fg-'+ i +'" class="bar-mp-fg"></div>' +
			'</div>' +
		'</div>';
		return s;
	},
	html: function() {
		// my bar
		var s = bar.header();
		// party bars
		s += '<div id="bar-all-player-wrap">';
		for (var i=0; i<game.maxPlayers; i++) {
			s += bar.getPlayerHtml(my.party[i], i);
		}
		s += '</div>';
		return s;
	},
	updatePlayerBar: function(index) {
		bar.dom[index].playerWrap.style.display = 'flex';
		bar.dom[index].playerWrap.innerHTML = bar.getPlayerInnerHtml(my.party[index], index);
		bar.setEvents(index);
		bar.setBars(index, 0);
	},
	setAllBars: function() {
		// draw all hp/mp values using my.party data
		for (var i=0; i<game.maxPlayers; i++) {
			bar.setHp(i);
			bar.setMp(i);
		}
	},
	setBars: function(index, delay) {
		bar.setHp(index, delay);
		bar.setMp(index, delay);
	},
	updateBars: function(data) {
		for (var i=0, len=my.party.length; i<len; i++) {
			if (data.name === my.party[i].name) {
				if (data.hp) {
					my.party[i].hp = data.hp;
					bar.setHp(i);
				}
				if (data.mp) {
					my.party[i].mp = data.mp;
					bar.setMp(i);
				}
			}
		}
	},
	setHp: function(index, delay) {
		if (!my.party[index].name) return;
		var percent = ~~((my.party[index].hp / my.party[index].maxHp) * 100) + '%',
				delay = delay === undefined ? .3 : delay;
		TweenMax.to(bar.dom[index].hpFg, delay, {
			width: percent
		});
		/*TweenMax.to(bar.dom[index].hpBg, .5, {
			width: percent
		});*/
	},
	setMp: function(index, delay) {
		if (!my.party[index].name) return;
		if (my.party[index].maxMp) {
			var percent = ~~((my.party[index].mp / my.party[index].maxMp) * 100) + '%',
				delay = delay === undefined ? .3 : delay;
			TweenMax.to(bar.dom[index].mpFg, delay, {
				width: percent
			});
		}
		else {
			bar.dom[index].mpWrap.style.display = 'none';
		}
	},
	party: {
		// from ZMQ
		join: function(data) {
			console.info('bar.party.join ', data);
			chat.log(data.msg, 'chat-warning');
			// refresh party bars
			bar.getParty();
		},
		disband: function(data) {
			var index = 0,
				name = '',
				electNewLeader = 0;
			// did the leader disband or somehow get booted?
			my.party.forEach(function(v, i) {
				if (data.row === v.id) {
					index = i;
					name = v.name;
					if (v.isLeader) {
						electNewLeader = 1;
					}
				}
			});
			// disbanded player found
			if (index) {
				// reset client data to default
				my.party[index] = my.Party();
				document.getElementById('bar-player-wrap-' + index).style.display = 'none';
				chat.log(name + " has disbanded the party.", 'chat-warning');
				// elect new leader if client's id is lowest
				if (electNewLeader && my.isLowestPartyIdMine()) {
					chat.promote(my.getNewLeaderName(), 1);
				}
			}
			// disband if it's me
			// console.info('disband: ', data.row, my.id);
			data.row === my.row && chat.sendMsg('/disband');

		},
		promote: function(data) {
			chat.log(data.name + " has been promoted to party leader.", 'chat-warning');
			// refresh party bars
			bar.getParty();
		},
		boot: function(data) {
			console.info('bar.party.boot ', data);
			chat.log(data.name + " has been booted from the party.", 'chat-warning');
			// refresh party bars
			data.row *= 1;
			bar.party.disband(data);
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
				console.info('getParty ', data);
				var npIndex = 1;
				data.party.forEach(function(v, i){
					console.info('SET BARS ', i, v);
					if (v.name === my.name) {
						my.party[0] = v;
						my.resetClientPartyValues(0);
						bar.updatePlayerBar(0);
					}
					else {
						my.party[npIndex] = v;
						my.resetClientPartyValues(npIndex);
						bar.updatePlayerBar(npIndex++);
					}
				});
				// hide empty rows
				var len = data.party.length;
				for (var i=len; i<game.maxPlayers; i++) {
					if (i) {
						// never overwrite self
						document.getElementById('bar-player-wrap-' + i).style.display = 'none';
						my.party[i] = my.Party();
					}
				}
			});
		}
	},
	disband: function() {
		my.party.forEach(function(v, i){
			if (i) {
				// set client value
				my.party[i] = my.Party();
			}
		});
		bar.hideParty();
		// update server
		socket.unsubscribe('party:'+ my.p_id);
		my.p_id = 0;
		my.party[0].isLeader = 0;
		document.getElementById('bar-is-leader-0').style.display = 'none';
	},
	hideParty: function() {
		my.party.forEach(function(v, i){
			if (i) {
				document.getElementById('bar-player-wrap-' + i).style.display = 'none';
			}
		});
	},
	heartbeat: {
		receive: function(data) {
			console.info('%c party heartbeat.receive id:', "background: #0ff", data.id);
			var index = 0;
			// check everyone except me
			for (var i=1; i<6; i++) {
				if (data.id === my.party[i].id) {
					index = i;
				}
			}
			if (index) {
				my.resetClientPartyValues(index);
			}
		},
		linkdead: function(data) {
			chat.log(data.name + ' has gone linkdead.', 'chat-warning');
		}
	},
	get: function() {

	},
	events: function() {

	}
}
// battle
var battle = {
	go: function(){
		if (ng.view === 'battle') return;
		chat.size.small();
		mob.init();
		game.emptyScenesExcept('scene-battle');
		ng.setScene('battle');
		TweenMax.to('#scene-battle', .5, {
			delay: .5,
			opacity: 1
		});
		if (!mob.initialized) {
			// initialization things only
			mob.initialized = 1;
			mob.imageKeys = Object.keys(mobs.images);
			mob.index = mob.imageKeys.length - 1;
		}
		button.init();
	},
	html: function(){
		var s = '<img id="battle-bg" class="img-bg" src="img2/bg/fw2.jpg">';

		for (var i=0; i<mob.max; i++){
			var test = i === 2 ? "" : " test";
			var test = '';
			s +=
			'<div id="mob-center-' +i+ '" class="mob-center"></div>' +
			'<div id="mob-wrap-' +i+ '" class="mob-wrap' + test +'">' +
				'<div id="mob-details-' +i+ '" class="mob-details" index="' + i + '">' +
					'<div id="mob-name-' +i+ '" class="mob-name text-shadow"></div>' +
					'<div id="mob-bar-' +i+ '" class="mob-bar">' +
						'<div id="mob-health-' +i+ '" class="mob-health"></div>' +
					'</div>' +
				'</div>' +
				'<div id="mob-shadow-' +i+ '" class="mob-shadow"></div>' +
				'<div class="mob-img-wrap">' +
					'<img id="mob-img-' +i+ '" class="mob-img" src="img2/blank.png">' +
				'</div>' +
				'<div id="mob-alive-' +i+ '" class="mob-alive" index="' + i + '"></div>' +
				'<div id="mob-dead-' +i+ '" class="mob-dead" index="' + i + '"></div>' +
			'</div>';
		}
		return s;
	},
	events: function(){
		$(".mob-alive, .mob-dead, .mob-details").on(env.click, function(){
			battle.setTarget(this.getAttribute('index') * 1);
		});
	},
	initialized: 0,
	show: function(){
		ng.setScene('battle');
		if (battle.initialized) {
			document.getElementById('scene-battle').style.display = 'block';
		}
		else {
			document.getElementById('scene-battle').innerHTML = battle.html();
			battle.events();
			battle.isInit = 1;
		}
	},
	setTarget: function(i){
		console.info("Setting target ", i, Date.now());
	},
	// MUST INIT THEN SHOW
	testInit: function() {
		for (var i=0; i<mob.max; i++){
			var mobKey = mob.getRandomMobKey();
				// mobKey = 'toadlok';
			cache.preload.mob(mobKey);
			mob.setMob(i, mobKey);
		}
	},
	// 1080p defaults
	boxCoordsCenter: [192,576,960,1344,1728,384,768,1152,1536],
	// never changes
	boxCoordsBottom: [180,180,180,180,180,280,280,280,280],
	// changes based on width
	getResponsiveCenter: function(i){
		// responsive center
		return ~~(battle.boxCoordsCenter[i] * (window.innerWidth / 1920));
	},
	getBox: function(i){
		// return absolute positioning about a specific mob box
		var c = battle.getResponsiveCenter(i),
			cy = ~~(battle.boxCoordsBottom[i] + (mobs[i].imgCy * mobs[i].size));

		return x = {
			x: ~~(c - (mobs[i].w * .5)),
			y: battle.boxCoordsBottom[i],
			cx: c,
			cy: cy
		}
	}
};

var mobs = [];
mobs.images = {
	'balrog': {
		imgW: 2000,
		imgH: 1200,
		imgCy: 360,
		w: 2000,
		h: 1200,
		yFloor: -195,
		yoyo: true,
		cache: [],
		speed: .05,
		detailAliveBottom: 620,
		detailDeathBottom: 240,
		shadowBottom: 40,
		shadowWidth: 400,
		shadowHeight: 80,
		clickAliveY: 20,
		clickAliveW: 230,
		clickAliveH: 500,
		clickDeadY: -70,
		clickDeadW: 400,
		clickDeadH: 200,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'ice-golem': {
		imgW: 1200,
		imgH: 1000,
		imgCy: 360,
		w: 960,
		h: 800,
		yFloor: -140,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 580,
		detailDeathBottom: 300,
		shadowBottom: 40,
		shadowWidth: 370,
		shadowHeight: 100,
		clickAliveY: 40,
		clickAliveW: 300,
		clickAliveH: 500,
		clickDeadY: -50,
		clickDeadW: 500,
		clickDeadH: 250,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'stone-golem': {
		imgW: 1200,
		imgH: 1000,
		imgCy: 360,
		w: 960,
		h: 800,
		yFloor: -140,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 580,
		detailDeathBottom: 300,
		shadowBottom: 40,
		shadowWidth: 370,
		shadowHeight: 100,
		clickAliveY: 40,
		clickAliveW: 300,
		clickAliveH: 500,
		clickDeadY: -50,
		clickDeadW: 500,
		clickDeadH: 250,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'iron-golem': {
		imgW: 1200,
		imgH: 1000,
		imgCy: 360,
		w: 960,
		h: 800,
		yFloor: -140,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 580,
		detailDeathBottom: 300,
		shadowBottom: 40,
		shadowWidth: 370,
		shadowHeight: 100,
		clickAliveY: 40,
		clickAliveW: 300,
		clickAliveH: 500,
		clickDeadY: -50,
		clickDeadW: 500,
		clickDeadH: 250,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'treant': {
		imgW: 1300,
		imgH: 1200,
		imgCy: 420,
		w: 1170,
		h: 1080,
		yFloor: -135,
		yoyo: false,
		cache: [],
		speed: .05,
		detailAliveBottom: 750,
		detailDeathBottom: 270,
		shadowBottom: 40,
		shadowWidth: 420,
		shadowHeight: 70,
		clickAliveY: 30,
		clickAliveW: 200,
		clickAliveH: 600,
		clickDeadY: -80,
		clickDeadW: 350,
		clickDeadH: 200,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'spider': {
		imgW: 1000,
		imgH: 1000,
		imgCy: 190,
		w: 1000,
		h: 1000,
		yFloor: -190,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 380,
		detailDeathBottom: 270,
		shadowBottom: 40,
		shadowWidth: 900,
		shadowHeight: 100,
		clickAliveY: 10,
		clickAliveW: 800,
		clickAliveH: 280,
		clickDeadY: 50,
		clickDeadW: 500,
		clickDeadH: 180,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'wolf': {
		imgW: 1000,
		imgH: 1000,
		imgCy: 240,
		w: 600,
		h: 600,
		yFloor: -40,
		yoyo: true,
		cache: [],
		speed: .045,
		detailAliveBottom: 390,
		detailDeathBottom: 220,
		shadowBottom: 20,
		shadowWidth: 200,
		shadowHeight: 100,
		clickAliveY: 10,
		clickAliveW: 130,
		clickAliveH: 330,
		clickDeadY: 0,
		clickDeadW: 300,
		clickDeadH: 120,
		enableSecondary: 0,
		enableSpecial: 1
	},
	'rat': {
		imgW: 1100,
		imgH: 1000,
		imgCy: 135,
		w: 550,
		h: 500,
		yFloor: -70,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 260,
		detailDeathBottom: 200,
		shadowBottom: 40,
		shadowWidth: 200,
		shadowHeight: 80,
		clickAliveY: 30,
		clickAliveW: 150,
		clickAliveH: 180,
		clickDeadY: 20,
		clickDeadW: 210,
		clickDeadH: 120,
		enableSecondary: 0,
		enableSpecial: 1
	},
	'snake': {
		imgW: 1000,
		imgH: 1000,
		imgCy: 160,
		w: 500,
		h: 500,
		yFloor: -60,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 320,
		detailDeathBottom: 200,
		shadowBottom: 40,
		shadowWidth: 200,
		shadowHeight: 60,
		clickAliveY: 30,
		clickAliveW: 150,
		clickAliveH: 230,
		clickDeadY: 0,
		clickDeadW: 150,
		clickDeadH: 100,
		enableSecondary: 0,
		enableSpecial: 1
	},
	'dragonkin': {
		imgW: 1300,
		imgH: 1300,
		imgCy: 340,
		w: 845,
		h: 845,
		yFloor: -70,
		yoyo: false,
		cache: [],
		speed: .055,
		detailAliveBottom: 510,
		detailDeathBottom: 240,
		shadowBottom: 40,
		shadowWidth: 360,
		shadowHeight: 100,
		clickAliveY: 30,
		clickAliveW: 200,
		clickAliveH: 440,
		clickDeadY: -50,
		clickDeadW: 250,
		clickDeadH: 200,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'lizardman': {
		imgW: 1100,
		imgH: 1000,
		imgCy: 350,
		w: 880,
		h: 800,
		yFloor: -130,
		yoyo: true,
		cache: [],
		speed: .045,
		detailAliveBottom: 520,
		detailDeathBottom: 250,
		shadowBottom: 40,
		shadowWidth: 320,
		shadowHeight: 60,
		clickAliveY: 20,
		clickAliveW: 160,
		clickAliveH: 450,
		clickDeadY: 0,
		clickDeadW: 300,
		clickDeadH: 140,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'dragon': {
		imgW: 3000,
		imgH: 1500,
		imgCy: 240,
		w: 3000,
		h: 1500,
		yFloor: -80,
		yoyo: true,
		cache: [],
		speed: .055,
		detailAliveBottom: 650,
		detailDeathBottom: 350,
		shadowBottom: 40,
		shadowWidth: 640,
		shadowHeight: 160,
		clickAliveY: -50,
		clickAliveW: 500,
		clickAliveH: 600,
		clickDeadY: 0,
		clickDeadW: 500,
		clickDeadH: 250,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'ghoul': {
		imgW: 900,
		imgH: 1000,
		imgCy: 350,
		w: 630,
		h: 700,
		yFloor: -80,
		yoyo: true,
		cache: [],
		speed: .045,
		detailAliveBottom: 510,
		detailDeathBottom: 210,
		shadowBottom: 40,
		shadowWidth: 320,
		shadowHeight: 40,
		clickAliveY: 30,
		clickAliveW: 270,
		clickAliveH: 450,
		clickDeadY: -50,
		clickDeadW: 250,
		clickDeadH: 140,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'mummy': {
		imgW: 800,
		imgH: 1000,
		imgCy: 370,
		w: 560,
		h: 700,
		yFloor: -30,
		yoyo: false,
		cache: [],
		speed: .04,
		detailAliveBottom: 550,
		detailDeathBottom: 210,
		shadowBottom: 40,
		shadowWidth: 260,
		shadowHeight: 60,
		clickAliveY: 40,
		clickAliveW: 180,
		clickAliveH: 480,
		clickDeadY: 0,
		clickDeadW: 160,
		clickDeadH: 120,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'skeleton': {
		imgW: 900,
		imgH: 1000,
		imgCy: 340,
		w: 720,
		h: 800,
		yFloor: -30,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 520,
		detailDeathBottom: 240,
		shadowBottom: 40,
		shadowWidth: 280,
		shadowHeight: 60,
		clickAliveY: 30,
		clickAliveW: 150,
		clickAliveH: 430,
		clickDeadY: 50,
		clickDeadW: 350,
		clickDeadH: 100,
		enableSecondary: 1,
		enableSpecial: 1
	},
	// questionable
	/*
	'zombie': {
		imgW: 900,
		imgH: 1000,
		imgCy: 400,
		w: 630,
		h: 700,
		yFloor: -15,
		yoyo: true,
		cache: [],
		speed: .045,
		detailAliveBottom: 590,
		detailDeathBottom: 230,
		shadowBottom: 40,
		shadowWidth: 230,
		shadowHeight: 70,
		clickAliveY: 30,
		clickAliveW: 160,
		clickAliveH: 520,
		clickDeadY: 10,
		clickDeadW: 240,
		clickDeadH: 150,
		enableSecondary: 1,
		enableSpecial: 1
	},
	*/
	'vampire': {
		imgW: 1000,
		imgH: 1000,
		imgCy: 350,
		w: 650,
		h: 650,
		yFloor: -60,
		yoyo: true,
		cache: [],
		speed: .04,
		detailAliveBottom: 510,
		detailDeathBottom: 230,
		shadowBottom: 40,
		shadowWidth: 300,
		shadowHeight: 60,
		clickAliveY: 40,
		clickAliveW: 200,
		clickAliveH: 420,
		clickDeadY: -50,
		clickDeadW: 250,
		clickDeadH: 200,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'goblin': {
		imgW: 1000,
		imgH: 1000,
		imgCy: 250,
		w: 700,
		h: 700,
		yFloor: -40,
		yoyo: false,
		cache: [],
		speed: .042,
		detailAliveBottom: 400,
		detailDeathBottom: 220,
		shadowBottom: 40,
		shadowWidth: 200,
		shadowHeight: 40,
		clickAliveY: 50,
		clickAliveW: 150,
		clickAliveH: 330,
		clickDeadY: 40,
		clickDeadW: 300,
		clickDeadH: 100,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'hobgoblin': {
		imgW: 1000,
		imgH: 1000,
		imgCy: 340,
		w: 1000,
		h: 1000,
		yFloor: -120,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 530,
		detailDeathBottom: 220,
		shadowBottom: 40,
		shadowWidth: 340,
		shadowHeight: 70,
		clickAliveY: 40,
		clickAliveW: 220,
		clickAliveH: 450,
		clickDeadY: 0,
		clickDeadW: 330,
		clickDeadH: 150,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'kobold': {
		imgW: 1400,
		imgH: 1000,
		imgCy: 230,
		w: 700,
		h: 500,
		yFloor: -40,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 380,
		detailDeathBottom: 200,
		shadowBottom: 40,
		shadowWidth: 230,
		shadowHeight: 60,
		clickAliveY: 30,
		clickAliveW: 170,
		clickAliveH: 310,
		clickDeadY: 10,
		clickDeadW: 250,
		clickDeadH: 100,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'orc': {
		imgW: 1200,
		imgH: 1000,
		imgCy: 340,
		w: 960,
		h: 800,
		yFloor: -55,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 520,
		detailDeathBottom: 250,
		shadowBottom: 40,
		shadowWidth: 260,
		shadowHeight: 70,
		clickAliveY: 30,
		clickAliveW: 200,
		clickAliveH: 440,
		clickDeadY: 0,
		clickDeadW: 240,
		clickDeadH: 150,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'griffon': {
		imgW: 2000,
		imgH: 1200,
		imgCy: 250,
		w: 1600,
		h: 960,
		yFloor: -40,
		yoyo: false,
		cache: [],
		speed: .05,
		detailAliveBottom: 520,
		detailDeathBottom: 230,
		shadowBottom: 40,
		shadowWidth: 280,
		shadowHeight: 80,
		clickAliveY: 20,
		clickAliveW: 180,
		clickAliveH: 380,
		clickDeadY: 20,
		clickDeadW: 400,
		clickDeadH: 130,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'harpy': {
		imgW: 1500,
		imgH: 1000,
		imgCy: 290,
		w: 900,
		h: 600,
		yFloor: -30,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 490,
		detailDeathBottom: 270,
		shadowBottom: 40,
		shadowWidth: 300,
		shadowHeight: 40,
		clickAliveY: 50,
		clickAliveW: 200,
		clickAliveH: 400,
		clickDeadY: 50,
		clickDeadW: 350,
		clickDeadH: 130,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'werewolf': {
		imgW: 1000,
		imgH: 1000,
		imgCy: 260,
		w: 800,
		h: 800,
		yFloor: -60,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 450,
		detailDeathBottom: 220,
		shadowBottom: 40,
		shadowWidth: 380,
		shadowHeight: 60,
		clickAliveY: 40,
		clickAliveW: 350,
		clickAliveH: 330,
		clickDeadY: -20,
		clickDeadW: 400,
		clickDeadH: 200,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'centaur': {
		imgW: 1500,
		imgH: 1000,
		imgCy: 330,
		w: 1050,
		h: 700,
		yFloor: -25,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 560,
		detailDeathBottom: 240,
		shadowBottom: 40,
		shadowWidth: 190,
		shadowHeight: 80,
		clickAliveY: 20,
		clickAliveW: 150,
		clickAliveH: 470,
		clickDeadY: 20,
		clickDeadW: 380,
		clickDeadH: 150,
		enableSecondary: 1,
		enableSpecial: 1
	},
	// dont like the cerberus
	'cerberus': {
		imgW: 1800,
		imgH: 1200,
		imgCy: 300,
		w: 1200,
		h: 800,
		yFloor: -50,
		yoyo: false,
		cache: [],
		speed: .055,
		detailAliveBottom: 530,
		detailDeathBottom: 350,
		shadowBottom: 40,
		shadowWidth: 470,
		shadowHeight: 180,
		clickAliveY: 20,
		clickAliveW: 420,
		clickAliveH: 480,
		clickDeadY: 0,
		clickDeadW: 400,
		clickDeadH: 250,
		enableSecondary: 0,
		enableSpecial: 1
	},
	'fungoid': {
		imgW: 1000,
		imgH: 1000,
		imgCy: 340,
		w: 800,
		h: 800,
		yFloor: -80,
		yoyo: true,
		cache: [],
		speed: .045,
		detailAliveBottom: 550,
		detailDeathBottom: 270,
		shadowBottom: 40,
		shadowWidth: 260,
		shadowHeight: 70,
		clickAliveY: 40,
		clickAliveW: 190,
		clickAliveH: 470,
		clickDeadY: 0,
		clickDeadW: 210,
		clickDeadH: 140,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'gargoyle': {
		imgW: 1200,
		imgH: 1000,
		imgCy: 300,
		w: 1080,
		h: 900,
		yFloor: -20,
		yoyo: true,
		cache: [],
		speed: .045,
		detailAliveBottom: 530,
		detailDeathBottom: 350,
		shadowBottom: 40,
		shadowWidth: 320,
		shadowHeight: 60,
		clickAliveY: 40,
		clickAliveW: 200,
		clickAliveH: 400,
		clickDeadY: 40,
		clickDeadW: 200,
		clickDeadH: 250,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'beetle': {
		imgW: 1000,
		imgH: 1000,
		imgCy: 210,
		w: 600,
		h: 600,
		yFloor: -60,
		yoyo: false,
		cache: [],
		speed: .04,
		detailAliveBottom: 370,
		detailDeathBottom: 250,
		shadowBottom: 40,
		shadowWidth: 400,
		shadowHeight: 90,
		clickAliveY: 120,
		clickAliveW: 190,
		clickAliveH: 170,
		clickDeadY: 20,
		clickDeadW: 200,
		clickDeadH: 170,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'imp': {
		imgW: 1250,
		imgH: 1000,
		imgCy: 200,
		w: 625,
		h: 500,
		yFloor: -15,
		yoyo: true,
		cache: [],
		speed: .045,
		detailAliveBottom: 400,
		detailDeathBottom: 230,
		shadowBottom: 40,
		shadowWidth: 220,
		shadowHeight: 60,
		clickAliveY: 30,
		clickAliveW: 150,
		clickAliveH: 290,
		clickDeadY: 0,
		clickDeadW: 150,
		clickDeadH: 140,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'minotaur': {
		imgW: 1000,
		imgH: 1000,
		imgCy: 380,
		w: 1000,
		h: 1000,
		yFloor: -100,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 620,
		detailDeathBottom: 250,
		shadowBottom: 40,
		shadowWidth: 270,
		shadowHeight: 80,
		clickAliveY: 40,
		clickAliveW: 200,
		clickAliveH: 500,
		clickDeadY: 0,
		clickDeadW: 250,
		clickDeadH: 150,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'aviak': {
		imgW: 1200,
		imgH: 1000,
		imgCy: 290,
		w: 900,
		h: 750,
		yFloor: -110,
		yoyo: false,
		cache: [],
		speed: .04,
		detailAliveBottom: 450,
		detailDeathBottom: 200,
		shadowBottom: 40,
		shadowWidth: 270,
		shadowHeight: 40,
		clickAliveY: 40,
		clickAliveW: 190,
		clickAliveH: 380,
		clickDeadY: 0,
		clickDeadW: 350,
		clickDeadH: 125,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'elephant': {
		imgW: 1300,
		imgH: 1000,
		imgCy: 330,
		w: 1300,
		h: 1000,
		yFloor: -100,
		yoyo: false,
		cache: [],
		speed: .05,
		detailAliveBottom: 720,
		detailDeathBottom: 340,
		shadowBottom: 40,
		shadowWidth: 380,
		shadowHeight: 110,
		clickAliveY: 10,
		clickAliveW: 290,
		clickAliveH: 650,
		clickDeadY: 0,
		clickDeadW: 440,
		clickDeadH: 250,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'lion': {
		imgW: 900,
		imgH: 1200,
		imgCy: 300,
		w: 540,
		h: 720,
		yFloor: -20,
		yoyo: false,
		cache: [],
		speed: .05,
		detailAliveBottom: 500,
		detailDeathBottom: 230,
		shadowBottom: 40,
		shadowWidth: 250,
		shadowHeight: 90,
		clickAliveY: 30,
		clickAliveW: 180,
		clickAliveH: 420,
		clickDeadY: 0,
		clickDeadW: 320,
		clickDeadH: 140,
		enableSecondary: 0,
		enableSpecial: 1
	},
	'crocodile': {
		imgW: 1000,
		imgH: 1000,
		imgCy: 120,
		w: 800,
		h: 800,
		yFloor: -50,
		yoyo: false,
		cache: [],
		speed: .05,
		detailAliveBottom: 320,
		detailDeathBottom: 250,
		shadowBottom: 40,
		shadowWidth: 420,
		shadowHeight: 110,
		clickAliveY: 10,
		clickAliveW: 330,
		clickAliveH: 240,
		clickDeadY: 30,
		clickDeadW: 370,
		clickDeadH: 170,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'rhino': {
		imgW: 1200,
		imgH: 1200,
		imgCy: 275,
		w: 1000,
		h: 1000,
		yFloor: -90,
		yoyo: false,
		cache: [],
		speed: .05,
		detailAliveBottom: 620,
		detailDeathBottom: 320,
		shadowBottom: 40,
		shadowWidth: 370,
		shadowHeight: 130,
		clickAliveY: 20,
		clickAliveW: 280,
		clickAliveH: 540,
		clickDeadY: 0,
		clickDeadW: 450,
		clickDeadH: 240,
		enableSecondary: 1,
		enableSpecial: 0
	},
	'lioness': {
		imgW: 900,
		imgH: 1200,
		imgCy: 300,
		w: 540,
		h: 720,
		yFloor: -20,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 460,
		detailDeathBottom: 230,
		shadowBottom: 40,
		shadowWidth: 250,
		shadowHeight: 90,
		clickAliveY: 30,
		clickAliveW: 180,
		clickAliveH: 390,
		clickDeadY: 0,
		clickDeadW: 320,
		clickDeadH: 140,
		enableSecondary: 0,
		enableSpecial: 1
	},
	'bear': {
		imgW: 1000,
		imgH: 1000,
		imgCy: 260,
		w: 600,
		h: 600,
		yFloor: -10,
		yoyo: false,
		cache: [],
		speed: .05,
		detailAliveBottom: 470,
		detailDeathBottom: 320,
		shadowBottom: 40,
		shadowWidth: 280,
		shadowHeight: 100,
		clickAliveY: 50,
		clickAliveW: 240,
		clickAliveH: 370,
		clickDeadY: 50,
		clickDeadW: 340,
		clickDeadH: 240,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'toadlok': {
		imgW: 1200,
		imgH: 1000,
		imgCy: 200,
		w: 600,
		h: 500,
		yFloor: -35,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 390,
		detailDeathBottom: 270,
		shadowBottom: 40,
		shadowWidth: 200,
		shadowHeight: 70,
		clickAliveY: 50,
		clickAliveW: 200,
		clickAliveH: 300,
		clickDeadY: 30,
		clickDeadW: 200,
		clickDeadH: 170,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'giant': {
		imgW: 1400,
		imgH: 1200,
		imgCy: 480,
		w: 1400,
		h: 1200,
		yFloor: -150,
		yoyo: false,
		cache: [],
		speed: .05,
		detailAliveBottom: 830,
		detailDeathBottom: 370,
		shadowBottom: 40,
		shadowWidth: 480,
		shadowHeight: 120,
		clickAliveY: 50,
		clickAliveW: 350,
		clickAliveH: 700,
		clickDeadY: -50,
		clickDeadW: 350,
		clickDeadH: 400,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'ice-giant': {
		imgW: 1400,
		imgH: 1200,
		imgCy: 480,
		w: 1400,
		h: 1200,
		yFloor: -150,
		yoyo: false,
		cache: [],
		speed: .06,
		detailAliveBottom: 830,
		detailDeathBottom: 370,
		shadowBottom: 40,
		shadowWidth: 480,
		shadowHeight: 120,
		clickAliveY: 50,
		clickAliveW: 350,
		clickAliveH: 700,
		clickDeadY: -50,
		clickDeadW: 350,
		clickDeadH: 400,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'fire-giant': {
		imgW: 1400,
		imgH: 1200,
		imgCy: 480,
		w: 1400,
		h: 1200,
		yFloor: -150,
		yoyo: false,
		cache: [],
		speed: .06,
		detailAliveBottom: 830,
		detailDeathBottom: 370,
		shadowBottom: 40,
		shadowWidth: 480,
		shadowHeight: 120,
		clickAliveY: 50,
		clickAliveW: 350,
		clickAliveH: 700,
		clickDeadY: -50,
		clickDeadW: 350,
		clickDeadH: 400,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'spectre': {
		imgW: 1500,
		imgH: 1500,
		imgCy: 455,
		w: 1200,
		h: 1200,
		yFloor: -220,
		yoyo: false,
		cache: [],
		speed: .055,
		detailAliveBottom: 610,
		detailDeathBottom: 270,
		shadowBottom: 40,
		shadowWidth: 200,
		shadowHeight: 80,
		clickAliveY: 100,
		clickAliveW: 150,
		clickAliveH: 470,
		clickDeadY: 40,
		clickDeadW: 190,
		clickDeadH: 150,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'angler': {
		imgW: 1500,
		imgH: 1200,
		imgCy: 235,
		w: 900,
		h: 720,
		yFloor: -60,
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 400,
		detailDeathBottom: 270,
		shadowBottom: 40,
		shadowWidth: 240,
		shadowHeight: 60,
		clickAliveY: 50,
		clickAliveW: 200,
		clickAliveH: 280,
		clickDeadY: 10,
		clickDeadW: 200,
		clickDeadH: 120,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'evil-eye': {
		imgW: 1200,
		imgH: 1000,
		imgCy: 240,
		w: 720,
		h: 600,
		yFloor: -100,
		yoyo: false,
		cache: [],
		speed: .05,
		detailAliveBottom: 410,
		detailDeathBottom: 270,
		shadowBottom: 40,
		shadowWidth: 250,
		shadowHeight: 80,
		clickAliveY: 50,
		clickAliveW: 200,
		clickAliveH: 300,
		clickDeadY: 50,
		clickDeadW: 200,
		clickDeadH: 200,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'unicorn': {
		imgW: 2000,
		imgH: 1200,
		imgCy: 280,
		w: 1600,
		h: 960,
		yFloor: -40,
		yoyo: false,
		cache: [],
		speed: .055,
		detailAliveBottom: 450,
		detailDeathBottom: 260,
		shadowBottom: 40,
		shadowWidth: 220,
		shadowHeight: 70,
		clickAliveY: 50,
		clickAliveW: 120,
		clickAliveH: 350,
		clickDeadY: 50,
		clickDeadW: 350,
		clickDeadH: 100,
		enableSecondary: 1,
		enableSpecial: 1
	},
	'scorpion': {
		imgW: 1000,
		imgH: 1000,
		imgCy: 135,
		w: 600,
		h: 600,
		yFloor: 0, // back row is *2
		yoyo: false,
		cache: [],
		speed: .045,
		detailAliveBottom: 450,
		detailDeathBottom: 270,
		shadowBottom: 40,
		shadowWidth: 400,
		shadowHeight: 80,
		clickAliveY: 50,
		clickAliveW: 350,
		clickAliveH: 350,
		clickDeadY: 50,
		clickDeadW: 350,
		clickDeadH: 100,
		enableSecondary: 1,
		enableSpecial: 1
	}
};
// test methods
var mob = {
	test: 0, // used to enable test mode to show all animations looping
	imageKeysLen: 0,
	index: 0,
	cache: {},
	imageKeys: [],
	getRandomMobKey: function(){
		var i = ~~(Math.random() * mob.imageKeysLen);
		return mob.imageKeys[i];
	},
	initialized: 0,
	max: 9,
	init: function(){
		mob.imageKeys = Object.keys(mobs.images);
		mob.imageKeysLen = mob.imageKeys.length;
		battle.show();
		// init mob/dom connections
		for (var i=0; i<mob.max; i++){
			mobs[i] = {
				hp: 1,
				index: i,
				frame: 0,
				lastFrame: 0,
				animationActive: 0,
				size: i < 5 ? 1 : .85,
				deathState: 0,
				speed: 0,
				type: '',
				box: {},
				dom: {}
			};
			[
				'wrap',
				'center',
				'alive',
				'dead',
				'img',
				'details',
				'name',
				'shadow',
				'bar'
			].forEach(function(e){
				mobs[i].dom[e] = document.getElementById('mob-'+ e +'-' + i);
			});
		}
	},
	element: {},
	animationActive: 0,
	frame: 1,
	// configs, resets (active animations) and idles mobs in one call for start of combat
	setMob: function(i, mobKey) {
		// m.size = m.size;
		mobs[i].type = mobKey;
		// combine/assign image object props to mobs[index]
		mobs[i] = Object.assign(mobs[i], mobs.images[mobKey]);
		// delete mobs[i].cache;
		mob.sizeMob(i);
		mob.resetIdle(i);
		mob.idle(i);
	},
	// size only
	sizeMob: function(index){
		var m = mobs[index];
		// set dom
		var w = ~~(m.size * (mobs.images[m.type].w));

		m.box = battle.getBox(m.index);
		// wrapper
		// name
		m.dom.name.innerHTML = m.type.replace(/-/g, ' ');
		m.dom.details.style.display = 'block';
		// img
		m.dom.img.style.left = (w * -.5) + 'px';
		m.dom.img.style.width = w + 'px';
		m.dom.img.style.bottom = (mobs.images[m.type].yFloor * m.size) + 'px';
		m.dom.img.src = 'mobs/' + m.type + '/1.png';
		// details
		TweenMax.set(m.dom.details, {
			bottom: m.detailAliveBottom * m.size
		});
		// shadow
		m.dom.shadow.style.display = 'block';
		m.dom.shadow.style.width = (m.shadowWidth * m.size) + 'px';
		m.dom.shadow.style.height = (m.shadowHeight * m.size) + 'px';
		m.dom.shadow.style.left = ((m.shadowWidth * m.size ) * -.5) + 'px';
		m.dom.shadow.style.bottom = ((m.shadowBottom - (m.shadowHeight * .3))* m.size) + 'px';
		// test stuff below
		// center dot
		m.dom.center.style.left = (m.box.cx - 11) + 'px';
		m.dom.center.style.bottom = (m.box.cy - 11) + 'px';
		mob.setClickBox(m);
	},
	setClickBox: function(m){
		// alive box
		m.dom.alive.style.left = ((m.clickAliveW  * m.size) * -.5) + 'px';
		m.dom.alive.style.bottom = (m.clickAliveY  * m.size) + 'px';
		m.dom.alive.style.width = (m.clickAliveW  * m.size) + 'px';
		m.dom.alive.style.height = (m.clickAliveH * m.size) + 'px';
		m.dom.alive.style.display = m.hp ? 'block' : 'none';
		// dead box
		m.dom.dead.style.left = ((m.clickDeadW * m.size) * -.5) + 'px';
		m.dom.dead.style.bottom = (m.clickDeadY * m.size) + 'px';
		m.dom.dead.style.width = (m.clickDeadW * m.size) + 'px';
		m.dom.dead.style.height = (m.clickDeadH * m.size) + 'px';
		m.dom.dead.style.display = m.hp ? 'none' : 'block';
	},
	setSrc: function(i){
		mobs[i].frame = ~~mobs[i].frame;
		if (mobs[i].frame !== mobs[i].lastFrame) {
			mobs[i].dom.img.src = 'mobs/' + mobs[i].type + '/' + mobs[i].frame + '.png';
			mobs[i].lastFrame = mobs[i].frame;
		}
	},
	resetIdle: function(i){
		mobs[i].animationActive = 0;
		mob.idle(mobs[i].index, 1);
	},
	idle: function(i, skip){
		var m = mobs[i],
			startFrame = 1,
			endFrame = 5.9,
			diff = endFrame - startFrame;

		TweenMax.to(m, m.speed * diff * 2, {
			startAt: {
				frame: startFrame
			},
			frame: endFrame,
			yoyo: true,
			repeat: -1,
			repeatDelay: m.speed,
			ease: Sine.easeOut,
			onUpdate: function(){
				mob.setSrc(m.index);
			}
		});
		if (skip) return;
		TweenMax.delayedCall(.25, function(){
			mob.test && mob.hit(m.index);
			//mob.death();
		})
	},
	hit: function(i){
		var m = mobs[i];
		if (m.animationActive) return;
		m.animationActive = 1;
		var startFrame = 6,
			endFrame = 15.9,
			diff = endFrame - startFrame;

		TweenMax.to(m, m.speed * diff, {
			startAt: {
				frame: startFrame
			},
			overwrite: 1,
			frame: endFrame,
			ease: Linear.easeNone,
			yoyo: true,
			repeat: 1,
			onUpdate: function(){
				mob.setSrc(m.index);
			},
			onComplete: function(){
				mob.resetIdle(m.index);
				if (mob.test){
					TweenMax.delayedCall(.5, function() {
						mob.attack(m.index, 1);
					});
				}
			}
		});
	},
	attack: function(i, force){
		var m = mobs[i];
		if (m.animationActive) return;
		m.animationActive = 1;
		var tl = ng.TM(),
			foo = force === 1 || force === 2 ?
				force : !Math.round(Math.random()) ? 1 : 2;
		if (!m.enableSecondary) {
			foo = 1;
		}
		var startFrame = foo === 1 ?
				16 : 35.9,
			endFrame = startFrame + 20,
			diff = endFrame - startFrame;

		tl.to(m, m.speed * diff, {
			startAt: {
				frame: startFrame
			},
			overwrite: 1,
			frame: endFrame,
			ease: Linear.easeNone,
			onUpdate: function() {
				mob.setSrc(m.index);
			},
			onComplete: function() {
				mob.resetIdle(m.index);
				if (mob.test){
					if (force === 1){
						TweenMax.delayedCall(.5, function() {
							mob.attack(m.index, 2);
						});
					}
					else if (force === 3){
						TweenMax.delayedCall(.5, function() {
							mob.death(m.index);
						});
					}
					else {
						TweenMax.delayedCall(.5, function() {
							mob.special(m.index);
						});
					}
				}
			}
		});
	},
	special: function(i){
		var m = mobs[i];
		if (m.animationActive) return;
		if (!m.enableSpecial) {
			mob.attack(m.index, 3);
		}
		else {
			m.animationActive = 1;
			var startFrame = 56,
				endFrame = 75.9,
				diff = endFrame - startFrame;

			var tl = ng.TM();
			tl.to(m, m.speed * diff, {
				startAt: {
					frame: startFrame
				},
				overwrite: 1,
				frame: endFrame,
				ease: Linear.easeNone,
				yoyo: m.yoyo,
				repeat: m.yoyo ? 1 : 0,
				onUpdate: function () {
					mob.setSrc(m.index);
				},
				onComplete: function () {
					mob.resetIdle(m.index);
					if (mob.test) {
						TweenMax.delayedCall(.5, function () {
							mob.death(m.index);
						});
					}
				}
			});
		}
	},
	death: function(i){
		var m = mobs[i];
		if (m.deathState) return;
		m.deathState = 1;
		m.hp = 0;
		mob.setClickBox(m);
		m.animationActive = 1;
		var tl = ng.TM(),
			startFrame = 76,
			endFrame = 105.9,
			diff = endFrame - startFrame,
			d = m.speed * diff;
		TweenMax.to(m.dom.details, d, {
			bottom: m.detailDeathBottom * m.size,
			ease: Quart.easeIn
		});
		tl.to(m, d, {
			startAt: {
				frame: startFrame
			},
			overwrite: 1,
			frame: endFrame,
			ease: Linear.easeNone,
			onUpdate: function () {
				mob.setSrc(m.index);
			},
			onComplete: function() {
				var filters = {
						opacity: 'opacity(100%)',
						brightness: "brightness(100%)"
					},
					e = m.dom.wrap;

				var tl = new TimelineMax({
					onUpdate: function () {
						test.filters.death(e, filters);
					}
				});
				tl.to(filters, 2, {
					opacity: 'opacity(0%)',
					brightness: "brightness(0%)",
					ease: Linear.easeIn,
					onComplete: function () {
						if (mob.test) {
							m.hp = 1;
							mob.sizeMob(m.index);
							mob.idle(m.index);
						}
						TweenMax.delayedCall(.1, function () {
							m.deathState = 0;
							m.animationActive = 0;
							e.style.filter = 'opacity(100%) brightness(100%)';
						});
					}
				});
			}
		});
	},
	deathState: 0,
	blur: function(){
		var e = document.getElementById('sprite'),
			type = 'blur',
			filters = {
				blur: type + '(0px)'
			};

		TweenMax.to(filters, 1.5, {
			blur: type + '(5px)',
			yoyo: true,
			repeat: -1,
			onUpdate: function(){
				mob.filters.effect(e, filters, type);
			}
		});
	},
	brightness: function(){
		var e = document.getElementById('sprite'),
			type = 'brightness',
			filters = {
				brightness: type + '(0%)'
			};

		TweenMax.to(filters, 1.5, {
			brightness: type + '(100%)',
			yoyo: true,
			repeat: -1,
			onUpdate: function(){
				mob.filters.effect(e, filters, type);
			}
		});
	},
	contrast: function(){
		var e = document.getElementById('sprite'),
			type = 'contrast',
			filters = {
				contrast: type + '(0%)'
			};

		TweenMax.to(filters, 1.5, {
			contrast: type + '(200%)',
			yoyo: true,
			repeat: -1,
			onUpdate: function(){
				mob.filters.effect(e, filters, type);
			}
		});
	},
	grayscale: function(){
		var e = document.getElementById('sprite'),
			type = 'grayscale',
			filters = {
				grayscale: type + '(0%)'
			};

		TweenMax.to(filters, 1.5, {
			grayscale: type + '(100%)',
			yoyo: true,
			repeat: -1,
			onUpdate: function(){
				mob.filters.effect(e, filters, type);
			}
		});
	},
	invert: function(){
		var e = document.getElementById('sprite'),
			type = 'invert',
			filters = {
				invert: type + '(0%)'
			};

		TweenMax.to(filters, 1.5, {
			invert: type + '(400%)',
			yoyo: true,
			repeat: -1,
			onUpdate: function(){
				mob.filters.effect(e, filters, type);
			}
		});
	},
	saturate: function(){
		var e = document.getElementById('sprite'),
			type = 'saturate',
			filters = {
				saturate: type + '(0%)'
			};

		TweenMax.to(filters, 1.5, {
			saturate: type + '(500%)',
			yoyo: true,
			repeat: -1,
			onUpdate: function(){
				mob.filters.effect(e, filters, type);
			}
		});
	},
	sepia: function(){
		var e = document.getElementById('sprite'),
			type = 'sepia',
			filters = {
				sepia: type + '(0%)'
			};

		TweenMax.to(filters, 1.5, {
			sepia: type + '(100%)',
			yoyo: true,
			repeat: -1,
			onUpdate: function(){
				mob.filters.effect(e, filters, type);
			}
		});
	}
}
var town = {
	go: function(){
		if (ng.view === 'town') return;
		if (create.selected) {
			game.emptyScenesExcept('scene-town');
			ng.lock(1);
			chat.size.large();
			$.ajax({
				url: app.url + 'php2/character/load-character.php',
				data: {
					row: create.selected
				}
			}).done(function(data) {
				console.info('load-character: ', data);
				var z = data.characterData;
				my.name = z.name;
				my.job = z.job;
				my.race = z.race;
				my.level = z.level;
				my.row = z.row;
				my.party[0] = z;
				my.party[0].isLeader = 0;
				my.resetClientPartyValues(0);
				my.guild = data.guild;
				if (data.quest.level) {
					// quest still active
					mission.setQuest(data.quest);
					my.zoneMobs = data.zoneMobs;
				}

				// init party member values
				for (var i=1; i<game.maxPlayers; i++) {
					my.party[i] = my.Party();
				}
				console.info('my.party[0]: ', my.party[0]);
				ng.setScene('town');
				chat.init();
				socket.init();
				chat.friend.init();
				chat.ignore.init();
				// things that only happen once
				chat.log("There are currently " + data.count + " players exploring Vandamor.", 'chat-emote');
				// init town ?
				document.getElementById('scene-town').innerHTML = town.html();
				town.events();
				$("#scene-title").remove();
				town.init();
				game.start();
				bar.init();
				// I'm in a party!
				if (data.party !== undefined && data.party.id) {
					// reload entire party state
					data.party.id *= 1;
					my.p_id = data.party.id;
				}
				// await socket connect
				(function repeat() {
					if (socket.enabled) {
						// stuff to do after the socket wakes up
						socket.initParty(my.p_id);
						bar.getParty();
						chat.sendMsg('/join');

						// reveal scene based on session data
						if (data.dungeon) {
							dungeon.go();
						}
						else {
							// town
							TweenMax.to('#scene-town', .5, {
								delay: .5,
								opacity: 1,
								onComplete: function() {
									ng.unlock();
									// sometimes players slip between gaps :(
									setTimeout(function() {
										// chat.updateChannel();
									}, 2500);
								}
							});
						}
					}
					else {
						setTimeout(repeat, 100);
					}
				})();

				// route to battle in local mode
				if (app.isLocal) {
					if (data.quest.level) {
						if (location.hash === '#battle') {
							battle.go();
						}
						else if (location.hash === '#dungeon') {
							dungeon.go();
						}
					}
				}
			}).fail(function(data){
				ng.disconnect(data.responseText);
			}).always(function(){
				ng.unlock();
			});
		}
	},
	html: function(){
		var s =
			'<img id="town-bg" class="img-bg" src="img2/town2.jpg">'+
			'<div id="town-menu" class="text-shadow">'+
				'<div id="town-merchant" class="ng-btn town-action">Merchant</div>' +
				'<div id="town-trainer" class="ng-btn town-action">Skill Trainer</div>' +
				'<div id="town-guild" class="ng-btn town-action">Guild Hall</div>' +
			'</div>' +
			'<div id="town-footer" class="text-shadow2">' +
				'<hr id="town-footer-hr1" class="footer-hr">' +
				'<div id="town-footer-flex">' +
					'<span id="town-mission" class="ng-btn town-action center">Mission Counter</span>' +
				'</div>' +
				'<hr id="town-footer-hr2"  class="footer-hr">' +
			'</div>';

		return s;
	},
	aside: {
		selected: '',
		html: {
			close: '<i class="close-aside fa fa-times text-danger"></i>',
			sleeve: '<div class="stag-blue sleeve"></div>',
			'town-merchant': function(id) {
				var s =
				'<img class="aside-bg" src="img2/town/halas.jpg">' +
				'<img class="aside-npc" src="img2/town/rendo-surefoot.png">' +
				'<div class="aside-text">' +
					'<div class="aside-title-wrap stag-blue">' +
						'<div class="aside-title">Merchant</div>' +
						town.aside.html.close +
					'</div>' +
				'</div>';
				return s;
			},
			'town-trainer': function(id) {
				var s =
				'<img class="aside-bg" src="img2/town/surefall.jpg">' +
				'<img class="aside-npc" src="img2/town/arwen-reinhardt.png">' +
				'<div class="aside-text">' +
					'<div class="aside-title-wrap stag-blue">' +
						'<div class="aside-title">Skill Trainer</div>' +
						town.aside.html.close +
					'</div>' +
				'</div>';
				return s;
			},
			'town-guild': function(id) {
				var s =
				'<img class="aside-bg" src="img2/town/poh.jpg">' +
				'<img class="aside-npc" src="img2/town/valeska-windcrest.png">' +
				'<div class="aside-text">' +
					'<div class="aside-title-wrap stag-blue">' +
						'<div class="aside-title">Guild Hall</div>' +
						town.aside.html.close +
					'</div>' +
					'<div id="aside-menu">' +
						town.aside.menu[id]() +
					'</div>' +
				'</div>';
				return s;
			},

			'town-mission': function(id) {
				var s =
				'<img class="aside-bg" src="img2/town/neriak.jpg">' +
				'<img class="aside-npc" src="img2/town/miranda-crossheart.png">' +
				'<div class="aside-text">' +
					'<div class="aside-title-wrap stag-blue">' +
						'<div class="aside-title">Mission Counter</div>' +
						town.aside.html.close +
					'</div>' +
					'<div id="aside-menu">' +
						town.aside.menu[id]() +
					'</div>' +
				'</div>';
				return s;
			},
		},
		menu: {
			'town-trainer': function() {
				var s = '';
				return s;
			},
			'town-merchant': function() {
				var s = '';
				return s;
			},
			'town-guild': function() {
				var s = '';
				if (my.guild.name) {
					s +=
						'<div class="aside-frame">' +
							'<div>Guild: '+ my.guild.name +'</div> ' +
							'<div>Title: '+ guild.ranks[my.guild.rank] +'</div> ' +
							'<div>Total Members: '+ my.guild.members +'</div> ' +
							'<div>Member Number: '+ my.guild.memberNumber +'</div> ' +
						'</div>' +
						'<div id="guild-member-wrap" class="aside-frame">' +
							'<div id="guild-member-flex">'+
								'<div id="guild-member-label">Guild Members:</div>'+
								'<div id="guild-member-refresh-icon"><i class="fa fa-refresh refresh"></i></div>'+
							'</div>'+
							'<div id="aside-guild-members"></div>'+
						'</div>';

						s += '</div>';
				}
				else {
					s +=
					'<input id="guild-input" class="text-shadow" type="text" maxlength="30" autocomplete="off" spellcheck="false">' +
					'<div id="guild-create" class="ng-btn">Create Guild</div> ' +
					'<div class="aside-frame">Only letters A through Z and apostrophes are accepted in guild names. Standarized capitalization will be automatically applied. The guild name must be between 4 and 30 characters. All guild names are subject to the royal statutes regarding common decency in Vandamor.</div>';
				}
				return s;
			},
			'town-mission': function() {
				var s = mission.asideHtmlHead();
				if (mission.loaded) {
					// subsequent loads
					s +=
					'<div id="mission-counter" class="aside-frame text-shadow">';
						s += mission.asideHtml();
					s += '</div>';
					setTimeout(function() {
						mission.openFirstTwoZones();
					}, 100);
				}
				else {
					// first load
					s +=
						'<div id="mission-counter" class="aside-frame">' +
							ng.loadMsg +
						'</div>';
					mission.init();
				}
				if (my.quest.level) {
					s += mission.asideFooter();
				}
				return s;
			}
		},
		init: function(id) {
			if (id === town.aside.selected) return;
			// remove old aside
			var z = $(".town-aside");
			TweenMax.to(z, .2, {
				scale: 0,
				x: town.lastAside.x + '%',
				y: town.lastAside.y + '%',
				onComplete: function(){
					z.remove();
				}
			});
			town.lastAside = town.data[id].aside;
			// animate town BG
			TweenMax.to('#town-bg', 1.25, {
				scale: 1.5,
				x: town.data[id].bg.x,
				y: town.data[id].bg.y
			});
			if (id === 'town-mission') {
				mission.resetMissionLists();
			}
			// create aside
			var e = document.createElement('div');
			e.className = 'town-aside text-shadow';
			// set aside HTML
			var html = town.aside.html[id](id);
			e.innerHTML = html;
			document.getElementById('scene-town').appendChild(e);
			// animate aside things
			setTimeout(function() {
				TweenMax.set('.now-loading', {
					alpha: 0
				});
				TweenMax.to(e, .5, {
					startAt: {
						display: 'block',
						alpha: 1,
						scale: 0,
						x: town.data[id].aside.x + '%',
						y: town.data[id].aside.y + '%'
					},
					x: '2%',
					y: '2%',
					scale: 1,
					onComplete: function() {
						TweenMax.to('.now-loading', .3, {
							alpha: 1
						});
					}
				});
				setTimeout(function () {
					TweenMax.to('.aside-bg', 1, {
						startAt: {
							left: '60%'
						},
						left: '50%'
					}, 100);
				});
				TweenMax.to('.aside-npc', 1, {
					left: '-5%'
				});
				setTimeout(function() {
					$(".town-aside:last-child").find("input").focus();
					town.data[id].msg();
				}, 100);
			}, town.aside.selected ? 0 : 500);
			// set aside id
			town.aside.selected = id;
			// AJAX calls if necessary
			if (id === 'town-guild'){
				if (guild.memberList.length) {
					guild.setGuildList(guild);
				}
				else {
					$("#aside-guild-members").html('Loading...');
					guild.getMembers(0);
				}
			}
		},
		update: function(id) {
			var s = town.aside.menu[id]();
			$("#aside-menu").html(s);
		}
	},
	lastAside: {},
	delegated: 0,
	events: function(){
		if (!town.delegated) {
			town.delegated = 1;
			$("#scene-town").on(env.click, '.close-aside', function(){
				// close town asides
				town.aside.selected = '';
				var e = $(".town-aside");
				TweenMax.to(e, .3, {
					scale: 0,
					onComplete: function(){
						e.remove();
					}
				});
				TweenMax.to('#town-bg', .5, {
					scale: 1,
					x: '-50%',
					y: '-50%'
				});
			}).on(env.click, '#guild-create', function(){
				// create a guild
				guild.create();
			}).on(env.click + ' focus', '#guild-input', function() {
				guild.hasFocus = 1;
			}).on('blur', '#guild-input', function() {
				guild.hasFocus = 0;
			}).on(env.click, '#guild-member-refresh-icon', function() {
				$("#aside-guild-members").html(ng.loadMsg);
				guild.getMembers(1500);
			}).on(env.click, '.town-action', function(){
				town.aside.init($(this).attr('id'));
			});
		}
	},
	data: {
		'town-merchant': {
			msg: function() {
				chat.log('Rendo Surefoot says, "Hello, '+ my.name +'. I have got a once-in-a-lifetime smokin\' deal for you, my friend! Today, we just received a limited edition Lanfeld champion sword from our supply chain!"')
			},
			bg: {
				// don't exceed 25-75 range
				x: '-75%',
				y: '-60%',
			},
			aside: {
				x: 112,
				y: 30
			}
		},
		'town-trainer': {
			msg: function() {
				chat.log('Arwen Reinhardt says, "Hail to thee, '+ my.name +'. You had better sharpen up your skills, kiddo, or you\'ll be dead meat out there. Take it from me—a battle-hardened warrior that has seen more than his fair share of death and despair."')
			},
			bg: {
				x: '-75%',
				y: '-25%',
			},
			aside: {
				x: 112,
				y: -10
			}
		},
		'town-guild': {
			msg: function() {
				chat.log('Valeska Windcrest says, "Good day, '+ my.name +'. What would you ask of me?"')
			},
			bg: {
				x: '-25%',
				y: '-25%',
			},
			aside: {
				x: -30,
				y: -30
			}
		},
		'town-mission': {
			msg: function() {
				chat.log('Miranda Crossheart says, "Hey, sunshine! Are you itching for a bit of action?! There\'s no shortage of miscreants to dispatch around these parts!"')
			},
			bg: {
				x: '-67%',
				y: '-60%',
			},
			aside: {
				x: 75,
				y: 24
			}
		}
	},
	initialized: 0,
	init: function(){
		if (!town.initialized) {
			town.initialized = 1;
			if (!sessionStorage.getItem('startTime')) {
				sessionStorage.setItem('startTime', JSON.stringify(Date.now()));
			}
			town.preload();
		}
	},
	preload: function() {
		var p = 'img2/town/';
		cache.preload.images([
			p + 'arwen-reinhardt.png',
			p + 'halas.jpg',
			p + 'miranda-crossheart.png',
			p + 'neriak.jpg',
			p + 'poh.jpg',
			p + 'rendo-surefoot.png',
			p + 'surefall.jpg',
			p + 'valeska-windcrest.png',
			'img2/dungeon/braxxen1.jpg',
			'img2/skills/' + my.job + '.png'
		])
	},
};
var guild = {
	Guild: function() {
		return {
			id: 0,
			rank: 0,
			memberNumber: 0,
			motd: '',
			members: 0,
			name: '',
			memberList: []
		}
	},
	format: function(s) {
		return s.guild ? (' &lt;' + s.guild + '&gt;') : '';
	},
	hasFocus: 0,
	ranks: [
		'Leader',
		'Officer',
		'Member'
	],
	create: function() {
		if (ng.locked) return;
		var name = $("#guild-input").val().replace(/ +/g, " ").trim();
		console.info("Name: ", name);
		ng.lock();
		$.ajax({
			url: app.url + 'php2/guild/create.php',
			data: {
				// replace
				name: name.replace(/ +/g, " ").trim()
			}
		}).done(function(data) {
			console.info('create', data.guild);
			my.guild = data.guild;
			chat.log('Valeska Windcrest says, "By the powers vested in me, I hereby declare you supreme sovereign Leader of a new guild: ' + data.guild.name +'."');
			chat.log('Type /help to view guild commands', 'chat-emote');
			socket.initGuild();
			// redraw the #aside-menu with new option
			town.aside.update('town-guild');
			guild.getMembers();
		}).fail(function(data){
			console.info(data);
			$("#guild-input").focus();
			ng.msg(data.responseText);
		}).always(function(){
			ng.unlock();
		});
	},
	invite: function(name) {
		if (my.name === name) {
			chat.log("You can't invite yourself to a guild. Go to the Guild Hall to create a guild.", "chat-warning");
		}
		else if (!my.guild.id) {
			chat.log("You're not in a guild.", "chat-warning");
		}
		else if (my.guild.rank > 1) {
			chat.log("Only the guild Leader and Officers may send guild invites.", "chat-warning");
		}
		else {
			if (name) {
				chat.log('Sent guild invite to '+ name +'.', 'chat-warning');
				$.ajax({
					url: app.url + 'php2/guild/invite.php',
					data: {
						player: name
					}
				}).done(function(r){
					// nothing
				}).fail(function(r){
					chat.log(r.responseText, 'chat-warning');
				});
			}
			else {
				chat.log("Syntax: /invite [player_name]", "chat-warning");
			}
		}
	},
	join: function(z) {
		if (my.guild.id) return;
		console.info("JOINING GUILD!", z);
		// clicked CONFIRM
		$.ajax({
			url: app.url + 'php2/guild/join.php',
			data: {
				row: z.row,
				guildName: z.guildName
			}
		}).done(function(data){
			my.guild = data.guild;
			chat.log("You have joined the guild: "+ data.guild.name, "chat-warning");
			socket.initGuild();
		}).fail(function(data){
			console.info("Oh no", data);
			chat.log(data.responseText, 'chat-warning');
		});
	},
	hasJoined: function(z) {
		chat.log(z.msg, 'chat-warning');
	},
	quit: function() {
		if (!my.guild.id) return;
		console.info("Quitting guild!");
		var o = my.guild;
		$.ajax({
			url: app.url + 'php2/guild/quit.php'
		}).done(function(data){
			my.guild = guild.Guild(); // nice!
			console.info("guild.quit() response ", data);
			chat.log("You have quit the guild: "+ o.name, "chat-warning");
			socket.unsubscribe('guild:'+ o.id);
		}).fail(function(data){
			chat.log(data.responseText, 'chat-warning');
		});
	},
	hasQuit: function(r) {
		chat.log(r.msg, 'chat-warning')
	},
	boot: function(name) {
		if (my.guild.rank > 1) {
			chat.log("Only the guild Leader and Officers can boot people from the guild", 'chat-warning');
		}
		else {
			$.ajax({
				url: app.url + 'php2/guild/boot.php',
				data: {
					name: name
				}
			}).done(function () {
				// nothing
			}).fail(function (data) {
				chat.log(data.responseText, 'chat-warning');
			});
		}
	},
	wasBooted: function(data) {
		if (!my.guild.id) return;
		console.info("Booting! ", data);
		chat.log(data.msg, 'chat-warning');
		if (data.name === my.name) {
			$.ajax({
				url: app.url + 'php2/guild/quit.php',
				data: {
					action: 'boot'
				}
			}).done(function(){
				socket.unsubscribe('guild:'+ my.guild.id);
				my.guild = guild.Guild(); // nice!
			}).fail(function(data){
				chat.log(data.responseText, 'chat-warning');
			});
		}
	},
	promote: function(name) {
		if (my.guild.rank > 1) {
			chat.log("Only the guild Leader and Officers can promote members.", 'chat-warning');
		}
		else {
			$.ajax({
				url: app.url + 'php2/guild/promote.php',
				data: {
					name: name
				}
			}).done(function () {
				// nothing
			}).fail(function (data) {
				chat.log(data.responseText, 'chat-warning');
			});
		}
	},
	wasPromoted: function(data) {
		if (!my.guild.id) return;
		chat.log(data.msg, 'chat-warning');
		guild.updateSession(data);
	},
	leader: function(name) {
		if (my.guild.rank > 0) {
			chat.log("Only the guild Leader can assign a new leader.", 'chat-warning');
		}
		else {
			$.ajax({
				url: app.url + 'php2/guild/leader.php',
				data: {
					name: name
				}
			}).done(function (data) {
				console.info('leader: ', data);
				my.guild.rank = 1;
				// nothing
			}).fail(function (data) {
				chat.log(data.responseText, 'chat-warning');
			});
		}
	},
	wasLeader: function(data) {
		if (!my.guild.id) return;
		chat.log(data.msg, 'chat-warning');
		guild.updateSession(data);

	},
	updateSession: function(data) {
		if (data.name === my.name) {
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/guild/update-session.php'
			}).done(function (data) {
				console.info('update-session: ', data);
				my.guild = data.guild;
				// nothing
			}).fail(function (data) {
				chat.log(data.responseText, 'chat-warning');
			});
		}
	},
	motdParse: function(msg) {
		var a = msg.replace(/ +/g, " ").split(" ");
		a.shift();
		return a.join(" ");
	},
	motd: function(msg) {
		if (my.guild.rank > 1) return;
		$.ajax({
			url: app.url + 'php2/guild/motd.php',
			data: {
				msg: msg
			}
		}).done(function (data) {
			// nothing
		}).fail(function (data) {
			chat.log(data.responseText, 'chat-warning');
		});
	},
	zmqMotd: function(data) {
		chat.log(data.msg, 'chat-guild');
	},
	getMembers: function(throttleTime) {
		if (!my.guild.id) return;
		ng.lock(1);
		$.ajax({
			type: 'GET',
			url: app.url + 'php2/guild/get-member-list.php'
		}).done(function (data) {
			console.info(data);
			setTimeout(function(){
				guild.setGuildList(data);
			}, throttleTime);
			// nothing
		}).fail(function (data) {
			chat.log(data.responseText, 'chat-warning');
		}).always(function(){
			setTimeout(function(){
				ng.unlock();
			}, throttleTime);
		});
	},
	memberList: [],
	setGuildList: function(data) {
		var s = '';
		guild.memberList = data.memberList;
		guild.memberList.forEach(function(v){
			s += '<div>' + v.level +' '+ v.name +' '+ v.race +' <span class="chat-'+ v.job +'">'+ ng.toJobLong(v.job) +'</span></div>';
		});
		$("#aside-guild-members").html(s);
	}
}
var cache = {
	images: [], // actual image in memory
	imageStrings: [], // string values
	audio: [],
	audioStrings: [],
	preload: {
		mob: function(type) {
			var a = [];
			for (var i = 1; i <= 105; i++) {
				a[i] = 'mobs/' + type + '/' + i + '.png';
			}
			cache.preload.images(a);
		},
		images: function(a) {
			var e;
			a.forEach(function(v){
				if (v && !~cache.imageStrings.indexOf(v)) {
					e = new Image();
					e.src = v;
					cache.images.push(e);
					cache.imageStrings.push(v);
				}
			});
		},
		audio: function(a){
			var e;
			a.forEach(function(v){
				if (!~cache.audioStrings.indexOf(v)) {
					e = new Audio();
					e.src = v;
					cache.audio.push(e);
					cache.audioStrings.push(v);
				}
			});
		}
	},
	clear: {
		all: function() {
			cache.clear.images();
			cache.clear.audio();
		},
		images: function() {
			cache.images = [];
			cache.imageStrings = [];
		},
		audio: function() {
			cache.audio = [];
			cache.audioStrings = [];
		}
	}
}
// route.js
var route = {
	town: function(data, r) {
		if (r === 'chat->log') {
			if (data.name === my.name) {
				chat.log(data.msg, data.class);
			}
			else if (ng.ignore.indexOf(data.name) === -1) {
				chat.log(data.msg, data.class);
			}
			else {
				console.info("Message from " + data.name + " has been ignored.");
			}
		}
		else if (r === 'chat->add') {
			// console.info('chat.inChannel', data.row, chat.inChannel);
			chat.addPlayer(data);
		}
		else if (r === 'chat->remove') {
			chat.removePlayer(data);
		}
	},
	party: function(data, r) {
		if (r === 'party->hb') {
			bar.heartbeat.receive(data);
		}
		else if (r === 'party->updateBars') {
			bar.updateBars(data);
		}
		else if (r === 'party->notifyMissionStatus') {
			party.notifyMissionStatus(data);
		}
		else if (r === 'party->missionUpdate') {
			party.missionUpdate(data);
		}
		else if (r === 'party->linkdead') {
			bar.heartbeat.linkdead(data);
		}
		else if (r === 'party->join') {
			bar.party.join(data);
		}
		else if (r === 'party->disband') {
			bar.party.disband(data);
		}
		else if (r === 'party->promote') {
			bar.party.promote(data);
		}
		else if (r === 'party->boot') {
			bar.party.boot(data);
		}
		else if (r === 'party->bootme') {
			// remove booted player
			var slot = my.getPartySlotByRow(data.id * 1),
				promote = 0;
			if (my.party[slot].isLeader) {
				// we must promote a new leader
				promote = 1;
			}
			my.party[slot] = my.Party();
			//console.info("%c party->bootme", "background: #ff0", promote);
			// only boot if I'm the lowest id!
			if (my.isLowestPartyIdMine()) {
				//console.info('isLowestPartyIdMine ! YES PROMOTE! ', ng.copy(my.party));
				chat.boot(data.name, 1);
				if (my.partyCount() === 1) {
					// disband if one-man party
					console.info('partyCount === 1 ');
					chat.disband();
				}
				else if (promote) {
					// otherwise promote this player to leader
					//console.info('PROMOTING: ', my.name);
					chat.promote(my.name, 1);
				}
			}
			setTimeout(function(){
				bar.getParty();
			}, 1000);
		}
	},
	guild: function(data, r) {
		if (r === 'guild->hasJoined') {
			guild.hasJoined(data);
		}
		else if (r === 'guild->quit') {
			guild.hasQuit(data);
		}
		else if (r === 'guild->boot') {
			guild.wasBooted(data);
		}
		else if (r === 'guild->promote') {
			guild.wasPromoted(data);
		}
		else if (r === 'guild->leader') {
			guild.wasLeader(data);
		}
		else if (r === 'guild->motd') {
			guild.zmqMotd(data);
		}
	}
};
var mission = {
	data: {},
	loaded: 0,
	delegated: 0,
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
		if (!mission.delegated) {
			mission.delegated = 1;
			$("#scene-town").on(env.click, '.mission-zone', function() {
				console.info(".mission-zone CLICK");
				mission.toggleZone($(this));
			}).on(env.click, '.mission-quest-item', function() {
				mission.clickQuest($(this));
			}).on(env.click, '#mission-embark', function(){
				mission.embark();
			}).on(env.click, '#mission-abandon', function() {
				mission.abandon();
			});
		}
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
				'<div class="mission-quest-item ellipsis '+ mission.getDiffClass(v.level) +'" '+
					'data-id="'+ v.row +'" ' +
					'data-zone="'+ v.zone +'" ' +
					'data-level="'+ v.level +'">' +
					v.title +
				'</div>';
		});
		if (!str) str = '<div class="mission-quest-item">No missions found.</div>';
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
		 console.info("toggleZone: ", that.data('id'));
		var index = mission.findIndexById(that.data('id') * 1),
			id = mission.zones[index].id,
			o = mission.zones[index];
		console.info('JSON ', JSON.parse(JSON.stringify(o)));
		console.info(index, "isOpen: ", o.isOpen);
		if (o.isOpen) {
			// close menu
			var e = that.find('.mission-minus');
			console.info('CLOSE MENU: ', e);
			e.removeClass('fa-minus mission-minus').addClass('fa-plus mission-plus');
			$("#mission-zone-" + id).css('display', 'none');
			o.isOpen = 0;
		}
		else {
			// open menu
			var e = that.find('.mission-plus');
			console.info('OPEN MENU: ', e);
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
				TweenMax.to('#scene-town', 3, {
					startAt: { opacity: 1 },
					opacity: 0,
					ease: Power4.easeOut
				});
				setTimeout(function() {
					dungeon.go();
				}, game.questDelay);
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
				/*$.ajax({
					url: app.url + 'php2/mission/notify-party-embarked.php'
				}).done(function(data) {
					console.info(data);
				});*/
			}
			else {
				chat.log("Quest data not found.", "chat-alert")
			}
		}
		$(".close-aside").trigger('click');
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
		// clicked flag
		if (!my.quest.level) {
			chat.log("You have not started a mission!", "chat-warning");
		}
		else if (!party.isSoloOrLeading()) {
			chat.log("Only party leaders can abandon missions, but you can /disband the party to quit.", "chat-warning");
		}
		else if (ng.view === 'battle') {
			chat.log("You cannot abandon missions while in combat!", "chat-warning");
		}
		else {
			ng.lock(1);
			$.ajax({
				url: app.url + 'php2/mission/abandon-quest.php'
			}).done(function (data) {
				console.info('abandon ', data);
			}).fail(function (data) {
				chat.log(data.responseText, 'chat-alert');
			}).always(function () {
				setTimeout(function() {
					ng.unlock();
				}, game.questDelay);
			});
		}
	},
	abort: function() {
		setTimeout(function() {
			button.hide();
			chat.log('Mission abandoned!', 'chat-warning');
			if (ng.view === 'dungeon') {
				chat.log('Returning to town...', 'chat-warning');
				ng.lock(1);
				(function repeat(){
					if (my.party[0].isLeader) {
						mission.abortCallback();
					}
					else {
						// reset session quest for non-leaders
						$.ajax({
							type: 'GET',
							url: app.url + 'php2/session/init-quest.php'
						}).done(function(){
							mission.abortCallback();
						}).fail(function(){
							repeat();
						});
					}
				})();
			}
		});
	},
	abortCallback: function() {
		// init client and transition back to town
		game.heartbeat.enabled = 0;
		$.ajax({
			type: 'GET',
			url: app.url + 'php2/chat/delete-from-players.php'
		});
		mission.initQuest();
		// rejoin main chat
		chat.join.channel('town', 1);
		TweenMax.to('#scene-dungeon', 2, {
			delay: 1,
			opacity: 0
		});
		setTimeout(function () {
			ng.unlock();
			town.go();
			chat.broadcast.add();
			chat.setHeader();
			chat.mode.change({
				mode: '/say'
			});
			// this must be in place to prevent heartbeat updates while going back to town
			game.heartbeat.enabled = 1;
		}, game.questDelay);
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
var dungeon = {
	go: function() {
		if (ng.view === 'dungeon') return;
		game.emptyScenesExcept('scene-dungeon');
		// remove from town chat
		chat.broadcast.remove();
		my.channel && socket.unsubscribe(chat.getChannel());
		// set new channel data
		my.channel = '';
		// force change to party chat if in town chat
		chat.mode.command === '/say' &&
			chat.mode.change({
				mode: '/party'
			});
		chat.size.small();
		ng.setScene('dungeon');
		dungeon.init();
		console.info("DUNGEON GO");
		TweenMax.to('#scene-dungeon', .5, {
			delay: 1,
			opacity: 1
		});
	},
	initialized: 0,
	init: function() {
		my.zoneMobs.length && my.zoneMobs.forEach(function(v){
			cache.preload.mob(v);
		});
		if (dungeon.initialized) {
			document.getElementById('scene-dungeon').style.display = 'block';
		}
		else {
			document.getElementById('scene-dungeon').innerHTML = dungeon.html();
			battle.events();
			button.init();
		}
		chat.scrollBottom();
		// delegate
	},
	events: function() {

	},
	html: function() {
		var s =
		'<img id="dungeon-bg" class="img-bg" src="img2/dungeon/braxxen1.jpg">';

		return s;
	},
	enterCombat: function() {
		console.info("ENTERING COMBAT");
	}
}
var skills = {
	ALL: {
		route: function(id) {
			var key = skills[my.job].skillKeys[id];
			skills.RNG[key]();
		},
		pull: function() {
			console.info("skills.pull");
		},
		toggleAutoAttack: function() {
			console.info("toggleAutoAttack");
		}
	},
	WAR: {
		bash: function() {
			console.info("bash");
		},
		taunt: function() {
			console.info("taunt");
		},
		kick: function() {
			console.info("kick");
		},
		demoralize: function() {
			console.info("demoralize");
		},
		tearAsunder: function() {
			console.info("tearAsunder");
		},
		shout: function() {
			console.info("shout");
		},
		warCry: function() {
			console.info("warCry");
		},
		warStomp: function() {
			console.info("warStomp");
		},
	},
	PAL: {
		layHands: function() {
			console.info("layHands");
		},
		bash: function() {
			console.info("bash");
		},
		taunt: function() {
			console.info("taunt");
		},
		heal: function() {
			console.info("heal");
		},
		blessedHammer: function() {
			console.info("blessedHammer");
		},
		smite: function() {
			console.info("smite");
		},
		resolution: function() {
			console.info("resolution");
		},
		holyMight: function() {
			console.info("holyMight");
		}
	},
	SHD: {
		harmTouch: function() {
			console.info("harmTouch");
		},
		bash: function() {
			console.info("bash");
		},
		taunt: function() {
			console.info("taunt");
		},
		lifeTap: function() {
			console.info("lifeTap");
		},
		engulfingDarkness: function() {
			console.info("engulfingDarkness");
		},
		bloodBoil: function() {
			console.info("bloodBoil");
		},
		invokeFear: function() {
			console.info("invokeFear");
		},
		waveOfHorror: function() {
			console.info("waveOfHorror");
		}
	},
	RNG: {
		trueshotStrike: function() {
			console.info("trueshotStrike");
		},
		kick: function() {
			console.info("kick");
		},
		ensnare: function() {
			console.info("ensnare");
		},
		ignite: function() {
			console.info("ignite");
		},
		faerieFlame: function() {
			console.info("faerieFlame");
		},
		carelessLightning: function() {
			console.info("carelessLightning");
		},
		healing: function() {
			console.info("healing");
		},
		feetLikeCat: function() {
			console.info("feetLikeCat");
		},
	},
	MNK: {
		roundhouseKick: function() {
			console.info("roundhouseKick");
		},
		mend: function() {
			console.info("mend");
		},
		feignDeath: function() {
			console.info("feignDeath");
		},
		intimidation: function() {
			console.info("intimidation");
		},
		chiBlast: function() {
			console.info("chiBlast");
		},
		shoryuken: function() {
			console.info("shoryuken");
		},
		hadoken: function() {
			console.info("hadoken");
		},
		nirvana: function() {
			console.info("nirvana");
		},
	},
	ROG: {
		backstab: function() {
			console.info("backstab");
		},
		evade: function() {
			console.info("evade");
		},
		widowStrike: function() {
			console.info("widowStrike");
		},
		flashPowder: function() {
			console.info("flashPowder");
		},
		shadowStrike: function() {
			console.info("shadowStrike");
		},
		mirrorStrike: function() {
			console.info("mirrorStrike");
		},
		crossSlash: function() {
			console.info("crossSlash");
		},
		awestruck: function() {
			console.info("awestruck");
		},
	},
	DRU: {
		healing: function() {
			console.info("healing");
		},
		starfire: function() {
			console.info("starfire");
		},
		skinLikeWood: function() {
			console.info("skinLikeWood");
		},
		driftingDeath: function() {
			console.info("driftingDeath");
		},
		tornado: function() {
			console.info("tornado");
		},
		endureLightning: function() {
			console.info("endureLightning");
		},
		lightningBlast: function() {
			console.info("lightningBlast");
		},
		chloroplast: function() {
			console.info("chloroplast");
		},
	},
	CLR: {
		holyMight: function() {
			console.info("holyMight");
		},
		smite: function() {
			console.info("smite");
		},
		blessedHammer: function() {
			console.info("blessedHammer");
		},
		healing: function() {
			console.info("healing");
		},
		resolution: function() {
			console.info("resolution");
		},
		symbolOfYentus: function() {
			console.info("symbolOfYentus");
		},
		endureBleed: function() {
			console.info("endureBleed");
		},
		armorOfFaith: function() {
			console.info("armorOfFaith");
		},
	},
	SHM: {
		healing: function() {
			console.info("healing");
		},
		frostRift: function() {
			console.info("frostRift");
		},
		devouringPlague: function() {
			console.info("devouringPlague");
		},
		drowsy: function() {
			console.info("drowsy");
		},
		spiritOfTheBear: function() {
			console.info("spiritOfTheBear");
		},
		bloodRitual: function() {
			console.info("bloodRitual");
		},
		endureCold: function() {
			console.info("endureCold");
		},
		talismanOfTrogmaar: function() {
			console.info("talismanOfTrogmaar");
		},
	},
	BRD: {
		chantOfBattle: function() {
			console.info("chantOfBattle");
		},
		hymnOfRestoration: function() {
			console.info("hymnOfRestoration");
		},
		boastfulBellow: function() {
			console.info("boastfulBellow");
		},
		consonantChain: function() {
			console.info("consonantChain");
		},
		lucidLullaby: function() {
			console.info("lucidLullaby");
		},
		elementalRhythms: function() {
			console.info("elementalRhythms");
		},
		chorusOfClarity: function() {
			console.info("chorusOfClarity");
		},
		sirensSong: function() {
			console.info("sirensSong");
		},
	},
	NEC: {
		engulfingDarkness: function() {
			console.info("engulfingDarkness");
		},
		invokeDeath: function() {
			console.info("invokeDeath");
		},
		venomBolt: function() {
			console.info("venomBolt");
		},
		bloodBoil: function() {
			console.info("bloodBoil");
		},
		invokeFear: function() {
			console.info("invokeFear");
		},
		lifeTap: function() {
			console.info("lifeTap");
		},
		endurePoison: function() {
			console.info("endurePoison");
		},
		dyingBreath: function() {
			console.info("dyingBreath");
		},
	},
	ENC: {
		discordantMind: function() {
			console.info("discordantMind");
		},
		colorShift: function() {
			console.info("colorShift");
		},
		alacrity: function() {
			console.info("alacrity");
		},
		dazzle: function() {
			console.info("dazzle");
		},
		gaspingEmbrace: function() {
			console.info("gaspingEmbrace");
		},
		clarity: function() {
			console.info("clarity");
		},
		cajolingWhispers: function() {
			console.info("cajolingWhispers");
		},
		mysticRune: function() {
			console.info("mysticRune");
		},
	},
	MAG: {
		lavaBolt: function() {
			console.info("lavaBolt");
		},
		summonElemental: function() {
			console.info("summonElemental");
		},
		frozenOrb: function() {
			console.info("frozenOrb");
		},
		elementalFury: function() {
			console.info("elementalFury");
		},
		psionicStorm: function() {
			console.info("psionicStorm");
		},
		malaise: function() {
			console.info("malaise");
		},
		endureFire: function() {
			console.info("endureFire");
		},
		stasisField: function() {
			console.info("stasisField");
		},
	},
	WIZ: {
		iceBolt: function() {
			console.info("iceBolt");
		},
		arcaneMissiles: function() {
			console.info("arcaneMissiles");
		},
		manaShield: function() {
			console.info("manaShield");
		},
		fireball: function() {
			console.info("fireball");
		},
		viziersShielding: function() {
			console.info("viziersShielding");
		},
		lightningStrike: function() {
			console.info("lightningStrike");
		},
		glacialSpike: function() {
			console.info("glacialSpike");
		},
		mirrorImages: function() {
			console.info("mirrorImages");
		},
	},
};

(function() {
	var shortClassKeys = ng.getJobShortKeys();
	for (var key in skills) {
		if (shortClassKeys.indexOf(key) > -1) {
			// this is a player class
			skills[key].skillKeys = Object.keys(skills[key]);
			skills[key].skillKeys.unshift('toggleAutoAttack');
			skills[key].skillKeys.unshift('pull');
			for (var k2 in skills.ALL) {
				// assign ALL functions to each class
				skills[key][k2] = skills.ALL[k2];
			}
		}
	}
})();
var zone = {
}
var party = {
	missionUpdate: function (data) {
		console.info("MISSION UPDATE! ", data);
		mission.setQuest(data.quest);
		my.zoneMobs = data.zoneMobs;
		if (my.p_id && !my.party[0].isLeader) {
			$.ajax({
				data: {
					quest: data.quest
				},
				url: app.url + 'php2/mission/update-quest.php'
			}).done(function (data) {
				console.info('missionUpdate ', data);
				town.aside.selected === 'town-mission' && mission.showEmbark();
				mission.updateTitle();
				chat.log("Now departing for " + my.quest.zone +"...", "chat-warning");
				TweenMax.to('#scene-town', 3, {
					startAt: { opacity: 1 },
					delay: 2,
					opacity: 0,
					ease: Power4.easeOut
				});
				setTimeout(function() {
					mission.embark();
				}, game.questDelay);
			});
		}
	},
	length: function() {
		var count = 0;
		my.party.forEach(function(v) {
			if (v.name) count++;
		});
		return count;
	},
	isSoloOrLeading: function() {
		var leading = 0;
		var partyLen = party.length();
		if (partyLen === 1 || partyLen > 1 && my.party[0].isLeader) {
			leading = 1;
		}
		return leading;
	},
	notifyMissionStatus: function(data) {
		ng.msg(data.msg, 6);
		if (data.action === 'abandon') {
			mission.abort();
		}
	},
	promotePlayer: function() {
		if (party.length() > 1) {
			var name = '';
			my.party.forEach(function(v, i) {
				if (i) {
					if (v) {
						name = v.name;
					}
				}
			});
			name && chat.sendMsg('/promote ' + name);
		}
	}
}
var button = {
	initialized: 0,
	wrap: document.getElementById('button-wrap'),
	init: function() {
		var s = '';
		// skill buttons
		for (var i=0; i<10; i++) {
			s +=
			'<div id="class-btn-'+ i +'" '+
				'class="class-btn" '+
				'style="background-image: url(img2/skills/'+ my.job +'.png)"></div>';
		}
		button.wrap.innerHTML = s;
		if (!button.initialized) {
			$("#button-wrap").on(env.click, '.class-btn', function() {
				var id = this.id.substr(10) * 1;
				console.info('CLICKED SKILL: ', id, typeof id);
				skills[my.job].route(id);
			});
			setTimeout(function() {
				TweenMax.to(button.wrap, 1, {
					startAt: {
						display: 'flex'
					},
					bottom: 0
				});

			}, 1000);
		}
	},
	hide: function() {
		TweenMax.set(button.wrap, {
			display: 'none'
		});
	}
}
// test methods
var test = {
	chat: {
		id: 999999999,
		room: function(){
			for (var i=0; i<100; i++) {
				var c = ng.toJobShort(ng.jobs[~~(Math.random() * 14)]);
				socket.zmq.publish(chat.getChannel(), {
					route: 'chat->add',
					row: test.chat.id+i,
					level: Math.ceil(Math.random() * 50),
					job: c,
					name: 'WWWWWWWWWWWWWWWW'
				});
			}
		},
		log: function() {
			for (var i=0; i<10; i++) {
				chat.sendMsg('/flist');
			}
		}
	},
	orcs: function(){
		$("#title-container-wrap").css('display', 'none');

		var e2 = document.getElementById('ng2-logo-wrap');
		for (var i=0; i<1000; i++){
			var e = document.createElement('img');
			e.id = 'mob' + i;
			e.className = 'abs';
			e.style.top = ~~(Math.random() * 600) +'px';
			e.style.left = ~~(Math.random() * 900) +'px';
			e.src = 'images/an orc.png';
			e2.appendChild(e);
		}

		for (var i=0; i<1000; i++){
			(function(){
				var z = document.getElementById("mob" + i);

				var filters = {
					hue: "hue-rotate(0deg)"
				};

				var tl = new TimelineMax({
					onUpdate: function(){
						filters.hueRotate(z, filters);
					},
					repeat: -1
				});
				tl.to(filters, Math.random() * 6 + 1, {
					hue: "hue-rotate(360deg)"
				});
			})();
		}
	},
	filters: {
		/*
		blur(5px)
		hue-rotate(360deg)
		brightness(100%)
		contrast(100%)
		shadow(100%) (chrome not supported?)
		grayscale(100%)
		invert(100%)
		opacity(100%)
		saturate(100%)
		sepia(100%)
		 */
		hueRotate: function(z, filters){
			z.style.filter = 'grayscale(100%) sepia(100%) saturate(1000%) ' + filters.hue;
		},
		death: function(z, filters){
			z.style.filter = filters.opacity + ' ' + filters.brightness;
		},
		effect: function(z, filters, key){
			z.style.filter = filters[key];
			/*
			test.filters.effect(mob.element, {
			  saturate: 'saturate(2500%)'
			}, 'saturate');
			 */
		}
	},
	battle: function() {
		mob.test = 1;
		battle.testInit();
	}
}
})($,
	Math,
	document,
	location,
	TweenMax,
	TimelineMax,
	Power0,
	Power1,
	Power2,
	Power3,
	Power4,
	Back,
	Elastic,
	Bounce,
	SteppedEase,
	Circ,
	Expo,
	Sine,
	setTimeout,
	setInterval,
	clearTimeout,
	clearInterval,
	window.webkitRequestAnimationFrame === undefined ? undefined : webkitRequestAnimationFrame,
	window.webkitCancelAnimationFrame === undefined ? undefined : webkitCancelAnimationFrame,
	getComputedStyle,
	requestAnimationFrame,
	cancelAnimationFrame,
	window,
	Array,
	JSON,
	Date,
	Object,
	undefined
);