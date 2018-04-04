var button = {
	initialized: 0,
	wrap: document.getElementById('button-wrap'),
	init: function() {
		var s = '';
		// skill buttons
		for (var i=0; i<8; i++) {
			s += '<div id="class-btn-'+ i +'" class="class-btn" style="background-image: url(img2/skills/'+ my.job +'.png)"></div>';
		}
		button.wrap.innerHTML = s;
		if (!button.initialized) {
			$("#button-wrap").on(env.click, '.class-btn', function() {
				var id = this.id.substr(10) * 1;
				console.info('CLICKED SKILL: ', id, typeof id);
			});
			setTimeout(function() {
				TweenMax.to(button.wrap, 1.5, {
					startAt: {
						display: 'flex',
						opacity: 0,
					},
					opacity: 1
				});
			}, 1000);
		}
	},
	hide: function() {
		TweenMax.set(button.wrap, {
			display: 'none'
		});
	}
}