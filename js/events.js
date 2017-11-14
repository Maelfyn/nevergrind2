$(document).on('keydown', function(e){
	var x = e.keyCode;
	if (e.ctrlKey){
		if (x === 82){
			// ctrl+r refresh
			return false;
		}
	} else {
		if (g.view === 'title'){
			if (!g.isModalOpen){
				$("#title-chat-input").focus();
			}
		} else if (g.view === 'lobby'){
			$("#lobby-chat-input").focus();
		} else {
			// game
			if (x === 9){
				// tab
				if (!e.shiftKey){
					my.nextTarget(false);
				} else {
					my.nextTarget(true);
				}
				e.preventDefault();
			} else if (x === 86){
				// v
				if (g.view === 'game' && !g.chatOn){
					game.toggleGameWindows(1);
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
								$("#title-chat-input").val('/w ' + x + ' ').focus();
							} else if (g.view === 'lobby'){
								$("#lobby-chat-input").val('/w ' + x + ' ').focus();
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