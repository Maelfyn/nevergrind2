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
		context.action[ng.camel(id)]();
		context.hide();
	},
	action: {
		contextWhisper: function() {
			chat.dom.chatInput.value = '';
			chat.mode.change({
				msg: '',
				mode: '@',
				name: context.player
			});
			chat.dom.chatInput.focus();
		},
		contextInvite: function() {
			chat.sendMsg('/invite ' + context.player);
		},
		contextRemoveFriend: function() {
			chat.sendMsg('/friend remove ' + context.player);
		},
		contextAddFriend: function() {
			chat.sendMsg('/friend add ' + context.player);
		},
		contextRemoveIgnore: function() {
			chat.sendMsg('/ignore remove ' + context.player);
		},
		contextAddIgnore: function() {
			chat.sendMsg('/ignore add ' + context.player);
		},
		contextDisband: function() {
			chat.sendMsg('/disband');
		},
		contextPromote: function() {
			chat.sendMsg('/promote ' + context.player);
		},
		contextBoot: function() {
			chat.sendMsg('/boot ' + context.player);
		}
	},
	player: '',
	setPartyMenuHtml: function() {
		if (!context.player) return;
		console.info('setPartyMenuHtml', context.player);

		var z = ' class="context-items"',
			s = '';

		if (context.player === my.name) {
			// commands only for me
			// disband
			if (my.p_id) {
				s += '<div id="context-disband" '+ z +'>Disband</div>';
			}
		} else {
			// promote
			if (my.party[0].isLeader) {
				s += '<div id="context-boot" '+ z +'>Boot</div>';
				s += '<div id="context-promote" '+ z +'>Promote</div>';
			}
			// whisper
			s += '<div id="context-whisper" '+ z +'>Whisper</div>';
			// friend list
			if (~ng.friends.indexOf(context.player)) {
				s += '<div id="context-remove-friend" '+ z +'>Unfriend</div>';
			}
			else {
				s += '<div id="context-add-friend" '+ z +'>Friend</div>';
			}
			// ignore list
			if (~ng.ignore.indexOf(context.player)) {
				s += '<div id="context-remove-ignore" '+ z +'>Unignore</div>';
			}
			else {
				s += '<div id="context-add-ignore" '+ z +'>Ignore</div>';
			}
		}
		s && context.show(s);
	},
	setChatMenuHtml: function() {
		if (!context.player || context.player === my.name) return;

		var z = ' class="context-items"',
			s = '';
		// is this guy in my party?
		if (!~my.getPartyNames().indexOf(context.player)) {
			s += '<div id="context-invite" '+ z +'>Invite</div>';
		}
		s += '<div id="context-whisper" '+ z +'>Whisper</div>';
		// friend list
		if (~ng.friends.indexOf(context.player)) {
			s += '<div id="context-remove-friend" '+ z +'>Unfriend</div>';
		}
		else {
			s += '<div id="context-add-friend" '+ z +'>Friend</div>';
		}
		// ignore list
		if (~ng.ignore.indexOf(context.player)) {
			s += '<div id="context-remove-ignore" '+ z +'>Unignore</div>';
		}
		else {
			s += '<div id="context-add-ignore" '+ z +'>Ignore</div>';
		}
		context.show(s);
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
	show: function(s) {
		if (!s) return;
		var e = document.getElementById('tooltip-social-wrap');
		e.innerHTML = s;
		e.style.top = context.position.y() + 'px';
		e.style.left = context.position.x() + 'px';
		e.style.visibility = 'visible';
		context.isOpen = 1;
		context.openDate = Date.now();
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
		context.setChatMenuHtml();
	},
	getPartyMenu: function(name) {
		context.player = name;
		context.setPartyMenuHtml();
	}
}
