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
				socket.init();
				var z = data.characterData;
				my.name = z.name;
				my.job = z.job;
				my.race = z.race;
				my.level = z.level;
				my.row = z.row;
				my.party[0] = z;
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
			'town-merchant':
				'<img class="aside-bg" src="img2/town/halas.jpg">' +
				'<img class="aside-npc" src="img2/town/rendo-surefoot.png?v1">' +
				'<div class="aside-text">' +
					'<div class="aside-title-wrap">' +
						'<div class="aside-title">Merchant</div>' +
						'<i class="close-aside fa fa-times text-danger"></i>' +
					'</div>' +
				'</div>',
			'town-trainer':
				'<img class="aside-bg" src="img2/town/surefall.jpg">' +
				'<img class="aside-npc" src="img2/town/arwen-reinhardt.png?v1">' +
				'<div class="aside-text">' +
					'<div class="aside-title-wrap">' +
						'<div class="aside-title">Skill Trainer</div>' +
						'<i class="close-aside fa fa-times text-danger"></i>' +
					'</div>' +
				'</div>',
			'town-guild':
				'<img class="aside-bg" src="img2/town/poh.jpg">' +
				'<img class="aside-npc" src="img2/town/valeska-windcrest.png?v1">' +
				'<div class="aside-text">' +
					'<div class="aside-title-wrap">' +
						'<div class="aside-title">Guild Hall</div>' +
						'<i class="close-aside fa fa-times text-danger"></i>' +
					'</div>' +
				'</div>',
			'town-mission':
				'<img class="aside-bg" src="img2/town/neriak.jpg">' +
				'<img class="aside-npc" src="img2/town/miranda-crossheart.png?v1">' +
				'<div class="aside-text">' +
					'<div class="aside-title-wrap">' +
						'<div class="aside-title">Mission Counter</div>' +
						'<i class="close-aside fa fa-times text-danger"></i>' +
					'</div>' +
				'</div>'
		},
		getHtml: function(id) {
			return town.aside.html[id];
		},
	},
	events: function(){
		$("#scene-town").on(env.click, '.close-aside', function(){
			console.info("CLICK");
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
		});
		$(".town-action").on(env.click, function(){
			var id = $(this).attr('id'),
				// don't exceed 25-75 range
				pos = {
					'town-merchant': {
						x: '-75%',
						y: '-60%'
					},
					'town-trainer': {
						x: '-75%',
						y: '-25%'
					},
					'town-guild': {
						x: '-25%',
						y: '-25%'
					},
					'town-mission': {
						x: '-50%',
						y: '-75%'
					}
				};
			if (id === town.aside.selected) return;
			// remove old aside
			var z = $(".town-aside");
			TweenMax.to(z, .5, {
				scale: 0,
				onComplete: function(){
					z.remove();
				}
			});
			// animate town BG
			TweenMax.to('#town-bg', 1.25, {
				scale: 1.5,
				x: pos[id].x,
				y: pos[id].y
			});
			// create aside
			var e = document.createElement('div'),
				to = document.getElementById('scene-town');
			e.className = 'town-aside text-shadow';
			e.innerHTML = town.aside.getHtml(id);
			to.appendChild(e);
			// animate aside things
			setTimeout(function() {
				TweenMax.to(e, .5, {
					startAt: {
						display: 'block',
						alpha: 1,
						scale: 0
					},
					scale: 1
				});
				setTimeout(function () {
					TweenMax.to('.aside-bg', 1, {
						startAt: {
							scale: 1.2
						},
						scale: 1
					}, 100);
				});
				TweenMax.to('.aside-npc', 1, {
					left: '-5%'
				})
			}, town.aside.selected ? 0 : 500);
			// set aside id
			town.aside.selected = id;
		});
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