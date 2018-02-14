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
			g.logout();
		});
		$("#ch-card-base").on(x, '.ch-card', function(){
			$('.ch-card').removeClass('ch-card-active');
			$(this).addClass('ch-card-active');
		});
		$('.ch-card:first').trigger(x);
		// create character
		$("#go-create-character").on(x, function(){
			g.goCreateCharacter();
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
			g.lock(1);
			g.initGame();
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
							g.unlock();
						}
					});
				}
			});
		});
		$("#create-character-btn").on(x, function(){
			//client-side validation
			if (!g.locked){
				
			g.lock(1);
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
				g.msg(err);
				g.unlock();
			} else {
				// final adds
				f.shortJob = g.toJobShort(f.job);
				// send to server
				$.ajax({
					url: app.url + 'php2/create/create-character.php',
					data: {
						form: f
					}
				}).done(function(r){
					console.info('Created character: ', r);
					g.msg(r.hero.name + ' has been created!');
					$("#create-character-back").trigger(x);
				}).fail(function(r){
					g.msg(r.responseText, 8);
					g.unlock();
				});
			}
			
			}
		});
		$("#ch-card-list").on(x, '.select-player-card', function(){
			var z = $(this);
			var id = create.selected = z.data('row');
			var id = create.name = z.data('name');
		});
	},
	deleteCharacter: function(){
		// send to server
		if (!g.locked){
			g.lock();
			$.ajax({
				url: app.url + 'php2/create/delete-character.php',
				data: {
					row: create.selected
				}
			}).done(function(r){
				console.info('Deleted character: ', r);
				g.msg(create.name + ' has been deleted!');
				modal.hide();
				g.initGame();
			}).fail(function(r){
				g.msg(r.responseText, 8);
				g.unlock();
			});
		}
	},
	msg: function(key, val){
		var z = {
			gender: {
				Male: "Males have strong cold and arcane resistance.                                                                                                                                                      ",
				Female: "Females receive a boost to bleed and poison resistance.                                                                                                                                                      "
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
		g.split('create-details', create.msg(key, val));
		if (key === 'job'){
			document.getElementById('type-value').innerHTML = create.types[val];
		}
		// resists
		g.resists.forEach(function(v, i){
			document.getElementById(v + '-value').innerHTML = create.getResist(v);
		});
		// dungeon
		g.dungeon.forEach(function(v, i){
			document.getElementById(v + '-value').innerHTML = create.getDungeon(v);
		});
		// reset attr
		if (key !== 'gender' && create.form.race){
			var raceAttr = g.copy(create.getRaceAttrs(create.form.race)),
				jobAttr = g.copy(create.getJobAttrs(create.form.job));
			jobAttr.forEach(function(v, i){
				raceAttr[i] += v;
			});
			// set initial attr values
			$(".create-attr-value").removeClass('active');
			g.attrs.forEach(function(v, i){
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
var g = {
	events: function(){
		$(window).focus(function(){
			/*document.title = g.defaultTitle;
			g.titleFlashing = false;*/
			// my.name && socket.init(1);
		});
		// should be delegating no drag start
		$("body").on('dragstart', 'img', function(e) {
			e.preventDefault();
		});
		// disable stuff in app to appear more "native"
		if (!app.isLocal) {
			document.addEventListener("contextmenu", function (e) {
				// disable default right-click menu
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
			clearTimeout(g.resizeTimer);
			g.resizeTimer = setTimeout(function(){
				if (chat.initialized) {
					chat.scrollBottom();
				}
				if (g.view === 'battle') {
					for (var i=0; i<mob.max; i++) {
						mob.sizeMob(mobs[i]);
					}
				}
			}, 50);
		}).on('load', function(){
			env.resizeWindow();
		});
	},
	disconnect: function(msg) {
		g.view = 'disconnected';
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
		return g.jobShort[key];
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
		return g.jobLong[key];
	},
	copy: function(o){
		return JSON.parse(JSON.stringify(o));
	},
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
		g.view = scene;
	},
	camel: function(str){
		str = str.split("-");
		for (var i=1, len=str.length; i<len; i++){
			str[i] = str[i].charAt(0).toUpperCase() + str[i].substr(1);
		}
		return str.join("");
	},
	lock: function(hide){
		g.lockOverlay.style.display = "block";
		g.lockOverlay.style.opacity = hide ? 0 : 1;
		g.locked = 1;
	},
	unlock: function(){
		g.lockOverlay.style.display = "none";
		g.locked = 0;
	},
	unlockFade: function(d){
		if (!d){
			d = 1;
		}
		TweenMax.to(g.lockOverlay, d, {
			startAt: {
				opacity: 1,
			},
			ease: Power3.easeIn,
			opacity: 0,
			onComplete: function(){
				g.lockOverlay.style.display = 'none';
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
				g.geo = data;
				$.ajax({
					url: app.url + 'php/updateUserInfo.php',
					data: {
						location: g.geo
					}
				}).done(function(){
					localStorage.setItem('geo', JSON.stringify(g.geo));
					localStorage.setItem('geoSeason', 1);
					localStorage.setItem('geoTime', Date.now());
				});
				//console.info('loc: ', g.geo);
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
				g.updateUserInfo();
			}
		} else if (geo === null){
			g.updateUserInfo();
		}
		// ignore list
		var ignore = localStorage.getItem('ignore');
		if (ignore !== null){
			g.ignore = JSON.parse(ignore);
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
			setTimeout(g.keepAlive, 120000);
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
		g.lock();
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
			console.info('Facebook error: ', err);
		}
		
		try {
			var auth2 = gapi.auth2.getAuthInstance();
			auth2.signOut().then(function(){
			});
		} catch (err){
			console.info('Google error: ', err);
		}
		
		setTimeout(function(){
			$.ajax({
				type: 'GET',
				url: app.url + 'php/logout.php'
			}).done(function(data) {
				g.msg("Logout successful");
				localStorage.removeItem('email');
				localStorage.removeItem('token');
				location.reload();
			}).fail(function() {
				g.msg("Logout failed.");
			});
		}, 1000);
	},
	goCreateCharacter: function(){
		g.lock(1);
		var z = '#scene-title-select-character',
			prom = 0,
			allDone = function(){
				if (++prom === 2){
					g.unlock();
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
							g.unlock();
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
			g.races.forEach(function(v){
				create.raceAttrs[v] = r[v].attrs;
				create.possibleJobs[v] = r[v].jobs;
			});
			// job stats
			g.jobs.forEach(function(v){
				create.jobAttrs[v] = r.jobs[v];
			});
            $("#create-character-name").val('');
			allDone();
		});
	},
	initGame: function(){
		$.ajax({
			type: 'POST',
			url: app.url + 'php2/initGame.php'
		}).done(function(r){
			console.info("initGame: ", r);
			app.initialized = 1;
			if (r.account) {
				app.account = my.account = r.account; // for global reference
				document.getElementById('logout').textContent = 'Logout ' + r.account;
				g.displayAllCharacters(r.characterData);
				g.checkPlayerData();
				$("#login-modal").remove();
			}
			else {
				notLoggedIn();
			}
			document.getElementById('version').textContent = 'Version ' + app.version;

			var h = location.hash;
			if (app.isLocal) {
				// hastag routing
				if (h === '#town') {
					town.go();
				}
				else if (h === '#battle') {
					battle.go();
				}
			}
		});
	},
	displayAllCharacters: function(r){
		var s = '';
		r.forEach(function(d){
			// #ch-card-list
			s +=
				'<div data-row="'+ d.row +'" '+
				'data-name="'+ d.name +'" '+
				'class="btn btn-lg ch-card center select-player-card">'+
				'<div class="ch-card-name">'+ d.name +'</div>'+
				'<div class="ch-card-details">'+ d.level +' '+ d.race +' '+ g.toJobLong(d.job) +'</div>'+
				'</div>';
		});
		document.getElementById('ch-card-list').innerHTML = s;
		$(".select-player-card:first").trigger(env.click);
	}
};

g.init = (function(){
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
	resizeWindow: function() {
		// currently doing nothing
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
	channel: 'town-1',
	lastReceivedWhisper: '',
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
		e.camelKey = g.camel(e.key);
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
				g.unlock();
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
				'<a id="modal-dismiss" class="btn btn-info btn-sm modal-buttons">Cancel</a>'+
				'<a id="'+ e.key +'-confirm" class="btn btn-info btn-sm modal-buttons">Confirm</a>'+
			'</div>';
		return str;
	}
};


var video = {
	cache: {},
	load: {
		title: function(){
			var x = [
				'xicotl.png'
			];
			for (var i=0, len=x.length; i<len; i++){
				var z = x[i];
				video.cache[z] = new Image();
				video.cache[z].src = "images/" + z;
			}
		}
	}
}
video.load.title();
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
				if (g.config.audio.musicVolume){
					dom.bgmusic.pause();
					dom.bgmusic.src = "music/" + foo + ".mp3";
					dom.bgmusic.volume = g.config.audio.musicVolume / 100;
				}
			} else {
				// sfx
				if (g.config.audio.soundVolume){
					var sfx = new Audio("sound/" + foo + ".mp3");
					sfx.volume = g.config.audio.soundVolume / 100;
					sfx.play();
				}
			}
		}
	},
	save: function(){
		// save to storage
		var foo = JSON.stringify(g.config); 
		localStorage.setItem('config', foo);
	},
	setMusicVolume: function(val){
		if (g.config.audio.musicVolume){
			if (!val){
				audio.pause();
			}
		} else {
			// start playing music
			audio.musicStart();
		}
		dom.bgmusic.volume = val / 100;
		g.config.audio.musicVolume = val;
		audio.save();
	},
	setSoundVolume: function(val){
		g.config.audio.soundVolume = val;
		audio.save();
	},
	pause: function(){
		dom.bgmusic.pause();
	},
	gameMusicInit: function(){
		if (g.config.audio.musicVolume){
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
		dom.bgmusic.volume = g.config.audio.musicVolume / 100;
		dom.bgmusic.onended = function(){
			audio.gameMusicPlayNext();
		}
		console.info("PLAYING: ", nowPlaying);
	},
	fade: function(){
		var x = {
			vol: g.config.audio.musicVolume / 100
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
		if (g.view !== 'game'){
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
		if (g.config.audio.musicOn === undefined){
			g.config.audio = foo.audio;
		}
	}
	// console.info("Initializing audio...", g.config.audio);
	audio.load.title();
	if (!g.config.audio.musicVolume){
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
			value: g.config.audio.musicVolume, 
			formatter: function(value) {
				if (initComplete){
					audio.setMusicVolume(value);
					return value;
				} else {
					return g.config.audio.musicVolume;
				}
			}
		}).slider('setValue', g.config.audio.musicVolume);
	}
	var e = $("#musicSlider");
	if (e.length){
		$("#soundSlider").slider({
			min  : 0, 
			max  : 100, 
			value: g.config.audio.soundVolume, 
			tooltip_position: 'bottom',
			formatter: function(value) {
				if (initComplete){
					audio.setSoundVolume(value);
					return value;
				} else {
					return g.config.audio.soundVolume
				}
			}
		}).on('slideStop', function(val){
			audio.play('machine0');
		}).slider('setValue', g.config.audio.soundVolume);
	}
	initComplete = true;
})();
//audio.gameMusicInit();
// game specific data
var game = {
	maxPlayers: 6,
	init: 0,
	start: function() {
		// only called once
		if (!game.init) {
			game.init = 1;
			game.heartbeat.send();
			game.heartbeat.start();
			game.socket.start();
			game.played.start();
		}
	},
	heartbeat: {
		timer: 0,
		start: function() {
			clearTimeout(game.heartbeat.timer);
			game.heartbeat.timer = setTimeout(function() {
				game.heartbeat.send();
			}, 5000);
		},
		send: function() {
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/heartbeat.php'
			}).done(function () {
				// nothing
			}).fail(function () {
				clearTimeout(game.heartbeat.timer);
				game.heartbeat.timer = setTimeout(function () {
					game.heartbeat.start();
				}, 1000);
			});
		}
	},
	socket: {
		timer: 0,
		start: function() {
			clearInterval(game.socket.timer);
			game.socket.timer = setInterval(function(){
				socket.healthTime = Date.now();
				socket.startHealthCheck();
				socket.zmq.publish('hb:' + my.name, {});
			}, 20000);
		}
	},
	played: {
		timer: 0,
		start: function() {
			clearInterval(game.played.timer);
			game.played.timer = setInterval(function(){
				$.ajax({
					type: 'GET',
					url: app.url + 'php2/update-played.php'
				}).done(function(){
				}).fail(function(){
					setTimeout(function(){
						game.played.start();
					}, 5000);
				});
			}, 60000);
		}
	},
	getGameState: function(){
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
			g.initGame();
			clearTimeout(game.heartbeat.timer);
			game.heartbeat.timer = setTimeout(function(){
				g.keepAlive();
			}, 180000);
			// init events
			var x = env.click;
			g.events(x);
			create.events(x);
			audio.events();
		});
	})(),
	test: function() {
		// nada
	}
};
onbeforeunload = function(){
	chat.broadcast.remove();
	if (socket.enabled) {
		socket.zmq.publish('friend:' + my.name, {
			name: my.name,
			route: 'off'
		});
		socket.zmq.close();
	}
}

