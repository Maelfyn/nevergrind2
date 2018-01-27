var route = {
	town: function(data, r) {
		if (r === 'chat-normal') {
			chat.log(data.msg, data.route);
		}
	}
}