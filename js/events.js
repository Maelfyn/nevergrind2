onbeforeunload = function(){
	// attempt to remove player from game
	game.exit();
}

$(document).on(env.click, function(e){
	context.hideCheck();
	e.preventDefault();
	return false;
}).on('keydown', function(e){
	var code = e.keyCode,
		key = e.key;

	ng.lastKey = key;

	app.isLocal && console.info('keydown: ', key, code);
	// local only
	if (app.isLocal) {
		if (!chat.hasFocus) {
			// key input view router
			if (key === 'b') {
				battle.go();
			}
			else if (key === 't') {
				town.go();
			}
		}
	}
	else {
		// not local
		if (code >= 112 && code <= 121 || code === 123) {
			// disable all F keys except F11
			return false;
		}
	}

	if (e.altKey) {
		return false;
	} else if (e.ctrlKey){
		if (code === 82){
			// ctrl+r refresh
			chat.reply();
			return false;
		}
		else if (!chat.hasFocus && !guild.hasFocus && code === 65) {
			// no select all of webpage elements
			e.preventDefault();
		}
	} else {
		if (ng.view === 'title'){
			if (!ng.isModalOpen && !init.isMobile){
				$("#create-character-name").focus();
			}
		} else {
			// always works town,dungeon and combat
			if (chat.hasFocus) {
				// has chat focus
				if (code === 38) {
					// chat focus history nav up
					if (chat.history[chat.historyIndex - 1] !== undefined) {
						var o = chat.history[--chat.historyIndex];
						chat.dom.chatInput.value = o.msg;
						chat.mode.change(o);
					}
				}
				else if (code === 40) {
					// chat focus history nav down
					if (chat.history.length === chat.historyIndex + 1) {
						chat.historyIndex++;
						chat.clear();
					}
					else if (chat.history[chat.historyIndex + 1] !== undefined) {
						var o = chat.history[++chat.historyIndex];
						chat.dom.chatInput.value = o.msg;
						chat.mode.change(o);
					}
				} else if (code === 13) {
					// enter
					my.name && chat.sendMsg();
				}
			}

			if (ng.view === 'town') {
				if (chat.hasFocus) {
					if (chat.mode.change()) {
						// changing chat mode - matches possible mode change
						return false;
					}
				} else {
					// no aside && no chat focus
					!town.aside.selected && chat.dom.chatInput.focus();
					if (guild.hasFocus) {
						if (code === 13) {
							guild.create();
						}
					}
				}
			} else {
				// game
				if (code === 9) {
					// tab
					if (!e.shiftKey) {
						my.nextTarget(false);
					} else {
						my.nextTarget(true);
					}
					e.preventDefault();
				} else if (code === 86) {
					// v
					if (ng.view === 'game' && !ng.chatOn) {
						game.toggleGameWindows(1);
					}
				}
			}
		}
	}
});


$(window).on('mousemove', function(e){
	my.mouse.x = e.clientX;
	my.mouse.y = e.clientY;
}).on('resize', function(){
	context.hide();
	clearTimeout(context.resizeTimer);
	context.resizeTimer = setTimeout(function(){
	}, 100);
});