// core.js
g = {
	gameDuration: 0,
	delay: init.isMobile? 0 : .5,
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
	lock: function(clear){
		g.overlay.style.display = "block";
		clear ? g.overlay.style.opacity = 0 : g.overlay.style.opacity = 1;
		g.keyLock = true;
	},
	unlock: function(clear){
		g.overlay.style.display = "none";
		clear ? g.overlay.style.opacity = 0 : g.overlay.style.opacity = 1;
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
		if (location.host !== 'localhost' && !guest){
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
		if (my.account.indexOf('guest_') !== 0){
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
			chat.friendGet();
		}
	},
	TDC: function(){
		return new TweenMax.delayedCall(0, '');
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
			TweenMax.to(dom.msg, g.delay(d), {
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
		// split text animation
		if (!init.isMobile){
			var tl = new TimelineMax();
			var split = new SplitText(dom.msg, {
				type: "words,chars"
			});
			var chars = split.chars;
			tl.staggerFromTo(chars, .01, {
				immediateRender: true,
				alpha: 0
			}, {
				delay: .1,
				alpha: 1
			}, .01);
		}
	},
	logout: function(){
		function nwLogout(){
			$.ajax({
				type: 'GET',
				url: '/php/logout.php'
			}).done(function(data){
				location.reload();
			}).fail(function(){
				Msg("Logout failed. Is the server on fire?");
			});
		}
		
		g.lock();
		socket.removePlayer(my.account);
		$.ajax({
			type: 'GET',
			url: 'php/deleteFromFwtitle.php'
		});
		
		var auth2 = gapi.auth2.getAuthInstance();
		if (auth2 === null){
			nwLogout();
		} else {
			auth2.signOut().then(function () {
				nwLogout();
			});
		}
		
		localStorage.removeItem('email');
		localStorage.removeItem('token');
	}
};
g.init = (function(){
	// console.info("Initializing game...");
	$.ajaxSetup({
		type: 'POST',
		timeout: 5000
	});
	TweenMax.defaultEase = Quad.easeOut;
	if (!init.isMobile){
		$('[title]').tooltip({
			animation: false
		});
	}
	
	// build map drop-down 
	// <li><a class='flagSelect'>Default</a></li>
	/*
	
	var s = "";
	for (var key in g.flagData){
		s += "<li class='dropdown-header'>" + g.flagData[key].group + "</li>";
		g.flagData[key].name.forEach(function(e){
			s += "<li><a class='flagSelect' href='#'>" + e + "</a></li>";
		});
	}
	document.getElementById("flagDropdown").innerHTML = s;
	
	*/
})();