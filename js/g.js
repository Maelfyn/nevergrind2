// core.js
g = {
	events: function(){
		$(window).focus(function(){
			document.title = g.defaultTitle;
			g.titleFlashing = false;
			if (g.notification.close !== undefined){
				g.notification.close();
			}
		});
		$(window).on('resize orientationchange focus', function() {
			env.resizeWindow();
		}).on('load', function(){
			env.resizeWindow();
		});
	},
	gameDuration: 0,
	delay: init.isMobile ? 0 : .5,
	modalSpeed: init.isMobile ? 0 : .5,
	friends: [],
	ignore: [],
	joinedGame: false,
	searchingGame: false,
	defaultTitle: 'Nevergrind Online',
	titleFlashing: false,
	name: "",
	password: "",
	view: "title",
	resizeX: 1,
	resizeY: 1,
	sfxFood: false,
	sfxCulture: false,
	chatOn: false,
	overlay: document.getElementById("overlay"),
	startTime: Date.now(),
	keyLock: false,
	loadAttempts: 0,
	isModalOpen: false,
	lock: function(hide){
		g.overlay.style.display = "block";
		g.overlay.style.opacity = hide ? 0 : 1;
		g.keyLock = true;
	},
	unlock: function(){
		g.overlay.style.display = "none";
		g.keyLock = false;
	},
	unlockFade: function(d){
		if (!d){
			d = 1;
		}
		TweenMax.to(g.overlay, d, {
			startAt: {
				opacity: 1,
			},
			ease: Power3.easeIn,
			opacity: 0,
			onComplete: function(){
				g.overlay.style.display = 'none';
			}
		});
	},
	updateUserInfo: function(){
		if (location.host !== 'localhost'){
			$.ajax({
				async: true,
				type: 'GET',
				dataType: 'jsonp',
				url: 'https://geoip-db.com/json/geoip.php?jsonp=?'
			}).done(function(data){
				data.latitude += '';
				data.longitude += '';
				g.geo = data;
				$.ajax({
					url: 'php/updateUserInfo.php',
					data: {
						location: g.geo
					}
				}).done(function(){
					localStorage.setItem('geo', JSON.stringify(g.geo));
					localStorage.setItem('geoSeason', 1);
					localStorage.setItem('geoTime', Date.now());
				});
				//console.info('loc: ', g.geo);
			});
		}
	},
	checkPlayerData: function(){
		// not a guest
		var geo = localStorage.getItem(my.account+ '_geo');
		var geoTime = localStorage.getItem(my.account+ '_geoTime');
		var geoSeason = localStorage.getItem(my.account+ '_geoSeason');
		if (geoTime !== null || geoSeason === null){
			// longer than 90 days?
			if ((Date.now() - geoTime) > 7776000 || geoSeason === null){
				g.updateUserInfo();
			}
		} else if (geo === null){
			g.updateUserInfo();
		}
		// ignore list
		var ignore = localStorage.getItem('ignore');
		if (ignore !== null){
			g.ignore = JSON.parse(ignore);
		} else {
			var foo = []; 
			localStorage.setItem('ignore', JSON.stringify(foo));
		}
		setTimeout(function(){
			chat.friendGet();
		}, 100);
	},
	TDC: function(){
		return new TweenMax.delayedCall(0, '');
	},
	TM: function(o){
		o = o || {};
		return new TimelineMax(o);
	},
	config: {
		audio: {
			musicVolume: 10,
			soundVolume: 50
		}
	},
	geo: {},
	keepAlive: function(){
		$.ajax({
			type: 'GET',
			url: "php/keepAlive.php"
		}).always(function() {
			setTimeout(g.keepAlive, 120000);
		});
	},
	notification: {},
	sendNotification: function(data){
		if (!document.hasFocus() && g.view !== 'game' && typeof Notification === 'function'){
			
			Notification.requestPermission().then(function(permission){
				if (permission === 'granted'){
					// it's a player message
					var type = ' says: ';
					if (data.flag && (data.msg || data.message)){
						// sent by a player
						if (data.type === 'chat-whisper'){
							type = ' whispers: ';
						}
						var prefix = data.account + type;
						var flagFile = data.flag.replace(/-/g, ' ') + (data.flag === 'Nepal' ? '.png' : '.jpg');
						g.notification = new Notification(prefix, {
							icon: 'images/flags/' + flagFile,
							tag: "Firmament Wars",
							body: data.msg ? data.msg : data.message
						});
						g.notification.onclick = function(){
							window.focus();
						}
						// title flash
						if (!g.titleFlashing){
							g.titleFlashing = true;
							(function repeat(toggle){
								if (!document.hasFocus()){
									if (toggle % 2 === 0){
										document.title = prefix;
									} else {
										document.title = g.defaultTitle;
									}
									setTimeout(repeat, 3000, ++toggle);
								}
							})(0);
						}
						audio.play('chat');
					}
				}
			});
		}
	},
	msg: function(msg, d){
		dom.msg.innerHTML = msg;
		if (d === 0){
			TweenMax.set(dom.msg, {
				overwrite: 1,
				startAt: {
					opacity: 1
				}
			});
		} else {
			if (!d || d < .5){
				d = 2;
			}
			TweenMax.to(dom.msg, d, {
				overwrite: 1,
				startAt: {
					opacity: 1
				},
				onComplete: function(){
					TweenMax.to(this.target, .2, {
						opacity: 0
					});
				}
			});
		}
	},
	split: function(e, msg, d){
		if (d === undefined){
			d = .01;
		}
		var e = document.getElementById(e);
		e.innerHTML = msg;
		if (init.isMobile || e !== null){
			var split = new SplitText(e, {
					type: "words,chars"
				});
			TweenMax.staggerFromTo(split.chars, d, {
				immediateRender: true,
				alpha: 0
			}, {
				delay: .1,
				alpha: 1
			}, .01);
		}
	},
	logout: function(){
		g.lock();
		socket.removePlayer(my.account);
		$.ajax({
			type: 'GET',
			url: 'php/deleteFromFwtitle.php'
		});
		
		try {
			FB.getLoginStatus(function(ret) {
				ret.authResponse && FB.logout(function(response) {});
			});
		} catch (err){
			console.info('Facebook error: ', err);
		}
		
		try {
			var auth2 = gapi.auth2.getAuthInstance();
			auth2.signOut().then(function(){});
		} catch (err){
			console.info('Google error: ', err);
		}
		
		localStorage.removeItem('email');
		localStorage.removeItem('token');
		
		setTimeout(function(){
			$.ajax({
				type: 'GET',
				url: 'php/logout.php'
			}).done(function(data) {
				g.msg("Logout successful");
				localStorage.removeItem('token');
				location.reload();
			}).fail(function() {
				g.msg("Logout failed.");
			});
		}, 1000);
	},
	goCreateCharacter: function(){
		g.lock(1);
		var z = document.getElementById('title-scene-select-character');
		TweenMax.to(z, .6, {
			y: 20,
			opacity: 0,
			onComplete: function(){
				TweenMax.set(z, {
					display: 'none',
					opacity: 1
				});
				create.setRandomGender();
				create.setRandomRace();
				TweenMax.to('#title-scene-create-character', .6, {
					startAt: {
						display: 'block',
						y: 20,
						opacity: 0
					},
					y: 0,
					opacity: 1,
					onComplete: function(){
						g.unlock();
					}
				});
			}
		});
	}
};
g.init = (function(){
	// console.info("Initializing game...");
	$.ajaxSetup({
		type: 'POST',
		timeout: 5000
	});
	TweenLite.defaultEase = Quad.easeOut;
})();
function test(){
	$("#title-container-wrap").css('display', 'none');
	
	var e2 = document.getElementById('ng2-logo-wrap');
	for (var i=0; i<1000; i++){
		var e = document.createElement('img');
		e.id = 'mob' + i;
		e.className = 'abs';
		e.style.top = ~~(Math.random() * 600) +'px';
		e.style.left = ~~(Math.random() * 900) +'px';
		e.src = 'images/an orc.png';
		e2.appendChild(e);
	}
	
	
	(function(){
		for (var i=0; i<1000; i++){
			(function(){
				function setFilter(z) {
					z.style.filter = 'grayscale(100%) sepia(100%) saturate(1000%) ' + filters.hue;
				}
				var z = document.getElementById("mob" + i);
			
				var filters = {
				  hue: "hue-rotate(0deg)"
				};
				
				var tl = new TimelineMax({
					onUpdate: function(){
						setFilter(z);
					},
					repeat: -1
				});
				tl.to(filters, Math.random() * 6 + 1, {
					hue: "hue-rotate(360deg)"
				});
			})();
		}
	})();	
}
location.search === '?create' && g.goCreateCharacter();