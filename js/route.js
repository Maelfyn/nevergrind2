// route.js
var route = {
	town: function(data, r) {
		if (r === 'chat->log') {
			if (data.name === my.name) {
				chat.log(data.msg, data.class);
			}
			else if (g.ignore.indexOf(data.name) === -1) {
				chat.log(data.msg, data.class);
			}
			else {
				console.warn("Message from " + data.name + " has been ignored.");
			}
		}
		else if (r === 'chat->add') {
			console.info('chat.inChannel', data.row, chat.inChannel);
			chat.addPlayer(data);
		}
		else if (r === 'chat->remove') {
			chat.removePlayer(data);
		}
	}
};