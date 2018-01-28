var route = {
	town: function(data, r) {
		if (r === 'chat.log') {
			chat.log(data.msg, data.class);
		}
	}
}