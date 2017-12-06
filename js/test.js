// test methods
var test = {
	filters: function(){
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

		(function(){
			for (var i=0; i<1000; i++){
				(function(){
					function setFilter(z) {
						z.style.filter = 'grayscale(100%) sepia(100%) saturate(1000%) ' + filters.hue;
					}
					var z = document.getElementById("mob" + i);

					var filters = {
						hue: "hue-rotate(0deg)"
					};

					var tl = new TimelineMax({
						onUpdate: function(){
							setFilter(z);
						},
						repeat: -1
					});
					tl.to(filters, Math.random() * 6 + 1, {
						hue: "hue-rotate(360deg)"
					});
				})();
			}
		})();
	},
	juggernaut: {
		init: function(){
			console.info("Juggernaut Initialized! ", Date.now());
			var e = document.createElement('div');
			e.id = 'sprite';
			e.style.position = 'absolute';
			e.style.bottom = '250px';
			e.style.left = '750px';
			e.style.pointerEvents = 'none';
			e.style.width = '616px';
			e.style.height = '357px';
			e.style.background = "url('mobs/juggernaut2.png')";
			e.style.backgroundPosition = '0 0';

			document.getElementById('title-scene').appendChild(e);
			test.juggernaut.idle();
			function randomTime(){
				return 750 + Math.random() * 5000;
			}
			(function repeat(){
				setTimeout(function(){
					test.juggernaut.attack();
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
		attackState: 0,
		attack: function(){
			if (test.juggernaut.attackState) return;
			test.juggernaut.attackState = 1;
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
					test.juggernaut.attackState = 0;
					test.juggernaut.idle();
				}
			}, '+=.1');
		}
	}
}

test.juggernaut.init();