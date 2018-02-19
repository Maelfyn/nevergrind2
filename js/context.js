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

		var isMenuAbove = my.mouse.y < window.innerHeight/2,
			z = ' class="context-items"',
			s =
			'<div id="context-invite" '+ z +'>Invite</div>'+
			'<div id="context-whisper" '+ z +'>Whisper</div>'+
			'<div id="context-friend" '+ z +'>Friend</div>'+
			'<div id="context-ignore" '+ z +'>Ignore</div>';

		var e = document.getElementById('tooltip-social-wrap');
		e.innerHTML = s;
		// determine Y adjustment
		var yAdjust = isMenuAbove ? 15 : (~~$("#tooltip-social-wrap").height() + 15) * -1;
		console.info('yAdj: ', yAdjust);
		e.style.top = (my.mouse.y + yAdjust) + 'px';
		e.style.left = my.mouse.x + 'px';
		e.style.visibility = 'visible';
		context.isOpen = 1;
		context.openDate = Date.now();
	},
	show: function() {
		document.getElementById('tooltip-social-wrap').style.visibility  = 'visible';
		context.isOpen = 1;
	},
	hide: function() {
		document.getElementById('tooltip-social-wrap').style.visibility  = 'hidden';
		context.isOpen = 0;
	},
	getChatMenu: function(name) {
		context.player = name;
		console.info('getChatMenu', name, my.mouse.x, my.mouse.y);

		context.setChatMenuHtml();
	}
}
