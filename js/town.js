var town = {
	go: function(){
		if (create.selected) {
			ng.lock(1);
			$.ajax({
				url: app.url + 'php2/character/loadCharacter.php',
				data: {
					row: create.selected
				}
			}).done(function(data) {
				console.info('loadCharacter: ', data);
				socket.init();
				var z = data.characterData;
				my.name = z.name;
				my.job = z.job;
				my.race = z.race;
				my.level = z.level;
				my.row = z.row;
				my.party[0] = z;
				my.resetClientPartyValues(0);
				my.guild = data.guild;
				// init party member values
				for (var i=1; i<game.maxPlayers; i++) {
					my.party[i] = my.Party();
				}
				console.info('my.party[0]: ', my.party[0]);
				ng.setScene('town');
				chat.init();
				chat.friend.init();
				chat.ignore.init();
				// things that only happen once
				chat.log("There are currently " + data.count + " players exploring Vandamor.", 'chat-emote');

				town.init();
				game.start();
				chat.setRoom(data.players);
				bar.init();

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
					s += '<div>Guild: '+ my.guild.name +'</div> ';
				}
				else {
					s +=
					'<input id="guild-input" type="text" maxlength="30" autocomplete="off" spellcheck="false">' +
					'<div id="guild-create" class="ng-btn">Create Guild</div> ' +
					'<div id="guild-create-help">Only letters A through Z and apostrophes are accepted in guild names. Standarized capitalization will be automatically applied. The guild name must be between 4 and 30 characters. All guild names are subject to the royal statutes regarding public decency in Vandamor.</div>';
				}
				return s;
			},
			'town-mission': function() {
				var s = '';
				return s;
			}
		},
		getHtml: function(id) {
			return town.aside.html[id](id);
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
			// create aside
			var e = document.createElement('div');
			e.className = 'town-aside text-shadow';
			e.innerHTML = town.aside.getHtml(id);
			document.getElementById('scene-town').appendChild(e);
			// animate aside things
			setTimeout(function() {
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
					scale: 1
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
		},
		update: function(id) {
			var s = town.aside.menu[id]();
			$("#aside-menu").html(s);
		}
	},
	lastAside: {},
	events: function(){
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
		})
		$(".town-action").on(env.click, function(){
			town.aside.init($(this).attr('id'));
		});
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
			document.getElementById('scene-town').innerHTML = town.html();
			town.events();
			$("#scene-title").remove();
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
		])
	},
};