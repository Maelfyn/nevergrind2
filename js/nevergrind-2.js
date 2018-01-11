(function($,Math,document,location,TweenMax,TimelineMax,Power0,Power1,Power2,Power3,Power4,Back,Elastic,Bounce,SteppedEase,Circ,Expo,Sine,setTimeout,setInterval,undefined){
// stuff that must exist before everything
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
			var z = document.getElementById('title-scene-create-character');
			TweenMax.to(z, .6, {
				y: 20,
				opacity: 0,
				onComplete: function(){
					TweenMax.set(z, {
						display: 'none',
						opacity: 1
					});
					TweenMax.to('#title-scene-select-character', .6, {
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
					url: g.url + 'php2/create/create-character.php',
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
				url: g.url + 'php2/create/delete-character.php',
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
g = Object.assign(g, {
	events: function(x){
		$(window).focus(function(){
			document.title = g.defaultTitle;
			g.titleFlashing = false;
			if (g.notification.close !== undefined){
				g.notification.close();
			}
		});
		$("img").on('dragstart', function(e) {
			e.preventDefault();
		});
		$(window).on('resize orientationchange focus', function() {
			env.resizeWindow();
		}).on('load', function(){
			env.resizeWindow();
		});
	},
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
	sfxFood: false,
	sfxCulture: false,
	chatOn: false,
	lockOverlay: document.getElementById("lock-overlay"),
	startTime: Date.now(),
	locked: 0,
	loadAttempts: 0,
	isModalOpen: false,
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
		if (location.host !== 'localhost'){
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
					url: g.url + 'php/updateUserInfo.php',
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
			url: g.url + "php/keepAlive.php"
		}).always(function() {
			setTimeout(g.keepAlive, 120000);
		});
	},
	notification: {},
	sendNotification: function(data){
		if (!document.hasFocus() && g.view !== 'game' && typeof Notification === 'function'){
			
			Notification.requestPermission().then(function(permission){
				if (permission === 'granted'){
					// it's a player message
					var type = ' says: ';
					if (data.flag && (data.msg || data.message)){
						// sent by a player
						if (data.type === 'chat-whisper'){
							type = ' whispers: ';
						}
						var prefix = data.account + type;
						var flagFile = data.flag.replace(/-/g, ' ') + (data.flag === 'Nepal' ? '.png' : '.jpg');
						g.notification = new Notification(prefix, {
							icon: 'images/flags/' + flagFile,
							tag: "Firmament Wars",
							body: data.msg ? data.msg : data.message
						});
						g.notification.onclick = function(){
							window.focus();
						}
						// title flash
						if (!g.titleFlashing){
							g.titleFlashing = true;
							(function repeat(toggle){
								if (!document.hasFocus()){
									if (toggle % 2 === 0){
										document.title = prefix;
									} else {
										document.title = g.defaultTitle;
									}
									setTimeout(repeat, 3000, ++toggle);
								}
							})(0);
						}
						audio.play('chat');
					}
				}
			});
		}
	},
	msg: function(msg, d){
		dom.msg.innerHTML = msg;
		if (d === undefined || d < 2){
			d = 2;
		}
		// unlock game modal?
        if (msg.indexOf('unlock-game') > -1){
            modal.show({
                key: 'unlock-game',
                focus: 1
            });
            TweenMax.set('#msg', {
                visibility: 'hidden'
            });
        }
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
		socket.removePlayer(my.account);
		$.ajax({
			type: 'GET',
			url: g.url + 'php/deleteFromFwtitle.php'
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
				url: g.url + 'php/logout.php'
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
		var z = '#title-scene-select-character',
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
					TweenMax.to('#title-scene-create-character', .6, {
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
			url: g.url + 'php2/create/getStatMap.php'
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
			url: g.url + 'php2/initGame.php'
		}).done(function(r){
			console.info("response: ", r);
			g.initialized = 1;
			if (r.account) {
				my.account = r.account;
				document.getElementById('logout').textContent = 'Logout ' + r.account;
				g.displayAllCharacters(r.characterData);
				g.checkPlayerData();
				document.getElementById('login-modal').style.display = 'none';
			}
			else {
				notLoggedIn();
			}
			document.getElementById('version').textContent = 'Version ' + g.version;
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
});
g.init = (function(){
	// console.info("Initializing game...");
	$.ajaxSetup({
		type: 'POST',
		timeout: 5000
	});
	TweenLite.defaultEase = Quad.easeOut;
})();
location.search === '?create' && g.goCreateCharacter();
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
    isChrome: !!window.chrome && !this.isOpera,
    isMSIE: /*@cc_on!@*/ false,
    isMSIE11: !!navigator.userAgent.match(/Trident\/7\./)
};
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
my = Object.assign(my, {
	lastReceivedWhisper: '',
	team: 0,
	gameName: 'Earth Alpha',
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
				url: g.url + 'php/exitGame.php',
				data: {
					view: g.view
				}
			}).always(function(){
				location.reload();
			});
		}
	}
});
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
					modal.footer(e) +
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
		if (e.key === 'unlock-game'){
            payment.init();
		}
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
			deleteCharacter: '<div id="modal-header">Delete '+ create.name +'?</div>',
			unlockGame: '<div id="modal-header">$5 to purchase Nevergrind 2?</div>',
		}
		return z[e.camelKey];
	},
	body: function(e){
		var z = {
			deleteCharacter:
			'<div id="modal-body">'+
				'<p>Are you sure you want to delete this character?</p>'+
			'</div>',
			unlockGame:
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
			'</div>'
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
	name: '',
	initialized: false,
	chat: function(data){
		while (DOM.chatContent.childNodes.length > 10) {
			DOM.chatContent.removeChild(DOM.chatContent.firstChild);
		}
		var z = document.createElement('div');
		if (data.type){
			z.className = data.type;
		}
		z.innerHTML = data.message;
		DOM.chatContent.appendChild(z);
		setTimeout(function(){
			if (z !== undefined){
				if (z.parentNode !== null){
					TweenMax.to(z, ui.delay(.125), {
						alpha: 0,
						onComplete: function(){
							if (z.parentNode !== null){
								z.parentNode.removeChild(z);
							}
						}
					});
				}
			}
		}, 12000);
	},
	getGameState: function(){
		// use as a reality check in case zmq messes up 
		// or to init game state?
		// or check that players are still online?
		$.ajax({
			type: 'GET',
			url: g.url + 'php/getGameState.php'
		}).done(function(data){
			console.info('getGameState ', data);
			// get tile data
		}).fail(function(data){
			console.info(data.responseText);
		});
	}
};
// title.js
var title = {
	players: [],
	games: [],
	getLeaderboard: function(type){
		var e = document.getElementById('leaderboardBody');
		e.innerHTML = '';
		g.lock();
		$.ajax({
			url: g.url + 'php/leaderboard.php',
			data: {
				type: type
			}
		}).done(function(data) {
			e.innerHTML = data.str;
			g.unlock();
		});
	},
	refreshTimer: 0,
	refreshGames: function(){
		if (Date.now() - title.refreshTimer > 5000){
			title.refreshTimer = Date.now();
			$.ajax({
				type: 'GET',
				url: g.url + 'php/refreshGames.php'
			}).done(function(data) {
				//console.info(data);
				var e = document.getElementById('gameTableBody');
				if (e === null){
					return;
				}
				// head
				var str = '';
				// body
				for (var i=0, len=data.length; i<len; i++){
					var d = data[i];
					title.games[d.id] = d.players * 1;
					str += 
					"<tr id='game_"+ d.id +"' class='wars wars-"+ d.gameMode +" no-select' data-name='" + d.name + "'>\
						<td class='warCells'>"+ d.name + "</td>\
						<td class='warCells'>" + d.map + "</td>\
						<td class='warCells'>" + d.speed + "</td>\
						<td class='warCells'>" + d.gameMode + "</td>\
					</tr>";
					
				}
				e.innerHTML = str;
			}).fail(function(e){
				console.info(e.responseText);
				//Msg("Server error.");
			});
		}
	},
	init: (function(){
		$(document).ready(function(){
			// console.info("Initializing title screen...");
			// prevents auto scroll while scrolling
			$("#titleChatLog").on('mousedown', function(){
				title.chatDrag = true;
			}).on('mouseup', function(){
				title.chatDrag = false;
			});
			$("#title-chat-input").on('focus', function(){
				title.chatOn = true;
			}).on('blur', function(){
				title.chatOn = false;
			});
			$(".createGameInput").on('focus', function(){
				title.createGameFocus = true;
			}).on('blur', function(){
				title.createGameFocus = false;
			});
			$("#titleChatSend").on(env.click, function(){
				title.sendMsg(true);
			});
			g.initGame();
			setTimeout(function(){
				g.keepAlive();
			}, 180000);
			// init events
			var x = env.click;
			g.events(x);
			create.events(x);
			audio.events();
		});
	})(),
	updatePlayers: function(once){
		title.titleUpdate = $("#titleChatPlayers").length; // player is logged in
		if (title.titleUpdate){
			// title chat loop
			(function repeat(){
				if (g.view === 'title'){
					$.ajax({
						type: "POST",
						url: g.url + 'php/titleUpdate.php',
						data: {
							channel: my.channel
						}
					}).done(function(data){
						// set title players
						if (g.view === 'title'){
							if (data.playerData !== undefined){
								var p = data.playerData,
									foundPlayers = [];
								for (var i=0, len=p.length; i<len; i++){
									// add new players
									var account = p[i].account,
										flag = p[i].flag,
										rating = p[i].rating;
									if (title.players[account] === undefined){
										//console.info("ADDING PLAYER: ", p[i]);
										title.addPlayer(account, flag, rating);
									} else if (title.players[account].flag !== flag){
										// replace player flag
										var flagElement = document.getElementById("titlePlayerFlag_" + account);
										if (flagElement !== null){
											var flagClass = flag.split(".");
											flagElement.className = 'flag ' + flagClass[0].replace(/ /g, "-");
										}
									}
									foundPlayers.push(account);
								}
								// remove missing players
								for (var key in title.players){
									if (foundPlayers.indexOf(key) === -1){
										var x = {
											account: key
										}
										// console.info("REMOVING PLAYER: " + x.account);
										title.removePlayer(x);
									}
								}
							}
							document.getElementById('titleChatHeaderCount').textContent = len !== undefined ? '('+len+')' : '';
							// game data sanity check
							var serverGames = [];
							if (data.gameData !== undefined){
								var p = data.gameData;
								for (var i=0, len=p.length; i<len; i++){
									serverGames[p[i].id] = {
										players: p[i].players * 1,
										max: p[i].max * 1
									}
								}
							}
							// remove games if they're not found in server games
							title.games.forEach(function(e, ind){
								// console.info(serverGames[ind]);
								if (serverGames[ind] === undefined){
									// game timed out, not found
									var o = {
										id: ind
									}
									console.info("REMOVING: ", o);
									title.removeGame(o);
								} else {
									// found game
									if (serverGames[ind].players !== title.games[ind]){
										// player count does not match... fixing
										// console.info("PLAYER COUNT WRONG!");
										var o = {
											id: ind,
											players: serverGames[ind].players,
											max: serverGames[ind].max
										}
										title.setToGame(o);
									}
								}
							});
						}
					}).always(function(){
						if (!once){
							setTimeout(repeat, 5000);
						}
					});
				}
			})();
		} else {
			// not logged in
			$("#titleChat, #titleMenu").remove();
		}
	},
	// adds player to chat room
	addPlayer: function(account, flag, rating){
		title.players[account] = {
			flag: flag
		}
		var e = document.getElementById('titlePlayer' + account);
		if (e !== null){
			e.parentNode.removeChild(e);
		}
		var e = document.createElement('div');
		e.className = "titlePlayer";
		e.id = "titlePlayer" + account;
		var flagClass = flag.split(".");
		flagClass = flagClass[0].replace(/ /g, "-");
		e.innerHTML = '<div id="titlePlayerFlag_'+ account +'" class="flag ' + flagClass +'"></div><span class="chat-rating">['+ rating +']</span> <span class="titlePlayerAccount">'+ account +'</span>';
		if (title.titleUpdate){
			DOM.titleChatBody.appendChild(e);
		}
	},
	removePlayer: function(data){
		// fix this
		delete title.players[data.account];
		var z = document.getElementById('titlePlayer' + data.account);
		if (z !== null){
			z.parentNode.removeChild(z);
		}
	},
	updateGame: function(data){
		if (data.type === 'addToGame'){
			title.addToGame(data);
		} else if (data.type === 'removeFromGame'){
			title.removeFromGame(data);
		} else if (data.type === 'addGame'){
			title.addGame(data);
		} else if (data.type === 'removeGame'){
			title.removeGame(data);
		}
	},
	updatePlayerText: function(id){
		var e = document.getElementById('game_players_' + id);
		if (e !== null){
			e.textContent = title.games[id];
		}
	},
	setToGame: function(data){
		// refreshGames corrects player values
		// console.info("setToGame", data);
		var id = data.id;
		title.games[id] = data.players;
		// title.updatePlayerText(id);
	},
	addToGame: function(data){
		// player joined or left
		//console.info("addToGame", data);
		var id = data.id;
		if (title.games[id] !== undefined){
			if (title.games[id] + 1 > data.max){
				title.games[id] = data.max;
			} else {
				title.games[id]++;
			}
		} else {
			title.games[id] = 1;
		}
		//title.updatePlayerText(id);
	},
	removeFromGame: function(data){
		// player joined or left
		//console.info("removeFromGame", data);
		var id = data.id;
		if (title.games[id] !== undefined){
			if (title.games[id] - 1 < 1){
				title.games[id] = 1;
			} else {
				title.games[id]--;
			}
		} else {
			title.games[id] = 1;
		}
		//title.updatePlayerText(id);
	},
	addGame: function(data){
		// created game
		// console.info("addGame", data);
		title.games[data.id] = 1;
		var e = document.createElement('tr'),
			gameMode = data.gameMode === 'Ranked' ? 'Ranked' : data.gameMode === 'Team' ? 'Team' : 'FFA';
		e.id = 'game_' + data.id;
		e.className = 'wars wars-'+ gameMode +' no-select';
		e.setAttribute('data-name', data.name);
		e.innerHTML = 
			"<td class='warCells'>"+ data.name + "</td>\
			<td class='warCells'>" + data.map + "</td>\
			<td class='warCells'>" + data.speed + "</td>\
			<td class='warCells'>" + gameMode + "</td>";
		DOM.gameTableBody.insertBefore(e, DOM.gameTableBody.childNodes[0]);
	},
	removeGame: function(data){
		// game countdown started or exited
		// console.info("removeGame", data);
		delete title.games[data.id];
		var e = document.getElementById('game_' + data.id);
		if (e !== null){
			e.parentNode.removeChild(e);
		}
	},
	showBackdrop: function(e){
		TweenMax.to('#title-backdrop', env.delay(.3), {
			startAt: {
				visibility: 'visible',
				alpha: 0
			},
			alpha: 1,
			onComplete: function(){
				if (e !== undefined){
					e.focus();
				}
			}
		});
		g.isModalOpen = true;
	},
	closeModal: function(){
		TweenMax.set('.title-modals, #title-backdrop', {
			alpha: 0,
			visibility: 'hidden'
		});
		g.isModalOpen = false;
	},
	createGameFocus: false,
	createGame: function(){
		var name = $("#gameName").val(),
			pw = $("#gamePassword").val(),
			max = $("#gamePlayers").val() * 1,
			speed = g.speed;
			
		if (!g.rankedMode && (name.length < 4 || name.length > 32)){
			Msg("Game name must be at least 4-32 characters.", 1);
			setTimeout(function(){
				$("#gameName").focus().select();
			}, 100);
		} else if (!g.rankedMode && (max < 2 || max > 8 || max % 1 !== 0)){
			Msg("Game must have 2-8 players.", 1);
		} else {
			title.createGameService(name, pw, title.mapData[g.map.key].name, max, g.rankedMode, g.teamMode, speed);
		}
	},
	createGameService: function(name, pw, map, max, rankedMode, teamMode, speed){
		g.lock(1);
		audio.play('click');
		g.rankedMode = rankedMode;
		g.teamMode = teamMode;
		g.speed = speed;
		$.ajax({
			url: g.url + 'php/createGame.php',
			data: {
				name: name,
				pw: pw,
				map: map,
				max: max,
				rating: rankedMode,
				teamMode: teamMode,
				speed: speed
			}
		}).done(function(data) {
			socket.removePlayer(my.account);
			my.player = data.player;
			my.playerColor = data.playerColor;
			my.team = data.team;
			game.id = data.gameId;
			game.name = data.gameName;
			// console.info("Creating: ", data);
			lobby.init(data);
			lobby.join(); // create
			socket.joinGame();
			lobby.styleStartGame();
		}).fail(function(e){
			Msg(e.statusText);
			g.unlock(1);
		});
	},
	joinGame: function(){
		g.name = $("#joinGame").val();
		if (!g.name){
			Msg("Game name is not valid!", 1.5);
			$("#joinGame").focus().select();
			return;
		}
		g.password = $("#joinGamePassword").val();
		g.lock();
		audio.play('click');
		$.ajax({
			url: g.url + 'php/joinGame.php',
			data: {
				name: g.name,
				password: g.password
			}
		}).done(function(data){
			title.joinGameCallback(data);
		}).fail(function(data){
			console.info(data);
			Msg(data.statusText, 1.5);
		}).always(function(){
			g.unlock();
		});
	},
	joinGameCallback: function(data){
		socket.removePlayer(my.account);
		// console.info(data);
		my.player = data.player;
		my.playerColor = data.player;
		g.teamMode = data.teamMode;
		g.rankedMode = data.rankedMode;
		my.team = data.team;
		game.id = data.id;
		game.name = data.gameName;
		g.map = data.mapData;
		g.speed = data.speed;
		lobby.init(data);
		lobby.join(); // normal join
		//$("#titleMenu, #titleChat").remove();
		socket.joinGame();
	}
};
$(document).on('keydown', function(e){
	var x = e.keyCode;
	if (e.ctrlKey){
		if (x === 82){
			// ctrl+r refresh
			return false;
		}
	} else {
		if (g.view === 'title'){
			if (!g.isModalOpen){
				$("#title-chat-input").focus();
			}
		} else if (g.view === 'lobby'){
			$("#lobby-chat-input").focus();
		} else {
			// game
			if (x === 9){
				// tab
				if (!e.shiftKey){
					my.nextTarget(false);
				} else {
					my.nextTarget(true);
				}
				e.preventDefault();
			} else if (x === 86){
				// v
				if (g.view === 'game' && !g.chatOn){
					game.toggleGameWindows(1);
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
	} else if (g.view === 'lobby'){
		if (lobby.chatOn){
			if (x === 13){
				// enter - sends chat
				lobby.sendMsg();
			}
		}
	// game hotkeys
	} else if (g.view === 'game'){
		if (g.chatOn){
			if (x === 13){
				// enter/esc - sends chat
				toggleChatMode(true);
			} else if (x === 27){
				// esc
				toggleChatMode();
			}
		} else {
			if (x === 13){
				// enter
				toggleChatMode();
			}  else if (x === 27){
				// esc
				my.attackOn = false;
				my.attackName = '';
				my.clearHud();
				env.showTarget(DOM['land' + my.tgt]); 
				//console.clear();
			} else if (x === 65){
				// a
				var o = new Target();
				action.target(o);
			} else if (x === 83){
				// s
				var o = new Target({
					cost: 1, 
					attackName: 'splitAttack',
					hudMsg: 'Split Attack: Select Target',
					splitAttack: true
				});
				console.info(o.cost);
				action.target(o);
			} else if (x === 68){
				// d
				if (!g.keyLock){
					action.deploy();
				}
			} else if (x === 82){
				// r
				if (!g.keyLock){
					if (e.ctrlKey){
						var x = my.lastReceivedWhisper;
						if (x){
							if (g.view === 'title'){
								$("#title-chat-input").val('/w ' + x + ' ').focus();
							} else if (g.view === 'lobby'){
								$("#lobby-chat-input").val('/w ' + x + ' ').focus();
							} else {
								if (!g.chatOn){
									toggleChatMode();
								}
								$("#chat-input").val('/w ' + x + ' ').focus();
							}
						}
						return false;
					} else {
						action.rush();
					}
				}
			} else if (x === 89){
				// y
				research.masonry();
			} else if (x === 79){
				// o
				research.construction();
			} else if (x === 69){
				// e
				research.engineering();
			} else if (x === 71){
				// g
				research.gunpowder();
			} else if (x === 75){
				// k
				research.rocketry();
			} else if (x === 84){
				// t
				research.atomicTheory();
			} else if (x === 70){
				// f
				research.futureTech();
			} else if (x === 66){
				// b
				action.upgradeTileDefense();
			} else if (x === 67){
				// c
				var o = new Target({
					cost: 0,
					minimum: 0,
					attackName: 'cannons',
					hudMsg: 'Fire Cannons'
				});
				action.target(o);
			} else if (x === 77){
				// m
				var o = new Target({
					cost: 0,
					minimum: 0,
					attackName: 'missile',
					hudMsg: 'Launch Missile'
				});
				action.target(o);
			} else if (x === 78){
				// n
				var o = new Target({
					cost: 0,
					minimum: 0,
					attackName: 'nuke',
					hudMsg: 'Launch Nuclear Weapon'
				});
				action.target(o);
			}
		}
	}
});
// ws.js
var socket = {
	initialConnection: true,
	removePlayer: function(account){
		// instant update of clients
		var o = {
			type: 'remove',
			account: my.account
		}
		// removes id
		socket.zmq.publish('title:' + my.channel, o);
		delete title.players[account];
	},
	addPlayer: function(account, flag){
		// instant update of clients
		var o = {
			type: 'add',
			account: my.account,
			flag: my.flag,
			rating: my.rating
		}
		socket.zmq.publish('title:' + my.channel, o);
		title.players[account] = {
			flag: flag
		}
	},
	unsubscribe: function(channel){
		try {
			socket.zmq.unsubscribe(channel);
		} catch(err){
			console.info(err);
		}
	},
	setChannel: function(channel){
		// change channel on title screen
		if (g.view === 'title'){
			// remove from channel
			channel = chat.channel.trim();
			if (channel !== my.channel){
				$.ajax({
					type: "POST",
					url: g.url + 'php/titleChangeChannel.php',
					data: {
						channel: channel
					}
				}).done(function(data){
					console.info("You have changed channel to: ", data.channel);
					// removes id
					socket.removePlayer(my.account);
					// unsubs
					my.channel && socket.unsubscribe('title:' + my.channel);
					// set new channel data
					my.channel = data.channel;
					for (var key in title.players){
						delete title.players[key];
					}
					data.skip = true;
					data.message = "You have joined channel: " + data.channel;
					data.type = "chat-warning";
					chat.send(data);
					socket.zmq.subscribe('title:' + data.channel, function(topic, data) {
						console.info("Receiving data! ", topic, data);
						if (g.ignore.indexOf(data.account) === -1){
							chat.send(data);
						}
					});
					// add id
					socket.addPlayer(my.account, my.flag);
					// update display of channel
					if (g.view === 'title'){
						//document.getElementById('titleChatHeaderChannel').textContent = data.channel;
						//document.getElementById('titleChatBody').innerHTML = '';
					}
					//chat.updatePlayers(0);
					location.hash = my.channel;
				});
			}
		}
	},
	enableWhisper: function(){
		var channel = 'account:' + my.account;
		socket.zmq.subscribe(channel, function(topic, data) {
			if (data.message){
				if (data.action === 'send'){
					//console.info("SENT: ", data.playerColor, data);
					// message sent to user
					var flag = my.flag.split(".");
					flag = flag[0].replace(/ /g, "-");
					my.lastReceivedWhisper = data.account;
					$.ajax({
						url: g.url + 'php/insertWhisper.php',
						data: {
							action: "receive",
							flag: data.flag,
							playerColor: data.playerColor,
							account: data.account,
							message: data.message
						}
					});
					data.type = 'chat-whisper';
					data.msg = data.message;
					data.message = data.chatFlag + data.account + ' whispers: ' + data.message;
					chat.send(data);
				} else {
					// message receive confirmation to original sender
					// console.info("CALLBACK: ", data);
					if (data.timestamp - chat.lastWhisper.timestamp < 500 &&
						data.account === chat.lastWhisper.account &&
						data.message === chat.lastWhisper.message){
						// skip message
					} else {
						// reference values to avoid receiving double messages when a player is in the lobby multiple times
						// this causes multiple response callbacks
						chat.lastWhisper.account = data.account;
						chat.lastWhisper.timestamp = data.timestamp;
						chat.lastWhisper.message = data.message;
						// send message
						data.msg = data.message;
						data.message = data.chatFlag + 'To ' + data.account + ': ' + data.message;
						data.type = 'chat-whisper';
						chat.receiveWhisper(data);
					}
				}
			}
		});
		if (location.host !== 'localhost'){
			setInterval(console.clear, 600000); // 10 min
		}
		(function keepAliveWs(){
			socket.zmq.publish('admin:broadcast', {});
			setTimeout(keepAliveWs, 20000);
		})();
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
	enabled: false,
	init: function(){
		// is player logged in?
		socket.zmq = new ab.Session('wss://' + g.socketUrl + '/wss2/', function(){
			// on open
			socket.connectionSuccess();
		}, function(){
			// on close/fail
			socket.reconnect();
		}, {
			// options
			'skipSubprotocolCheck': true
		});
	},
	connectionSuccess: function(){
		socket.enabled = true;
		console.info("Socket connection established with server");
		// chat updates
		if (g.view === 'title'){
			if (socket.initialConnection){
				socket.zmq.subscribe('title:refreshGames', function(topic, data) {
					title.updateGame(data);
				});
				socket.zmq.subscribe('admin:broadcast', function(topic, data) {
					if (data.msg){
						g.chat(data.msg, data.type);
					}
				});
				(function repeat(){
					if (my.account){
						socket.enableWhisper();
					} else {
						setTimeout(repeat, 200);
					}
				})();
			}
			socket.initialConnection = false;
			//document.getElementById('titleChatHeaderChannel').innerHTML = my.channel;
			socket.setChannel(chat.initChannel);
		}
		if (g.view === 'game'){
			game.getGameState();
		}
	},
	connectionTries: 0,
	connectionRetryDuration: 100,
	reconnect: function(){
		console.warn('WebSocket connection failed. Retrying...');
		socket.enabled = false;
		setTimeout(socket.init, socket.connectionRetryDuration);
	}
}
socket.init();
// chat.js
chat = Object.assign(chat, {
	// receives channel prop from index.php
	players: [],
	lastWhisper: {
		timestamp: Date.now(),
		account: '',
		message: ''
	},
	// to server
	sendWhisper: function(msg, splitter){
		// account
		var arr = msg.split(splitter);
		var account = arr[1].split(" ").shift();
		// message
		var splitLen = splitter.length;
		var accountLen = account.length;
		var msg = msg.substr(splitLen + accountLen + 1);
		var flag = my.flag.split(".");
		flag = flag[0].replace(/ /g, "-");
		$.ajax({
			url: g.url + 'php/insertWhisper.php',
			data: {
				account: account,
				flag: flag,
				playerColor: my.playerColor,
				message: msg,
				action: 'send'
			}
		});
	},
	// send to server
	sendMsg: function(bypass){
		var msg = $dom.chatInput.val().trim();
		// bypass via ENTER or chat has focus
		if (bypass || title.chatOn){
			if (msg){
				// is it a command?
				if (msg === '/friend'){
					chat.listFriends();
				} else if (msg.indexOf('/friend ') === 0){
					chat.toggleFriend(msg.slice(8));
				} else if (msg.indexOf('/unignore ') === 0){
					var account = msg.slice(10);
					chat.removeIgnore(account);
				} else if (msg === '/ignore'){
					chat.listIgnore();
				} else if (msg.indexOf('/ignore ') === 0){
					var account = msg.slice(8);
					chat.addIgnore(account);
				} else if (msg.indexOf('/join ') === 0){
					chat.changeChannel(msg, '/join ');
				} else if (msg.indexOf('#') === 0){
					chat.changeChannel(msg, '#');
				} else if (msg.indexOf('/j ') === 0){
					chat.changeChannel(msg, '/j ');
				} else if (msg.indexOf('/whisper ') === 0){
					chat.sendWhisper(msg , '/whisper ');
				} else if (msg.indexOf('/w ') === 0){
					chat.sendWhisper(msg , '/w ');
				} else if (msg.indexOf('@') === 0){
					chat.sendWhisper(msg , '@');
				} else if (msg.indexOf('/who ') === 0){
					chat.who(msg);
				} else if (msg.indexOf('/broadcast ') === 0){
					chat.broadcast(msg);
				} else if (msg.indexOf('/url ') === 0){
					chat.url(msg);
				} else if (msg.indexOf('/img ') === 0){
					chat.img(msg);
				} else if (msg.indexOf('/video ') === 0){
					chat.video(msg);
				} else if (msg.indexOf('/fw-paid ') === 0){
					var account = msg.slice(8);
					chat.fwpaid(account);
				} else {
					if (msg.charAt(0) === '/' && msg.indexOf('/me') !== 0 || msg === '/me'){
						// skip
					} else {
						$.ajax({
							url: g.url + 'php/insertTitleChat.php',
							data: {
								message: msg
							}
						});
					}
				}
			}
			dom.chatInput.val('');
		}
	},
	// report to client
	send: function(msg, type){
		var o = {
			message: msg,
			type: type
		};
		if (o.message && dom.chatLog !== null){
			while (dom.chatLog.childNodes.length > 500) {
				dom.chatLog.removeChild(dom.chatLog.firstChild);
			}
			if (o.type === 'inserted-image'){
				(function repeat(count){
					if (++count < 10){
						chat.scrollBottom();
						setTimeout(repeat, 200, count);
					}
				})(0);
			}
			var z = document.createElement('div'); 
			if (o.type){
				z.className = o.type;
			}
			z.innerHTML = o.message;
			dom.chatLog.appendChild(z);
			chat.scrollBottom();
			if (o.notify){
				g.sendNotification(data);
			}
		}
	},
	// routing
	chatReceive: function(data){
		if (g.view === 'title'){
			// title
			if (data.type === 'remove'){
				title.removePlayer(data);
			} else if (data.type === 'add'){
				title.addPlayer(data.account, data.flag, data.rating);
			} else {
				if (data.message !== undefined){
					title.chat(data);
				}
			}
		} else if (g.view === 'lobby'){
			// lobby
			//console.info('lobby receive: ', data);
			if (data.type === 'hostLeft'){
				lobby.hostLeft();
			} else if (data.type === 'lobby-set-cpu-difficulty'){
				lobby.updateDifficulty(data);
			} else if (data.type === 'updateGovernment'){
				lobby.updateGovernment(data);
			} else if (data.type === 'updatePlayerColor'){
				lobby.updatePlayerColor(data);
			} else if (data.type === 'updateTeamNumber'){
				lobby.updateTeamNumber(data);
			} else if (data.type === 'countdown'){
				lobby.countdown(data);
			} else if (data.type === 'updateLobbyPlayer'){
				lobby.updatePlayer(data);
			} else if (data.type === 'updateLobbyCPU'){
				lobby.updateCPU(data);
			} else {
				if (data.message !== undefined){
					lobby.chat(data);
				}
			}
		} else {
			// game
			// console.info('game receive: ', data);
			if (data.type === 'cannons'){
				animate.cannons(data.attackerTile, data.tile, false);
				game.updateTile(data);
			} else if (data.type === 'missile'){
				animate.missile(data.attacker, data.defender, true);
			} else if (data.type === 'nuke'){
				setTimeout(function(){
					animate.nuke(data.tile, data.attacker);
				}, 5000);
			} else if (data.type === 'nukeHit'){
				game.updateTile(data);
				game.updateDefense(data);
			} else if (data.type === 'gunfire'){
				// defender tile update
				animate.gunfire(data.attackerTile, data.tile, data.player === my.player || data.playerB === my.player); 
				animate.cannons(data.attackerTile, data.tile, false, 0, .175, 10);  
				game.updateTile(data);
				if (data.rewardUnits){
					animate.upgrade(data.tile, 'troops', data.rewardUnits);
				}
			} else if (data.type === 'updateTile'){
				// attacker tile update 
				game.updateTile(data);
				game.setSumValues();
				if (data.rewardUnits){
					animate.upgrade(data.tile, 'troops', data.rewardUnits);
				}
				if (data.sfx === 'sniper0'){
					animate.upgrade(data.tile, 'culture');
				}
			} else if (data.type === 'food'){
				if (data.account.indexOf(my.account) > -1){
					audio.play('hup2');
				}
			} else if (data.type === 'upgrade'){
				// fetch updated tile defense data
				game.updateDefense(data);
				animate.upgrade(data.tile, 'shield');
			} else if (data.type === 'eliminated'){
				game.eliminatePlayer(data);
			} else if (data.type === 'endTurnCheck'){
				game.triggerNextTurn(data);
			} else if (data.type === 'disconnect'){
				game.eliminatePlayer(data);
			}
			
			if (data.message){
				if (data.type === 'gunfire'){
					// ? when I'm attacked?
					if (data.defender === my.account){
						// display msg?
						game.chat(data);
					}
					// lost attack
				} else {
					game.chat(data);
				}
			}
			if (data.sfx){
				audio.play(data.sfx);
			}
		}
	},
	changeChannel: function(msg, splitter){
		var arr = msg.split(splitter);
		socket.setChannel(arr[1]);
	},
	chatDrag: false,
	chatOn: false,
	scrollBottom: function(){
		if (!title.chatDrag){
			dom.chatLog.scrollTop = dom.chatLog.scrollHeight;
		}
	},
	chat: function (data){
		if (g.view === 'title' && data.message){
			while (dom.chatLog.childNodes.length > 500) {
				dom.chatLog.removeChild(dom.chatLog.firstChild);
			}
			if (data.type === 'inserted-image'){
				(function repeat(count){
					if (++count < 10){
						chat.scrollBottom();
						setTimeout(repeat, 200, count);
					}
				})(0);
			}
			var z = document.createElement('div'); 
			if (data.type){
				z.className = data.type;
			}
			z.innerHTML = data.message;
			dom.chatLog.appendChild(z);
			chat.scrollBottom();
			if (!data.skip){
				g.sendNotification(data);
			}
		}
	},
	listFriends: function(){
		var len = g.friends.length;
		g.chat('<div>Checking friends list...</div>');
		if (g.friends.length){
			$.ajax({
				url: g.url + 'php/friendStatus.php',
				data: {
					friends: g.friends
				}
			}).done(function(data){
				var str = '<div>Friend List ('+ len +')</div>';
				for (var i=0; i<len; i++){
					var index = data.players.indexOf(g.friends[i]);
					if (index > -1){
						// online
						str += '<div><span class="chat-online titlePlayerAccount">' + g.friends[i] + '</span>';
						if (typeof data.locations[index] === 'number'){
							str += ' playing in game: ' + data.locations[index];
						} else {
							str += ' in chat channel: ';
							if (g.view === 'title'){
								// enable clicking to change channel
								str += '<span class="chat-online chat-join">' + data.locations[index] + '</span>';
							} else {
								// not in a game ?
								str += data.locations[index];
							}
						}
						
						str += '</div>';
					} else {
						// offline
						str += '<div><span class="chat-muted titlePlayerAccount">' + g.friends[i] +'</span></div>';
					}
				}
				g.chat(str);
			});
		} else {
			g.chat("<div>You don't have any friends! Use /friend account to add a new friend.</div>", 'chat-muted');
		}
	},
	friendGet: function(){
		// friend list
		g.friends = [];
		$.ajax({
			type: 'GET',
			url: g.url + 'php/friendGet.php',
		}).done(function(data){
			data.friends.forEach(function(friend){
				g.friends.push(friend);
			});
		});
	},
	toggleFriend: function(account){
		account = account.trim();
		if (account !== my.account){
			console.info('toggle: ', account, account.length);
			$.ajax({
				url: g.url + 'php/friendToggle.php',
				data: {
					account: account
				}
			}).done(function(data){
				if (data.action === 'fail'){
					g.chat('You cannot have more than 20 friends!');
				} else if (data.action === 'remove'){
					g.chat('Removed '+ account +' from your friend list');
					chat.friendGet();
				} else if (data.action === 'add'){
					g.chat('Added '+ account +' to your friend list');
					chat.friendGet();
				}
			});
		} else {
			// cannot add yourself
			g.chat("You can't be friends with yourself!", 'chat-muted');
		}
	},
	listIgnore: function(){
		var len = g.ignore.length;
		var str = '<div>Ignore List ('+ len +')</div>';
		for (var i=0; i<len; i++){
			str += '<div><span class="chat-muted titlePlayerAccount">' + g.ignore[i] +'</span></div>';
		}
		g.chat(str);
	},
	addIgnore: function(account){
		account = account.trim();
		g.chat('<div>Ignoring '+ account +'</div>');
		if (g.ignore.indexOf(account) === -1 && account){
			if (g.ignore.length < 20){
				if (account !== my.account){
					g.ignore.push(account);
					localStorage.setItem('ignore', JSON.stringify(g.ignore));
					g.chat('Now ignoring account: ' + account, 'chat-muted');
				} else {
					g.chat("<div>You can't ignore yourself!</div><img src='images/chat/random/autism.jpg'>", 'chat-muted');
				}
			} else {
				g.chat('You cannot ignore more than 20 accounts!', 'chat-muted');
			}
		} else {
			g.chat('Already ignoring ' + account +'!', 'chat-muted');
		}
	},
	removeIgnore: function(account){
		account = account.trim();
		g.chat('<div>Unignoring '+ account +'</div>');
		if (g.ignore.indexOf(account) > -1 && account){
			// found account
			var index = g.ignore.indexOf(account);
			g.ignore.splice(index, 1);
			localStorage.setItem('ignore', JSON.stringify(g.ignore));
			g.chat('Stopped ignoring account: ' + account, 'chat-muted');
		} else {
			g.chat(account + ' is not on your ignore list.', 'chat-muted');
		}
	},
	who: function(msg){
		var a = msg.split("/who ");
		$.ajax({
			url: g.url + 'php/whoUser.php',
			data: {
				account: a[1]
			}
		}).done(function(data){
			function getRibbonStr(){
				var str = '';
				if (data.ribbons !== undefined){
					var len = data.ribbons.length;
					if (len){
						str += '<div class="who-ribbon-chat '+ (len >= 24 ? 'wideRack' : 'narrowRack') +'">';
						for (var i=0, len=data.ribbons.length; i<len; i++){
							var z = data.ribbons[i];
							str += '<div class="pointer ribbon ribbon'+ z +'" title="'+ game.ribbonTitle[z] +'" data-ribbon="'+ z +'"></div>';
						}
						str += '</div>';
					}
				}
				return str;
			}
			
			var str = 
			'<div class="row who-wrap">'+
				'<div class="col-xs-8">';
				// left col
				str += data.str;
				if (data.account !== my.account && g.friends.indexOf(data.account) === -1){
					str += '<button style="pointer-events: initial" class="addFriend btn btn-xs fwBlue" data-account="'+ data.account +'">Add Friend</button>';
				}
			str += 
				'</div>'+
				'<div class="col-xs-4">';
				// right col
				str += 
					'<div class="who-avatar-wrap">'+
						data.img +
						'<div class="who-ribbon-wrap">'+
							getRibbonStr()+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>';
			g.chat(str);
		}).fail(function(){
			g.chat('No data found.');
		});
	},
	help: function(){
		var str = 
			'<h5 class="chat-warning">Chat Commands:</h5>\
			<div>#channel: join channel</div>\
			<div>@account: whisper user</div>\
			<div>/ignore account: ignore account</div>\
			<div>/unignore account: stop ignoring account</div>\
			<div>/friend account: add/remove friend</div>\
			<div>/who account: check account info (or click account name)</div>\
			<h5 class="chat-warning">Title screen lobbies only:</h5>\
			<div>/url url: share URL</div>\
			<div>/img url: share image</div>\
			<div>/video youtube_url: share video</div>\
			';
		var o = {
			message: str,
			type: 'chat-muted'
		};
		title.chat(o);
	},
	broadcast: function(msg){
		$.ajax({
			url: g.url + 'php/insertBroadcast.php',
			data: {
				message: msg
			}
		});
	},
	url: function(url){
		$.ajax({
			url: g.url + 'php/insertUrl.php',
			data: {
				url: url
			}
		});
	},
	img: function(url){
		$.ajax({
			url: g.url + 'php/insertImg.php',
			data: {
				url: url
			}
		});
	},
	video: function(url){
		$.ajax({
			url: g.url + 'php/insertVideo.php',
			data: {
				url: url
			}
		});
	},
	fwpaid: function(msg){
		$.ajax({
			url: g.url + 'php/fwpaid.php',
			data: {
				message: msg
			}
		});
	}
});
var payment = {
    init: function(){
        if (location.host==="localhost"){
            Stripe.setPublishableKey('pk_test_GtNfTRB1vYUiMv1GY2kSSRRh');
        }
        else {
            Stripe.setPublishableKey('pk_live_rPSfoOYjUrmJyQYLnYJw71Zm');
        }
        $("#unlock-game-confirm").on(env.click, function(){
            payment.send();
        })
    },
    error: function(msg){
        $("#modal-error").text(msg);
        g.unlock();
    },
    send: function(){
        var f = {
            ccNum: $('#card-number').val(),
            cvcNum: $('#card-cvc').val(),
            expMonth: $('#card-month').val(),
            expYear: $('#card-year').val()
        }
        var error = '';
        if (!Stripe.validateCardNumber(f.ccNum)) {
            // Validate the number:
            error = 'The credit card number appears to be invalid.';
        }
        else if (!Stripe.validateCVC(f.cvcNum)) {
            // Validate the CVC:
            error = 'The CVC number appears to be invalid.';
        }
        else if (!Stripe.validateExpiry(f.expMonth, f.expYear)) {
            // Validate the expiration:
            error = 'The expiration date appears to be invalid.';
        }
        if (error) {
            payment.error(error);
        }
        else {
            payment.createToken(f);
        }
    },
    createToken: function(d){
        Stripe.createToken({
            number: d.ccNum,
            cvc: d.cvcNum,
            exp_month: d.expMonth,
            exp_year: d.expYear
        }, payment.stripeResponseHandler);
        payment.error('');
    },
    stripeResponseHandler: function(status, response){
        if (response.error) {
            payment.error(response.error.message);
        } else {
            // submit the form
            g.lock();
            g.msg("Communicating with the server...");
            $.ajax({
                url: g.url + 'php2/payment/unlockGame.php',
                data: {
                    stripeToken: response.id
                }
            }).done(function(data) {
                g.msg("You have unlocked the full game: Nevergrind 2<br>Thanks for your support!");
                console.info(data);
                modal.hide();
            }).fail(function(r) {
                g.msg(r.responseText, 8);
            }).always(function(){
                g.unlock();
            });
        }
    }
};
// test methods
var mob = {
	test: 1,
	images: {
		'balrog': {
			w: 2000,
			h: 1200,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .05,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'ice-golem': {
			w: 1200,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'stone-golem': {
			w: 1200,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'clay-golem': {
			w: 1200,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'treant': {
			w: 1300,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .05,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'spider': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'wolf': {
			w: 900,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'rat': {
			w: 1100,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'snake': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'dragonkin': {
			w: 1300,
			h: 1300,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .055,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'lizardman': {
			w: 1100,
			h: 1000,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'dragon': {
			w: 3000,
			h: 1500,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .06,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'ghoul': {
			w: 900,
			h: 1000,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'mummy': {
			w: 800,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'skeleton': {
			w: 900,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'zombie': {
			w: 900,
			h: 1000,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'vampire': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'goblin': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'hobgoblin': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'kobold': {
			w: 1400,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'orc': {
			w: 1200,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .045,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'griffon': {
			w: 2000,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .05,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'harpy': {
			w: 1500,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .045,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'werewolf': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'centaur': {
			w: 1500,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .045,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'cerberus': {
			w: 1300,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'fungoid': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'gargoyle': {
			w: 1200,
			h: 1000,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'beetle': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'imp': {
			w: 1250,
			h: 1000,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'minotaur': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'aviak': {
			w: 1200,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'elephant': {
			w: 1300,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .05,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'lion': {
			w: 900,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'crocodile': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'rhino': {
			w: 1200,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .045,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'lioness': {
			w: 900,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'bear': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'toadlok': {
			w: 1200,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'giant': {
			w: 1400,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .05,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'ice-giant': {
			w: 1400,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .06,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'fire-giant': {
			w: 1400,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .06,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'spectre': {
			w: 1500,
			h: 1500,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .055,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'angler': {
			w: 1500,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .045,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'beholder': {
			w: 1200,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .05,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'unicorn': {
			w: 2000,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .055,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'scorpion': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .045,
			nameTop: 10,
			shadowBottom: 10,
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		}
		/* skipped mobs
		wyvern
		ogre
		troll
		chimera
		manticore
		automaton
		barghest
		basilisk
		black dragon
		crasc
		dark elf
		darkness warlord
		death skull
		dwarf
		halfling
		crab
		scropion
		gnome
		gorgon
		hippogryph
		kraken
		lacodon
		phoenix
		undertaker (weird)
		witch
		 */
	},
	imageKeys: 0,
	index: 0,
	cache: {},
	count: 0,
	preloadMob: function(type){
		if (!mob.images[type].cache.length) {
			console.info("preloading ", type);
			for (var i = 1; i < 105; i++) {
				mob.images[type].cache[i] = new Image();
				mob.images[type].cache[i].src = 'mobs/' + type + '/' + i + '.png';
			}
		}
	},
	initialized: 0,
	init: function(){
		if (!mob.initialized) {
			mob.initialized = 1;
			mob.imageKeys = Object.keys(mob.images);
			mob.index = mob.imageKeys.length - 1;
			var setMob = '';
			if (setMob) {
				var index = 0,
					i = 0;
				for (var key in mob.images){
					if (setMob === key){
						index = i;
					}
					i++;
				}
				mob.index = index;
			}
		}
		var size = .7;

		mob.lastKey = mob.imageKeys[Math.abs(mob.index-- % mob.imageKeys.length)];
		mob.preloadMob(mob.lastKey);
		var nextKey = mob.imageKeys[Math.abs(mob.index % mob.imageKeys.length)];
		mob.preloadMob(nextKey);
		var d = document.createElement('div'),
			bar = document.createElement('div'),
			health = document.createElement('div'),
			click = document.createElement('div'),
			img = document.createElement('img'),
			name = document.createElement('div');
		// div parent
		d.style.bottom = mob.images[mob.lastKey].yFloor + 'px';
		d.style.left = '50%';
		d.style.right = '0';
		d.style.margin = '0 auto';
		d.className = 'mob-wrap text-shadow';
		d.style.width = size * mob.images[mob.lastKey].w + 'px';
		d.style.height = size * mob.images[mob.lastKey].h + 'px';
		d.id = 'mob-parent';
		// bar
		bar.className = 'mob-bar';
		// health
		health.className = 'mob-health';
		// name
		name.className = 'mob-name';
		name.innerHTML = mob.lastKey.replace(/-/g, ' ');
		// click area
		click.className = 'mob-image-click';
		// img
		img.id = 'sprite';
		img.className = 'mob-image';
		img.style.width = size * mob.images[mob.lastKey].w + 'px';
		img.style.height = size * mob.images[mob.lastKey].h + 'px';
		d.appendChild(name);
		name.appendChild(bar);
		bar.appendChild(health);
		d.appendChild(img);
		d.appendChild(click);
		document.getElementById('title-scene').appendChild(d);
		mob.element = img;
		mob.idle();
	},
	element: {},
	animationActive: 0,
	frame: 1,
	setSrc: function(type, frame){
		frame = ~~(frame);
		if (frame !== mob.frame) {
			mob.element.src = 'mobs/' + type + '/' + frame + '.png';
			mob.frame = frame;
		}
	},
	resetIdle: function(){
		mob.animationActive = 0;
		mob.idle(1);
	},
	idle: function(skip){
		var startFrame = 1,
			endFrame = 6,
			diff = endFrame - startFrame;

		TweenMax.to(mob, mob.images[mob.lastKey].speed * diff * 2, {
			startAt: {
				frame: startFrame
			},
			frame: endFrame,
			yoyo: true,
			repeat: -1,
			repeatDelay: mob.images[mob.lastKey].speed,
			ease: Sine.easeOut,
			onUpdate: function(){
				mob.setSrc(mob.lastKey, mob.frame);
			}
		});
		if (skip) return;
		TweenMax.delayedCall(2, function(){
			mob.test && mob.hit();
		})
	},
	hit: function(){
		if (mob.animationActive) return;
		mob.animationActive = 1;
		var startFrame = 6,
			endFrame = 16,
			diff = endFrame - startFrame;
		TweenMax.to(mob, mob.images[mob.lastKey].speed * diff, {
			startAt: {
				frame: startFrame
			},
			overwrite: 1,
			frame: endFrame,
			ease: Linear.easeNone,
			yoyo: true,
			repeat: 1,
			onUpdate: function(){
				mob.setSrc(mob.lastKey, mob.frame);
			},
			onComplete: function(){
				mob.resetIdle();
				if (mob.test){
					TweenMax.delayedCall(1, function() {
						mob.attack(1);
					});
				}
			}
		});
	},
	attack: function(force){
		if (mob.animationActive) return;
		mob.animationActive = 1;
		var tl = g.TM(),
			foo = force ? force : !Math.round(Math.random()) ? 1 : 2,
			startFrame = foo === 1 ?
				16 : 36,
			endFrame = startFrame + 20,
			diff = endFrame - startFrame;

		tl.to(mob, mob.images[mob.lastKey].speed * diff, {
			startAt: {
				frame: startFrame
			},
			overwrite: 1,
			frame: endFrame,
			ease: Linear.easeNone,
			onUpdate: function() {
				mob.setSrc(mob.lastKey, mob.frame);
			},
			onComplete: function() {
				mob.resetIdle();
				if (mob.test){
					if (force === 1){
						TweenMax.delayedCall(1, function() {
							mob.attack(2);
						});
					}
					else {
						TweenMax.delayedCall(1, function() {
							mob.special();
						});
					}
				}
			}
		});
	},
	special: function(){
		if (mob.animationActive) return;
		mob.animationActive = 1;
		var startFrame = 56,
			endFrame = 76,
			diff = endFrame - startFrame;

		var tl = g.TM();
		tl.to(mob, mob.images[mob.lastKey].speed * diff, {
			startAt: {
				frame: startFrame
			},
			overwrite: 1,
			frame: endFrame,
			ease: Linear.easeNone,
			yoyo: mob.images[mob.lastKey].yoyo,
			repeat: mob.images[mob.lastKey].yoyo ? 1 : 0,
			onUpdate: function(){
				mob.setSrc(mob.lastKey, mob.frame);
			},
			onComplete: function () {
				mob.resetIdle();
				if (mob.test) {
					TweenMax.delayedCall(1, function () {
						mob.death();
					});
				}
			}
		});
	},
	death: function(){
		if (mob.deathState) return;
		mob.deathState = 1;
		mob.animationActive = 1;
		var tl = g.TM(),
			startFrame = 76,
			endFrame = 106,
			diff = endFrame - startFrame;

		tl.to(mob, mob.images[mob.lastKey].speed * diff, {
			startAt: {
				frame: startFrame
			},
			overwrite: 1,
			frame: endFrame,
			ease: Linear.easeNone,
			onUpdate: function () {
				mob.setSrc(mob.lastKey, mob.frame);
			},
			onComplete: function() {
				var filters = {
					opacity: 'opacity(100%)',
					brightness: "brightness(100%)"
				};

				var tl = new TimelineMax({
					onUpdate: function () {
						test.filters.death(mob.element, filters);
					}
				});
				tl.to(filters, 2, {
					opacity: 'opacity(0%)',
					brightness: "brightness(0%)",
					ease: Linear.easeIn,
					onComplete: function () {
						if (mob.test) {
							$("#mob-parent").remove();
							mob.init();
						}
						else {
							mob.idle();
						}
						TweenMax.delayedCall(.1, function () {
							mob.deathState = 0;
							mob.animationActive = 0;
							mob.element.style.filter = 'opacity(100%) brightness(100%)';
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
mob.count = mob.images.length - 1;
mob.init();
// test methods
var test = {
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
})($,Math,document,location,TweenMax,TimelineMax,Power0,Power1,Power2,Power3,Power4,Back,Elastic,Bounce,SteppedEase,Circ,Expo,Sine,setTimeout,setInterval,undefined);