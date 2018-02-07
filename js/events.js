window.onbeforeunload = function(){
	chat.broadcast.remove();
	//return "Are you sure you want to leave the game? Use /camp to save your game!";
}

$(document).on(env.click, function(e){
	g.setIdleDate();
	e.preventDefault();
	return false;
}).on('keydown', function(e){
	var code = e.keyCode,
		key = e.key;

	g.setIdleDate();
	console.info('keydown: ', key, code);
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
			return false;
		}
		else if (!chat.hasFocus && code === 65) {
			e.preventDefault();
		}
	} else {
		if (g.view === 'title'){
			if (!g.isModalOpen){
				$("#create-character-name").focus();
			}
		} else {
			// always works town,dungeon and combat
			// has chat focus
			if (code === 38) {
				// chat focus history nav up
				if (chat.history[chat.historyIndex - 1] !== undefined) {
					var msg = chat.history[--chat.historyIndex];
					chat.dom.chatInput.value = msg;
				}
			}
			else if (code === 40) {
				// chat focus history nav down
				if (chat.history.length === chat.historyIndex + 1) {
					chat.historyIndex++;
					chat.clear();
				}
				else if (chat.history[chat.historyIndex + 1] !== undefined) {
					var msg = chat.history[++chat.historyIndex];
					chat.dom.chatInput.value = msg;
				}
			} else if (code === 13) {
				// enter
				my.name && chat.sendMsg();
			}

			if (g.view === 'town') {
				if (!chat.hasFocus) {
					// no chat focus
					$("#chat-input").focus();
				} else {
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
	} else if (g.view === 'lobby'){
		if (lobby.chatOn){
			if (x === 13){
				// enter - sends chat
				lobby.sendMsg();
			}
		}
	// game hotkeys
	} else if (g.view === 'game'){
		if (g.chatOn){
			if (x === 13){
				// enter/esc - sends chat
				toggleChatMode(true);
			} else if (x === 27){
				// esc
				toggleChatMode();
			}
		} else {
			if (x === 13){
				// enter
				toggleChatMode();
			}  else if (x === 27){
				// esc
				my.attackOn = false;
				my.attackName = '';
				my.clearHud();
				env.showTarget(DOM['land' + my.tgt]); 
				//console.clear();
			} else if (x === 65){
				// a
				var o = new Target();
				action.target(o);
			} else if (x === 83){
				// s
				var o = new Target({
					cost: 1, 
					attackName: 'splitAttack',
					hudMsg: 'Split Attack: Select Target',
					splitAttack: true
				});
				console.info(o.cost);
				action.target(o);
			} else if (x === 68){
				// d
				if (!g.keyLock){
					action.deploy();
				}
			} else if (x === 82){
				// r
				if (!g.keyLock){
					if (e.ctrlKey){
						var x = my.lastReceivedWhisper;
						if (x){
							if (g.view === 'title'){
								$("#chat-input").val('/w ' + x + ' ').focus();
							} else if (g.view === 'lobby'){
								$("#chat-input").val('/w ' + x + ' ').focus();
							} else {
								if (!g.chatOn){
									toggleChatMode();
								}
								$("#chat-input").val('/w ' + x + ' ').focus();
							}
						}
						return false;
					} else {
						action.rush();
					}
				}
			} else if (x === 89){
				// y
				research.masonry();
			} else if (x === 79){
				// o
				research.construction();
			} else if (x === 69){
				// e
				research.engineering();
			} else if (x === 71){
				// g
				research.gunpowder();
			} else if (x === 75){
				// k
				research.rocketry();
			} else if (x === 84){
				// t
				research.atomicTheory();
			} else if (x === 70){
				// f
				research.futureTech();
			} else if (x === 66){
				// b
				action.upgradeTileDefense();
			} else if (x === 67){
				// c
				var o = new Target({
					cost: 0,
					minimum: 0,
					attackName: 'cannons',
					hudMsg: 'Fire Cannons'
				});
				action.target(o);
			} else if (x === 77){
				// m
				var o = new Target({
					cost: 0,
					minimum: 0,
					attackName: 'missile',
					hudMsg: 'Launch Missile'
				});
				action.target(o);
			} else if (x === 78){
				// n
				var o = new Target({
					cost: 0,
					minimum: 0,
					attackName: 'nuke',
					hudMsg: 'Launch Nuclear Weapon'
				});
				action.target(o);
			}
		}
	}
});