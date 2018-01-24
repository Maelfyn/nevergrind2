var town = {
	go: function(){
		town.init();
		g.setScene('town');
		socket.init();
		chat.set(1);
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
		town.initialized = 1;
		document.getElementById('scene-town').innerHTML = town.html();
		town.events();
		$("#scene-title").remove();
	}
}