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
						test.filters.hueRotate(z, filters);
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
		hueRotate: function(z, filters){
			z.style.filter = 'grayscale(100%) sepia(100%) saturate(1000%) ' + filters.hue;
		},
		death: function(z, filters){
			z.style.filter = filters.opacity + ' ' + filters.brightness;
		},
		effect: function(z, filters, key){
			z.style.filter = filters[key];
		}
	},
	mob: {
		init: function(){
			console.info("Mob Initialized! ");
			var e = document.createElement('div');
			e.id = 'sprite';
			e.style.position = 'absolute';
			e.style.bottom = '10%';
			e.style.left = '0%';
			e.style.pointerEvents = 'none';
			e.style.width = '1186px';
			e.style.height = '949px';
			e.style.background = "url('mobs/balrog.png')";
			e.style.backgroundPosition = '0% 0%';

			document.getElementById('title-scene').appendChild(e);
			test.mob.element = e;
			test.mob.idle();
			function randomTime(){
				return 750 + Math.random() * 5000;
			}
			(function repeat(){
				setTimeout(function(){
					var x = Math.random();
					if (x > .5){
						test.mob.attack();
					}
					else if (x > .3){
						test.mob.special();
					}
					else if (x > .15){
						test.mob.hit();
					} else {
						test.mob.death();
					}
					repeat();
				}, randomTime());
			})();
		},
		element: {},
		animationActive: 0,
		idle: function(){
			TweenMax.to(test.mob.element, .4, {
				startAt: {
					backgroundPosition: '0% 0%'
				},
				yoyo: true,
				repeat: -1,
				backgroundPosition: "-400% 0%",
				ease: SteppedEase.config(4)
			});
		},
		hit: function(){
			if (test.mob.animationActive) return;
			test.mob.animationActive = 1;
			var tl = g.TM();
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
					test.mob.animationActive = 0;
					test.mob.idle();
				}
			});
		},
		attack: function(){
			if (test.mob.animationActive) return;
			test.mob.animationActive = 1;
			var tl = g.TM(),
				foo = !Math.round(Math.random()) ? 1 : 2;
			tl.to(test.mob.element, .5, {
				startAt: {
					backgroundPosition: '0% -'+ foo +'00%'
				},
				backgroundPosition: '-900% -'+ foo +'00%',
				ease: SteppedEase.config(9),
				onComplete: function(){
					test.mob.animationActive = 0;
					test.mob.idle();
				}
			});
		},
		special: function(){
			if (test.mob.animationActive) return;
			test.mob.animationActive = 1;
			var tl = g.TM();
			tl.to(test.mob.element, .3, {
				startAt: {
					backgroundPosition: '0% -400%'
				},
				backgroundPosition: '-900% -400%',
				ease: SteppedEase.config(9),
				yoyo: true,
				repeat: 1,
				onComplete: function(){
					test.mob.animationActive = 0;
					test.mob.idle();
				}
			});
		},
		deathState: 0,
		death: function(){
			if (test.mob.deathState) return;
			test.mob.deathState = 1;
			var tl = g.TM();
			tl.set(test.mob.element, {
				overwrite: 1,
				backgroundPosition: '0% -300%'
			}).set(test.mob.element, {
				backgroundPosition: '-100% -300%'
			}, '+=.12')
			.set(test.mob.element, {
				backgroundPosition: '-200% -300%'
			}, '+=.12')
			.set(test.mob.element, {
				backgroundPosition: '-300% -300%'
			}, '+=.11')
			.to(test.mob.element, .4, {
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
							test.filters.death(test.mob.element, filters);
						}
					});
					tl.to(filters, 1.5, {
						opacity: 'opacity(0%)',
						brightness: "brightness(0%)",
						onComplete: function(){
							setTimeout(function(){
								test.mob.idle();
								test.mob.deathState = 0;
								test.mob.element.style.filter = 'opacity(100%) brightness(100%)';
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
					test.filters.effect(e, filters, type);
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
					test.filters.effect(e, filters, type);
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
					test.filters.effect(e, filters, type);
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
					test.filters.effect(e, filters, type);
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
					test.filters.effect(e, filters, type);
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
					test.filters.effect(e, filters, type);
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
					test.filters.effect(e, filters, type);
				}
			});
		}
	}
}

test.mob.init();