var context = {
	timer: 0,
	openDate: 0,
	isInside: 0,
	isOpen: 0,
	init: (function(){
		var e = $("#tooltip-social-wrap");
		e.on(env.click, '.context-items', function(e){
			console.info('context-items clicked: ', $(this).attr('id'));
			context.click($(this).attr('id'));
		});

		e.on('mouseenter', function() {
			context.isInside = 1;
		}).on('mouseleave', function() {
			context.isInside = 0;
			clearTimeout(context.timer);
			setTimeout(function() {
				if (!context.isInside) {
				}
			}, 1000);
		});
	})(),
	click: function(id) {
		console.info("click!", id, context.player);
	},
	player: '',
	getPartyMenu: function(name) {
		context.player = name;
		console.info('getPartyMenu', name);
	},
	setChatMenuHtml: function() {
		if (!context.player) return;

		var z = ' class="context-items"',
			s =
			'<div id="context-invite" '+ z +'>Invite</div>'+
			'<div id="context-whisper" '+ z +'>Whisper</div>'+
			'<div id="context-friend" '+ z +'>Friend</div>'+
			'<div id="context-ignore" '+ z +'>Ignore</div>';

		var e = document.getElementById('tooltip-social-wrap');
		e.innerHTML = s;
		e.style.top = context.position.y() + 'px';
		e.style.left = context.position.x() + 'px';
		e.style.visibility = 'visible';
		context.isOpen = 1;
		context.openDate = Date.now();
	},

	position: {
		padding: 10,
		halfWidth: ~~($("#tooltip-social-wrap").width() / 2),
		x: function() {
			if (my.mouse.x < context.position.halfWidth) {
				// too small
				my.mouse.x += context.position.halfWidth / 2;
				if (my.mouse.x < 80) {
					my.mouse.x = 80;
				}
			}
			else if (my.mouse.x > window.innerWidth - context.position.halfWidth) {
				// too big
				my.mouse.x -= context.position.halfWidth / 2;
				var z = window.innerWidth - 80;
				if (my.mouse.x > z) {
					my.mouse.x = z;
				}

			}
			return my.mouse.x;
		},
		y: function() {
			// determine Y adjustment
			var isMenuAbove = my.mouse.y < window.innerHeight/2,
				yAdjust = isMenuAbove ? 15 : (~~$("#tooltip-social-wrap").height() + 15) * -1;
			return my.mouse.y + yAdjust;
		}
	},
	show: function() {
		document.getElementById('tooltip-social-wrap').style.visibility  = 'visible';
		context.isOpen = 1;
	},
	hide: function() {
		document.getElementById('tooltip-social-wrap').style.visibility  = 'hidden';
		context.isOpen = 0;
	},
	hideCheck: function() {
		if (context.isOpen) {
			if (Date.now() - context.openDate > 100 && !context.isInside) {
				context.hide();
			}
		}
	},
	getChatMenu: function(name) {
		context.player = name;
		console.info('getChatMenu', name, my.mouse.x, my.mouse.y);

		context.setChatMenuHtml();
	}
}
