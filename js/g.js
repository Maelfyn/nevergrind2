// core.js
var g = {
	events: function(x){
		$(window).focus(function(){
			document.title = g.defaultTitle;
			g.titleFlashing = false;
			if (g.notification.close !== undefined){
				g.notification.close();
			}
		});
		$("img").on('dragstart', function(e) {
			e.preventDefault();
		});
		$(window).on('resize orientationchange focus', function() {
			env.resizeWindow();
		}).on('load', function(){
			env.resizeWindow();
		});
	},
	races: [
		'Barbarian',
		'Dark Elf',
		'Dwarf',
		'Erudite',
		'Gnome',
		'Half Elf',
		'Halfling',
		'High Elf',
		'Human',
		'Ogre',
		'Troll',
		'Wood Elf'
	],
	jobs: [
		'Bard',
		'Cleric',
		'Druid',
		'Enchanter',
		'Magician',
		'Monk',
		'Necromancer',
		'Paladin',
		'Ranger',
		'Rogue',
		'Shadowknight',
		'Shaman',
		'Warrior',
		'Wizard'
	],
	jobShort: {
		Bard: 'BRD',
		Cleric: 'CLR',
		Druid: 'DRU',
		Enchanter: 'ENC',
		Magician: 'MAG',
		Monk: 'MNK',
		Necromancer: 'NEC',
		Paladin: 'PLD',
		Ranger: 'RNG',
		Rogue: 'ROG',
		Shadowknight: 'SHD',
		Shaman: 'SHM',
		Warrior: 'WAR',
		Wizard: 'WIZ'
	},
	toJobShort: function(key){
		return g.jobShort[key];
	},
	jobLong: {
		BRD: 'Bard',
		CLR: 'Cleric',
		DRU: 'Druid',
		ENC: 'Enchanter',
		MAG: 'Magician',
		MNK: 'Monk',
		NEC: 'Necromancer',
		PLD: 'Paladin',
		RNG: 'Ranger',
		ROG: 'Rogue',
		SHD: 'Shadowknight',
		SHM: 'Shaman',
		WAR: 'Warrior',
		WIZ: 'Wizard'
	},
	toJobLong: function(key){
		return g.jobLong[key];
	},
	copy: function(o){
		return JSON.parse(JSON.stringify(o));
	},
	attrs: ['str', 'sta', 'agi', 'dex', 'wis', 'intel', 'cha'],
	resists: ['bleed', 'poison', 'arcane', 'lightning', 'fire', 'cold'],
	dungeon: ['traps', 'treasure', 'scout', 'pulling'],
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
	lockOverlay: document.getElementById("lock-overlay"),
	startTime: Date.now(),
	locked: 0,
	loadAttempts: 0,
	isModalOpen: false,
	camel: function(str){
		str = str.split("-");
		for (var i=1, len=str.length; i<len; i++){
			str[i] = str[i].charAt(0).toUpperCase() + str[i].substr(1);
		}
		return str.join("");
	},
	lock: function(hide){
		g.lockOverlay.style.display = "block";
		g.lockOverlay.style.opacity = hide ? 0 : 1;
		g.locked = 1;
	},
	unlock: function(){
		g.lockOverlay.style.display = "none";
		g.locked = 0;
	},
	unlockFade: function(d){
		if (!d){
			d = 1;
		}
		TweenMax.to(g.lockOverlay, d, {
			startAt: {
				opacity: 1,
			},
			ease: Power3.easeIn,
			opacity: 0,
			onComplete: function(){
				g.lockOverlay.style.display = 'none';
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
		if (d === undefined || d < 2){
			d = 2;
		}
		// unlock game modal?
        if (msg.indexOf('unlock-game') > -1){
            modal.show({
                key: 'unlock-game',
                focus: 1
            });
            TweenMax.set('#msg', {
                visibility: 'hidden'
            });
        }
		TweenMax.to(dom.msg, d, {
			overwrite: 1,
			startAt: {
				visibility: 'visible',
				alpha: 1
			},
			onComplete: function(){
				TweenMax.to(this.target, .2, {
					alpha: 0,
					onComplete: function(){
						TweenMax.set(this.target, {
							visibility: 'hidden',
						});
					}
				});
			}
		});
	},
	split: function(e, msg, d){
		if (d === undefined){
			d = .01;
		}
		var e = document.getElementById(e);
		e.innerHTML = msg;
		if (init.isMobile){
			
		}
		else if (e !== null){
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
			auth2.signOut().then(function(){
			});
		} catch (err){
			console.info('Google error: ', err);
		}
		
		setTimeout(function(){
			$.ajax({
				type: 'GET',
				url: 'php/logout.php'
			}).done(function(data) {
				g.msg("Logout successful");
				localStorage.removeItem('email');
				localStorage.removeItem('token');
				location.reload();
			}).fail(function() {
				g.msg("Logout failed.");
			});
		}, 1000);
	},
	goCreateCharacter: function(){
		g.lock(1);
		var z = '#title-scene-select-character',
			prom = 0,
			allDone = function(){
				if (++prom === 2){
					g.unlock();
					// init create screen and show
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
                            $("#create-character-name").focus();
							g.unlock();
						}
					});
				}
			};
		// hide
		TweenMax.to(z, .6, {
			y: 20,
			opacity: 0,
			onComplete: function(){
				allDone();
			}
		});
		
		$.ajax({
			type: 'GET',
			url: 'php2/create/getStatMap.php'
		}).done(function(r){
			var r = r.statMap;
			g.races.forEach(function(v){
				create.raceAttrs[v] = r[v].attrs;
				create.possibleJobs[v] = r[v].jobs;
			});
			// job stats
			g.jobs.forEach(function(v){
				create.jobAttrs[v] = r.jobs[v];
			});
            $("#create-character-name").val('');
			allDone();
		});
	},
	loadAllCharacters: function(){
		$.ajax({
			type: 'GET',
			url: 'php2/create/loadAllCharacters.php'
		}).done(function(r){
			var s = '';
			r.forEach(function(d){
				// #ch-card-list
				s += 
				'<div data-row="'+ d.row +'" '+
					'data-name="'+ d.name +'" '+
					'class="btn btn-lg ch-card center select-player-card">'+
					'<div class="ch-card-name">'+ d.name +'</div>'+
					'<div class="ch-card-details">'+ d.level +' '+ d.race +' '+ g.toJobLong(d.job) +'</div>'+
				'</div>';
			});
			document.getElementById('ch-card-list').innerHTML = s;
			$(".select-player-card:first").trigger(env.click);
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
location.search === '?create' && g.goCreateCharacter();