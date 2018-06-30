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
			['wrap',
			'center',
			'alive',
			'dead',
			'img',
			'details',
			'name',
			'shadow',
			'bar'].forEach(function(e){
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
			console.info('mob.test ', mob.test);
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