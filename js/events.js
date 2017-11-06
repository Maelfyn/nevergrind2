var events = {
	core: (function(){
		$(window).focus(function(){
			document.title = g.defaultTitle;
			g.titleFlashing = false;
			if (g.notification.close !== undefined){
				g.notification.close();
			}
		});
		$(window).on('resize orientationchange focus', function() {
			env.resizeWindow();
		}).on('load', function(){
			env.resizeWindow();
			// background map
			if (init.isMobile){
				document.getElementById('worldTitle').style.display = 'none';
				TweenMax.set('#worldTitle', {
					xPercent: -50,
					yPercent: -50,
					top: '50%',
					left: '50%',
					width: '1600px',
					height: '1600px'
				});
			} else {
				TweenMax.to("#worldTitle", 600, {
					startAt: {
						xPercent: -50,
						yPercent: -50,
						rotation: -360
					},
					rotation: 0,
					repeat: -1,
					ease: Linear.easeNone
				});
			}
		});
	})(),
	title: (function(){
		$("img").on('dragstart', function(e) {
			e.preventDefault();
		});
		$("#logout").on(env.click, function() {
			g.logout();
		});
		$("#ch-card-base").on(env.click, '.ch-card', function(e){
			$('.ch-card').removeClass('ch-card-active');
			$(this).addClass('ch-card-active');
		});
		$('.ch-card:first').trigger('click');
		
		var tl = g.TM(),
			e = '#title-select-character',
			e2 = '#title-create-character';
		tl.to(e, 1, {
			delay: 1,
			rotationY: 90,
			ease: Quad.easeOut,
			onComplete: function(){
				TweenMax.set(e, {
					display: 'none'
				});
			}
		}).to(e2, 1, {
			startAt: {
				display: 'block',
				rotationY: 270
			},
			rotationY: 360,
			ease: Quad.easeOut
		});
		
		var tl2 = new TimelineMax();
		tl2
	})(),
	lobby: (function(){
		$("#chat-input-open").on(env.click, function(){
			toggleChatMode();
		});
		$("#chat-input-send").on(env.click, function(){
			toggleChatMode(true);
		});
		$("#lobby-chat-input").on('focus', function(){
			lobby.chatOn = true;
		}).on('blur', function(){
			lobby.chatOn = false;
		});
		$("#lobbyChatSend").on(env.click, function(){
			lobby.sendMsg(true);
		});
		// prevents auto scroll while scrolling
		$("#lobbyChatLog").on('mousedown', function(){
			lobby.chatDrag = true;
		}).on('mouseup', function(){
			lobby.chatDrag = false;
		});
		$("#joinGameLobby").on(env.click, '.governmentChoice', function(e){
			// changes player's own government only
			var government = $(this).text();
			lobby.updateGovernmentWindow(government);
			$.ajax({
				url: "php/changeGovernment.php",
				data: {
					government: government
				}
			});
		}).on(env.click, '.cpu-choice', function(e){
			var difficulty = $(this).text();
			$.ajax({
				url: "php/change-cpu-difficulty.php",
				data: {
					difficulty: difficulty,
					player: $(this).data('player')
				}
			});
		}).on(env.click, '.playerColorChoice', function(e){
			var playerColor = $(this).data('playercolor');
			$.ajax({
				url: 'php/changePlayerColor.php',
				data: {
					playerColor: playerColor*1
				}
			}).done(function(data){
				my.playerColor = data.playerColor;
			}).fail(function(data){
				Msg(data.statusText, 1.5);
			});
		}).on(env.click, '.teamChoice', function(e){
			var team = $(this).text().slice(5),
				player = $(this).data('player');
			console.info("TEAM: ", team, player);
			$.ajax({
				url: 'php/changeTeam.php',
				data: {
					team: team,
					player: player
				}
			}).done(function(data) {
				my.team = data.team;
			});
			
		}).on(env.click, '#cpu-add-player', function(e){
			//console.info("Adding player");
			audio.play('click');
			lobby.addCpuPlayer();
		}).on(env.click, '#cpu-remove-player', function(e){
			//console.info("Removing player");
			audio.play('click');
			$.ajax({
				url: 'php/cpu-remove-player.php' 
			});
		});
	})(),
	map: (function(){
		if (!env.isFirefox){
			$("body").on("mousewheel", function(e){
				if (g.view === 'game'){
					setMousePosition(e.offsetX, e.offsetY);
					worldMap[0].applyBounds();
				}
			});
			$("#worldWrap").on("mousewheel", function(e){
				e.originalEvent.wheelDelta > 0 ? mouseZoomIn(e) : mouseZoomOut(e);
				worldMap[0].applyBounds();
			});
		} else {
			$("body").on("DOMMouseScroll", function(e){
				if (g.view === 'game'){
					setMousePosition(e.originalEvent.layerX, e.originalEvent.layerY);
					worldMap[0].applyBounds();
				}
			});
			$("#worldWrap").on("DOMMouseScroll", function(e){
				e.originalEvent.detail > 0 ? mouseZoomOut(e) : mouseZoomIn(e);
				worldMap[0].applyBounds();
			});
		}

		$("#worldWrap").on("mousemove", function(e){
			if (env.isFirefox){
				setMousePosition(e.originalEvent.layerX, e.originalEvent.layerY);
			} else {
				setMousePosition(e.offsetX, e.offsetY);
				//console.info(e.offsetX, e.offsetY);
			}
		});
		$("#resources-ui").on(env.click, '#surrender', function(e){
			surrenderMenu(); 
		});
		$("#createGameWrap").on(env.click, '.mapSelect', function(e){
			var x = $(this).text();
			var key = x.replace(/ /g,'');
			g.map.name = x;
			g.map.key = key;
			document.getElementById('createGameMap').innerHTML = x;
			document.getElementById('createGameTiles').innerHTML = title.mapData[key].tiles;
			document.getElementById('createGamePlayers').innerHTML = title.mapData[key].players;
			var e1 = $("#gamePlayers");
			e1.attr("max", title.mapData[key].players);
			if (e1.val() * 1 > title.mapData[key].players){
				e1.val(title.mapData[key].players);
			}
			e.preventDefault();
		});
		$("#mainWrap").on(env.click, '.gameSelect', function(e){
			e.preventDefault();
		});
		$("#mainWrap").on(env.click, '.speedSelect', function(e){
			var x = $(this).text()*1;
			g.speed = x;
			$("#createGameSpeed").text(x);
			localStorage.setItem('gameSpeed2', x);
			e.preventDefault();
		});
	})(),
	audio: (function(){
		$("#bgmusic").on('ended', function() {
			var x = document.getElementById('bgmusic');
			x.currentTime = 0;
			x.play();
		});
		$("#bgamb1").on('ended', function() {
			var x = document.getElementById('bgamb1');
			x.currentTime = 0;
			x.play();
		});
		$("#bgamb2").on('ended', function() {
			var x = document.getElementById('bgamb2');
			x.currentTime = 0;
			x.play();
		});
	})(),
	game: (function(){
		$("#cancelSurrenderButton").on(env.click, function(){
			audio.play('click');
			document.getElementById('surrenderScreen').style.display = 'none';
		});
		$("#surrenderButton").on(env.click, function(){
			surrender();
		});
	})()
};


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

 $("#dictatorAvatar").on('change', function(e){
	 var e2 = $("#uploadErr");
	 function imgError(msg){
		e2.html(msg);
		audio.play('error');
	 }
	 var file = e.target.files[0];
	 var reader = new FileReader();
	 reader.readAsDataURL(file);
	 if (file.type !== 'image/jpeg'){
		imgError('Wrong file type! Image must be in jpg format.');
	 } else {
		 reader.addEventListener("load", function(){
			if (reader.result.length < 64000){
				$.ajax({
					url: "php/uploadDictator.php",
					type: "POST",
					data: {
						uri: reader.result
					},
					beforeSend: function(){
						e2.text('');
					}
				}).done(function(data){
					e2.text("Avatar updated successfully!");
					document.getElementById('configureAvatarImage').src = reader.result;
				}).fail(function(data){
					imgError(data.statusText);
				});
			} else {
				imgError('File size too large! Image must be less than 40 kb.');
				e2.html();
			}
		 }, false);
	 }
 });