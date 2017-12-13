// test methods
var mob = {
	test: 1,
	images: [
		'balrog',
		'beholder',
		'golem',
		'treant',
		'spider',
		'wolf',
		'rat',
		'snake',
		'ghoul',
		'mummy',
		'skeleton',
		'zombie',
		'vampire',
		'goblin',
		'cyclops',
		'hobgoblin',
		'kobold',
		'ogre',
		'orc',
		'troll',
		'chimera',
		'griffon',
		'harpy',
		'manticore'
	],
	count: 0,
	init: function(){
		var e = document.createElement('div');
		e.id = 'sprite';
		e.style.position = 'absolute';
		e.style.bottom = '0%';
		e.style.left = '0%';
		e.style.pointerEvents = 'none';
		e.style.width = '1186px';
		e.style.height = '949px';
		e.style.background = "url('mobs/"+ (mob.images[mob.count++ % mob.images.length]) +".png')";
		e.style.backgroundPosition = '0% 0%';

		document.getElementById('title-scene').appendChild(e);
		mob.element = e;
		mob.idle();
	},
	element: {},
	animationActive: 0,
	idle: function(skip){
		TweenMax.to(mob.element, .4, {
			startAt: {
				backgroundPosition: '0% 0%'
			},
			yoyo: true,
			repeat: -1,
			backgroundPosition: "-400% 0%",
			repeatDelay: .06,
			ease: SteppedEase.config(4)
		});
		if (skip) return;
		TweenMax.delayedCall(2, function(){
			mob.test && mob.hit();
		})
	},
	hit: function(){
		if (mob.animationActive) return;
		mob.animationActive = 1;
		var e = document.getElementById('sprite');
		TweenMax.to(e, .25, {
			startAt: {
				backgroundPosition: '-500% 0%'
			},
			yoyo: true,
			repeat: 1,
			backgroundPosition: "-900% 0%",
			ease: SteppedEase.config(4),
			onComplete: function(){
				mob.animationActive = 0;
				mob.idle(1);
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
			foo = !Math.round(Math.random()) ? 1 : 2;
		if (force) foo = force;
		tl.to(mob.element, .5, {
			startAt: {
				backgroundPosition: '0% -'+ foo +'00%'
			},
			backgroundPosition: '-900% -'+ foo +'00%',
			ease: SteppedEase.config(9),
			onComplete: function(){
				mob.animationActive = 0;
				mob.idle(1);
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
		var tl = g.TM();
		tl.to(mob.element, .5, {
			startAt: {
				backgroundPosition: '0% -400%'
			},
			backgroundPosition: '-900% -400%',
			ease: SteppedEase.config(9),
			yoyo: true,
			repeat: 1,
			onComplete: function(){
				mob.animationActive = 0;
				mob.idle(1);
				if (mob.test){
					TweenMax.delayedCall(1, function() {
						mob.death();
					});
				}
			}
		});
	},
	deathState: 0,
	death: function(){
		if (mob.deathState) return;
		mob.deathState = 1;
		mob.animationActive = 1;
		var tl = g.TM();
		tl.set(mob.element, {
			overwrite: 1,
			backgroundPosition: '0% -300%'
		}).set(mob.element, {
			backgroundPosition: '-100% -300%'
		}, '+=.12')
			.set(mob.element, {
				backgroundPosition: '-200% -300%'
			}, '+=.12')
			.set(mob.element, {
				backgroundPosition: '-300% -300%'
			}, '+=.11')
			.to(mob.element, .4, {
				startAt: {
					backgroundPosition: '-400% -300%'
				},
				backgroundPosition: '-900% -300%',
				ease: SteppedEase.config(5),
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