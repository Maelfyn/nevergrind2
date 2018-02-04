
// player data values
var my = {
	lastReceivedWhisper: '',
	team: 0,
	gameName: 'Earth Alpha',
	slot: 1,
	tgt: 1,
	attackOn: false,
	hudTimer: g.TDC(),
	hud: function(msg, d){
		my.hudTimer.kill();
		DOM.hud.style.visibility = 'visible';
		DOM.hud.textContent = msg;
		if (d){
			timer.hud = TweenMax.to(DOM.hud, 5, {
				onComplete: function(){
					DOM.hud.style.visibility = 'hidden';
				}
			});
		}
	},
	clearHud: function(){
		my.hudTimer.kill();
		DOM.hud.style.visibility = 'hidden';
	},
	nextTarget: function(backwards){},
	exitGame: function(bypass){
		if (g.view === 'game'){
			var r = confirm("Are you sure you want to surrender?");
		}
		if (r || bypass || g.view !== 'game'){
			g.lock(1);
			$.ajax({
				url: app.url + 'php/exitGame.php',
				data: {
					view: g.view
				}
			}).always(function(){
				location.reload();
			});
		}
	}
};