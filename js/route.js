var route = {
	town: function(data, r) {
		if (r === 'rx-chat') {
			chat.log(data.msg, data.type);
			console.info('msg rx time: ', Date.now() - chat.sendTimer);
		}
	}
}