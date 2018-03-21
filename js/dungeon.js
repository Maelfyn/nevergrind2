var dungeon = {
	go: function() {
		chat.size.small();
		ng.setScene('dungeon');
		dungeon.init();
		console.info("DUNGEON GO");
	},
	initialized: 0,
	init: function() {
		my.zoneMobs.forEach(function(v){
			cache.preload.mob(v);
		});
		if (dungeon.initialized) {
			document.getElementById('scene-dungeon').style.display = 'block';
		}
		else {
			document.getElementById('scene-dungeon').innerHTML = dungeon.html();
			battle.events();
		}
		chat.scrollBottom();
	},
	events: function() {

	},
	html: function() {
		var s =
		'<img id="dungeon-bg" class="img-bg" src="/img2/dungeon/braxxen1.jpg">' +

		'</img>';

		return s;
	},
	enterCombat: function() {
		console.info("ENTERING COMBAT");
	}
}