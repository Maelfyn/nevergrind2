// test methods
var mob = {
	test: 1,
	images: {
		'balrog': {
			w: 1700,
			h: 1000,
			yFloor: 25,
			yoyo: true,
			cache: []
		}
		//'beholder',
		//'golem',
		//'treant',
		//'spider',
		//'wolf',
		//'rat',
		//'snake',
		//'ghoul',
		//'mummy',
		//'skeleton',
		//'zombie',
		//'vampire',
		//'goblin',
		//'cyclops',
		//'hobgoblin',
		////'kobold',
		//'ogre',
		//'orc',
		//'troll',
		//'chimera',
		//'griffon',
		//'harpy',
		//'manticore',
		//'werewolf'
	},
	imageKeys: 0,
	imageIndex: 0,
	cache: {},
	count: 0,
	preloadMob: function(type){
		console.info("preloading ", type);
		for (var i=1; i<105; i++) {
			mob.images[type].cache[i] = new Image();
			mob.images[type].cache[i].src = 'mobs/' + type +'/'+ i +'.png';
		}
	},
	init: function(){
		for (var key in mob.images) {
			mob.lastKey = key;
		}
		mob.preloadMob(mob.lastKey);
		mob.imageKeys = Object.keys(mob.images).length;
		var e = document.createElement('img');
		e.id = 'sprite';
		e.style.position = 'absolute';
		e.style.bottom = '0%';
		e.style.left = '0%';
		e.style.pointerEvents = 'none';
		e.style.width = mob.images[mob.lastKey].width + 'px';
		e.style.height = mob.images[mob.lastKey].height + 'px';
		e.style.backgroundPosition = '0% 0%';
		var nextKey = mob.imageKeys[++mob.imageIndex % mob.imageKeys.length];
		console.info(nextKey);
		// mob.preloadMob(nextKey);
		document.getElementById('title-scene').appendChild(e);
		mob.element = e;
		mob.idle();
	},
	element: {},
	animationActive: 0,
	frame: 1,
	setSrc: function(type, frame){
		frame = ~~frame;
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
		mob.frame = 1;

		TweenMax.to(mob, .4, {
			frame: 5,
			yoyo: true,
			repeat: -1,
			repeatDelay: .06,
			ease: Linear.easeNone,
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
		mob.frame = 6;
		mob.animationActive = 1;
		TweenMax.to(mob, .25, {
			overwrite: 1,
			frame: 15,
			yoyo: true,
			repeat: 1,
			ease: Linear.easeNone,
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
			foo = force ? force : !Math.round(Math.random()) ? 1 : 2;
		mob.frame = foo === 1 ? 16 : 36;
		tl.to(mob, .5, {
			overwrite: 1,
			frame: mob.frame + 19,
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
		mob.frame = 56;
		var tl = g.TM();
		tl.to(mob, .5, {
			overwrite: 1,
			frame: mob.frame + 19,
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
		mob.frame = 76;
		mob.deathState = 1;
		mob.animationActive = 1;
		var tl = g.TM();
		tl.to(mob, .75, {
			overwrite: 1,
			frame: mob.frame + 29,
			ease: Quad.easeIn,
			onUpdate: function(){
				mob.setSrc(mob.lastKey, mob.frame);
			},
			onComplete: function(){
				var filters = {
					opacity: 'opacity(100%)',
					brightness: "brightness(100%)"
				};

				var tl = new TimelineMax({
					onUpdate: function(){
						test.filters.death(mob.element, filters);
					}
				});
				tl.to(filters, 1.5, {
					opacity: 'opacity(0%)',
					brightness: "brightness(0%)",
					onComplete: function(){
						if (mob.test){
							$("#sprite").remove();
							mob.init();
						}
						else {
							mob.idle();
						}
						TweenMax.delayedCall(.1, function(){
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