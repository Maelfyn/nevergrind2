var guild = {
	hasFocus: 0,
	create: function() {
		var name = $("#guild-input").val().replace(/\]/g, '').trim();
		console.info("Name: ", name);
		ng.lock();
		$.ajax({
			url: app.url + 'php2/guild/create.php',
			data: {
				name: name.replace(/\]/g, '').trim()
			}
		}).done(function(data) {
			console.info(data);
			my.guild = data;
			chat.log('Valeska Windcrest says, "By the powers vested in me, I hereby declare you supreme sovereign Leader of a new guild: ' + data.name +'."');
			chat.log('Type /help to view guild commands', 'chat-emote');
			socket.initGuild();
			town.aside.update('town-guild');
			// redraw the #aside-menu with new option
		}).fail(function(data){
			console.info(data);
			ng.msg(data.responseText);
		}).always(function(){
			ng.unlock();
		});
	}
}