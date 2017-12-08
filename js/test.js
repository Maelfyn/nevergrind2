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
	juggernaut: {
		init: function(){
			console.info("Juggernaut Initialized! ");
			var e = document.createElement('div');
			e.id = 'sprite';
			e.style.position = 'absolute';
			e.style.bottom = '10%';
			e.style.left = '10%';
			e.style.pointerEvents = 'none';
			e.style.width = '1265px';
			e.style.height = '729px';
			e.style.background = "url('mobs/huge/juggernaut.png')";
			e.style.backgroundPosition = '0 0';

			document.getElementById('title-scene').appendChild(e);
			test.juggernaut.idle();
			function randomTime(){
				return 750 + Math.random() * 5000;
			}
			(function repeat(){
				setTimeout(function(){
					if (Math.random() > .5){
						test.juggernaut.attack();
					}
					else {
						test.juggernaut.hit();
					}
					repeat();
				}, randomTime());
			})();
		},
		idle: function(){
			TweenMax.to('#sprite', .4, {
				startAt: {
					backgroundPosition: '0% 0%'
				},
				yoyo: true,
				repeat: -1,
				backgroundPosition: "-200% 0%",
				ease: SteppedEase.config(2)
			});
		},
		animationActive: 0,
		attack: function(){
			if (test.juggernaut.animationActive) return;
			test.juggernaut.animationActive = 1;
			var tl = new g.TM();
			var e = document.getElementById('sprite');
			tl.to(e, .2, {
				startAt: {
					backgroundPosition: '-200%'
				},
				backgroundPosition: "-700%",
				ease: SteppedEase.config(5)
			}).set(e, {
				backgroundPosition: '-600%'
			}, '+=.1').set(e, {
				backgroundPosition: '-500%'
			}, '+=.1').set(e, {
				backgroundPosition: '0'
			}, '+=.1').set(e, {
				onComplete: function(){
					test.juggernaut.animationActive = 0;
					test.juggernaut.idle();
				}
			}, '+=.1');
		},
		hit: function(){
			if (test.juggernaut.animationActive) return;
			test.juggernaut.animationActive = 1;
			var tl = new g.TM();
			var e = document.getElementById('sprite');
			tl.set(e, {
				backgroundPosition: "0%",
			}, '+=.1').set(e, {
				backgroundPosition: "-800%",
			}, '+=.1').set(e, {
				backgroundPosition: '-900%'
			}, '+=.1').set(e, {
				backgroundPosition: '-800%'
			}, '+=.1').set(e, {
				backgroundPosition: '0%'
			}, '+=.1').set(e, {
				onComplete: function(){
					test.juggernaut.animationActive = 0;
					test.juggernaut.idle();
				}
			}, '+=.2');
		},
		deathState: 0,
		death: function(){
			if (test.juggernaut.deathState) return;
			test.juggernaut.deathState = 1;
			var tl = new g.TM();
			var e = document.getElementById('sprite');
			tl.set(e, {
				overwrite: 1,
				backgroundPosition: "-900%",
				onComplete: function(){
					var filters = {
						opacity: 'opacity(100%)',
						brightness: "brightness(100%)"
					};

					var tl = new TimelineMax({
						onUpdate: function(){
							test.filters.death(e, filters);
						}
					});
					tl.to(filters, 1.5, {
						opacity: 'opacity(0%)',
						brightness: "brightness(0%)"
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

test.juggernaut.init();