$(document).on(env.click, function(e){
	e.preventDefault();
	return false;
}).on('keydown', function(e){
	var code = e.keyCode,
		key = e.key;

	g.lastKey = key;

	app.isLocal && console.info('keydown: ', key, code);
	// local only
	if (app.isLocal) {
		if (!chat.hasFocus) {
			// key input view router
			if (key === 'b') {
				battle.go();
			}
			else if (key === 't') {
				town.go();
			}
		}
	}
	else {
		// not local
		if (code >= 112 && code <= 121 || code === 123) {
			// disable all F keys except F11
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
		else if (!chat.hasFocus && code === 65) {
			// no select all of webpage elements
			e.preventDefault();
		}
	} else {
		if (g.view === 'title'){
			if (!g.isModalOpen){
				$("#create-character-name").focus();
			}
		} else {
			// always works town,dungeon and combat
			if (chat.hasFocus) {
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

			if (g.view === 'town') {
				if (chat.hasFocus) {
					if (chat.mode.change()) {
						// changing chat mode - matches possible mode change
						return false;
					}
				} else {
					// no chat focus
					chat.dom.chatInput.focus();
				}
			} else {
				// game
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
					if (g.view === 'game' && !g.chatOn) {
						game.toggleGameWindows(1);
					}
				}
			}
		}
	}
}).on('keyup', function(e) {
	var x = e.keyCode;
	//console.info(x);
	if (g.view === 'title'){
		if (x === 13){
			if (g.focusUpdateNationName){
				title.submitNationName();
			} else if (g.focusGameName){
				title.createGame();
			} else if (title.chatOn){
				if (x === 13){
					// enter - sends chat
					title.sendMsg();
				}
			} else if (title.createGameFocus){
				title.createGame();
			}
		} else if (x === 27){
			// esc
			title.closeModal();
		}
	} else {
	}
});
// ws.js
var socket = {
	unsubscribe: function(channel){
		try {
			socket.zmq.unsubscribe(channel);
		} catch(err) {
			console.warn(err);
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
					if (g.ignore.indexOf(data.account) === -1){
						title.chatReceive(data);
					}
				});
			} else {
				setTimeout(repeat, 100);
			}
		})();
	},
	isHealthy: 0,
	initWhisper: function() {
		if (socket.enabled) {
			var channel = 'hb:' + my.name;
			// heartbeat
			console.info("subscribing to heartbeat channel: ", channel);
			socket.zmq.subscribe(channel, function(){
				socket.isHealthy = 1;
				console.info("socket heartbeat received: ", Date.now() - socket.healthTime + 'ms');
			});
			// whisper
			channel = 'name:' + my.name;
			console.info("subscribing to whisper channel: ", channel);
			socket.zmq.subscribe(channel, function(topic, data) {
				if (data.action === 'send') {
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
					data.msg = "You whispered to " + data.name + ": " + chat.whisper.parse(data.msg);
					route.town(data, 'chat->log');
				}
				// receive keep alive
				else if (data.action === 'ping') {
					console.info("Socket is healthy! ", Date.now() - socket.healthTime);
					socket.isHealthy = 1;
				}

				if (!chat.mode.command) {
					// set chat mode if none is set
					chat.mode.command = '@';
					chat.mode.name = data.name;
				}
			});
		}
	},
	healthTime: 0,
	startHealthCheck: function() {
		socket.healthTime = Date.now();
		socket.isHealthy = 0;
		setTimeout(function() {
			socket.checkHealth();
		}, 8000);
	},
	checkHealth: function(){
		if (!socket.isHealthy) {
			g.disconnect();
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
			console.warn('WebSocket connection failed. Retrying...');
			socket.enabled = 0;
			setTimeout(socket.init, 100);
		}, {
			// options
			'skipSubprotocolCheck': true
		});
	},
	initialConnection: 1,
	routeMainChat: function(topic, data) {
		console.info('rx ', topic, data);
		route.town(data, data.route);
	},
	connectionSuccess: function(){
		socket.enabled = 1;
		console.info("Socket connection established with server");
		// chat updates
		if (socket.initialConnection) {
			socket.initialConnection = 0;
			// subscribe to town-1 default channel - general chat
			var town = chat.getChannel();
			console.info("subscribing to channel: ", town);
			chat.log("You have joined channel: " + my.channel, 'chat-warning');
			socket.zmq.subscribe(town, function(topic, data) {
				socket.routeMainChat(topic, data);
			});

			// subscribe to admin broadcasts
			var admin = 'admin:broadcast';
			console.info("subscribing to channel: ", admin);
			socket.zmq.subscribe(admin, function(topic, data) {
				console.info('rx ', topic, data);
				route.town(data, data.route);
			});

			// subscribe to test guild for now
			var guild = 'guild:' + Date.now();
			my.guild = guild;
			console.info("subscribing to channel: ", guild);
			socket.zmq.subscribe(guild, function(topic, data) {
				console.info('rx ', topic, data);
				route.town(data, data.route);
			});

			// subscribe to test party for now
			var party = 'party:' + Date.now();
			my.party = party;
			console.info("subscribing to channel: ", party);
			socket.zmq.subscribe(party, function(topic, data) {
				console.info('rx ', topic, data);
				route.town(data, data.route);
			});

			(function repeat(){
				if (my.name){
					socket.initWhisper();
					socket.initFriendAlerts();
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
		g.friends.forEach(function(v){
			socket.zmq.subscribe('friend:' + v, function(topic, data) {
				chat.friend.notify(topic, data);
			});
		});
	}
}
// chat.js
var chat = {
	prefix: 't:',
	default: 'town-1',
	getChannel: function() {
		return chat.prefix + my.channel;
	},
	// receives channel prop from index.php
	html: function() {
		var s =
			'<div id="chat-present-wrap">' +
				'<div id="chat-header">town-1</div>' +
				'<div id="chat-room"></div>' +
			'</div>' +
			'<div id="chat-log-wrap">' +
				'<div id="chat-log">' +
					'<div>Welcome to Vandamor.</div>' +
					'<div class="chat-warning">Nevergrind 2 is still in development, but feel free to test it out!</div>' +
					'<div class="chat-emote">Type /help or /h for a list of chat commands.</div>' +
				'</div>' +
				'<div id="chat-input-wrap">' +
					'<div id="chat-input-mode" class="chat-white no-select">'+
						'<span id="chat-mode-msg" class="ellipsis">To town-1:</span>' +
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
			'/s',
			'/p',
			'/g',
			'/me'
		],
		command: '/s',
		name: '',
		change: function(h){
			// only trim leading spaces
			var mode = h === undefined ? (chat.dom.chatInput.value + g.lastKey) : h.mode,
				mode = mode.replace(/^\s+/g, '');

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
				(!h && mode[0] === '@' && g.lastKey === ' ') ) {
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
			if (mode === '/s') {
				chat.dom.chatInputMode.className = 'chat-white';
				chat.dom.chatModeMsg.textContent = 'To ' + my.channel + ':';
			}
			else if (mode === '/p') {
				chat.dom.chatInputMode.className = 'chat-party';
				chat.dom.chatModeMsg.textContent = 'To party:';
			}
			else if (mode === '/g') {
				chat.dom.chatInputMode.className = 'chat-guild';
				chat.dom.chatModeMsg.textContent = 'To guild:';
			}
			else if (mode === '/me') {
				chat.dom.chatInputMode.className = 'chat-emote';
				chat.dom.chatModeMsg.textContent = 'Emote:';
			}
			else if (mode === '@') {
				chat.dom.chatInputMode.className = 'chat-whisper';
				chat.dom.chatModeMsg.textContent = 'To '+ chat.mode.name +':';
			}
		},
	},
	dom: {},
	init: function(z) {
		// default initialization of chat
		if (z && !chat.initialized) {
			var e = document.getElementById('chat-wrap');
			e.innerHTML = '';
			e.style.display = z ? 'flex' : 'none';
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
		}
		else {
			// hide
		}
		// dom cache
		chat.dom.chatRoom = document.getElementById('chat-room');
		chat.dom.chatHeader = document.getElementById('chat-header');
		chat.dom.chatLog = document.getElementById('chat-log');
		chat.dom.chatInput = document.getElementById('chat-input');
		chat.dom.chatInputMode = document.getElementById('chat-input-mode');
		chat.dom.chatModeMsg = document.getElementById('chat-mode-msg');
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
	parseMsg: function(msg) {
		var arr = msg.split(" ");
		var o = {
			first: arr[0].trim().toLowerCase()
		}
		arr.shift();
		o.command = arr.join(' ');
		return o;
	},
	getMsgObject: function(msg){
		var o = {
				msg: msg,
				class: 'chat-normal',
				category: chat.getChannel()
			};
		var parse = chat.parseMsg(msg);

		// is it a command?
		if (chat.mode.command === '/p'){
			o.category = my.party;
			o.msg = msg;
			o.class = 'chat-party';
		}
		else if (chat.mode.command === '/g'){
			o.category = my.guild;
			o.msg = msg;
			o.class = 'chat-guild';
		}
		else if (chat.mode.command === '/me') {
			o.msg = msg;
			o.class = 'chat-emote';
		}
		else if (parse.first === '/broadcast'){
			o.category = 'admin:broadcast';
			o.msg = parse.command;
			o.class = 'chat-broadcast';
		}
		return o;
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
	help: function() {
		var z = 'class="chat-emote"',
			s = [
				'<div class="chat-warning">Chat Commands:</div>',
				'<div '+ z +'>/s : Say a message in town chat channel : /s hail</div>',
				'<div '+ z +'>/p : Message your party : /p hail</div>',
				'<div '+ z +'>/g : Message your guild : /g hail</div>',
				'<div '+ z +'>@ : Send a private message by name : @bob hi</div>',
				'<div '+ z +'>/me : Send an emote : /me waves</div>',
				'<div '+ z +'>/j : Join the default chat channel : /j</div>',
				'<div '+ z +'>/j channel : Join a channel : /j bros</div>',
				'<div '+ z +'>/flist or /f : Show your friends\' online status</div>',
				'<div '+ z +'>/f add : Add a friend : /f add Bob</div>',
				'<div '+ z +'>/f remove : Remove a friend : /f remove Bob</div>',
				'<div '+ z +'>/ignore or /i : Show your ignore list</div>',
				'<div '+ z +'>/i add : Add someone to your ignore list</div>',
				'<div '+ z +'>/i remove : Remove someone from your ignore list</div>',
				'<div '+ z +'>/who : Show all players currently playing</div>',
				'<div '+ z +'>/who class : Show current players by class : /who warrior</div>',
				'<div '+ z +'>/clear: clear the chat log</div>',
				'<div '+ z +'>/time: Show character creation, session duration, and total playtime</div>',
				'<div '+ z +'>/camp: Exit the game.</div>',
			];
		for (var i=0, len=s.length; i<len; i++) {
			chat.log(s[i]);
		}
	},
	// player hit ENTER
	sendMsg: function(bypass){
		var msg = chat.dom.chatInput.value.trim(),
			msgLower = msg.toLowerCase();

		// bypass via ENTER or chat has focus
		if (msg === '/h' || msg === '/help') {
			chat.updateHistory(msg);
			chat.help();
		}
		/*
		/invite
		/disband
		/random
		/surname
		update /help
		create placards!
		allow to form parties
			invite
			disband
			leader
		allow to form guilds
			invite
			disband
			leader
		 */
		else if (msgLower === '/camp') {
			chat.updateHistory(msgLower);
			chat.camp();
		}
		else if (msgLower === '/time') {
			chat.updateHistory(msgLower);
			chat.played();
		}
		else if (msgLower.indexOf('/j') === 0) {
			chat.updateHistory(msgLower);
			chat.join.channel(chat.join.parse(msg));
		}
		else if (msgLower === '/clear') {
			chat.updateHistory(msgLower);
			chat.clearChatLog();
		}
		else if (msgLower === '/w' || msgLower === '/who') {
			chat.updateHistory(msgLower);
			chat.who.all();
		}
		else if ( (msgLower.indexOf('/w ') === 0 || msgLower.indexOf('/who ') === 0) && msgLower.length > 5) {
			chat.updateHistory(msg);
			chat.who.class(chat.who.parse(msg));
		}
		else if (msgLower === '/i' || msgLower === '/ignore') {
			chat.updateHistory(msgLower);
			chat.ignore.list();
		}
		else if (msgLower.indexOf('/i remove') === 0 || msgLower.indexOf('/ignore remove') === 0) {
			chat.updateHistory(msg);
			chat.ignore.remove(chat.friend.parse(msg));
		}
		else if (msgLower.indexOf('/i add') === 0 || msgLower.indexOf('/ignore add') === 0) {
			chat.updateHistory(msg);
			chat.ignore.add(chat.friend.parse(msg));
		}
		else if (msgLower === '/f' || msgLower === '/friend' || msgLower === '/flist') {
			chat.updateHistory(msgLower);
			chat.friend.list();
		}
		else if (msgLower.indexOf('/f remove') === 0 || msgLower.indexOf('/friend remove') === 0) {
			chat.updateHistory(msg);
			chat.friend.remove(chat.friend.parse(msg));
		}
		else if (msgLower.indexOf('/f add') === 0 || msgLower.indexOf('/friend add') === 0) {
			chat.updateHistory(msg);
			chat.friend.add(chat.friend.parse(msg));
		}
		else if (chat.mode.command === '@'){
			// whisper
			if (my.name !== chat.mode.name) {
				chat.updateHistory(msg);
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
			if (bypass || chat.hasFocus) {
				if (msg) {
					var o = chat.getMsgObject(msg);
					if (o.msg[0] !== '/') {
						chat.updateHistory(msg);
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
		chat.clear();
	},
	whispers: {},
	clear: function() {
		chat.dom.chatInput.value = '';
	},
	clearChatLog: function(){
		chat.dom.chatLog.innerHTML = '';
	},
	ignore: {
		init: function() {
			g.ignore = JSON.parse(localStorage.getItem('ignore')) || g.ignore;
		},
		list: function() {
			if (g.ignore.length) {
				var s = '<div class="chat-warning">Checking ignore list...</div>';
				g.ignore.forEach(function(v) {
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
				g.ignore.push(o);
				localStorage.setItem('ignore', JSON.stringify(g.ignore));
				chat.log('You have added ' + o + ' to your ignore list.', 'chat-warning');
			}
		},
		remove: function(o) {
			while (g.ignore.indexOf(o) > -1) {
				var index = g.ignore.indexOf(o);
				g.ignore.splice(index, 1);
			}
			localStorage.setItem('ignore', JSON.stringify(g.ignore));
			chat.log('You have removed ' + o + ' from your ignore list.', 'chat-warning');
		}
	},
	camp: function() {
		chat.log('Camping...', 'chat-warning');
		setTimeout(function(){
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/chat/camp.php'
			}).done(function(){
				location.reload();
			}).fail(function(){
				chat.log('Failed to camp successfully.', 'chat-alert');
			});
		}, 1000);
	},
	reply: function() {
		if (chat.lastWhisper.name) {
			var o = {
				mode: '@',
				name: chat.lastWhisper.name
			}
			chat.mode.change(o);
			chat.dom.chatInput.focus();
		}
	},
	whisper: {
		parse: function(msg) {
			var a = msg.split("whispers: ");
			return a[1];
		}
	},
	friend: {
		parse: function(o) {
			var a = o.split(" ");
			return a[2][0].toUpperCase() + a[2].substr(1);
		},
		init: function() {
			g.friends = g.friends || [];
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/chat/friend-get.php',
			}).done(function(data){
				g.friends = data;
			});
		},
		list: function() {
			chat.log('<div class="chat-warning">Checking friends list...</div>');
			if (g.friends.length){
				$.ajax({
					type: 'GET',
					url: app.url + 'php2/chat/friend-status.php'
				}).done(function(r){
					g.friends = r.friends;
					console.info(r);
					var str = '<div>Friend List ('+ r.friends.length +')</div>';

					g.friends.forEach(function(name, i){
						var index = r.players.indexOf(name);
						if (index > -1){
							var s = r.stats[index];
							// online
							str +=
								'<div class="chat-whisper">[' +
								s.level +' '+ g.jobLong[s.job] +'] '+ g.friends[i] + ' ('+ s.race +
								')</div>';
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
			if (o.length > 1 && o !== my.name && g.friends.indexOf(o) === -1) {
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
						chat.log('You have added ' + o + ' to your friends list.', 'chat-warning');
						g.friends.push(o);
						socket.zmq.subscribe('friend:'+ o, function(topic, data) {
							chat.friend.notify(topic, data);
						});
					}
				});
			}
		},
		remove: function(o) {
			if (o.length > 1 && o !== my.name && g.friends.indexOf(o) > -1) {
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
						chat.log('You have removed ' + o + ' from your friends list.', 'chat-warning');
						while (g.friends.indexOf(o) > -1) {
							var index = g.friends.indexOf(o);
							g.friends.splice(index, 1);
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
		parse: function(msg) {
			var a = msg.split(" "),
				job = a[1],
				longJob = job[0].toUpperCase() + job.substr(1);

			// long name?
			if (g.jobs.indexOf(longJob) > -1) {
				// convert to short
				return g.jobShort[longJob];
			}
			else {
				var shortJobs = Object.keys(g.jobLong),
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
					chat.log("There " + (r.len > 1 ? "are" : "is") +" currently "+
						r.len + " "+ (r.len > 1 ? "players" : "players") +" in Vandamor.", "chat-warning");
					// online
					var str = '';
					r.players.forEach(function(v, i){
						str +=
							'<div class="chat-whisper">[' +
							v.level +' '+ g.jobLong[v.job] +'] '+ v.name + ' ('+ v.race +
							')</div>';
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
				var jobLong = g.toJobLong(job);
				if (r.len) {
					chat.log("There " + (r.len > 1 ? "are" : "is") +" currently "+
						r.len + " "+ (r.len > 1 ? jobLong + 's' : jobLong) +" in Vandamor.", "chat-warning");
					// online
					var str = '';
					r.players.forEach(function(v, i){
						str +=
							'<div class="chat-whisper">[' +
							v.level +' '+ g.jobLong[v.job] +'] '+ v.name + ' ('+ v.race +
							')</div>';
					});
					chat.log(str, 'chat-whisper');
				}
				else {
					chat.log("Currently there are no " + jobLong + "s in Vandamor.", "chat-warning");
				}


			});
		},
	},
	scrollBottom: function(){
		if (!chat.isClicked){
			chat.dom.chatLog.scrollTop = chat.dom.chatLog.scrollHeight;
		}
	},
	inChannel: [],
	setRoom: function(data) {
		console.info('setRoom', data);
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
		chat.dom.chatHeader.innerHTML = my.channel + '&thinsp;(' + chat.inChannel.length + ')';
	},
	join: {
		parse: function(msg) {
			var c = msg.split(" ");
			return c[1] === undefined ?
				'' : c[1].toLowerCase().trim();
		},
		channel: function(channel) {
			if (g.view === 'town') {
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
	// players receive update from socket
	addPlayer: function(v) {
		// console.info('chat.inChannel', v.row, chat.inChannel);
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
			console.info('broadcast.add');
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
			socket.zmq.publish(chat.getChannel(), {
				route: 'chat->remove',
				row: my.row
			});
		}
	}
};
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
// battle
var battle = {
	go: function(){
		mob.init();
		g.setScene('battle');
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
		g.setScene('battle');
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
	init: function(){
		if (!mob.initialized) {
			// initialization things only
			mob.initialized = 1;
			mob.imageKeys = Object.keys(mobs.images);
			mob.index = mob.imageKeys.length - 1;
		}

		for (var i=0; i<mob.max; i++){
		//for (var i=2; i<3; i++){
			var m = mobs[i],
				//mobKey = mob.getRandomMobKey();
				mobKey = 'dragon';
			mob.preloadMob(mobKey);
			m.type = mobKey;
			mob.setMob(m);
			mob.idle(m);
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
		w: 720,
		h: 800,
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
	'beholder': {
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
	test: 1,
	imageKeysLen: 0,
	index: 0,
	cache: {},
	imageKeys: [],
	getRandomMobKey: function(){
		var i = ~~(Math.random() * mob.imageKeysLen);
		return mob.imageKeys[i];
	},
	preloadMob: function(type){
		if (!mobs.images[type].cache.length) {
			for (var i = 1; i <= 105; i++) {
				mobs.images[type].cache[i] = new Image();
				mobs.images[type].cache[i].src = 'mobs/' + type + '/' + i + '.png';
			}
		}
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
		battle.init();
	},
	element: {},
	animationActive: 0,
	frame: 1,
	setMob: function(m){
		// set memory
		m.size = m.size;
		m = Object.assign(m, mobs.images[m.type]);
		delete m.cache;
		mob.sizeMob(m);
	},
	sizeMob: function(m){
		// TODO: perhaps modify this later responsively using window.innerWidth ?
		// set dom
		var w = ~~(m.size * (mobs.images[m.type].w));

		m.box = battle.getBox(m.index);
		// wrapper
		// name
		m.dom.name.innerHTML = m.type.replace(/-/g, ' ');
		// img
		m.dom.img.style.left = (w * -.5) + 'px';
		m.dom.img.style.width = w + 'px';
		m.dom.img.style.bottom = (mobs.images[m.type].yFloor * m.size) + 'px';
		// details
		TweenMax.set(m.dom.details, {
			bottom: m.detailAliveBottom * m.size
		});
		// shadow
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
	setSrc: function(m){
		m.frame = ~~m.frame;
		if (m.frame !== m.lastFrame) {
			m.dom.img.src = 'mobs/' + m.type + '/' + m.frame + '.png';
			m.lastFrame = m.frame;
		}
	},
	resetIdle: function(m){
		m.animationActive = 0;
		mob.idle(m, 1);
	},
	idle: function(m, skip){
		var startFrame = 1,
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
				mob.setSrc(m);
			}
		});
		if (skip) return;
		TweenMax.delayedCall(.25, function(){
			mob.test && mob.hit(m);
			//mob.death();
		})
	},
	hit: function(m){
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
				mob.setSrc(m);
			},
			onComplete: function(){
				mob.resetIdle(m);
				if (mob.test){
					TweenMax.delayedCall(.5, function() {
						mob.attack(m, 1);
					});
				}
			}
		});
	},
	attack: function(m, force){
		if (m.animationActive) return;
		m.animationActive = 1;
		var tl = g.TM(),
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
				mob.setSrc(m);
			},
			onComplete: function() {
				mob.resetIdle(m);
				if (mob.test){
					if (force === 1){
						TweenMax.delayedCall(.5, function() {
							mob.attack(m, 2);
						});
					}
					else if (force === 3){
						TweenMax.delayedCall(.5, function() {
							mob.death(m);
						});
					}
					else {
						TweenMax.delayedCall(.5, function() {
							mob.special(m);
						});
					}
				}
			}
		});
	},
	special: function(m){
		if (m.animationActive) return;
		if (!m.enableSpecial) {
			mob.attack(m, 3);
		}
		else {
			m.animationActive = 1;
			var startFrame = 56,
				endFrame = 75.9,
				diff = endFrame - startFrame;

			var tl = g.TM();
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
					mob.setSrc(m);
				},
				onComplete: function () {
					mob.resetIdle(m);
					if (mob.test) {
						TweenMax.delayedCall(.5, function () {
							mob.death(m);
						});
					}
				}
			});
		}
	},
	death: function(m){
		if (m.deathState) return;
		m.deathState = 1;
		m.hp = 0;
		mob.setClickBox(m);
		m.animationActive = 1;
		var tl = g.TM(),
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
				mob.setSrc(m);
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
							mob.sizeMob(m);
							mob.idle(m);
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
var p = {}, // party info
	town = {
	go: function(){
		if (create.selected) {
			g.lock(1);
			$.ajax({
				url: app.url + 'php2/character/loadCharacter.php',
				data: {
					row: create.selected
				}
			}).done(function(data) {
				socket.init();
				var z = data.characterData;
				my.name = z.name;
				my.job = z.job;
				my.race = z.race;
				my.level = z.level;
				my.row = z.row;
				my.leader = '';
				p[my.name] = z;
				console.info('p[my.name]: ', p[my.name]);
				g.setScene('town');
				town.init();
				chat.init(1);
				chat.log("There are currently " + data.count + " players exploring Vandamor.", 'chat-emote');
				chat.friend.init();
				chat.ignore.init();
				game.start();
				chat.setRoom(data.players);
				bar.init();
			}).fail(function(data){
				g.disconnect(data.responseText);
			}).always(function(){
				g.unlock();
			});
		}
	},
	html: function(){
		var s =
			'<img id="town-bg" class="img-bg" src="img2/town.jpg">'+
			'<div id="town-footer" class="text-shadow2">' +
				'<hr id="town-footer-hr1" class="footer-hr">' +
				'<div id="town-footer-flex">' +
					'<span id="town-mission-counter" class="center">Mission Counter</span>' +
				'</div>' +
				'<hr id="town-footer-hr2"  class="footer-hr">' +
			'</div>';

		return s;
	},
	events: function(){

	},
	initialized: 0,
	init: function(){
		if (!town.initialized) {
			town.initialized = 1;
			document.getElementById('scene-town').innerHTML = town.html();
			town.events();
			$("#scene-title").remove();
			if (!sessionStorage.getItem('startTime')) {
				sessionStorage.setItem('startTime', JSON.stringify(Date.now()));
			}
		}
	}
};
// route.js
var route = {
	town: function(data, r) {
		if (r === 'chat->log') {
			console.info("Callback whisper ", data.name);
			if (data.name === my.name) {
				chat.log(data.msg, data.class);
			}
			else if (g.ignore.indexOf(data.name) === -1) {
				chat.log(data.msg, data.class);
			}
			else {
				console.warn("Message from " + data.name + " has been ignored.");
			}
		}
		else if (r === 'chat->add') {
			// console.info('chat.inChannel', data.row, chat.inChannel);
			chat.addPlayer(data);
		}
		else if (r === 'chat->remove') {
			chat.removePlayer(data);
		}
	}
};
// test methods
var test = {
	chatRoom: function(){
		for (var i=0; i<100; i++) {
			var c = g.toJobShort(g.jobs[~~(Math.random() * 14)]);
			socket.zmq.publish(chat.getChannel(), {
				route: 'chat->add',
				row: ~~(Math.random() * 9999),
				level: Math.ceil(Math.random() * 50),
				job: c,
				name: 'WWWWWWWWWWWWWWWW'
			});
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
	Object
);