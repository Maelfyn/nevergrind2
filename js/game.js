// game specific data
var game = {
	maxPlayers: 6,
	heartbeat: {
		timer: 0,
		start: function() {
			game.heartbeat.send();
			game.heartbeat.update();
			game.played.start();
		},
		update: function() {
			clearTimeout(game.heartbeat.timer);
			game.heartbeat.timer = setTimeout(function(){
				game.heartbeat.send();
				game.heartbeat.update();
			}, 5000);
		},
		send: function() {
			clearTimeout(title.keepAliveTimer);
			$.ajax({
				type: 'GET',
				url: app.url + 'php2/heartbeat.php'
			}).done(function(){
				// nothing
			}).fail(function(){
				clearTimeout(game.heartbeat.timer);
				game.heartbeat.timer = setTimeout(function(){
					game.heartbeat.update();
				}, 1000);
			});

		}
	},
	played: {
		timer: 0,
		start: function() {
			clearInterval(game.played.timer);
			game.played.timer = setInterval(function(){
				var d = Date.now() - g.idleDate;
				console.info("played.timer", d);
				//if (d > 900000 * 4) {
				if (0) {
					// 60 minutes now!
					// disconnect - idle 15 minutes
					g.disconnect();
				}
				else {
					$.ajax({
						type: 'GET',
						url: app.url + 'php2/update-played.php'
					}).done(function(){
						!app.isLocal && console.clear();
						setTimeout(function() {
							socket.zmq.publish('name:' + my.name, {
								ping: 1
							});
						}, 30000);
					}).fail(function(){
						setTimeout(function(){
							game.played.start();
						}, 10000);
					});
				}
			}, 60000);
		}

	},
	name: '',
	initialized: false,
	getGameState: function(){
		// use as a reality check in case zmq messes up 
		// or to init game state?
		// or check that players are still online?
		$.ajax({
			type: 'GET',
			url: app.url + 'php/getGameState.php'
		}).done(function(data){
			console.info('getGameState ', data);
			// get tile data
		}).fail(function(data){
			console.info(data.responseText);
		});
	},
	getPetName:  function() {
		var x = ~~(Math.random()*(26))+1,
			y = ~~(Math.random()*16)+1,
			z = ~~(Math.random()*(5))+1,
			i = "Jo",
			j = "bek",
			k = "er";
		if(x===1){ i = "Ga"; }
		if(x===2){ i = "Ge"; }
		if(x===3){ i = "Go"; }
		if(x===4){ i = "Gi"; }
		if(x===5){ i = "Ja"; }
		if(x===6){ i = "Jo"; }
		if(x===7){ i = "Je"; }
		if(x===8){ i = "Ji"; }
		if(x===9){ i = "Ka"; }
		if(x===10){ i = "Ke"; }
		if(x===11){ i = "Ko"; }
		if(x===12){ i = "Ki"; }
		if(x===13){ i = "La"; }
		if(x===14){ i = "Le"; }
		if(x===15){ i = "Lo"; }
		if(x===16){ i = "Li"; }
		if(x===17){ i = "Va"; }
		if(x===18){ i = "Ve"; }
		if(x===19){ i = "Vo"; }
		if(x===20){ i = "Xa"; }
		if(x===21){ i = "Xe"; }
		if(x===22){ i = "Xo"; }
		if(x===23){ i = "Za"; }
		if(x===24){ i = "Ze"; }
		if(x===25){ i = "Zo"; }
		if(x===26){ i = "Bo"; }
		if(y===1){ j = "b"; }
		if(y===2){ j = "ban"; }
		if(y===3){ j = "bar"; }
		if(y===4){ j = "bek"; }
		if(y===5){ j = "bob"; }
		if(y===6){ j = "rek"; }
		if(y===7){ j = "rar"; }
		if(y===8){ j = "nar"; }
		if(y===9){ j = "ran"; }
		if(y===10){ j = "sar"; }
		if(y===11){ j = "sek"; }
		if(y===12){ j = "sob"; }
		if(y===13){ j = "n"; }
		if(y===14){ j = "s"; }
		if(y===15){ j = "k"; }
		if(y===16){ j = "n"; }
		if(z===1){ k = "tik"; }
		if(z===2){ k = "n"; }
		if(z===3){ k = "er"; }
		if(z===4){ k = "ab"; }
		if(z===5){ k = ""; }
		return i+j+k;
	}
};