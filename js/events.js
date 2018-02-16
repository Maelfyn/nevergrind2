onbeforeunload = function(){
	// attempt to remove player from game
	$.ajax({
		type: 'GET',
		url: app.url + 'php2/chat/camp.php'
	});
	chat.broadcast.remove();
	if (socket.enabled) {
		socket.zmq.publish('friend:' + my.name, {
			name: my.name,
			route: 'off'
		});
		if (my.p_id) {
			socket.zmq.publish('party:' + my.p_id, {
				name: my.name,
				route: 'party->disband'
			});
		}
		socket.zmq.close();
	}
}

$(document).on(env.click, function(e){
	e.preventDefault();
	return false;
}).on('keydown', function(e){
	var code = e.keyCode,
		key = e.key;

	g.lastKey = key;

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
		else if (!chat.hasFocus && code === 65) {
			// no select all of webpage elements
			e.preventDefault();
		}
	} else {
		if (g.view === 'title'){
			if (!g.isModalOpen){
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

			if (g.view === 'town') {
				if (chat.hasFocus) {
					if (chat.mode.change()) {
						// changing chat mode - matches possible mode change
						return false;
					}
				} else {
					// no chat focus
					chat.dom.chatInput.focus();
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
					if (g.view === 'game' && !g.chatOn) {
						game.toggleGameWindows(1);
					}
				}
			}
		}
	}
}).on('keyup', function(e) {
	var x = e.keyCode;
	//console.info(x);
	if (g.view === 'title'){
		if (x === 13){
			if (g.focusUpdateNationName){
				title.submitNationName();
			} else if (g.focusGameName){
				title.createGame();
			} else if (title.chatOn){
				if (x === 13){
					// enter - sends chat
					title.sendMsg();
				}
			} else if (title.createGameFocus){
				title.createGame();
			}
		} else if (x === 27){
			// esc
			title.closeModal();
		}
	} else {
	}
});