// game specific data
var game = {
	name: '',
	initialized: false,
	chat: function(data){
		while (DOM.chatContent.childNodes.length > 10) {
			DOM.chatContent.removeChild(DOM.chatContent.firstChild);
		}
		var z = document.createElement('div');
		if (data.type){
			z.className = data.type;
		}
		z.innerHTML = data.message;
		DOM.chatContent.appendChild(z);
		setTimeout(function(){
			if (z !== undefined){
				if (z.parentNode !== null){
					TweenMax.to(z, ui.delay(.125), {
						alpha: 0,
						onComplete: function(){
							if (z.parentNode !== null){
								z.parentNode.removeChild(z);
							}
						}
					});
				}
			}
		}, 12000);
	},
	getGameState: function(){
		// use as a reality check in case zmq messes up 
		// or to init game state?
		// or check that players are still online?
		$.ajax({
			type: 'GET',
			url: "php/getGameState.php"
		}).done(function(data){
			console.info('getGameState ', data);
			// get tile data
		}).fail(function(data){
			console.info(data.responseText);
		});
	}
};