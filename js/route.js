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
	}
};