// test methods
var test = {
	chat: {
		id: 999999999,
		room: function(){
			for (var i=0; i<100; i++) {
				var c = ng.toJobShort(ng.jobs[~~(Math.random() * 14)]);
				socket.zmq.publish(chat.getChannel(), {
					route: 'chat->add',
					row: test.chat.id+i,
					level: Math.ceil(Math.random() * 50),
					job: c,
					name: 'WWWWWWWWWWWWWWWW'
				});
			}
		},
		log: function() {
			for (var i=0; i<10; i++) {
				chat.sendMsg('/flist');
			}
		}
	},
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
						filters.hueRotate(z, filters);
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
		/*
		blur(5px)
		hue-rotate(360deg)
		brightness(100%)
		contrast(100%)
		shadow(100%) (chrome not supported?)
		grayscale(100%)
		invert(100%)
		opacity(100%)
		saturate(100%)
		sepia(100%)
		 */
		hueRotate: function(z, filters){
			z.style.filter = 'grayscale(100%) sepia(100%) saturate(1000%) ' + filters.hue;
		},
		death: function(z, filters){
			z.style.filter = filters.opacity + ' ' + filters.brightness;
		},
		effect: function(z, filters, key){
			z.style.filter = filters[key];
			/*
			test.filters.effect(mob.element, {
			  saturate: 'saturate(2500%)'
			}, 'saturate');
			 */
		}
	},
	battle: function() {
		battle.testInit();
	}
}