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
			bottomShadow: 10,
			click: {
				min: {
					x: 0,
					y: 0
				},
				max: {
					x: 0,
					y: 0
				}
			}
		},
		'ice-golem': {
			w: 1200,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'stone-golem': {
			w: 1200,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'clay-golem': {
			w: 1200,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'treant': {
			w: 1300,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .05
		},
		'spider': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'wolf': {
			w: 900,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'rat': {
			w: 1100,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'snake': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'dragonkin': {
			w: 1300,
			h: 1300,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .055
		},
		'lizardman': {
			w: 1100,
			h: 1000,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .04
		},
		'dragon': {
			w: 3000,
			h: 1500,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .06
		},
		'ghoul': {
			w: 900,
			h: 1000,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .04
		},
		'mummy': {
			w: 800,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'skeleton': {
			w: 900,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'zombie': {
			w: 900,
			h: 1000,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .04
		},
		'vampire': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .04
		},
		'goblin': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'hobgoblin': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'kobold': {
			w: 1400,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'orc': {
			w: 1200,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .045
		},
		'griffon': {
			w: 2000,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .05
		},
		'harpy': {
			w: 1500,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .045
		},
		'werewolf': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'centaur': {
			w: 1500,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .045
		},
		'cerberus': {
			w: 1300,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'fungoid': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .04
		},
		'gargoyle': {
			w: 1200,
			h: 1000,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .04
		},
		'beetle': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'imp': {
			w: 1250,
			h: 1000,
			yFloor: 25,
			yoyo: true,
			cache: [],
			speed: .04
		},
		'minotaur': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'aviak': {
			w: 1200,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'elephant': {
			w: 1300,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .05
		},
		'lion': {
			w: 900,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'crocodile': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'rhino': {
			w: 1200,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .045
		},
		'lioness': {
			w: 900,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'bear': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'toadlok': {
			w: 1200,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .04
		},
		'giant': {
			w: 1400,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .05
		},
		'ice-giant': {
			w: 1400,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .06
		},
		'fire-giant': {
			w: 1400,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .06
		},
		'spectre': {
			w: 1500,
			h: 1500,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .055
		},
		'angler': {
			w: 1500,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .045
		},
		'beholder': {
			w: 1200,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .05
		},
		'unicorn': {
			w: 2000,
			h: 1200,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .055
		},
		'scorpion': {
			w: 1000,
			h: 1000,
			yFloor: 25,
			yoyo: false,
			cache: [],
			speed: .045
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
		var size = 1;

		mob.lastKey = mob.imageKeys[Math.abs(mob.index-- % mob.imageKeys.length)];
		mob.preloadMob(mob.lastKey);
		var nextKey = mob.imageKeys[Math.abs(mob.index % mob.imageKeys.length)];
		mob.preloadMob(nextKey);
		var d = document.createElement('div'),
			e = document.createElement('img'),
			n = document.createElement('div');
		// div parent
		d.style.bottom = '5px';
		d.style.left = '50%';
		d.style.right = '0';
		d.style.margin = '0 auto';
		d.className = 'mob-wrap text-shadow';
		d.style.width = size * mob.images[mob.lastKey].w + 'px';
		d.style.height = size * mob.images[mob.lastKey].h + 'px';
		d.id = 'mob-parent';
		// name
		n.style.top = '10%';
		n.className = 'mob-name';
		n.innerHTML = mob.lastKey.replace(/-/g, ' ');
		// img
		e.id = 'sprite';
		e.className = 'mob-image';
		e.style.width = size * mob.images[mob.lastKey].w + 'px';
		e.style.height = size * mob.images[mob.lastKey].h + 'px';
		d.appendChild(n);
		d.appendChild(e);
		document.getElementById('title-scene').appendChild(d);
		mob.element = e;
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