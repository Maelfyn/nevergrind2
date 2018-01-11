// test methods
var mobs = [];
var mob = {
	test: 1,
	images: {
		'balrog': {
			w: 2000,
			h: 1200,
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: 3,
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
			yFloor: -2,
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
			yFloor: -2,
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
			yFloor: -18,
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
			yFloor: 1,
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
			yFloor: -4,
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
			yFloor: 7,
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
			w: 600,
			h: 600,
			yFloor: 0, // back row is *2
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
	max: 8,
	init: function(){
		battle.show();
		// init mob/dom connections
		for (var i=0; i<mob.max; i++){
			mobs[i] = {};
			var m = mobs[i];
			m.frame = 0;
			m.lastFrame = 0;
			m.animationActive = 0;
			m.deathState = 0;
			m.speed = 0;
			m.type = 'scorpion';
			m.wrap = document.getElementById('mob-wrap-' + i);
			m.img = document.getElementById('mob-img-' + i);
			m.name = document.getElementById('mob-name-' + i);
			m.bar = document.getElementById('mob-bar-' + i);
		}
		battle.init();
	},
	element: {},
	animationActive: 0,
	frame: 1,
	setMob: function(m, type){
		var x = mob.images[type];
		m.type = type;
		m = Object.assign(m, mob.images[type]);
		delete m.cache;
	},
	setSrc: function(m){
		m.frame = ~~m.frame;
		if (m.frame !== m.lastFrame) {
			m.img.src = 'mobs/' + m.type + '/' + m.frame + '.png';
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
		TweenMax.delayedCall(1, function(){
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
					TweenMax.delayedCall(1, function() {
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
			foo = force ? force : !Math.round(Math.random()) ? 1 : 2,
			startFrame = foo === 1 ?
				15.9 : 35.9,
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
						TweenMax.delayedCall(1, function() {
							mob.attack(m, 2);
						});
					}
					else {
						TweenMax.delayedCall(1, function() {
							mob.special(m);
						});
					}
				}
			}
		});
	},
	special: function(m){
		if (m.animationActive) return;
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
			onUpdate: function(){
				mob.setSrc(m);
			},
			onComplete: function () {
				mob.resetIdle(m);
				if (mob.test) {
					TweenMax.delayedCall(1, function () {
						mob.death(m);
					});
				}
			}
		});
	},
	death: function(m){
		if (m.deathState) return;
		m.deathState = 1;
		m.animationActive = 1;
		var tl = g.TM(),
			startFrame = 76,
			endFrame = 105.9,
			diff = endFrame - startFrame;

		tl.to(m, m.speed * diff, {
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
				};

				var tl = new TimelineMax({
					onUpdate: function () {
						test.filters.death(m.img, filters);
					}
				});
				tl.to(filters, 2, {
					opacity: 'opacity(0%)',
					brightness: "brightness(0%)",
					ease: Linear.easeIn,
					onComplete: function () {
						if (mob.test) {
							mob.idle(m);
						}
						TweenMax.delayedCall(.1, function () {
							m.deathState = 0;
							m.animationActive = 0;
							m.img.style.filter = 'opacity(100%) brightness(100%)';
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