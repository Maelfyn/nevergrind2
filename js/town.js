var town = {
	go: function(){
		if (create.selected) {
			ng.lock(1);
			$.ajax({
				url: app.url + 'php2/character/loadCharacter.php',
				data: {
					row: create.selected
				}
			}).done(function(data) {
				socket.init();
				var z = data.characterData;
				my.name = z.name;
				my.job = z.job;
				my.race = z.race;
				my.level = z.level;
				my.row = z.row;
				my.party[my.index] = z;
				// init party member values
				for (var i=1; i<game.maxPlayers; i++) {
					my.party[i] = my.Party();
				}
				console.info('my.party[my.index]: ', my.party[my.index]);
				ng.setScene('town');
				town.init();
				chat.init(1);
				chat.log("There are currently " + data.count + " players exploring Vandamor.", 'chat-emote');
				chat.friend.init();
				chat.ignore.init();
				game.start();
				chat.setRoom(data.players);
				bar.init();
			}).fail(function(data){
				ng.disconnect(data.responseText);
			}).always(function(){
				ng.unlock();
			});
		}
	},
	html: function(){
		var s =
			'<img id="town-bg" class="img-bg" src="img2/town2.jpg">'+
			'<div id="town-footer" class="text-shadow2">' +
				'<hr id="town-footer-hr1" class="footer-hr">' +
				'<div id="town-footer-flex">' +
					'<span id="town-mission-counter" class="center">Mission Counter</span>' +
				'</div>' +
				'<hr id="town-footer-hr2"  class="footer-hr">' +
			'</div>';

		return s;
	},
	events: function(){

	},
	initialized: 0,
	init: function(){
		if (!town.initialized) {
			town.initialized = 1;
			document.getElementById('scene-town').innerHTML = town.html();
			town.events();
			$("#scene-title").remove();
			if (!sessionStorage.getItem('startTime')) {
				sessionStorage.setItem('startTime', JSON.stringify(Date.now()));
			}
		}
	}
};