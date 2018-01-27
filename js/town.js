var p = {};
var town = {
	go: function(){
		console.warn("ROUTING: ", create.selected);
		if (create.selected) {
			g.lock(1);
			$.ajax({
				url: g.url + 'php2/character/loadCharacter.php',
				data: {
					row: create.selected
				}
			}).done(function(data) {
				socket.init();
				p[data.characterData.name] = data.characterData;
				console.info('loadCharacter: ', p[data.characterData.name]);
				g.setScene('town');
				town.init();
				chat.init(1);
			}).fail(function(data){
				console.info(data);
				g.msg(data.responseText, 1.5);
			}).always(function(){
				g.unlock();
			});
		}
	},
	html: function(){
		var s =
			'<img id="town-bg" class="img-bg" src="img2/town.jpg">'+
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
		if (g.view !== 'town' && !town.initialized) {
			town.initialized = 1;
			document.getElementById('scene-town').innerHTML = town.html();
			town.events();
			$("#scene-title").remove();
		}
	}
}