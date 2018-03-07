var mission = {
	data: {},
	loaded: 0,
	init: function() {
		ng.lock();
		$.ajax({
			url: app.url + 'php2/mission/load-mission-data.php'
		}).done(function(data) {
			console.info('load-mission-data', data.mission);
			mission.loaded = 1;
			mission.data = data.mission;
			mission.show();
		}).fail(function(data){
			ng.msg(data.responseText);
		}).always(function(){
			ng.unlock();
		});
	},
	asideHtml: function() {
		var s = '';
		s +=
		'<div>Mission Data</div> ' +
		'<div>'+ JSON.stringify(mission.data) +'</div> ';
		return s;
	},
	show: function() {
		document.getElementById('mission-counter').innerHTML = mission.asideHtml();
	}
}