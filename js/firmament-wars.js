(function($,Math,document,location,TweenMax,TimelineMax,Power0,Power1,Power2,Power3,Power4,Back,Elastic,Bounce,SteppedEase,Circ,Expo,Sine,setTimeout,setInterval,undefined){//payment.js
// payment-confirm
var payment = {
	error: function(msg){
		$("#payment-errors").text(msg);
	},
	init: (function(){
		$("#payment-confirm").on(ui.click, function(e) {
			
			g.lock();
			var response = {};
			var ccNum = $('#card-number').val(),
				cvcNum = $('#card-cvc').val(),
				expMonth = $('#card-month').val(),
				expYear = 20 + $('#card-year').val(),
				error = false;
			// Validate the number:
			if (!Stripe.validateCardNumber(ccNum)) {
				error = true;
				Msg('The credit card number is invalid.');
			}
			// Validate the CVC:
			if (!Stripe.validateCVC(cvcNum)) {
				error = true;
				Msg('The CVC number is invalid.');
			}
			// Validate the expiration:
			if (!Stripe.validateExpiry(expMonth, expYear)) {
				error = true;
				Msg('The expiration date is invalid.');
			}
			if (!error) {
				$('#payment-errors').text('');
				Stripe.createToken({
					number: ccNum,
					cvc: cvcNum,
					exp_month: expMonth,
					exp_year: expYear
				}, stripeResponseHandler);
			} else {
				g.unlock();
			}
			
			function stripeResponseHandler(status, response){
				if (response.error) {
					console.info("ERROR!");
					Msg(response.error.message);
					g.unlock();
				} else {
					// No errors, submit the form.
					Msg("Communicating with the server...");
					$.ajax({
						url: "php/purchaseFw.php",
						data: {
							stripeToken: response.id
						}
					}).done(function(data) {
						Msg("Thank you for your purchase!<br>Firmament Wars - Complete Game Unlocked!", 8);
						setTimeout(function(){
							location.reload();
						}, 3000);
					}).fail(function(data) {
						document.getElementById('payment-errors').textContent = data.error;
					}).always(function(){
						g.unlock();
					});
				}
			}
		});
	})()
};// stats.js 
// scoreboard data values

(function(){
	// attempt auto login
	var isLoggedIn = $("#titleMenu").length;
	if (!isLoggedIn){
		var email = localStorage.getItem('email');
		var token = localStorage.getItem('token');
		if (email){
			// attempt persistent login
			if (token){
				$.ajax({
					type: 'POST',
					url: '/php/master1.php',
					data: {
						run: "authenticate",
						email: email,
						token: token
					}
				}).done(function(data){
					if (data === "Login successful!"){
						$.ajax({
							type: 'POST',
							url: '/php/master1.php', 
							data: {
								run: "getToken",
								email: email
							}
						}).done(function(data){
							token = data;
							$.ajax({
								type: 'POST',
								url: '/php/master1.php',
								data: {
									run: "authenticate",
									email: email,
									token: token
								}
							}).done(function(data){
								console.info(data);
								localStorage.setItem('token', token);
								location.reload();
							}).fail(function(data){
								console.warn(data);
							});
						});
					} else {
						console.warn("Persistent login failed! ", data);
					}
				});
			} else {
				$.ajax({
					type: 'POST',
					url: '/php/master1.php',
					data: {
						run: "getToken",
						email: email
					}
				}).done(function(data){
					token = data;
				});
			}
		}
	}
})();

var stats = {
	init: function(data){
		var flag = my.flag === 'Default.jpg' ? 'Player'+ game.player[my.player].playerColor +'.jpg' : my.flag;
		if (isMobile){
			var str = '<img id="statWorld" style="display: none">';
		} else {
			var str = '<img id="statWorld" src="images/FlatWorld50-2.jpg">';
		}
		str += '<div id="statResult" class="no-select">\
			<span id="statGameResult">Defeat in '+ ui.transformYear(data.resourceTick) +'</span>\
			<img class="statResultFlag pull-left" src="images/flags/'+ flag +'">\
			<img class="statResultFlag pull-right" src="images/flags/'+ flag +'">\
		</div>\
		<div id="statTabWrap" class="no-select">\
			<div id="statOverview" class="statTabs active">\
				Overview\
			</div><div id="statUnits" class="statTabs">\
				Units\
			</div><div id="statStructures" class="statTabs">\
				Structures\
			</div><div id="statWeapons" class="statTabs">\
				Weapons\
			</div><div id="statResources" class="statTabs">\
				Resources\
			</div>\
		</div>\
		<table id="gameStatsTable" class="table"></table>\
		<div id="statFooter" class="container-fluid">\
			<div class="row">\
				<div id="statQuote" class="col-xs-7 stagBlue">\
					<div>'+ stats.data.quote +'</div>\
					<div id="statVerse" class="text-right">'+ stats.data.verse +'</div>\
				</div>\
				<div id="statDuration" class="col-xs-4 stagBlue text-center">\
					<div id="gameDuration">Game Duration '+ stats.gameDuration(g.gameDuration) +'</div>\
					<button id="statsEndGame" class="btn btn-responsive fwBlue shadow4">End Game</button>\
				</div>\
			</div>\
		</div>\
		<div id="ribbonBackdrop"></div>\
		<div id="ribbonReward" class="fw-primary title-modals">\
			<div class="header text-center">\
				<h2 class="header">Achievement Unlocked!</h2>\
			</div>\
			<hr class="fancyhr">\
			<div id="ribbonBody"></div>\
		</div>';
		document.getElementById('statWrap').innerHTML = str;
		stats.events();
		if (isMobile){
			document.getElementById('statWorld').style.display = 'none';
			TweenMax.set('#statWorld', {
				xPercent: -50,
				yPercent: -50,
				top: '50%',
				left: '50%',
				width: '1600px',
				height: '1600px'
			});
		} else {
			TweenMax.to("#statWorld", 300, {
				startAt: {
					xPercent: -50,
					yPercent: -50,
					rotation: -360
				},
				rotation: 0,
				repeat: -1,
				ease: Linear.easeNone
			});
		}
		stats.setLeaderValues();
	},
	show: function(data){
		DOM.bgmusic.loop = true;
		stats.setView('statOverview');
		if (g.victory){
			audio.play('bell-8');
			audio.play('TheAssault', 1);
			document.getElementById('statGameResult').textContent = "Victory in "+ ui.transformYear(stats.data.resourceTick);
		} else {
			audio.play('defeat');
			audio.play("JourneyOfForgottenSoldiers", 1);
		}
		document.getElementById('statWrap').style.visibility = 'visible';
		TweenMax.to('#gameWrap', .5, {
			startAt: {
				alpha: 0
			},
			alpha: 1
		});
		if (stats.achievements.length){
			audio.play('ding3');
			TweenMax.to('#ribbonBackdrop', .5, {
				startAt: {
					visibility: 'visible',
					alpha: 0
				},
				alpha: 1
			});
			TweenMax.to('#ribbonReward', 1, {
				startAt: {
					visibility: 'visible',
					alpha: 0,
					top: 0,
					y: 0
				},
				alpha: 1,
				y: 30
			});
		}
		$("#worldWrap, #targetWrap, #ui2, #resources-ui, #diplomacy-ui, #chat-ui, #chat-input-open, #chat-input-wrap, #surrenderScreen").remove();
	},
	events: function(){
		$("#statWrap").on(ui.click, '.statTabs', function(){
			$(".statTabs").removeClass('active');
			$(this).addClass('active');
			audio.play('switch13');
			// load data
			var id = $(this).attr('id');
			stats.setView(id);
		}).on(ui.click, '#statsEndGame', function(){
			location.reload();
		}).on(ui.click, '#ribbonBackdrop', function(){
			TweenMax.to('#ribbonBackdrop, #ribbonReward', .25, {
				alpha: 0,
				onComplete: function(){
					TweenMax.set('#ribbonBackdrop, #ribbonReward', {
						visibility: 'hidden'
					});
				}
			});
		});
		
	},
	maxValue: {
		unitsTotal: 0,
		structuresTotal: 0,
		weaponsTotal: 0,
		resourcesTotal: 0,
		overviewTotal: 0
	},
	setLeaderValues: function(){
		for (var i=1; i<=8; i++){
			var d = stats.data[i];
			if (d !== undefined){
				for (var key in d){
					if (i === 1){
						stats.maxValue[key] = d[key];
					} else {
						if (d[key] > stats.maxValue[key]){
							stats.maxValue[key] = d[key];
						}
					}
				}
				var units = stats.unitsTotal(i),
					structures = stats.structuresTotal(i),
					weapons = stats.weaponsTotal(i),
					resources = stats.resourcesTotal(i),
					overview = stats.overviewTotal(i);
				
				if (units > stats.maxValue.unitsTotal){
					stats.maxValue.unitsTotal = stats.unitsTotal(i);
				}
				if (structures > stats.maxValue.structuresTotal){
					stats.maxValue.structuresTotal = structures;
				}
				if (weapons > stats.maxValue.weaponsTotal){
					stats.maxValue.weaponsTotal = weapons;
				}
				if (resources > stats.maxValue.resourcesTotal){
					stats.maxValue.resourcesTotal = resources;
				}
				if (overview > stats.maxValue.overviewTotal){
					stats.maxValue.overviewTotal = overview;
				}
			}
		}
	},
	currentTabId: '',
	setView: function(id){
		if (id !== stats.currentTabId){
			stats.currentTabId = id;
			var str = stats[id]();
			document.getElementById('gameStatsTable').innerHTML = str;
		}
	},
	barAnimate: new TweenMax.delayedCall(0, ''),
	animate: function(a, delay){
		setTimeout(function(){
			var x = {
				max: 100,
				lastVal: 0
			};
			stats.barAnimate.kill();
			stats.barAnimate = TweenMax.to(x, delay, {
				startAt: {
					max: 0
				},
				max: 100,
				onUpdate: function(){
					if (~~x.lastVal !== ~~x.max){
						x.lastVal = x.max;
						audio.play('rollover5');
					}
				},
				onComplete: function(){
					audio.play('switch11');
				},
				ease: Sine.easeOut
			});
			for (var i=1, len=a.length; i<len; i++){
				var d = a[i];
				(function(d, e, bar, Sine){
					TweenMax.to(d, delay, {
						startAt: {
							max: 0
						},
						max: d.max,
						onUpdate: function(){
							e.textContent = ~~d.max;
						},
						ease: Sine.easeOut
					});
					TweenMax.to(bar, delay, {
						startAt: {
							width: 0
						},
						width : ((d.max / stats.maxValue[d.key]) * 100) + '%',
						ease: Sine.easeOut
					});
				})(d, document.getElementById(d.id), document.getElementById(d.id + '-bar'), Sine);
			}
		});
	},
	statOverview: function(){
		// head
		var str = stats.playerHead(['Units', 'Structures', 'Weapons', 'Resources', 'Total Score']);
		// player rows
		var animate = [];
		for (var i=1; i<=8; i++){
			var d = stats.data[i];
			if (stats.data[i] !== undefined){
				// player data exists
				var a = [{}, {
						id: 'p'+ i +'-units',
						max: stats.unitsTotal(i),
						key: 'unitsTotal'
					}, {
						id: 'p'+ i +'-structures',
						max: stats.structuresTotal(i),
						key: 'structuresTotal'
					}, {
						id: 'p'+ i +'-weapons',
						max: stats.weaponsTotal(i),
						key: 'weaponsTotal'
					}, {
						id: 'p'+ i +'-resources',
						max: stats.resourcesTotal(i),
						key: 'resourcesTotal'
					}, {
						id: 'p'+ i +'-total',
						max: stats.overviewTotal(i),
						key: 'overviewTotal'
					},
				]
				stats.animate(a, 1.5);
				str += '<tr class="statRow">' +
					stats.playerCell(d, i);
					var color = game.player[i].playerColor,
						a = ['units', 'structures', 'weapons', 'resources', 'total'],
						len = a.length;
					for (var j=0; j<len; j++){
						var sumRow = (j+1 === len) ? ' statSum' : '';
						str += 
						'<td class="stagBlue statTD">\
							<div class="statBar pb'+ color +'">\
								<div id="p'+ i +'-'+ a[j] +'-bar" class="statBarBg pbar'+ color +'">&nbsp</div>\
								<div id="p'+ i +'-'+ a[j] +'" class="statVal'+ sumRow +'">0</div>\
							</div>\
						</td>';
					}
				str += '</tr>\
				<tr class="statSpacer"></tr>';
			}
		}
		return str;
	},
	statUnits: function(){
		// head
		var str = stats.playerHead(['Earned', 'Deployed', 'Killed', 'Lost']);
		// player rows
		for (var i=1; i<=8; i++){
			var d = stats.data[i];
			if (d !== undefined){
				// player data exists
				var a = [{}, {
						id: 'p'+ i +'-earned',
						max: d.earned,
						key: 'earned'
					}, {
						id: 'p'+ i +'-deployed',
						max: d.deployed,
						key: 'deployed'
					}, {
						id: 'p'+ i +'-killed',
						max: d.killed,
						key: 'killed'
					}, {
						id: 'p'+ i +'-lost',
						max: d.lost,
						key: 'lost'
					},
				]
				stats.animate(a, 1.5);
				str += '<tr class="stagBlue statRow">' +
					stats.playerCell(d, i);
					var color = game.player[i].playerColor,
						a = ['earned', 'deployed', 'killed', 'lost'],
						len = a.length;
					for (var j=0; j<len; j++){
						str += 
						'<td class="stagBlue statTD">\
							<div class="statBar pb'+ color +'">\
								<div id="p'+ i +'-'+ a[j] +'-bar" class="statBarBg pbar'+ color +'">&nbsp</div>\
								<div id="p'+ i +'-'+ a[j] +'" class="statVal">0</div>\
							</div>\
						</td>';
					}
				str += '</tr>\
				<tr class="statSpacer"></tr>';
			}
		}
		return str;
	},
	statStructures: function(){
		// head
		var str = stats.playerHead(['Bunkers', 'Walls', 'Fortresses']);
		// player rows
		for (var i=1; i<=8; i++){
			var d = stats.data[i];
			if (d !== undefined){
				// player data exists
				var a = [{}, {
						id: 'p'+ i +'-bunkers',
						max: d.bunkers,
						key: 'bunkers'
					}, {
						id: 'p'+ i +'-walls',
						max: d.walls,
						key: 'walls'
					}, {
						id: 'p'+ i +'-fortresses',
						max: d.fortresses,
						key: 'fortresses'
					}
				]
				stats.animate(a, 1);
				str += '<tr class="stagBlue statRow">' +
					stats.playerCell(d, i);
					var color = game.player[i].playerColor,
						a = ['bunkers', 'walls', 'fortresses'],
						len = a.length;
					for (var j=0; j<len; j++){
						str += 
						'<td class="stagBlue statTD">\
							<div class="statBar pb'+ color +'">\
								<div id="p'+ i +'-'+ a[j] +'-bar" class="statBarBg pbar'+ color +'">&nbsp</div>\
								<div id="p'+ i +'-'+ a[j] +'" class="statVal">0</div>\
							</div>\
						</td>';
					}
					str += '</tr>\
				<tr class="statSpacer"></tr>';
			}
		}
		return str;
	},
	statWeapons: function(){
		// head
		var str = stats.playerHead(['Cannons', 'Missiles', 'Nukes']);
		// player rows
		for (var i=1; i<=8; i++){
			var d = stats.data[i];
			if (d !== undefined){
				// player data exists
				var a = [{}, {
						id: 'p'+ i +'-cannons',
						max: d.cannons,
						key: 'cannons'
					}, {
						id: 'p'+ i +'-missiles',
						max: d.missiles,
						key: 'missiles'
					}, {
						id: 'p'+ i +'-nukes',
						max: d.nukes,
						key: 'nukes'
					}
				]
				stats.animate(a, 1);
				str += '<tr class="stagBlue statRow">'+
					stats.playerCell(d, i);
					var color = game.player[i].playerColor,
						a = ['cannons', 'missiles', 'nukes'],
						len = a.length;
					for (var j=0; j<len; j++){
						str += 
						'<td class="stagBlue statTD">\
							<div class="statBar pb'+ color +'">\
								<div id="p'+ i +'-'+ a[j] +'-bar" class="statBarBg pbar'+ color +'">&nbsp</div>\
								<div id="p'+ i +'-'+ a[j] +'" class="statVal">0</div>\
							</div>\
						</td>';
					}
					str += '</tr>\
				<tr class="statSpacer"></tr>';
			}
		}
		return str;
	},
	statResources: function(){
		// head
		var str = stats.playerHead(['Energy', 'Production', 'Food', 'Culture']);
		// player rows
		for (var i=1; i<=8; i++){
			var d = stats.data[i];
			if (d !== undefined){
				// player data exists
				var a = [{}, {
						id: 'p'+ i +'-moves',
						max: d.moves,
						key: 'moves'
					}, {
						id: 'p'+ i +'-production',
						max: d.production,
						key: 'production'
					}, {
						id: 'p'+ i +'-food',
						max: d.food,
						key: 'food'
					}, {
						id: 'p'+ i +'-culture',
						max: d.culture,
						key: 'culture'
					}
				]
				stats.animate(a, 1.5);
				str += '<tr class="stagBlue statRow">' +
					stats.playerCell(d, i);
					var color = game.player[i].playerColor;
					str += '<td class="stagBlue statTD">\
						<div class="statBar pb'+ color +'">\
							<div id="p'+ i +'-moves-bar" class="statBarBg pbar'+ color +'">&nbsp</div>\
							<div id="p'+ i +'-moves" class="statVal">0</div>\
						</div>\
					</td>\
					<td class="stagBlue statTD">\
						<div class="statBar pb'+ color +'">\
							<div id="p'+ i +'-production-bar" class="statBarBg pbar'+ color +'">&nbsp</div>\
							<div id="p'+ i +'-production" class="statVal">0</div>\
						</div>\
					</td>\
					<td class="stagBlue statTD">\
						<div class="statBar pb'+ color +'">\
							<div id="p'+ i +'-food-bar" class="statBarBg pbar'+ color +'">&nbsp</div>\
							<div id="p'+ i +'-food" class="statVal">0</div>\
						</div>\
					</td>\
					<td class="stagBlue statTD">\
						<div class="statBar pb'+ color +'">\
							<div id="p'+ i +'-culture-bar" class="statBarBg pbar'+ color +'">&nbsp</div>\
							<div id="p'+ i +'-culture" class="statVal">0</div>\
						</div>\
					</td>\
				</tr>\
				<tr class="statSpacer"></tr>';
			}
		}
		return str;
	},
	playerHead: function(column){
		var str = '<tr><th style="width: 420px"></th>';
		for (var i=0, len=column.length; i<len; i++){
			if (i === 4){
				str += '<th class="text-center statHead chat-warning">'+ column[i] +'</th>';
			} else {
				str += '<th class="text-center statHead">'+ column[i] +'</th>';
			}
		}
		str += '</tr><tr class="statSpacer2"></tr>';
		return str;
	},
	playerCell: function(p, i){
		var z = game.player[i],
			color = z.playerColor,
			flag = p.flag === 'Default.jpg' ? 'Player'+ color +'.jpg' : p.flag;
		var str = '<td style="position: relative">\
			<div class="statWrapper">\
				<img class="statFlagBG" src="images/flags/'+ flag +'">\
			</div>\
			<img class="statsFlags" src="images/flags/'+ flag +'">\
			<div class="statsPlayerWrap">\
				<div class="statsAccount chat-warning nowrap">\
					<i class="'+ lobby.governmentIcon(z.government) +' diploSquare statsGov player'+ color +'"></i>';
					if (g.teamMode){
						str += '<span class="diploTeam">'+ z.team +'</span>';
					}
					var account = p.cpu === 1 ? ("Computer: "+ z.difficulty) : p.account;
					str += account +
				'</div>\
				<div class="statsNation nowrap">'+ p.nation +'</div>\
			</div>\
		</td>'
		return str;
	},
	data: {},
	gameDuration: function(data){
		return stats.hours(data) + stats.minutes(data) +':'+ stats.seconds(data)
	},
	hours: function(data){
		var hours = '';
		if (data >= 3600){
			hours = ~~(data / 3600) + ':';
		}
		return hours;
	},
	minutes: function(data){
		var min = '';
		if (data < 60){
			if (data >= 3600){
				min = '00:';
			}
		} else {
			min = ~~(data / 60 % 60);
			if (min < 10){
				min = '0' + min + '';
			}
		}
		return min;
	},
	seconds: function(data){
		var sec = ~~(data % 60);
		if (sec < 10){
			return '0' + sec + '';
		}
		return sec;
	},
	get: function(){
		$.ajax({
			url: 'php/stats.php',
		}).done(function(data){
			stats.data = data;
			stats.init(data);
			stats.notifyRibbons(data.ribbons);
		});
	},
	achievements: [],
	notifyRibbons: function(data){
		var str = '';
		data.forEach(function(e){
			str += 
			'<div class="ribbonName ranked">'+ game.ribbonTitle[e] +'</div>\
			<div class="ribbonDescription ranked">'+ game.ribbonDescription[e] +'</div>\
			<img class="giantRibbon block" src="images/ribbons/ribbon'+ e +'.jpg">';  
		});
		document.getElementById('ribbonBody').innerHTML = str;
		stats.achievements = data;
		if (stats.achievements.length){
			new Audio('sound/ding3.mp3');
		}
	},
	overviewTotal: function(i){
		var x = stats.data[i];
		return this.unitsTotal(i) + this.structuresTotal(i) + this.weaponsTotal(i) + this.resourcesTotal(i);
	},
	unitsTotal: function(i){
		var x = stats.data[i];
		return (x.deployed * 100) + (x.killed * 3);
	},
	structuresTotal: function(i){
		var x = stats.data[i];
		return (x.bunkers * 80) + (x.walls * 140) + (x.fortresses * 200);
	},
	weaponsTotal: function(i){
		var x = stats.data[i];
		return (x.cannons * 40) + (x.missiles * 60) + (x.nukes * 400);
	},
	resourcesTotal: function(i){
		var x = stats.data[i];
		return ~~( (x.food / 20) + (x.culture / 60) + (x.production / 20) );
	}
}// animate.js
var animate = {
	nationName: function(){
		var tl = new TimelineMax();
		var split = new SplitText(".configureNationName", {
			type: "words,chars"
		});
		var chars = split.chars;
		tl.staggerFromTo(chars, .05, {
			immediateRender: true,
			alpha: 0
		}, {
			delay: .25,
			alpha: 1
		}, .016);
	},
	colors: [
		'#ffffff',
		'#ffaa66',
		'#ffcc99',
		'#ffddaa',
		'#ffff99',
		'#ff5555',
		'#ffff55'
	],
	randomColor: function(){
		return animate.colors[~~(Math.random()*6)];
	},
	getXY: function(tile){
		var box = DOM['unit' + tile].getBBox(),
			o = {
				x: box.x,
				y: box.y
			}
		return o;
	},
	icon: {
		troops: {
			audio: '',
			text: '\uf102',
			color: '#ff0'
		},
		energy: {
			audio: '',
			text: '\uf0e7',
			color: '#ffa'
		},
		food: {
			audio: '',
			text: '\uf179',
			color: '#b5ff00'
		},
		production: {
			audio: '',
			text: '\uf0e3',
			color: '#d60'
		},
		culture: {
			audio: '',
			text: '\uf024',
			color: '#d2d'
		},
		shield: {
			audio: 'build',
			text: '\uf286',
			color: '#ff0'
		}
	},
	upgrade: function(tile, type, count){
		if (animate.icon[type].audio){
			audio.play(animate.icon[type].audio);
		}
		var box = DOM['unit' + tile].getBBox();
		var x = box.x + box.width/2 - 10;
		var y = box.y + box.height/2 + 10;
		// show icon
		var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		text.setAttributeNS(null,"x",x);
		text.setAttributeNS(null,"y",y);
        text.style.fontFamily = 'FontAwesome';
        text.style.fontSize = '20px';
        text.style.fill = animate.icon[type].color;
		if (count){
			text.textContent = '+'+ count + ' '+ animate.icon[type].text;
		} else {
			text.textContent = animate.icon[type].text;
		}
		DOM.mapAnimations.appendChild(text);
		TweenMax.to(text, .5, {
			startAt: {
				xPercent: -50,
				yPercent: -50,
				transformOrigin: '50% 50%',
				alpha: 1,
				scale: .1
			},
			scale: 1,
			ease: Back.easeOut.config(3)
		});
		TweenMax.to(text, 1.5, {
			y: '-=30'
		});
		TweenMax.to(text, .5, {
			delay: 1.5,
			alpha: 0,
			onComplete: function(){
				this.target.parentNode.removeChild(this.target);
			}
		});
		// update bars
		this.updateMapBars(tile);
	},
	updateMapBars: function(tile){
		var box = DOM['unit' + tile].getBBox(),
			x = box.x + box.width/2 - 10,
			y = box.y + box.height/2 + 10;
		$(".mapBars" + tile).remove();
		this.initMapBars(tile, x, y);
		// console.info("UPDATING MAP BARS");
	},
	initMapBars: function(i, x, y){
		var e = DOM['unit' + i],
			x = e.getAttribute('x') - 25,
			y = e.getAttribute('y') - 24,
			boxHeight = 0,
			barHeight = 5,
			barPad = 1,
			widthPerTick = 5,
			widthMax = 40;
		
		if (game.tiles[i].food > 2){
			boxHeight += barHeight + barPad;
		}
		if (game.tiles[i].production > 1){
			boxHeight += barHeight + barPad;
		}
		if (game.tiles[i].culture){
			boxHeight += barHeight + barPad; 
		}
		if (game.tiles[i].defense){
			boxHeight += barHeight + barPad;
		}
		var foodWidth = game.tiles[i].food * widthPerTick;
		if (foodWidth > widthMax){
			foodWidth = widthMax;
		}
		// wrapper
		x += barHeight
		if (boxHeight){
			var svg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			svg.setAttributeNS(null, 'width', widthMax);
			svg.setAttributeNS(null, 'height', boxHeight);
			svg.setAttributeNS(null,"x",x);
			svg.setAttributeNS(null,"y",y + 26);
			svg.setAttributeNS(null,"fill","#151515");
			svg.setAttributeNS(null,"stroke","#000000");
			svg.setAttributeNS(null,"stroke-width",1);
			svg.setAttributeNS(null,"opacity",1);
			svg.setAttributeNS(null,"class","mapBars" + i);
			DOM.mapBars.appendChild(svg);
			// food
			y += 23; // fixed value?
			//x += 1 // padding
			if (game.tiles[i].food > 2){
				y += barHeight + barPad;
				var svg = document.createElementNS('http://www.w3.org/2000/svg', 'line');
				svg.setAttributeNS(null,"x1",x);
				svg.setAttributeNS(null,"y1",y);
				svg.setAttributeNS(null,"x2",x + foodWidth);
				svg.setAttributeNS(null,"y2",y);
				svg.setAttributeNS(null,"stroke","#b5ff00");
				svg.setAttributeNS(null,"stroke-width",widthPerTick);
				svg.setAttributeNS(null,"opacity",1);
				svg.setAttributeNS(null,"class","mapBars mapBars" + i);
				DOM.mapBars.appendChild(svg);
			}
			// production
			if (game.tiles[i].production > 1){
				y += barHeight + barPad;
				var productionWidth = game.tiles[i].production * (widthPerTick * 2);
				if (productionWidth > widthMax){
					productionWidth = widthMax;
				}
				var svg = document.createElementNS('http://www.w3.org/2000/svg', 'line');
				svg.setAttributeNS(null,"x1",x);
				svg.setAttributeNS(null,"y1",y);
				svg.setAttributeNS(null,"x2",x + productionWidth);
				svg.setAttributeNS(null,"y2",y);
				svg.setAttributeNS(null,"stroke","#55cfff");
				svg.setAttributeNS(null,"stroke-width",widthPerTick);
				svg.setAttributeNS(null,"opacity",1);
				svg.setAttributeNS(null,"class","mapBars mapBars2x mapBars" + i);
				DOM.mapBars.appendChild(svg);
			}
			// culture
			if (game.tiles[i].culture){
				y += barHeight + barPad;
				var cultureWidth = game.tiles[i].culture * widthPerTick;
				if (cultureWidth > widthMax){
					cultureWidth = widthMax;
				}
				var svg = document.createElementNS('http://www.w3.org/2000/svg', 'line');
				svg.setAttributeNS(null,"x1",x);
				svg.setAttributeNS(null,"y1",y);
				svg.setAttributeNS(null,"x2",x + cultureWidth);
				svg.setAttributeNS(null,"y2",y);
				svg.setAttributeNS(null,"stroke","#dd22dd");
				svg.setAttributeNS(null,"stroke-width",widthPerTick);
				svg.setAttributeNS(null,"opacity",1);
				svg.setAttributeNS(null,"class","mapBars mapBars" + i);
				DOM.mapBars.appendChild(svg);
			}
			// defense
			if (game.tiles[i].defense){
				y += barHeight + barPad;
				var defWidth = game.tiles[i].defense * (widthPerTick * 2);
				var svg = document.createElementNS('http://www.w3.org/2000/svg', 'line');
				svg.setAttributeNS(null,"x1",x);
				svg.setAttributeNS(null,"y1",y);
				svg.setAttributeNS(null,"x2",x + defWidth);
				svg.setAttributeNS(null,"y2",y);
				svg.setAttributeNS(null,"stroke","#ffff00");
				svg.setAttributeNS(null,"stroke-width",barHeight);
				svg.setAttributeNS(null,"opacity",1);
				svg.setAttributeNS(null,"class","mapBars mapBars2x mapBars" + i);
				DOM.mapBars.appendChild(svg);
			}
		}
	},
	gunfire: function(atkTile, defTile, playSound){
		var box1 = DOM['unit' + atkTile].getBBox(),
			box2 = DOM['unit' + defTile].getBBox();
		var sfx = ~~(Math.random()*9);
		var delay = [.6, .6, .43, .43, .43, .43, .9, .43, .76, .43];
		if (playSound){
			//console.info(delay, sfx)
			audio.play('machine' + sfx);
		}
		var shots = 30,
			w1 = 50,
			h1 = 50,
			w2 = w1/2,
			h2 = h1/2 - 10;
		if (!isMSIE && !isMSIE11 && !isMobile){
			for (var i=0; i<shots; i++){
				(function(){
					var path = document.createElementNS("http://www.w3.org/2000/svg","path"),
						x2 = box2.x + (Math.random() * w1) - w2;
						y2 = box2.y + (Math.random() * h1) - h2;
					var x1 = box1.x + ~~(Math.random()*16)-8,
						y1 = box1.y + ~~(Math.random()*16)-8;
					var drawPath = Math.random() > .5 ? 
						"M "+ x1 +","+ y1 + ' '+ x2 +","+ y2 :
						"M "+ x2 +","+ y2 +' ' + x1 +","+ y1
					path.setAttributeNS(null,"stroke",animate.randomColor());
					path.setAttributeNS(null,"stroke-width",1);
					DOM.world.appendChild(path);
					TweenMax.to(path, .075, {
						delay: (i / shots) * delay[sfx],
						startAt: {
							attr: {
								d: drawPath
							},
							drawSVG: '0%'
						},
						drawSVG: '0% 100%',
						ease: Power2.easeIn,
						onComplete: function(){
							TweenMax.to(path, .125, {
								drawSVG: '100% 100%',
								ease: Power2.easeOut,
								onComplete: function(){
									this.target.parentNode.removeChild(this.target);
								}
							});
						}
					});
				})();
			}
		}
	},
	cannons: function(atkTile, defTile, playSound, delay, delay2){
		var box1 = DOM['unit' + atkTile].getBBox(),
			box2 = DOM['land' + defTile].getBBox(),
			box3 = DOM['unit' + defTile].getBBox()
			delay = delay === undefined ? .08 : delay;
		if (game.tiles[atkTile].player === my.player){
			var a = [5, 6, 8];
			var sfx = ~~(Math.random() * 3);
			playSound && audio.play('grenade' + a[sfx]);
		}
		var x1 = box1.x + box1.width * .5;
			y1 = box1.y + box1.height * .5,
			w1 = box2.width * .5,
			w2 = w1/2,
			h1 = box2.height * .5,
			h2 = h1/2 - 10;
		for (var i=0; i<20; i++){
			(function(Math){
				var circ = document.createElementNS("http://www.w3.org/2000/svg","circle"),
					x2 = box3.x + (Math.random() * w1) - w2,
					y2 = box3.y + (Math.random() * h1) - h2;
				circ.setAttributeNS(null,"cx",x1);
				circ.setAttributeNS(null,"cy",y1);
				circ.setAttributeNS(null,"r",4);
				circ.setAttributeNS(null,"fill",g.color[game.player[game.tiles[atkTile].player].playerColor]);
				circ.setAttributeNS(null,"stroke",animate.randomColor());
				circ.setAttributeNS(null,"strokeWidth",1);
				DOM.mapAnimations.appendChild(circ);
				
				TweenMax.to(circ, delay, {
					delay: i * .0125,
					startAt: {
						alpha: 1
					},
					attr: {
						cx: x2,
						cy: y2
					},
					ease: Linear.easeNone,
					onComplete: function(){
						// explode outward
						var d1 = Math.random()*.5 + .3,
							d2 = delay2 === undefined ? d1/2 : delay2,
							s1 = (d1 * 10) + 3;
						TweenMax.to(circ, d2, {
							startAt: {
								fill: 'none',
								strokeWidth: 0,
								attr: {
									r: 0
								}
							},
							strokeWidth: s1,
							attr: {
								r: s1/2
							},
							ease: Linear.easeNone,
							onComplete: function(){
							// explode fades from inner
								TweenMax.to(circ, d2, {
									attr: {
										r: s1
									},
									strokeWidth: 0,
									ease: Sine.easeOut
								});
								TweenMax.to(circ, d2, {
									alpha: 0,
									onComplete: function(){
										this.target.parentNode.removeChild(this.target);
									},
									ease: Sine.easeOut
								});
							}
						});
					}
				});
			})(Math);
		}
		animate.smoke(defTile, box3.x, box3.y, .8);
	},
	missile: function(attacker, defender, playSound){
		if (playSound){
			audio.play('missile7');
		}
		var e2 = DOM['unit' + attacker],
			boxA = e2.getBBox(),
			x1 = boxA.x + boxA.width/2,
			y1 = boxA.y + boxA.height/2,
			e3 = DOM['unit' + defender],
			boxB = e3.getBBox(),
			x2 = boxB.x + boxB.width/2,
			y2 = boxB.y + boxB.height/2;
			
		// get missile line coordinates
		my.motionPath[0] = e2.getAttribute('x')*1 - 10;
		my.motionPath[1] = e2.getAttribute('y')*1 - 10;
		my.motionPath[4] = e3.getAttribute('x')*1 - 10;
		my.motionPath[5] = e3.getAttribute('y')*1 - 10;
		my.motionPath[2] = (my.motionPath[0] + my.motionPath[4]) / 2;
		my.motionPath[3] = ((my.motionPath[1] + my.motionPath[5]) / 2) - (Math.abs(x1-x2)/3);
		TweenMax.set(DOM.motionPath, {
			attr: {
				d: "M " + my.motionPath[0] +","+ my.motionPath[1] + ' ' +
					+ my.motionPath[4] +" "+ my.motionPath[5]
			}
		});
		var mis = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		mis.setAttributeNS(null, "cx", x1);
		mis.setAttributeNS(null, "cy", y1);
		mis.setAttributeNS(null, "r", 12);
		mis.setAttributeNS(null,"fill",g.color[game.player[game.tiles[attacker].player].playerColor]);
		mis.setAttributeNS(null,"stroke","#ffddaa");
		mis.setAttributeNS(null,"stroke-width",2);
		DOM.mapAnimations.appendChild(mis);
		var count = 0;
		TweenMax.to(mis, .1, {
			attr: {
				r: 3
			},
			repeat: -1
		});
		TweenMax.to(mis, 1, {
			startAt: {
				alpha: 1,
				xPercent: -50,
				yPercent: -50
			},
			attr: {
				cx: x2,
				cy: y2
			},
			ease: Power2.easeIn,
			onUpdate: function(){
				count++;
				if (count % 2 === 0){
					// smoke trail
					var svg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
					svg.setAttributeNS(null, 'height', 40);
					svg.setAttributeNS(null, 'width', 40);
					svg.setAttributeNS(null, 'opacity', 1);
					svg.setAttributeNS(null, "x", mis.getAttribute('cx')-10);
					svg.setAttributeNS(null, "y", mis.getAttribute('cy')-10);
					svg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/smoke.png');
					DOM.mapAnimations.appendChild(svg);
					TweenMax.to(svg, .3, {
						startAt: {
							xPercent: -50,
							yPercent: -50,
							transformOrigin: '50% 50%'
						},
						scale: 3,
						onComplete: function(){
							this.target.parentNode.removeChild(this.target);
						}
					});
					TweenMax.to(svg, .5, {
						alpha: 0
					});
				}
			},
			onComplete: function(){
				this.target.parentNode.removeChild(this.target);
				animate.missileExplosion(defender, g.color[game.player[game.tiles[attacker].player].playerColor]);
			}
		});
		/*
		var path = MorphSVGPlugin.pathDataToBezier('#motionPath', {
			align: 'relative'
		});
			bezier: {
				values: path,
				type: 'cubic',
				curviness: 1.5,
				autoRotate: true
			},
		*/
	},
	missileExplosion: function(tile, misColor){
		var box = DOM['unit' + tile].getBBox(),
			a = [5, 6, 8],
			sfx = ~~(Math.random() * 3);
		audio.play('grenade' + a[sfx]);
		var x = 0,
			y = 0;
		for (var i=0; i<5; i++){
			(function(Math){
				var circ = document.createElementNS("http://www.w3.org/2000/svg","circle");
				x = box.x + Math.random() * 60 - 30;
				y = box.y + Math.random() * 60 - 30;
				circ.setAttributeNS(null,"cx",x);
				circ.setAttributeNS(null,"cy",y);
				circ.setAttributeNS(null,"r",0);
				circ.setAttributeNS(null,"fill",misColor);
				circ.setAttributeNS(null,"stroke",'#ffffaa');
				DOM.mapAnimations.appendChild(circ);
				
				var delay = i * .05;
				TweenMax.to(circ, .75, {
					delay: delay,
					attr: {
						r: 32
					},
					onComplete: function(){
						TweenMax.to(circ, 1, {
							attr: {
								r: 1
							},
							ease: Power1.easeIn,
							onComplete: function(){
								this.target.parentNode.removeChild(this.target);
							},
						});
					},
					ease: Power4.easeOut
				});
				TweenMax.to(circ, .1, {
					fill: "hsl(+=0%, +=0%, +="+ ~~(Math.random()*100) +"%)",
					repeat: -1
				});
				TweenMax.to(circ, 1.75, {
					startAt:{
						alpha: 1
					},
					alpha: 0,
					ease: Power2.easeIn
				});
			})(Math);
		}
		animate.smoke(tile, x, y, 1);
	},
	nuke: function(tile, attacker){
		var box = DOM['unit' + tile].getBBox();
		var x = box.x;
		var y = box.y;
		// bomb shadow
		shadow = document.createElementNS("http://www.w3.org/2000/svg","ellipse");
		shadow.setAttributeNS(null,"cx",x);
		shadow.setAttributeNS(null,"cy",y);
		shadow.setAttributeNS(null,"rx",2);
		shadow.setAttributeNS(null,"ry",1);
		shadow.setAttributeNS(null,"fill",'#000000');
		shadow.setAttributeNS(null,"stroke",'none');
		DOM.mapAnimations.appendChild(shadow);
		TweenMax.to(shadow, 1, {
			startAt: {
				opacity: .5
			},
			attr: {
				rx: 10,
				ry: 5
			},
			ease: Power1.easeIn,
			onComplete: function(){
				this.target.parentNode.removeChild(this.target);
			}
		});
		// drop bomb svg
		var bomb = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		bomb.setAttributeNS(null, "cx", x);
		bomb.setAttributeNS(null, "cy", y - window.innerHeight);
		bomb.setAttributeNS(null, "r", 15);
		bomb.setAttributeNS(null,"fill",g.color[game.player[attacker].playerColor]);
		bomb.setAttributeNS(null,"stroke","#ffddaa");
		bomb.setAttributeNS(null,"stroke-width",2);
		DOM.mapAnimations.appendChild(bomb);
		var count = 0;
		TweenMax.to(bomb, .1, {
			attr: {
				r: 3
			},
			ease: Linear.easeIn,
			repeat: -1
		});
		TweenMax.to(bomb, 1, {
			startAt: {
				alpha: 1,
			},
			attr: {
				cy: y
			},
			ease: Power1.easeIn,
			onComplete: function(){
				this.target.parentNode.removeChild(bomb);
			}
		});
		// start bomb explosion sequence
		TweenMax.to(g, 1, {
			onComplete: function(){
				audio.play('bomb9');
				TweenMax.to(DOM.screenFlash, .05, {
					startAt: {
						opacity: .7,
						background: '#ffffff'
					},
					opacity: 0,
					background: '#ff8800',
					ease: Expo.easeOut
				});
				// shake
				// animate.screenShake(16, 10, .016, true);
				var circ = document.createElementNS("http://www.w3.org/2000/svg","circle");
				circ.setAttributeNS(null,"cx",x);
				circ.setAttributeNS(null,"cy",y);
				circ.setAttributeNS(null,"r",1);
				circ.setAttributeNS(null,"fill",g.color[game.player[attacker].playerColor]);
				circ.setAttributeNS(null,"stroke",'#ffdd88');
				DOM.mapAnimations.appendChild(circ);
				
				TweenMax.to(circ, 1.5, {
					startAt: {
						alpha: 1
					},
					attr: {
						r: 80
					},
					onComplete: function(){
						TweenMax.to(circ, 1, {
							attr: {
								r: 50
							},
							ease: Power1.easeIn
						});
					},
					ease: Power3.easeOut
				});
				TweenMax.to(circ, .05, {
					fill: "hsl(+=0%, +=0%, +=20%)",
					repeat: -1,
					yoyo: true,
					ease: SteppedEase.config(6)
				});
				TweenMax.to(circ, 2.5, {
					alpha: 0,
					ease: Power4.easeIn,
					onComplete: function(){
						this.target.parentNode.removeChild(this.target);
					}
				});
				
				animate.smoke(tile, x, y);
				animate.smoke(tile, x, y);
				animate.smoke(tile, x, y);
				animate.smoke(tile, x, y);
			}
		});
	},
	logo: function(linear){
		resizeWindow();
	},
	smoke: function(tile, x, y, scale){
		if (x === undefined){
			var o = animate.getXY(tile);
			x = o.x;
			y = o.y;
		}
		if (scale === undefined){
			scale = 1.25;
		}
		var smoke = document.createElementNS("http://www.w3.org/2000/svg","image");
		smoke.setAttributeNS(null,"width",256);
		smoke.setAttributeNS(null,"height",256);
		smoke.setAttributeNS(null,"x",x);
		smoke.setAttributeNS(null,"y",y);
		smoke.setAttributeNS(null,"opacity",0);
		smoke.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","images/smoke.png");
		DOM.mapUpgrades.appendChild(smoke);
		TweenMax.to(smoke, 3, {
			startAt: {
				alpha: 1,
				transformOrigin: '50% 50%',
				xPercent: -50,
				yPercent: -50,
				scale: 0
			},
			ease: Power4.easeOut,
			scale: scale
		});
		TweenMax.to(smoke, 3, {
			alpha: 0,
			onComplete: function(){
				this.target.parentNode.removeChild(this.target);
			}
		});
		
	},
	screenShake: function(count, d, interval, fade){
		// number of shakes, distance of shaking, interval of shakes
		var foo = 0;
		(function doit(count, d, interval, e, M){
			var d2 = d/2;
			if (fade){
				if (foo % 2 === 0){
					d--;
					if (d < 2){
						d = 2;
					}
				}
			}
			TweenMax.to(e, interval, {
				x: ~~(M.random()*(d)-d2),
				y: ~~(M.random()*(d)-d2),
				onComplete:function(){
					TweenMax.to(e, interval, {
						x: ~~(M.random()*(d)-d2),
						y: ~~(M.random()*(d)-d2),
						onComplete:function(){
							TweenMax.to(e, interval, {
								x: ~~(M.random()*(d)-d2),
								y: ~~(M.random()*(d)-d2),
								onComplete:function(){
									TweenMax.to(e, interval,{
										x: 0,
										y: 0,
										onComplete: function(){
											foo++;
											if(foo < count){ 
												doit(count, d, interval, e, M); 
											}
										}
									});
								}
							});
						}
					});
				}
			});
		})(count, d, interval, DOM.gameWrap, Math);
	},
	selectTile: function(oldTgt, newTgt){
		TweenMax.set(DOM['land' + oldTgt], {
			fill: g.color[game.player[game.tiles[oldTgt].player].playerColor],
			stroke: game.tiles[oldTgt].player ? g.color[game.player[game.tiles[oldTgt].player].playerColor] : '#aaa',
			strokeDasharray: 'none',
			strokeDashoffset: 0,
			strokeWidth: 1,
			onComplete: function(){
				if (game.tiles[oldTgt].player){
					TweenMax.set(this.target, {
						strokeWidth: 1,
						stroke: "hsl(+=0%, +=0%, -=30%)"
					});
				}
			}
		});
		// move to top
		var x = DOM['land' + newTgt].cloneNode(true);
		DOM.landWrap.appendChild(x);
		DOM['land' + newTgt].parentNode.removeChild(DOM['land' + newTgt]);
		// cache
		DOM['land' + newTgt] = document.getElementById('land' + newTgt);
		
		var newStroke = g.color[game.player[!game.tiles[newTgt].player ? 
			my.player : game.tiles[newTgt].player].playerColor];
		var newFill = g.color[game.player[!game.tiles[newTgt].player ? 
			0 : game.tiles[newTgt].player].playerColor];
		TweenMax.set(DOM['land'+ newTgt], {
			fill: newFill,
			stroke: newStroke,
			onComplete: function(){
				TweenMax.set(this.target, {
					stroke: "hsl(+=0%, +=0%, +=15)"
				});
			}
		});
		TweenMax.to(DOM['land' + newTgt], .4, {
			startAt: {
				strokeDasharray: '5,5',
				strokeWidth: 3,
				strokeDashoffset: 0
			},
			strokeDashoffset: 10,
			repeat: -1,
			ease: Linear.easeNone
		});
	},
	energyBar: function(){
		TweenMax.to(DOM.energyIndicator, g.speed, {
			startAt: {
				x: -5
			},
			x: 150,
			ease: Linear.easeNone
		});
		TweenMax.to(DOM.currentYearBG, 2, {
			startAt: {
				alpha: 1
			},
			alpha: 0
		});
	}
}// title.js
var title = {
	players: [],
	games: [],
	getLeaderboard: function(type){
		var e = document.getElementById('leaderboardBody');
		e.innerHTML = '';
		g.lock();
		$.ajax({
			url: 'php/leaderboard.php',
			data: {
				type: type
			}
		}).done(function(data) {
			e.innerHTML = data.str;
			g.unlock();
		});
	},
	refreshTimer: 0,
	refreshGames: function(){
		if (Date.now() - title.refreshTimer > 5000){
			title.refreshTimer = Date.now();
			$.ajax({
				type: 'GET',
				url: 'php/refreshGames.php'
			}).done(function(data) {
				//console.info(data);
				var e = document.getElementById('gameTableBody');
				if (e === null){
					return;
				}
				// head
				var str = '';
				// body
				for (var i=0, len=data.length; i<len; i++){
					var d = data[i];
					title.games[d.id] = d.players * 1;
					str += 
					"<tr id='game_"+ d.id +"' class='wars wars-"+ d.gameMode +" no-select' data-name='" + d.name + "'>\
						<td class='warCells'>"+ d.name + "</td>\
						<td class='warCells'>" + d.map + "</td>\
						<td class='warCells'>" + d.speed + "</td>\
						<td class='warCells'>" + d.gameMode + "</td>\
					</tr>";
					
				}
				e.innerHTML = str;
			}).fail(function(e){
				console.info(e.responseText);
				//Msg("Server error.");
			});
		}
	},
	init: (function(){
		$(document).ready(function(){
			// console.info("Initializing title screen...");
			// prevents auto scroll while scrolling
			$("#titleChatLog").on('mousedown', function(){
				title.chatDrag = true;
			}).on('mouseup', function(){
				title.chatDrag = false;
			});
			$("#title-chat-input").on('focus', function(){
				title.chatOn = true;
			}).on('blur', function(){
				title.chatOn = false;
			});
			$(".createGameInput").on('focus', function(){
				title.createGameFocus = true;
			}).on('blur', function(){
				title.createGameFocus = false;
			});
			$("#titleChatSend").on(env.click, function(){
				title.sendMsg(true);
			});
			$.ajax({
				type: 'GET',
				url: 'php/initChatId.php'
			}).done(function(data){
				my.account = data.account;
				my.flag = data.flag;
				my.rating = data.rating;
				g.checkPlayerData();
			});
			// initial refresh of games
			setTimeout(function(){
				title.refreshGames();
			});
			setTimeout(function(){
				g.keepAlive();
			}, 180000);
		});
	})(),
	updatePlayers: function(once){
		title.titleUpdate = $("#titleChatPlayers").length; // player is logged in
		if (title.titleUpdate){
			// title chat loop
			(function repeat(){
				if (g.view === 'title'){
					$.ajax({
						type: "POST",
						url: "php/titleUpdate.php",
						data: {
							channel: my.channel
						}
					}).done(function(data){
						// set title players
						if (g.view === 'title'){
							if (data.playerData !== undefined){
								var p = data.playerData,
									foundPlayers = [];
								for (var i=0, len=p.length; i<len; i++){
									// add new players
									var account = p[i].account,
										flag = p[i].flag,
										rating = p[i].rating;
									if (title.players[account] === undefined){
										//console.info("ADDING PLAYER: ", p[i]);
										title.addPlayer(account, flag, rating);
									} else if (title.players[account].flag !== flag){
										// replace player flag
										var flagElement = document.getElementById("titlePlayerFlag_" + account);
										if (flagElement !== null){
											var flagClass = flag.split(".");
											flagElement.className = 'flag ' + flagClass[0].replace(/ /g, "-");
										}
									}
									foundPlayers.push(account);
								}
								// remove missing players
								for (var key in title.players){
									if (foundPlayers.indexOf(key) === -1){
										var x = {
											account: key
										}
										// console.info("REMOVING PLAYER: " + x.account);
										title.removePlayer(x);
									}
								}
							}
							document.getElementById('titleChatHeaderCount').textContent = '('+ len +')';
							// game data sanity check
							var serverGames = [];
							if (data.gameData !== undefined){
								var p = data.gameData;
								for (var i=0, len=p.length; i<len; i++){
									serverGames[p[i].id] = {
										players: p[i].players * 1,
										max: p[i].max * 1
									}
								}
							}
							// remove games if they're not found in server games
							title.games.forEach(function(e, ind){
								// console.info(serverGames[ind]);
								if (serverGames[ind] === undefined){
									// game timed out, not found
									var o = {
										id: ind
									}
									console.info("REMOVING: ", o);
									title.removeGame(o);
								} else {
									// found game
									if (serverGames[ind].players !== title.games[ind]){
										// player count does not match... fixing
										// console.info("PLAYER COUNT WRONG!");
										var o = {
											id: ind,
											players: serverGames[ind].players,
											max: serverGames[ind].max
										}
										title.setToGame(o);
									}
								}
							});
						}
					}).always(function(){
						if (!once){
							setTimeout(repeat, 5000);
						}
					});
				}
			})();
		} else {
			// not logged in
			$("#titleChat, #titleMenu").remove();
		}
	},
	// adds player to chat room
	addPlayer: function(account, flag, rating){
		title.players[account] = {
			flag: flag
		}
		var e = document.getElementById('titlePlayer' + account);
		if (e !== null){
			e.parentNode.removeChild(e);
		}
		var e = document.createElement('div');
		e.className = "titlePlayer";
		e.id = "titlePlayer" + account;
		var flagClass = flag.split(".");
		flagClass = flagClass[0].replace(/ /g, "-");
		e.innerHTML = '<div id="titlePlayerFlag_'+ account +'" class="flag ' + flagClass +'"></div><span class="chat-rating">['+ rating +']</span> <span class="titlePlayerAccount">'+ account +'</span>';
		if (title.titleUpdate){
			DOM.titleChatBody.appendChild(e);
		}
	},
	removePlayer: function(data){
		// fix this
		delete title.players[data.account];
		var z = document.getElementById('titlePlayer' + data.account);
		if (z !== null){
			z.parentNode.removeChild(z);
		}
	},
	updateGame: function(data){
		if (data.type === 'addToGame'){
			title.addToGame(data);
		} else if (data.type === 'removeFromGame'){
			title.removeFromGame(data);
		} else if (data.type === 'addGame'){
			title.addGame(data);
		} else if (data.type === 'removeGame'){
			title.removeGame(data);
		}
	},
	updatePlayerText: function(id){
		var e = document.getElementById('game_players_' + id);
		if (e !== null){
			e.textContent = title.games[id];
		}
	},
	setToGame: function(data){
		// refreshGames corrects player values
		// console.info("setToGame", data);
		var id = data.id;
		title.games[id] = data.players;
		// title.updatePlayerText(id);
	},
	addToGame: function(data){
		// player joined or left
		//console.info("addToGame", data);
		var id = data.id;
		if (title.games[id] !== undefined){
			if (title.games[id] + 1 > data.max){
				title.games[id] = data.max;
			} else {
				title.games[id]++;
			}
		} else {
			title.games[id] = 1;
		}
		//title.updatePlayerText(id);
	},
	removeFromGame: function(data){
		// player joined or left
		//console.info("removeFromGame", data);
		var id = data.id;
		if (title.games[id] !== undefined){
			if (title.games[id] - 1 < 1){
				title.games[id] = 1;
			} else {
				title.games[id]--;
			}
		} else {
			title.games[id] = 1;
		}
		//title.updatePlayerText(id);
	},
	addGame: function(data){
		// created game
		// console.info("addGame", data);
		title.games[data.id] = 1;
		var e = document.createElement('tr'),
			gameMode = data.gameMode === 'Ranked' ? 'Ranked' : data.gameMode === 'Team' ? 'Team' : 'FFA';
		e.id = 'game_' + data.id;
		e.className = 'wars wars-'+ gameMode +' no-select';
		e.setAttribute('data-name', data.name);
		e.innerHTML = 
			"<td class='warCells'>"+ data.name + "</td>\
			<td class='warCells'>" + data.map + "</td>\
			<td class='warCells'>" + data.speed + "</td>\
			<td class='warCells'>" + gameMode + "</td>";
		DOM.gameTableBody.insertBefore(e, DOM.gameTableBody.childNodes[0]);
	},
	removeGame: function(data){
		// game countdown started or exited
		// console.info("removeGame", data);
		delete title.games[data.id];
		var e = document.getElementById('game_' + data.id);
		if (e !== null){
			e.parentNode.removeChild(e);
		}
	},
	mapData: {
		EarthOmega: {
			name: 'Earth Omega',
			tiles: 78,
			players: 8
		},
		/*
		EarthAlpha: {
			name: 'Earth Alpha',
			tiles: 83,
			players: 8
		},
		*/
		FlatEarth: {
			name: 'Flat Earth',
			tiles: 78,
			players: 8
		},
		France: {
			name: 'France',
			tiles: 81,
			players: 8
		},
		Italy: {
			name: 'Italy',
			tiles: 81,
			players: 8
		},
		Japan: {
			name: "Japan",
			tiles: 47,
			players: 4
		},
		Turkey: {
			name: "Turkey",
			tiles: 75,
			players: 7
		},
		UnitedKingdom: {
			name: "United Kingdom",
			tiles: 69,
			players: 8
		},
		UnitedStates: {
			name: 'United States',
			tiles: 48,
			players: 3
		}
	},
	showBackdrop: function(e){
		TweenMax.to('#titleViewBackdrop', env.delay(.3), {
			startAt: {
				visibility: 'visible',
				alpha: 0
			},
			alpha: 1,
			onComplete: function(){
				if (e !== undefined){
					e.focus();
				}
			}
		});
		g.isModalOpen = true;
	},
	closeModal: function(){
		TweenMax.set('.title-modals, #titleViewBackdrop', {
			alpha: 0,
			visibility: 'hidden'
		});
		g.isModalOpen = false;
	},
	createGameFocus: false,
	createGame: function(){
		var name = $("#gameName").val(),
			pw = $("#gamePassword").val(),
			max = $("#gamePlayers").val() * 1,
			speed = g.speed;
			
		if (!g.rankedMode && (name.length < 4 || name.length > 32)){
			Msg("Game name must be at least 4-32 characters.", 1);
			setTimeout(function(){
				$("#gameName").focus().select();
			}, 100);
		} else if (!g.rankedMode && (max < 2 || max > 8 || max % 1 !== 0)){
			Msg("Game must have 2-8 players.", 1);
		} else {
			title.createGameService(name, pw, title.mapData[g.map.key].name, max, g.rankedMode, g.teamMode, speed);
		}
	},
	createGameService: function(name, pw, map, max, rankedMode, teamMode, speed){
		g.lock(1);
		audio.play('click');
		g.rankedMode = rankedMode;
		g.teamMode = teamMode;
		g.speed = speed;
		$.ajax({
			url: 'php/createGame.php',
			data: {
				name: name,
				pw: pw,
				map: map,
				max: max,
				rating: rankedMode,
				teamMode: teamMode,
				speed: speed
			}
		}).done(function(data) {
			socket.removePlayer(my.account);
			my.player = data.player;
			my.playerColor = data.playerColor;
			my.team = data.team;
			game.id = data.gameId;
			game.name = data.gameName;
			// console.info("Creating: ", data);
			lobby.init(data);
			lobby.join(); // create
			socket.joinGame();
			lobby.styleStartGame();
		}).fail(function(e){
			Msg(e.statusText);
			g.unlock(1);
		});
	},
	joinGame: function(){
		g.name = $("#joinGame").val();
		if (!g.name){
			Msg("Game name is not valid!", 1.5);
			$("#joinGame").focus().select();
			return;
		}
		g.password = $("#joinGamePassword").val();
		g.lock();
		audio.play('click');
		$.ajax({
			url: 'php/joinGame.php',
			data: {
				name: g.name,
				password: g.password
			}
		}).done(function(data){
			title.joinGameCallback(data);
		}).fail(function(data){
			console.info(data);
			Msg(data.statusText, 1.5);
		}).always(function(){
			g.unlock();
		});
	},
	joinGameCallback: function(data){
		socket.removePlayer(my.account);
		// console.info(data);
		my.player = data.player;
		my.playerColor = data.player;
		g.teamMode = data.teamMode;
		g.rankedMode = data.rankedMode;
		my.team = data.team;
		game.id = data.id;
		game.name = data.gameName;
		g.map = data.mapData;
		g.speed = data.speed;
		lobby.init(data);
		lobby.join(); // normal join
		//$("#titleMenu, #titleChat").remove();
		socket.joinGame();
	}
};// lobby.js
var lobby = {
	data: [
		{ account: '' }, 
		{ account: '' }, 
		{ account: '' }, 
		{ account: '' }, 
		{ account: '' }, 
		{ account: '' }, 
		{ account: '' }, 
		{ account: '' },
		{ account: '' }
	],
	startClassOn:  "btn btn-info btn-md btn-block btn-responsive shadow4 lobbyButtons",
	startClassOff: "btn btn-default btn-md btn-block btn-responsive shadow4 lobbyButtons",
	totalPlayers: function(){
		var count = 0;
		for (var i=0, len=lobby.data.length; i<len; i++){
			if (lobby.data[i].account){
				count++;
			}
		}
		return count;
	},
	addCpuPlayer: function(){
		$.ajax({
			url: 'php/cpu-add-player.php',
			data: {
				flag: g.getRandomFlag()
			}
		});
	},
	updateGovernmentWindow: function(government){
		// updates government description
		var str = '';
		if (government === "Despotism"){
			str = '<div id="lobbyGovName" class="text-primary">Despotism</div>\
				<div id="lobbyGovPerks">\
					<div>Start with 3x production</div>\
					<div>Start with gunpowder</div>\
					<div>Start with a bunker</div>\
					<div>Free movement through own tiles</div>\
				</div>';
		} else if (government === "Monarchy"){
			str = '<div id="lobbyGovName" class="text-primary">Monarchy</div>\
				<div id="lobbyGovPerks">\
					<div>3x capital culture</div>\
					<div>50% starting culture bonus</div>\
					<div>Start with two great tacticians: +2 defense</div>\
					<div>1/2 cost structures</div>\
				</div>';
		} else if (government === "Democracy"){
			str = '<div id="lobbyGovName" class="text-primary">Democracy</div>\
				<div id="lobbyGovPerks">\
					<div>4x maximum troop deployment</div>\
					<div>50% starting production bonus</div>\
					<div>Reduced culture milestone requirement</div>\
					<div>Patriotism: +3 troops when you lose a tile</div>\
				</div>';
		} else if (government === "Fundamentalism"){
			str = '<div id="lobbyGovName" class="text-primary">Fundamentalism</div>\
				<div id="lobbyGovPerks">\
					<div>Overrun ability: Instant win with 4x advantage</div>\
					<div>Infiltration: -3 structure defense</div>\
					<div>Faster growth: Reduced growth milestone requirement</div>\
					<div>+2 troop reward bonus</div>\
				</div>';
		} else if (government === "Fascism"){
			str = '<div id="lobbyGovName" class="text-primary">Fascism</div>\
				<div id="lobbyGovPerks">\
					<div>2x production rewards from barbarians</div>\
					<div>Start with 4 bonus energy</div>\
					<div>Start with great general: +1 attack</div>\
					<div>1/2 cost deploy</div>\
				</div>';
		} else if (government === "Republic"){
			str = '<div id="lobbyGovName" class="text-primary">Republic</div>\
				<div id="lobbyGovPerks">\
					<div>+50% plundered reward bonus from barbarians</div>\
					<div>Start with masonry</div>\
					<div>+1 energy per turn</div>\
					<div>Combat medics: Recover 1/2 of lost troops after victory</div>\
				</div>';
		} else if (government === "Communism"){
			str = '<div id="lobbyGovName" class="text-primary">Communism</div>\
				<div id="lobbyGovPerks">\
					<div>2x discovered reward bonus from barbarians</div>\
					<div>Can deploy troops to uninhabited territory</div>\
					<div>3/4 cost weapons</div>\
					<div>Start with a great person</div>\
				</div>';
		}
		document.getElementById('lobbyGovernment' + my.player).innerHTML = government;
		document.getElementById('lobbyGovernmentDescription').innerHTML = government === 'Random' ?
			'<div id="lobbyGovName" class="text-primary">Random</div>\
				<div id="lobbyGovPerks">\
					<div>???</div>\
					<div>???</div>\
					<div>???</div>\
					<div>???</div>\
				</div>' : str;
	},
	chat: function (data){
		while (DOM.lobbyChatLog.childNodes.length > 200) {
			DOM.lobbyChatLog.removeChild(DOM.lobbyChatLog.firstChild);
		}
		var z = document.createElement('div');
		if (data.type){
			z.className = data.type;
		}
		z.innerHTML = data.message;
		DOM.lobbyChatLog.appendChild(z);
		if (!lobby.chatDrag){
			DOM.lobbyChatLog.scrollTop = DOM.lobbyChatLog.scrollHeight;
		}
		g.sendNotification(data.message);
	},
	chatDrag: false,
	gameStarted: false,
	chatOn: false,
	sendMsg: function(bypass){
		var msg = $DOM.lobbyChatInput.val().trim();
		if (bypass || lobby.chatOn){
			// bypass via ENTER or chat has focus
			if (msg){
				// is it a command?
				if (msg === '/friend'){
					title.listFriends();
				} else if (msg.indexOf('/friend ') === 0){
					title.toggleFriend(msg.slice(8));
				} else if (msg.indexOf('/unignore ') === 0){
					var account = msg.slice(10);
					title.removeIgnore(account);
				} else if (msg === '/ignore'){
					title.listIgnore();
				} else if (msg.indexOf('/ignore ') === 0){
					var account = msg.slice(8);
					title.addIgnore(account);
				} else if (msg.indexOf('/whisper ') === 0){
					title.sendWhisper(msg, '/whisper ');
				} else if (msg.indexOf('/w ') === 0){
					title.sendWhisper(msg, '/w ');
				} else if (msg.indexOf('@') === 0){
					title.sendWhisper(msg , '@');
				} else if (msg.indexOf('/who ') === 0){
					title.who(msg);
				} else {
					// send ajax chat msg
					if (msg.charAt(0) === '/' && msg.indexOf('/me') !== 0){
						// skip
					} else {
						$.ajax({
							url: 'php/insertLobbyChat.php',
							data: {
								message: msg
							}
						});
					}
				}
			}
			$DOM.lobbyChatInput.val('');
		}
	},
	difficulties: [
		'Very Easy', 'Easy', 'Normal', 'Hard', 'Very Hard', 'Mania', 'Juggernaut'
	],
	governments: [
		'Despotism', 'Monarchy', 'Democracy', 'Fundamentalism', 'Fascism', 'Republic', 'Communism', 'Random'
	],
	init: function(x){
		// build the lobby DOM
		var e1 = document.getElementById("lobbyGameName");
		if (e1 !== null){
			if (x.rating){
				document.getElementById('lobbyRankedMatch').style.display = 'block';
				document.getElementById('lobbyGameNameWrap').style.display = 'none';
			}
			e1.innerHTML = x.name;
			document.getElementById('lobbyGameMode').textContent = x.gameMode;
			if (x.password){
				document.getElementById('lobbyGamePasswordWrap').style.display = 'block';
				document.getElementById('lobbyGamePassword').innerHTML = x.password;
			}
			g.speed = x.speed;
			document.getElementById("lobbyGameSpeed").innerHTML = x.speed;
			document.getElementById("lobbyGameMap").innerHTML = x.map;
			document.getElementById("lobbyGameMax").innerHTML = x.max;
			document.getElementById("startGame").style.display = x.player === 1 ? "block" : "none";
			if (!x.startGame){
				document.getElementById('mainWrap').style.display = "block";
			}
			var str = '<div id="lobbyWrap" class="container">';
			for (var i=1; i<=8; i++){
				str += 
				'<div id="lobbyRow' +i+ '" class="row lobbyRow">\
					<div class="col-xs-2">\
						<img id="lobbyFlag' +i+ '" class="lobbyFlags block center" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=">\
					</div>\
					<div class="col-xs-6 lobbyDetails">\
						<div class="lobbyAccounts">';
						
							if (g.teamMode){
								// yes, the span is necessary to group the dropdown
								str += '<span><div id="lobbyTeam'+ i +'" data-placement="right" class="lobbyTeams dropdown-toggle pointer2" data-toggle="dropdown">';
								
								str += '<i class="fa fa-flag pointer2 lobbyTeamFlag"></i> <span id="lobbyTeamNumber'+ i +'" class="lobbyTeamNumbers">' + i +'</span></div>';
								str += 
								'<ul id="teamDropdown" class="dropdown-menu">\
									<li class="header text-center selectTeamHeader">Team</li>';
									for (var j=1; j<=8; j++){
										str += '<li class="teamChoice" data-player="'+ i +'">Team '+ j +'</li>';
									}
								str += '</ul></span>';
							}
							
							str += '<span><i id="lobbyPlayerColor'+ i +'" class="fa fa-square player'+ i +' lobbyPlayer dropdown-toggle';
							
							if (i === my.player){
								str += ' pointer2';
							}
							
							str += '" data-placement="right" data-toggle="dropdown"></i>';
							
							if (i === my.player){
								str += 
								'<ul id="teamColorDropdown" class="dropdown-menu">\
									<li class="header text-center selectTeamHeader">Player Color</li>';
								for (var j=1; j<=20; j++){
									str += '<i class="fa fa-square player'+ j +' playerColorChoice" data-playercolor="'+ j +'"></i>';
								}
								str += '</ul></span>';
							}
							
							str += '<span id="lobbyAccountName'+ i +'" class="lobbyAccountName chat-warning"></span>\
						</div>\
						<div id="lobbyName' +i+ '" class="lobbyNames nowrap"></div>\
					</div>\
					<div class="col-xs-4">';
					if (i === x.player){
						// my.player === i || data.cpu && my.player === 1
						// me - gov dropdown
						str += 
						'<div id="gov-dropdown-player'+ i +'" class="dropdown govDropdown">\
							<button class="btn btn-primary btn-responsive dropdown-toggle shadow4 fwDropdownButton" type="button" data-toggle="dropdown">\
								<span id="lobbyGovernment' +i+ '">Despotism</span>\
								<i id="lobbyCaret' +i+ '" class="fa fa-caret-down text-warning lobbyCaret"></i>\
							</button>\
							<ul class="governmentDropdown dropdown-menu">';
								for (var z=0, len=lobby.governments.length; z<len; z++){
									str += 
									'<li class="governmentChoice">'+
										'<a>'+ lobby.governments[z] +'</a>'+
									'</li>';
								}
							str += '</ul>\
						</div>' + 
						lobby.getCpuDropdown(i);
					} else {
						// not me - gov dropdown
						str += 
						'<div id="gov-dropdown-player'+ i +'" class="dropdown govDropdown">\
							<button style="cursor: default" class="btn btn-primary btn-responsive dropdown-toggle shadow4 fwDropdownButton fwDropdownButtonEnemy" type="button">\
								<span id="lobbyGovernment' +i+ '" class="pull-left">Despotism</span>\
								<i id="lobbyCaret' +i+ '" class="fa fa-caret-down text-disabled lobbyCaret"></i>\
							</button>\
						</div>' + 
						lobby.getCpuDropdown(i);
					}
					str += '</div>\
					</div>';
			}
			if (my.player === 1 && !g.rankedMode){
				str += 
				'<div id="lobby-cpu-row" class="row buffer2">\
					<div class="col-xs-12">\
						<button id="cpu-remove-player" type="button" class="btn fwBlue btn-responsive shadow4 pull-right cpu-button">\
							<i class="fa fa-minus-circle"></i> Remove CPU\
						</button>\
						<button id="cpu-add-player" type="button" class="btn fwBlue btn-responsive shadow4 pull-right cpu-button">\
							<i class="fa fa-plus-circle"></i> Add CPU\
						</button>\
					</div>\
				</div>';
			}
			str += '</div>';
			document.getElementById("lobbyPlayers").innerHTML = str;
			lobby.updateGovernmentWindow(my.government);
		}
		delete lobby.init;
	},
	getCpuDropdown: function(player){
		var str = 
		'<div id="gov-dropdown-cpu'+ player +'" class="dropdown govDropdown none">\
			<button class="btn btn-primary btn-responsive dropdown-toggle shadow4 fwDropdownButton" type="button" data-toggle="dropdown">\
				<span id="lobby-difficulty-cpu'+ player +'">Computer: Very Easy</span>\
				<i id="lobby-caret-cpu'+ player +'" class="fa fa-caret-down text-warning lobbyCaret"></i>\
			</button>\
			<ul class="governmentDropdown dropdown-menu">';
				for (var i=0, len=lobby.difficulties.length; i<len; i++){
					str += 
					'<li class="cpu-choice" data-player="'+ player +'">'+
						'<a>'+ lobby.difficulties[i] +'</a>'+
					'</li>';
				}
			str += '</ul>\
		</div>';
		return str;
	},
	join: function(d){
		// transition to game lobby
		if (d === undefined){
			d = .5;
		}
		g.lock(1);
		g.view = "lobby";
		title.closeModal();
		TweenMax.to('#titleChat', d, {
			x: '100%',
			ease: Quad.easeIn
		});
		if (isMobile){
			document.getElementById('lobbyFirmamentWarsLogo').style.display = 'none';
			document.getElementById('worldTitle').style.display = 'none';
		} else {
			document.getElementById('lobbyFirmamentWarsLogo').src = 'images/title/firmament-wars-logo-1280.png';
			document.getElementById('worldTitle').src = 'images/FlatWorld50-2.jpg';
		}
		
		TweenMax.to('#titleMenu', d, {
			x: '-100%',
			ease: Quad.easeIn,
			onComplete: function(){
				TweenMax.to(['#titleMain', '#logoWrap', '#firmamentWarsLogoWrap'], ui.delay(.5), {
					alpha: 0,
					onComplete: function(){
						$("#titleMain").remove();
						g.unlock(1);
						TweenMax.fromTo('#joinGameLobby', ui.delay(d), {
							autoAlpha: 0
						}, {
							autoAlpha: 1
						});
					}
				});
			}
		});
		if (!d){
			// load game
			//console.info(localStorage.getItem('reload'));
			if (localStorage.getItem('reload') !== false){
				loadGameState(); // page refresh
			}
		} else {
			// load lobby
			(function repeat(){
				if (g.view === "lobby"){
					var pingCpu = 0;
					if (my.player === 1){
						lobby.data.forEach(function(d){
							if (d.cpu){
								pingCpu = 1;
							}
						});
					}
					//console.info('pingCpu ', pingCpu);
					$.ajax({
						url: "php/updateLobby.php",
						data: {
							pingCpu: pingCpu
						}
					}).done(function(x){
						if (g.view === "lobby"){
							localStorage.setItem('reload', true);
							// reality check of presence data every 5 seconds
							var hostFound = false
							for (var i=1; i<=8; i++){
								var data = x.playerData[i];
								if (data !== undefined){
									// server defined
									if (data.account !== lobby.data[i].account){
										lobby.updatePlayer(data);
									}
									// check if host
									if (data.gameHost === 1){
										hostFound = true;
									}
								} else {
									// not defined on server
									if (lobby.data[i].account){
										var o = {
											message: lobby.data[i].account + " has disconnected",
											type: 'chat-warning'
										};
										lobby.chat(o)
										var o = {
											player: i
										}
										lobby.updatePlayer(o);
									}
								}
							}
							// make sure host didn't disconnect
							if (!hostFound){
								lobby.hostLeft();
							}
							setTimeout(repeat, 5000);
						}
					}).fail(function(data){
						serverError(data);
					});
				}
			})();
			delete lobby.join;
		}
	},
	hostLeft: function(){
		setTimeout(function(){
			Msg("The host has left the lobby.");
			setTimeout(function(){
				exitGame(true);
			}, 1000);
		}, 500);
	},
	// add/remove players from lobby
	updatePlayer: function(data){
		var i = data.player;
		if (data.account !== undefined){
			// add
			//console.info("ADD PLAYER: ", data);
			document.getElementById("lobbyRow" + i).style.display = 'block';
			// different player account
			document.getElementById("lobbyAccountName" + i).innerHTML = data.cpu ? 'Computer' : data.account;
			document.getElementById("lobbyName" + i).innerHTML = data.nation;
			var flag = data.flag === 'Default.jpg' ? 
				'Player'+ i +'.jpg' : 
				data.flag;
			document.getElementById("lobbyFlag" + i).src = 'images/flags/'+ flag;
			
			if (!isMobile){
				$('#lobbyFlag' + i)
					.attr('title', data.flag.split(".").shift())
					.tooltip({
						animation: false,
						placement: 'right',
						container: 'body'
					});
			}
			
			if (my.player === i){
				if (!isMobile){
					$("#lobbyPlayerColor" + i).attr('title', 'Select Player Color')
						.tooltip({
							container: 'body',
							animation: false
						});
					$("#lobbyTeam" + i).attr('title', 'Select Team')
						.tooltip({
							container: 'body',
							animation: false
						});
				}
			}
			
			lobby.updateGovernment(data);
			lobby.data[i] = data;
			lobby.updatePlayerColor(data);
			document.getElementById('lobbyGovernment'+ i).innerHTML = 
				data.cpu ? ('Computer: '+ data.difficulty) : 'Despotism';
			
			$("#lobbyCaret"+ i)
				.removeClass("text-warning text-disabled")
				.addClass(my.player === i || data.cpu && my.player === 1 ? 'text-warning' : 'text-disabled');
			
			document.getElementById('gov-dropdown-player'+ data.player).style.display = 
				data.cpu ? 'none' : 'block';
			document.getElementById('gov-dropdown-cpu'+ data.player).style.display = 
				data.cpu ? 'block' : 'none';
		} else {
			// remove
			//console.info("REMOVE PLAYER: ", data);
			document.getElementById("lobbyRow" + i).style.display = 'none';
			document.getElementById('lobby-difficulty-cpu' + i).innerHTML = 'Computer: Very Easy';
			lobby.data[i] = { account: '', cpu: 0 };
		}
		lobby.styleStartGame();
	},
	// update player's team number
	updateTeamNumber: function(data){
		//console.info("UPDATE TEAM NUMBER: ", data);
		var i = data.player;
		var e = document.getElementById('lobbyTeamNumber' + i);
		if (e !== null){
			e.textContent = data.team;
		}
	},
	// update player's color only
	updatePlayerColor: function(data){
		//console.info("UPDATE PLAYER COLOR ", data);
		var i = data.player;
		var str = my.player === i ? 
			'fa fa-square lobbyPlayer dropdown-toggle pointer2 player' + data.playerColor :
			'fa fa-square lobbyPlayer dropdown-toggle player' + data.playerColor;
		$("#lobbyPlayerColor" + i).removeClass()
			.addClass(str)
			.data('playerColor', data.playerColor);
		lobby.data[i].playerColor = data.playerColor;
		if (data.flag === 'Default.jpg'){
			document.getElementById('lobbyFlag' + i).src = 'images/flags/Player' + data.playerColor + '.jpg';
		}
	},
	// update player's government only
	updateGovernment: function(data){
		// update button & window
		var i = data.player;
		document.getElementById('lobbyGovernment' + i).innerHTML = data.government;
		lobby.data[i].government = data.government;
	},
	updateDifficulty: function(data){
		var i = data.player;
		document.getElementById('lobby-difficulty-cpu' + i).innerHTML = 'Computer: '+ data.difficulty;
		lobby.data[i].difficulty = data.difficulty;
	},
	styleStartGame: function(){
		if (my.player === 1){
			// set start game button
			if (lobby.totalPlayers() === 1){
				startGame.className = lobby.startClassOff;
			} else {
				startGame.className = lobby.startClassOn;
			}
		}
	},
	countdown: function(data){
		socket.unsubscribe('title:refreshGames');
		// still in the lobby?
		if (!lobby.gameStarted){
			$("#lobby-cpu-row").remove();
			lobby.gameStarted = true;
			new Audio('sound/beepHi.mp3');
			// normal countdown
			countdown.style.display = 'block';
			(function repeating(secondsToStart){
				countdown.textContent = "Starting game in " + secondsToStart--;
				if (secondsToStart >= 0){
					audio.play('beep');
					setTimeout(repeating, 1000, secondsToStart);
				} else {
					audio.play('beepHi');
					audio.load.game();
					video.load.game();
				}
				if (secondsToStart === 1){
					TweenMax.to('#mainWrap', 1.5, {
						delay: 1,
						alpha: 0,
						ease: Linear.easeNone,
						onComplete: function(){
							var delay = my.player === 1 ? 0 : 750;
							setTimeout(function(){
								loadGameState(); // countdown down 
							}, delay);
							sessionStorage.setItem('gameDuration', Date.now());
						}
					});
					audio.fade();
				}
			})(5);
			cancelGame.style.display = 'none';
			$("#teamDropdown").css('display', 'none');
		}
	},
	governmentIcon: function(government){
		var icon = {
			Despotism: 'glyphicon glyphicon-bullhorn',
			Monarchy: 'glyphicon glyphicon-king',
			Democracy: 'fa fa-balance-scale',
			Fundamentalism: 'fa fa-book',
			Fascism: 'glyphicon glyphicon-fire',
			Republic: 'glyphicon glyphicon-grain', 
			Communism: 'fa fa-globe'
		};
		return icon[government];
	},
	startGame: function(){
		if (my.player === 1){
			if (lobby.totalPlayers() >= 2){
				startGame.style.display = "none";
				cancelGame.style.display = 'none';
				g.lock(1);
				audio.play('click');
				$.ajax({
					type: "GET",
					url: "php/startGame.php"
				}).fail(function(data){
					Msg(data.statusText);
					startGame.style.display = "block";
					cancelGame.style.display = 'block';
				}).always(function(){
					g.unlock();
				});
			} else {
				Msg("You need two players to start a game! Wait for players to join or add a computer player to begin.");
			}
		}
	}
};

function initOffensiveTooltips(){
	if (!isMobile){
		$('#fireCannons')
			.attr('title', 'Fire cannons at an adjacent tile. Kills ' + (2 + my.oBonus) +'-'+ (4 + my.oBonus) +' troops.')
			.tooltip('fixTitle')
			.tooltip({ animation: false });
		$('#launchMissile')
			.attr('title', 'Launch a missile at any territory. Kills '+ (7 + (my.oBonus * 2)) +'-'+ (12 + (my.oBonus * 2)) +' troops.').tooltip('fixTitle')
			.tooltip({ animation: false });
		$('#rush')
			.attr('title', 'Deploy ' + (2 + ~~(my.cultureBonus / 50)) + ' troops using energy instead of production. Boosted by culture.')
			.tooltip('fixTitle')
			.tooltip({ animation: false });
	}
}
function initResources(d){
	my.food = d.food;
	my.production = d.production;
	my.culture = d.culture;
	// current
	DOM.moves.textContent = d.moves;
	DOM.production.textContent = d.production;
	DOM.food.textContent = d.food;
	DOM.culture.textContent = d.culture;
	// turn
	// max
	DOM.manpower.textContent = my.manpower;
	my.manpower = d.manpower;
	DOM.foodMax.textContent = d.foodMax;
	DOM.cultureMax.textContent = d.cultureMax;
	// sum
	DOM.sumFood.textContent = d.sumFood;
	DOM.sumProduction.textContent = d.sumProduction;
	DOM.sumCulture.textContent = d.sumCulture;
	// bonus values
	DOM.oBonus.textContent = d.oBonus;
	DOM.dBonus.textContent = d.dBonus;
	DOM.productionBonus.textContent = d.productionBonus;
	DOM.foodBonus.textContent = d.foodBonus;
	DOM.cultureBonus.textContent = d.cultureBonus;
	setBars(d);
}
function setMoves(d){
	if (d.moves !== undefined){
		my.moves = d.moves;
		DOM.moves.textContent = d.moves;
		if (d.sumMoves){
			DOM.sumMoves.textContent = d.sumMoves;
		}
		DOM.endTurn.style.visibility = my.moves ? 'visible' : 'hidden';
	}
}
function setProduction(d){
	if (d.production !== undefined){
		TweenMax.to(my, ui.delay(.3), {
			production: d.production,
			ease: Quad.easeIn,
			onUpdate: function(){
				DOM.production.textContent = ~~my.production;
			}
		});
	}
}
function setResources(d){
	//console.info(d);
	setMoves(d);
	setProduction(d);
	TweenMax.to(my, ui.delay(.3), {
		food: d.food === undefined ? my.food : d.food,
		culture: d.culture === undefined ? my.culture : d.culture,
		ease: Quad.easeIn,
		onUpdate: function(){
			DOM.food.textContent = ~~my.food;
			DOM.culture.textContent = ~~my.culture;
		}
	});
	if (d.manpower !== undefined){
		if (d.manpower > my.manpower){
			TweenMax.fromTo('#manpower', .5, {
				color: '#ffaa33'
			}, {
				color: '#ffff00',
				repeat: -1,
				yoyo: true
				
			});
			TweenMax.to(my, ui.delay(.5), {
				manpower: d.manpower,
				onUpdate: function(){
					DOM.manpower.textContent = ~~my.manpower;
				}
			});
		} else {
			my.manpower = d.manpower;
			DOM.manpower.textContent = my.manpower;
		}
	}
	if (d.foodMax !== undefined){
		if (d.foodMax && d.foodMax > my.foodMax){
			DOM.foodMax.textContent = d.foodMax;
			my.foodMax = d.foodMax;
		}
	}
	if (d.cultureMax !== undefined){
		if (d.cultureMax && d.cultureMax > my.cultureMax){
			DOM.cultureMax.textContent = d.cultureMax;
			my.cultureMax = d.cultureMax;
		}
	}
	if (d.sumFood !== undefined){
		if (d.sumFood && d.sumFood !== my.sumFood){
			DOM.sumFood.textContent = d.sumFood;
			my.sumFood = d.sumFood;
		}
	}
	if (d.sumProduction !== undefined){
		if (d.sumProduction && d.sumProduction !== my.sumProduction){
			DOM.sumProduction.textContent = d.sumProduction;
			my.sumProduction = d.sumProduction;
		}
	}
	if (d.sumCulture !== undefined){
		if (d.sumCulture && d.sumCulture !== my.sumCulture){
			DOM.sumCulture.textContent = d.sumCulture;
			my.sumCulture = d.sumCulture;
		}
	}
	// bonus values
	if (d.oBonus !== undefined){
		if (my.oBonus !== d.oBonus){
			DOM.oBonus.textContent = d.oBonus;
			my.oBonus = d.oBonus;
			initOffensiveTooltips();
		}
	}
	if (d.dBonus !== undefined){
		if (my.dBonus !== d.dBonus){
			DOM.dBonus.textContent = d.dBonus;
			my.dBonus = d.dBonus;
		}
	}
	if (d.productionBonus !== undefined){
		if (my.productionBonus !== d.productionBonus){
			DOM.productionBonus.textContent = d.productionBonus;
			my.productionBonus = d.productionBonus;
		}
	}
	if (d.foodBonus !== undefined){
		if (my.foodBonus !== d.foodBonus){
			DOM.foodBonus.textContent = d.foodBonus;
			my.foodBonus = d.foodBonus;
		}
	}
	if (d.cultureBonus !== undefined){
		if (my.cultureBonus !== d.cultureBonus){
			DOM.cultureBonus.textContent = d.cultureBonus;
			my.cultureBonus = d.cultureBonus;
			// rush bonus changes
			initOffensiveTooltips();
		}
	}
	setBars(d);
}
function setBars(d){
	// animate bars
	TweenMax.to(DOM.foodBar, ui.delay(.3), {
		width: ((d.food / d.foodMax) * 100) + '%'
	});
	TweenMax.to(DOM.cultureBar, ui.delay(.3), {
		width: ((d.culture / d.cultureMax) * 100) + '%'
	});
}

function Nation(){
	this.account = "";
	this.nation = "";
	this.flag = "";
	this.playerColor = 0;
	this.team = 1;
	this.alive = true;
	this.avatar = '';
	this.government = '';
	return this;
}

function loadGameState(){
	g.lock(1);
	var e1 = document.getElementById("mainWrap");
	if (e1 !== null){
		TweenMax.to(e1, .5, {
			alpha: 0
		});
	}
	// load map
	// console.warn("Loading: " + g.map.key + ".php");
	$.ajax({
		type: 'GET',
		url: 'maps/' + g.map.key + '.php'
	}).done(function(data){
		DOM.worldWrap.innerHTML = data;
			
		$.ajax({
			type: "GET",
			url: "php/loadGameState.php"
		}).done(function(data){
			g.resourceTick = data.resourceTick;
			g.startGame = data.startGame * 1;
			g.teamMode = data.teamMode;
			g.gameMode = data.gameMode;
			// set map data
			g.map.sizeX = data.mapData.sizeX;
			g.map.sizeY = data.mapData.sizeY;
			g.map.name = data.mapData.name;
			g.map.tiles = data.mapData.tiles;
			//console.warn(data.tiles.length, g.map.tiles);
			if (data.tiles.length < g.map.tiles){
				if (g.loadAttempts < 20){
					setTimeout(function(){
						g.loadAttempts++;
						loadGameState(); // try again
					}, 500);
				} else {
					Msg("Failed to load game data");
					localStorage.setItem('reload', false);
					setTimeout(function(){
						window.onbeforeunload = null;
						location.reload();
					}, 3000);
				}
				return;
			}
			initDom();
			$("meta").remove();
			g.screen.resizeMap();
			
			audio.gameMusicInit();
			// only when refreshing page while testing
			audio.load.game();
			video.load.game();
			// done
			my.player = data.player;
			my.team = data.team;
			my.account = data.account;
			my.oBonus = data.oBonus;
			my.dBonus = data.dBonus;
			my.cultureBonus = data.cultureBonus;
			my.tech = data.tech;
			my.capital = data.capital;
			my.flag = data.flag;
			my.nation = data.nation;
			my.foodMax = data.foodMax;
			my.production = data.production;
			my.sumProduction = data.sumProduction;
			my.cultureMax = data.cultureMax;
			my.moves = data.moves;
			my.government = data.government;
			my.buildCost = data.buildCost;
			lobby.updateGovernmentWindow(my.government);
			// global government bonuses
			if (my.government === 'Monarchy'){
				my.buildCost = .5;
			} else if (my.government === 'Democracy'){
				my.maxDeployment = 48;
			} else if (my.government === 'Republic'){
				my.sumMoves = data.sumMoves;
				document.getElementById('moves').textContent = my.sumMoves;
				document.getElementById('sumMoves').textContent = my.sumMoves;
				console.info('sumMoves ', my.government, my.sumMoves, data.sumMoves);
			} else if (my.government === 'Fascism'){
				document.getElementById('moves').textContent = 8;
				my.deployCost = 5;
				document.getElementById('deployCost').textContent = my.deployCost;
			} else if (my.government === 'Communism'){
				// weapons
				DOM.cannonsCost.textContent = 18;
				DOM.missileCost.textContent = 38;
				DOM.nukeCost.textContent = 113;
				my.weaponCost = .75;
			}
			// initialize player data
			game.initialized = true;
			for (var z=0, len=game.player.length; z<len; z++){
				// initialize diplomacy-ui
				game.player[z] = new Nation();
			}
			
			g.removeContainers();
			g.unlock();
			g.view = "game";
			TweenMax.fromTo(gameWrap, 1, {
				autoAlpha: 0
			}, {
				autoAlpha: 1
			});
			// init game player data
			for (var i=0, len=data.players.length; i<len; i++){
				var d = data.players[i],
					z = game.player[d.player];
				z.account = d.account;
				z.flag = d.flag;
				z.nation = d.nation;
				z.player = d.player;
				z.playerColor = d.playerColor;
				z.team = d.team;
				z.government = d.government;
				z.avatar = d.avatar;
				z.cpu = d.cpu;
				z.difficulty = d.difficulty;
				z.difficultyShort = d.difficulty.replace(/ /g, '');
			}
			
			// initialize client tile data
			var mapCapitals = document.getElementById('mapCapitals'),
				mapUpgrades = document.getElementById('mapUpgrades');
			for (var i=0, len=data.tiles.length; i<len; i++){
				var d = data.tiles[i];
				game.tiles[i] = {
					name: d.tileName,
					account: d.account,
					player: d.player,
					nation: d.nation,
					flag: d.flag,
					capital: data.capitalTiles.indexOf(i) > -1 && d.flag ? true : false,
					units: d.units,
					food: d.food,
					production: d.production,
					culture: d.culture,
					defense: d.defense,
					adj: data.adj[i]
				}
				// init flag unit values
				var zig = document.getElementById('unit' + i);
				if (zig !== null){
					zig.textContent = d.units === 0 ? 0 : d.units; 
					if (d.units){
						zig.style.visibility = 'visible';
					}
				}
				if (d.player){
					// init map appearance
					TweenMax.set('#land' + i, {
						fill: g.color[game.player[d.player].playerColor],
						stroke: g.color[game.player[d.player].playerColor],
						strokeWidth: 1,
						onComplete: function(){
							if (d.player){
								TweenMax.set(this.target, {
									stroke: "hsl(+=0%, +=0%, -=30%)"
								});
							}
						}
					});
				}
			}
			g.tileCount = len;
			// init map flags
			var a = document.getElementsByClassName('unit'),
				mapBars = document.getElementById('mapBars'),
				mapFlagWrap = document.getElementById('mapFlagWrap');
			for (var i=0, len=a.length; i<len; i++){
				// set flag position and value
				var t = game.tiles[i];
				var x = a[i].getAttribute('x') - 20;
				var y = a[i].getAttribute('y') - 30;
				var flag = 'blank.png';
				if (t !== undefined){
					if (!t.flag && t.units){ // FIX TODO??
						flag = "Player0.jpg";
					} else if (t.flag){
						flag = t.flag;
					}
				}
				// dynamically add svg flag image to the map
				var svg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
				svg.id = 'flag' + i;
				svg.setAttributeNS(null, 'height', 40);
				svg.setAttributeNS(null, 'width', 40);
				svg.setAttributeNS(null,"x",x);
				svg.setAttributeNS(null,"y",y + 5);
				svg.setAttributeNS(null,"class","mapFlag");
				svg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/flags/' + flag);
				mapFlagWrap.appendChild(svg);
				// add star for capital to map
				if (game.tiles[i] !== undefined){
					if (game.tiles[i].capital){
						var svg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
						svg.id = 'mapCapital' + i;
						svg.setAttributeNS(null,'class','mapStar');
						svg.setAttributeNS(null,'d','m '+ x +','+ y +' 5.79905,17.10796 18.05696,0.50749 -14.47863,10.80187 5.09725,17.33001 -14.74733,-10.43203 -14.90668,10.20304 5.36427,-17.24922 -14.31008,-11.02418 18.06264,-0.22858 z');
						mapCapitals.appendChild(svg);
						if (!isMobile){
							TweenMax.to(svg, 60, {
								transformOrigin: '50% 50%',
								rotation: 360,
								repeat: -1,
								ease: Linear.easeNone
							});
						}
					}
				} else {
					console.warn("COULD NOT FIND: ", i);
				}
				if (!isMobile){
					var svgTgt = document.getElementById('targetCrosshair');
					TweenMax.to(svgTgt, 10, {
						transformOrigin: '50% 50%',
						rotation: 360,
						repeat: -1,
						ease: Linear.easeNone
					});
				}
			}
			// init map DOM elements
			game.initMap();
			// food, culture, def bars
			for (var i=0; i<len; i++){
				animate.initMapBars(i);
			}
			//lobby.initRibbons(data.ribbons);
			var str = '';
			// init diplomacyPlayers
			function diploRow(p){
				var account = p.cpu ? ("Computer: "+ p.difficulty) : p.account,
					icon = p.cpu ? 'fa fa-microchip' : lobby.governmentIcon(p.government),
					gov = p.cpu ? 'Computer' : p.government;
				function teamIcon(team){
					return g.teamMode ? 
						'<span class="diploTeam" data-placement="right" title="Team '+ team +'">'+ team +'</span>' :
						'';
				}
				var str = 
				'<div id="diplomacyPlayer' + p.player + '" class="diplomacyPlayers alive">'+
					// bg 
					'<img src="images/flags/'+ p.flagSrc +'" class="diplo-flag" data-placement="right" title="'+ p.flagShort + '">'+
					// row 1
					'<div class="nowrap">'+
						'<i class="' + icon + ' diploSquare player'+ game.player[p.player].playerColor +'" data-placement="right" title="' + gov + '"></i> '+ account + 
					'</div>'+
					// row 2
					'<div class="nowrap">'+ teamIcon(p.team) + p.nation + '</div>'+
					
				'</div>';
				return str;
			}
			var teamArr = [str];
			for (var i=0, len=game.player.length; i<len; i++){
				var p = game.player[i];
				if (p.account){
					p.flagArr = p.flag.split("."),
					p.flagShort = p.flagArr[0],
					p.flagSrc = p.flag === 'Default.jpg' ? 
						'Player'+ game.player[p.player].playerColor +'.jpg' : 
						p.flag;
					if (g.teamMode){
						var foo = diploRow(p);
						// 100 just in case the players/game are increased later
						teamArr[p.team*100 + i] = foo;
					} else {
						str += diploRow(p);
					}
				}
			}
			var diploHead = 
			'<div class="header text-center diplo-head '+ g.gameMode.toLowerCase() +'">'+ g.gameMode +'</div>';
			
			if (g.teamMode){
				document.getElementById('diplomacy-ui').innerHTML = diploHead + teamArr.join("");
			} else {
				document.getElementById('diplomacy-ui').innerHTML = diploHead + str;
			}
			initResources(data);
			// set images
			setTimeout(function(){
				// init draggable map
				worldMap = Draggable.create(DOM.worldWrap, {
					minimumMovement: 4,
					type: 'x,y',
					bounds: "#gameWrap"
				});
				
				initOffensiveTooltips();
				if (!isMobile){
					TweenMax.set(DOM.targetLine, {
						stroke: g.color[game.player[my.player].playerColor]
					});
				}
				TweenMax.set(DOM.targetLine, {
					stroke: "hsl(+=0%, +=0%, +=15%)"
				});
				
				function triggerAction(that){
					if (my.attackOn){
						var o = my.targetData;
						if (o.attackName === 'attack' || o.attackName === 'splitAttack'){
							action.attack(that);
						} else if (o.attackName === 'cannons'){
							action.fireCannons(that);
						} else if (o.attackName === 'missile'){
							action.launchMissile(that);
						} else if (o.attackName === 'nuke'){
							action.launchNuke(that);
						}
					} else {
						ui.showTarget(that);
					}
				}
				var zug = $("#gameWrap");
				// map events
				if (isMSIE || isMSIE11){
					zug.on('mousedown', ".land", function(){
						triggerAction(this);
						TweenMax.set(this, {
							fill: "hsl(+=0%, +=0%, -=5%)"
						});
					});
				} else {
					zug.on('click', ".land", function(e){
						location.host === 'localhost' && console.info(this.id, e.offsetX, e.offsetY);
						triggerAction(this);
					});
				}
				zug.on("mouseenter", ".land", function(){
					my.lastTarget = this;
					if (my.attackOn){
						ui.showTarget(this, true);
					}
					TweenMax.set(this, {
						fill: "hsl(+=0%, +=0%, -=5%)"
					});
				}).on("mouseleave", ".land", function(){
					var land = this.id.slice(4)*1;
					if (game.tiles.length > 0){
						var player = game.tiles[land] !== undefined ? game.tiles[land].player : 0,
							fillNum = player ? game.player[player].playerColor : 0;
						TweenMax.set(this, {
							fill: g.color[fillNum]
						});
					}
				});
				
				// focus on player home
				my.focusTile(my.capital);
				// add warning for players
				if (location.host !== 'localhost'){
					window.onbeforeunload = function(){
						return "To leave the game use the surrender flag instead!";
					}
				}
				game.startGameState();
				ui.setCurrentYear(data.resourceTick);
			}, 350);
		}).fail(function(data){
			setTimeout(function(){
				loadGameState();
			}, 1500);
		}).always(function(){
			g.unlock();
		});
	});
};// audio.js
var audio = {
	ext: (function(a){
		return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, '')) ? 'mp3' : 'ogg'
	})(document.createElement('audio')),
	on: (function(a){
		return !!a.canPlayType ? true : false;
	})(document.createElement('audio')),
	play: function(foo, bg){
		if (foo) {
			if (bg){
				// music
				if (g.config.audio.musicVolume){
					dom.bgmusic.pause();
					dom.bgmusic.src = "music/" + foo + ".mp3";
					dom.bgmusic.volume = g.config.audio.musicVolume / 100;
				}
			} else {
				// sfx
				if (g.config.audio.soundVolume){
					var sfx = new Audio("sound/" + foo + ".mp3");
					sfx.volume = g.config.audio.soundVolume / 100;
					sfx.play();
				}
			}
		}
	},
	save: function(){
		// save to storage
		var foo = JSON.stringify(g.config); 
		localStorage.setItem('config', foo);
	},
	setMusicVolume: function(val){
		if (g.config.audio.musicVolume){
			if (!val){
				audio.pause();
			}
		} else {
			// start playing music
			audio.musicStart();
		}
		dom.bgmusic.volume = val / 100;
		g.config.audio.musicVolume = val;
		audio.save();
	},
	setSoundVolume: function(val){
		g.config.audio.soundVolume = val;
		audio.save();
	},
	pause: function(){
		dom.bgmusic.pause();
	},
	gameMusicInit: function(){
		if (g.config.audio.musicVolume){
			audio.pause();
			dom.bgmusic.loop = false;
			audio.gameMusicPlayNext();
		}
	},
	// rotating music tracks in game
	trackIndex: ~~(Math.random() * 8),
	tracks: [
		'ArcLight',
		'Blackmoor Colossus',
		'Blackmoor Tides',
		'Dark Descent',
		'Heroic Demise',
		"Ireland's Coast",
		'Salt Marsh Birds',
		'Snowland Loop',
		'soliliquoy',
		'The Dark Amulet'
	],
	gameMusicPlayNext: function(){
		// FIX IT SO IT USES BGAUDIO
		audio.totalTracks = audio.tracks.length;
		var nowPlaying = audio.tracks[++audio.trackIndex % audio.totalTracks];
		dom.bgmusic.pause();
		dom.bgmusic.src = "music/" + nowPlaying +".mp3";
		dom.bgmusic.volume = g.config.audio.musicVolume / 100;
		dom.bgmusic.onended = function(){
			audio.gameMusicPlayNext();
		}
	},
	fade: function(){
		var x = {
			vol: g.config.audio.musicVolume / 100
		}
		TweenMax.to(x, 2.5, {
			vol: 0,
			ease: Linear.easeNone,
			onUpdate: function(){
				dom.bgmusic.volume = x.vol;
			}
		});
	},
	cache: {},
	load: {
		title: function(){
			var x = [
				'bash'
			];
			for (var i=0, len=x.length; i<len; i++){
				var z = x[i];
				audio.cache[z] = new Audio("sound/" + z + ".mp3");
			}
		},
		game: function(){
			var x = [
				'bash'
			];
			for (var i=0, len=x.length; i<len; i++){
				var z = x[i];
				audio.cache[z] = new Audio("sound/" + z + ".mp3");
			}
		}
	},
	musicStart: function(){
		if (g.view !== 'game'){
			audio.play("ArcLight", 1);
			//audio.play("WaitingBetweenWorlds", 1);
		} else {
			audio.gameMusicPlayNext();
		}
	}
}
audio.init = (function(){
	// console.info("Checking local data...");
	var config = localStorage.getItem('config');
	if (config === null){
		// initialize
		audio.save();
	} else {
		var foo = JSON.parse(config);
		if (g.config.audio.musicOn === undefined){
			g.config.audio = foo.audio;
		}
	}
	// console.info("Initializing audio...", g.config.audio);
	audio.load.title();
	if (!g.config.audio.musicVolume){
		audio.pause();
	} else {
		audio.musicStart();
	}
	var initComplete = false;
	var e = $("#musicSlider");
	if (e.length){
		e.slider({
			min  : 0, 
			max  : 100, 
			value: g.config.audio.musicVolume, 
			formatter: function(value) {
				if (initComplete){
					audio.setMusicVolume(value);
					return value;
				} else {
					return g.config.audio.musicVolume;
				}
			}
		}).slider('setValue', g.config.audio.musicVolume);
	}
	var e = $("#musicSlider");
	if (e.length){
		$("#soundSlider").slider({
			min  : 0, 
			max  : 100, 
			value: g.config.audio.soundVolume, 
			tooltip_position: 'bottom',
			formatter: function(value) {
				if (initComplete){
					audio.setSoundVolume(value);
					return value;
				} else {
					return g.config.audio.soundVolume
				}
			}
		}).on('slideStop', function(val){
			audio.play('machine0');
		}).slider('setValue', g.config.audio.soundVolume);
	}
	initComplete = true;
})();// map.js
// map zooming and scrolling
function mouseZoomIn(e){
	g.mouse.zoom += 10;
	if (g.mouse.zoom > 400){
		g.mouse.zoom = 400;
	}
	TweenMax.to(DOM.worldWrap, .5, {
		transformOrigin: g.mouse.transX + "% " + g.mouse.transY + "%",
		force3D: false,
		smoothOrigin: true,
		scale: g.mouse.zoom / 100,
		onUpdate: function(){
			worldMap[0].applyBounds();
		}, 
		onComplete: function(){
			worldMap[0].applyBounds();
		}
	});
}
function mouseZoomOut(e){
	g.mouse.zoom -= 10;
	if (g.mouse.zoom < 60){
		g.mouse.zoom = 60;
	}
	TweenMax.to(DOM.worldWrap, .5, {
		force3D: false,
		smoothOrigin: true,
		transformOrigin: g.mouse.transX + "% " + g.mouse.transY + "%",
		scale: g.mouse.zoom / 100,
		onUpdate: function(){
			worldMap[0].applyBounds();
		}, 
		onComplete: function(){
			worldMap[0].applyBounds();
		}
	});
	worldMap[0].applyBounds();
}
function setMousePosition(X, Y){
	var x = ~~((X / g.map.sizeX) * 100);
	var y = ~~((Y / g.map.sizeY) * 100);
	g.mouse.transX = x;
	g.mouse.transY = y;
}// actions.js
function Target(o){
	if (o === undefined){
		o = {};
	}
	this.cost = o.cost !== undefined ? o.cost : 2;
	this.minimum = o.minimum !== undefined ? o.minimum : 2;
	this.attackName = o.attackName ? o.attackName : 'attack';
	this.splitAttack = o.splitAttack ? o.splitAttack : false;
	this.hudMsg = o.hudMsg ? o.hudMsg : 'Attack: Select Target';
}

var action = {
	error: function(msg){
		if (msg === undefined){
			msg = "Not enough production!";
		}
		Msg(msg, 1.5);
		my.clearHud();
		ui.showTarget(DOM['land' + my.tgt]);
	},
	target: function(o){
		my.targetData = o;
		my.checkSelectLastTarget();
		if (my.attackOn && o.attackName === my.attackName){
			my.attackOn = false;
			my.attackName = '';
			my.clearHud();
			ui.showTarget(DOM['land' + my.tgt]);
			return;
		}
		if (game.tiles[my.tgt].units < o.minimum){
			Msg("You need at least " + o.minimum + " troops to attack!", 1.5);
			my.clearHud();
			return;
		}
		if (my.player === game.tiles[my.tgt].player){
			my.attackOn = true;
			my.attackName = o.attackName;
			my.splitAttack = o.splitAttack;
			my.hud(o.hudMsg);
			// set cursor
			$("#style-land-crosshair").remove();
			$DOM.head.append('<style id="style-land-crosshair">.land{ cursor: crosshair; }</style>');
			// set target line
			my.targetLine[0] = DOM['unit' + my.tgt].getAttribute('x')*1 - 10;
			my.targetLine[1] = DOM['unit' + my.tgt].getAttribute('y')*1 - 10;
			ui.showTarget(my.lastTarget, true);
		}
	},
	attack: function(that){
		var attacker = my.tgt;
		var defender = that.id.slice(4)*1;
		if (my.tgt === defender){
			return;
		}
		if (game.tiles[attacker].adj.indexOf(defender) === -1){
			action.targetNotAdjacent('You can only attack adjacent territories.', attacker);
			return;
		}
		// can't move to maxed friendly tile
		if (game.tiles[defender].player === my.player){
			if (game.tiles[defender].units >= 255){
				Msg("That territory has the maximum number of units!", 1.5);
				my.clearHud();
				return;
			}
		}
		
		my.attackOn = false;
		my.attackName = '';
		if (game.tiles[my.tgt].units === 1){
			Msg("You need at least 2 troops to move/attack!", 1.5);
			my.clearHud();
			return;
		}
		if (my.government === 'Despotism' && game.tiles[defender].player === my.player){
			// nothing
		} else {
			if ((my.moves < 2 && !my.splitAttack) ||
				(my.moves < 1 && my.splitAttack) ){
				action.error('Not enough energy!');
				return;
			}
		}
		ui.showTarget(that);
		my.clearHud();
		if (g.teamMode && game.tiles[defender].player){
			if (my.account !== game.tiles[defender].account){
				if (my.team === game.player[game.tiles[defender].player].team){
					Msg("Friendly fire! That's your teammate!");
				}
			}
		}
		// send attack to server
		$.ajax({
			url: 'php/attackTile.php',
			data: {
				attacker: attacker,
				defender: defender,
				split: my.splitAttack ? 1 : 0,
				randomTile: action.getRandomDemocracyTile(defender, game.tiles[defender].player),
				defGovernment: game.player[game.tiles[defender].player].government
			}
		}).done(function(data){
			//console.info('attackTile', data);
			// animate attack
			if (game.tiles[defender].player !== my.player){
				if (!game.tiles[defender].units){
					audio.move();
				}
			} else {
				audio.move();
			}
			// barbarian message
			if (data.rewardMsg){
				game.chat({ message: '<span class="chat-news">' + data.rewardMsg + '</span>' });
				setResources(data);
				if (data.foodReward && data.productionReward && data.cultureReward){
					// all +%
					animate.upgrade(defender, 'food', data.foodReward +'%');
					setTimeout(function(){
						animate.upgrade(defender, 'production', data.productionReward +'%');
					}, 500);
					setTimeout(function(){
						animate.upgrade(defender, 'culture', data.cultureReward +'%');
					}, 1000);
				} else if (data.sumFood){
					animate.upgrade(defender, 'food', data.sumFood);
				} else if (data.sumProduction){
					animate.upgrade(defender, 'production', data.sumProduction);
				} else if (data.sumCulture){
					animate.upgrade(defender, 'culture', data.sumCulture);
				} else if (data.sumMoves){
					animate.upgrade(defender, 'energy', data.sumMoves);
				} else if (data.foodReward){
					// food %
					animate.upgrade(defender, 'food', data.foodReward +'%');
				} else if (data.productionReward){
					// production %
					animate.upgrade(defender, 'production', data.productionReward +'%');
				} else if (data.cultureReward){
					// culture %
					animate.upgrade(defender, 'culture', data.cultureReward +'%');
				}
			}
			setMoves(data); 
			// reset target if lost
			if (!data.victory){
				ui.showTarget(DOM['land' + attacker]);
			}
			// process barbarian reward messages
			game.reportMilestones(data);
		}).fail(function(data){
			action.targetNotAdjacent(data.statusText, attacker);
		});
	},
	getRandomDemocracyTile: function(tile, player){
		var a = [],
			i = 0;
		game.tiles.forEach(function(t, index){
		  if (t.player === player && index !== tile){
			a[i++] = index;
		  }
		});
		var len = a.length;
		return a[~~(Math.random() * len)];
	},
	targetNotAdjacent: function(msg, attacker){
		audio.play('error');
		Msg(msg, 1.5);
		// set target attacker
		ui.showTarget(DOM['land' + attacker]);
	},
	deploy: function(){
		if (my.government === 'Communism' && !game.tiles[my.tgt].player && !game.tiles[my.tgt].units){
			// skip for commie bonus
		} else {
			my.checkSelectLastTarget();
		}
		var t = game.tiles[my.tgt];
		if (my.production < my.deployCost){
			action.error();
			return;
		}
		if (!my.manpower){
			action.error("No troops available for deployment!");
			return;
		}
		if (t.units <= 254){
			// do it
			var tgt = my.tgt;
			$.ajax({
				url: 'php/deploy.php',
				data: {
					target: tgt
				}
			}).done(function(data) {
				//console.info(data);
				audio.deploy();
				game.tiles[tgt].units = data.units;
				my.manpower = data.manpower;
				setResources(data);
			}).fail(function(e){
				audio.play('error');
			}).always(function(data){
				setTileUnits(tgt, '#00ff00');
			});
			TweenMax.set('#manpower', {
			  color: '#fff'
			});
		}
	},
	rush: function(){
		my.checkSelectLastTarget();
		var t = game.tiles[my.tgt],
			tgt = my.tgt;
		if (my.moves < my.rushCost){
			action.error('Not enough energy!');
			return;
		}
		if (t.units <= 254){
			$.ajax({
				url: 'php/rush.php',
				data: {
					target: tgt
				}
			}).done(function(data) {
				audio.deploy();
				setMoves(data);
				game.tiles[tgt].units = data.units;
				//setProduction(data);
				setTileUnits(tgt, '#00ff00');
			}).fail(function(e){
				audio.play('error');
			}).always(function(data){
				// my.manpower = data.manpower;
				setResources(data);
			});
		}
	},
	upgradeTileDefense: function(){
		my.checkSelectLastTarget();
		var t = game.tiles[my.tgt],
			ind = t.defense - t.capital ? 1 : 0;
		if (ind > 2){
			return;
		}
		if (my.production < (g.upgradeCost[ind] * my.buildCost)){
			action.error();
			return;
		}
		$.ajax({
			url: 'php/upgradeTileDefense.php',
			data: {
				target: my.tgt
			}
		}).done(function(data) {
			setProduction(data);
		}).fail(function(e){
			console.info(e.responseText);
			Msg(e.statusText);
			audio.play('error');
		});
	},
	fireCannons: function(that){
		var attacker = my.tgt;
		var defender = that.id.slice(4)*1;
		if (my.tgt === defender){
			return;
		}
		if (game.tiles[my.tgt].units === 0){
			return;
		}
		my.attackOn = false;
		my.attackName = '';
		if (my.production < Math.ceil(24 * my.weaponCost)){
			action.error();
			return;
		}
		my.clearHud();
		ui.showTarget(DOM['land' + attacker]);
		// send attack to server
		$.ajax({
			url: 'php/fireCannons.php',
			data: {
				attacker: attacker,
				defender: defender
			}
		}).done(function(data) {
			setProduction(data);
		}).fail(function(e){
			console.info('error: ', e);
			audio.play('error');
			if (e.statusText){
				Msg(e.statusText, 1.5);
			}
		});
	},
	launchMissile: function(that){
		var attacker = my.tgt;
		var defender = that.id.slice(4)*1;
		if (my.tgt === defender){
			return;
		}
		if (game.tiles[my.tgt].units === 0){
			return;
		}
		my.attackOn = false;
		my.attackName = '';
		if (my.production < Math.ceil(50 * my.weaponCost)){
			action.error();
			return;
		}
		my.clearHud();
		ui.showTarget(DOM['land' + attacker]);
		// send attack to server
		$.ajax({
			url: 'php/launchMissile.php',
			data: {
				attacker: attacker,
				defender: defender
			}
		}).done(function(data) {
			console.info('launchMissile', data);
			// animate attack
			if (data.production !== undefined){
				setProduction(data);
			}
			setTimeout(function(){
				$.ajax({
					url: 'php/launchMissileHit.php',
					data: {
						attacker: attacker,
						defender: defender
					}
				}).fail(function(e){
					console.info('error: ', e);
					if (e.statusText){
						Msg(e.statusText, 1.5);
					}
				});
			}, 1000);
		}).fail(function(e){
			console.info('error: ', e);
			audio.play('error');
			if (e.statusText){
				Msg(e.statusText, 1.5);
			}
		});
		
	},
	launchNuke: function(that){
		var attacker = my.tgt;
		var defender = that.id.slice(4)*1;
		if (my.tgt === defender){
			return;
		}
		if (game.tiles[my.tgt].units === 0){
			return;
		}
		my.attackOn = false;
		my.attackName = '';
		if (my.production < Math.ceil(150 * my.weaponCost)){
			action.error();
			return;
		}
		my.clearHud();
		ui.showTarget(DOM['land' + attacker]);
		// send attack to server
		$.ajax({
			url: 'php/launchNuke.php',
			data: {
				attacker: attacker,
				defender: defender
			}
		}).done(function(data) {
			setTimeout(function(){
				$.ajax({
					url: 'php/launchNukeHit.php',
					data: {
						defender: defender
					}
				});
			}, 6000);
			setProduction(data);
		}).fail(function(e){
			console.info('error: ', e);
			audio.play('error');
			if (e.statusText){
				Msg(e.statusText, 1.5);
			}
		});
		
	},
	// updates currently visible buttons after research/targeting
	setMenu: function(){
		// show/hide research
		if (my.tech.masonry){
		}
		DOM.researchMasonry.style.display = !my.tech.masonry ? 'block' : 'none';
		DOM.researchConstruction.style.display = my.tech.masonry && !my.tech.construction ? 'block' : 'none';
		DOM.researchEngineering.style.display = my.tech.construction && !my.tech.engineering ? 'block' : 'none';
		DOM.researchGunpowder.style.display = !my.tech.gunpowder ? 'block' : 'none';
		DOM.researchRocketry.style.display = my.tech.gunpowder && !my.tech.rocketry ? 'block' : 'none';
		DOM.researchAtomicTheory.style.display = my.tech.rocketry && !my.tech.atomicTheory ? 'block' : 'none';
		DOM.researchFutureTech.style.display = my.tech.atomicTheory ? 'block' : 'none';
		if (my.tech.masonry){
			// masonry unlocked
			if (!game.tiles[my.tgt].defense){
				// zero defense
				DOM.upgradeTileDefense.style.display = 'block';
			} else {
				// bunker built
				var capValue = game.tiles[my.tgt].capital ? 1 : 0,
					dMinusPalace = game.tiles[my.tgt].defense - capValue,
					display = 'none';
				
				console.info('dMinusPalace ', dMinusPalace);
				if (my.tech.engineering){
					if (dMinusPalace < 3){
						display = 'block';
					}
				} else if (my.tech.construction){
					if (!dMinusPalace){
						// nothing built
						display = 'block';
					}
				}
				DOM.upgradeTileDefense.style.display = display;
			}
		} else {
			DOM.upgradeTileDefense.style.display = 'none';
		}
		DOM.fireCannons.style.display = my.tech.gunpowder ? 'block' : 'none';
		DOM.launchMissile.style.display = my.tech.rocketry ? 'block' : 'none';
		DOM.launchNuke.style.display = my.tech.atomicTheory ? 'block' : 'none';
	},
	endTurn: function(){
		if (my.moves){
			audio.play('click');
			$.ajax({
				type: 'GET',
				url: 'php/endTurn.php',
			}).done(function(data){
				setMoves(data);
			});
		}
	}
}

// key bindings
function toggleChatMode(bypass){
	g.chatOn = g.chatOn ? false : true;
	if (g.chatOn){
		// show chat
		$DOM.chatInputOpen.css('visibility', 'hidden');
		$DOM.chatInputWrap.css('visibility', 'visible');
		$DOM.chatInput.focus();
	} else {
		// hide chat
		var msg = $DOM.chatInput.val().trim();
		if (bypass && msg){
			// send ajax chat msg
			if (msg === '/friend'){
				title.listFriends();
			} else if (msg.indexOf('/friend ') === 0){
				title.toggleFriend(msg.slice(8));
			} else if (msg.indexOf('/unignore ') === 0){
				var account = msg.slice(10);
				title.removeIgnore(account);
			} else if (msg === '/ignore'){
				title.listIgnore();
			} else if (msg.indexOf('/ignore ') === 0){
				var account = msg.slice(8);
				title.addIgnore(account);
			} else if (msg.indexOf('/whisper ') === 0){
				title.sendWhisper(msg, '/whisper ');
			} else if (msg.indexOf('/w ') === 0){
				title.sendWhisper(msg, '/w ');
			} else if (msg.indexOf('@') === 0){
				title.sendWhisper(msg , '@');
			} else if (msg.indexOf('/who ') === 0){
				title.who(msg);
			} else {
				if (msg.charAt(0) === '/' && msg.indexOf('/me') !== 0){
					// skip
				} else {
					$.ajax({
						url: 'php/insertChat.php',
						data: {
							message: msg
						}
					});
				}
			}
		}
		$DOM.chatInput.val('').blur();
		$DOM.chatInputOpen.css('visibility', 'visible');
		$DOM.chatInputWrap.css('visibility', 'hidden');
	}
}

$("#gameWrap").on(ui.click, '#attack', function(){
	var o = new Target({});
	action.target(o);
}).on(ui.click, '#deploy', function(){
	action.deploy();
}).on(ui.click, '#splitAttack', function(){
	var o = new Target({
		cost: 1,
		attackName: 'splitAttack',
		hudMsg: 'Split Attack: Select Target',
		splitAttack: true
	});
	action.target(o);
}).on(ui.click, '#rush', function(){
	action.rush();
}).on(ui.click, '#upgradeTileDefense', function(){
	action.upgradeTileDefense();
}).on(ui.click, '#researchMasonry', function(){
	research.masonry();
}).on(ui.click, '#researchConstruction', function(){
	research.construction();
}).on(ui.click, '#researchGunpowder', function(){
	research.gunpowder();
}).on(ui.click, '#researchEngineering', function(){
	research.engineering();
}).on(ui.click, '#researchRocketry', function(){
	research.rocketry();
}).on(ui.click, '#researchAtomicTheory', function(){
	research.atomicTheory();
}).on(ui.click, '#researchFutureTech', function(){
	research.futureTech();
}).on(ui.click, '#fireCannons', function(){
	var o = new Target({
		cost: 0,
		minimum: 0,
		attackName: 'cannons',
		hudMsg: 'Fire Cannons'
	});
	action.target(o);
}).on(ui.click, '#launchMissile', function(){
	var o = new Target({
		cost: 0,
		minimum: 0,
		attackName: 'missile',
		hudMsg: 'Launch Missile'
	});
	action.target(o);
}).on(ui.click, '#launchNuke', function(){
	var o = new Target({
		cost: 0,
		minimum: 0,
		attackName: 'nuke',
		hudMsg: 'Launch Nuclear Weapon'
	});
	action.target(o);
});

var research = {
	masonry: function(){
		$.ajax({
			type: 'GET',
			url: 'php/researchMasonry.php'
		}).done(function(data) {
			my.tech.masonry = 1;
			research.report(data, "Masonry");
		});
	},
	construction: function(){
		$.ajax({
			type: 'GET',
			url: 'php/researchConstruction.php'
		}).done(function(data) {
			my.tech.construction = 1;
			research.report(data, "Construction");
		});
	},
	gunpowder: function(){
		$.ajax({
			type: 'GET',
			url: 'php/researchGunpowder.php'
		}).done(function(data) {
			my.tech.gunpowder = 1;
			research.report(data, "Gunpowder");
		});
	},
	engineering: function(){
		$.ajax({
			type: 'GET',
			url: 'php/researchEngineering.php'
		}).done(function(data) {
			my.tech.engineering = 1;
			research.report(data, "Engineering");
		});
	},
	rocketry: function(){
		$.ajax({
			type: 'GET',
			url: 'php/researchRocketry.php'
		}).done(function(data) {
			my.tech.rocketry = 1;
			research.report(data, "Rocketry");
		});
	},
	atomicTheory: function(){
		$.ajax({
			type: 'GET',
			url: 'php/researchAtomicTheory.php'
		}).done(function(data) {
			my.tech.atomicTheory = 1;
			research.report(data, "Atomic Theory");
		});
	},
	futureTech: function(){
		$.ajax({
			type: 'GET',
			url: 'php/researchFutureTech.php'
		}).done(function(data) {
			research.report(data, "Future Tech");
		});
	},
	report: function(data, tech){
		setProduction(data);
		var o = {
			message: 'You have finished researching ' + tech + '.'
		}
		game.chat(o);
		if (data.cultureMsg){
			var o = {
				message: data.cultureMsg
			};
			game.chat(o);
		}
		audio.play('research');
		action.setMenu();
	}
};var events = {
	core: (function(){
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
			// background map
			if (init.isMobile){
				document.getElementById('worldTitle').style.display = 'none';
				TweenMax.set('#worldTitle', {
					xPercent: -50,
					yPercent: -50,
					top: '50%',
					left: '50%',
					width: '1600px',
					height: '1600px'
				});
			} else {
				TweenMax.to("#worldTitle", 600, {
					startAt: {
						xPercent: -50,
						yPercent: -50,
						rotation: -360
					},
					rotation: 0,
					repeat: -1,
					ease: Linear.easeNone
				});
			}
		});
	})(),
	title: (function(){
		$("#mainWrap").on(env.click, '.titlePlayerAccount, .lobbyAccountName', function(){
			title.who('/who '+ $(this).text());
		});
		$("#gameView").on('dragstart', 'img', function(e) {
			e.preventDefault();
		});
		$("img").on('dragstart', function(event) {
			event.preventDefault();
		});

		$("#logout").on(env.click, function() {
			playerLogout();
			return false;
		});
		$("#login").on(env.click, function(){
			socket.removePlayer(my.account);
			$.ajax({
				type: 'GET',
				url: 'php/deleteFromFwtitle.php'
			});
		});

		$("#titleMenu").on(env.click, '.wars', function(){
			var gameName = $(this).data("name");
			$("#joinGame").val(gameName);
			$("#joinGamePassword").val('');
			title.joinGame();
		});
		
		function openCreateGameModal(mode){
			var e1 = document.getElementById('createGameHead'),
				e2 = document.getElementById('createRankedGameHead'),
				e3 = $("#gameName"),
				e4 = document.getElementById('createGameNameWrap'),
				e5 = document.getElementById('createGamePasswordWrap'),
				e6 = document.getElementById('createGameMaxPlayerWrap');
			
			g.rankedMode = 0;
			g.teamMode = 0;
			if (mode === 'ranked'){
				g.rankedMode = 1;
				e1.style.display = 'none';
				e2.style.display = 'block';
				e4.style.display = 'none';
				e5.style.display = 'none';
				e6.style.display = 'none';
			} else {
				e1.style.display = 'block';
				e2.style.display = 'none';
				e4.style.display = 'block';
				e5.style.display = 'block';
				e6.style.display = 'block';
			}
			if (mode === 'team'){
				g.teamMode = 1;
				e1.textContent = 'Create Team Game';
			}
			e3.val(my.account +'_'+ ~~(Math.random()*999999)).select();
			TweenMax.to(document.getElementById("createGameWrap"), g.modalSpeed, {
				startAt: {
					visibility: 'visible',
					y: 0,
					alpha: 0
				},
				y: 30,
				alpha: 1
			});
			title.showBackdrop(e3);
			
			var speed = localStorage.getItem('gameSpeed2') === null ? 15 : localStorage.getItem('gameSpeed2');
			g.speed = speed;
			$("#createGameSpeed").text(speed);
		}
		$('#mainWrap').on(env.click, '.chat-join', function(){
			socket.setChannel($(this).text());
		});
		$('#create').on(env.click, function(){
			openCreateGameModal('ffa');
		});
		$('#createRankedBtn').on(env.click, function(){
			openCreateGameModal('ranked');
		});
		$("#createTeamBtn").on(env.click, function(){
			openCreateGameModal('team');
		});

		$("#createGame").on(env.click, function(){
			title.createGame();
		});
		$("#play-now-btn").on(env.click, function(){
			title.createGameService(my.account +'_'+ ~~(Math.random()*999999), '', 'Earth Omega', 8, 0, 0, 20);
			setTimeout(function(){
				lobby.addCpuPlayer();
			}, 500);
			
		});
		$("body").on(env.click, '#options', function(){
			TweenMax.to(document.getElementById("optionsModal"), g.modalSpeed, {
				startAt: {
					visibility: 'visible',
					y: 0,
					alpha: 0
				},
				y: 30,
				alpha: 1
			});
			title.showBackdrop();
		}).on(env.click, '#hotkeys', function(){
			TweenMax.to(document.getElementById("hotkeysModal"), g.modalSpeed, {
				startAt: {
					visibility: 'visible',
					y: 0,
					alpha: 0
				},
				y: 30,
				alpha: 1
			});
			title.showBackdrop();
		}).on(env.click, '#resync', function(){
			window.onbeforeunload = null;
			localStorage.setItem('resync', 1);
			location.reload();
		});
		$("#hotkeysDone, #optionsDone, #cancelCreateGame").on(env.click, function(){
			title.closeModal();
		});


		// cached values on client to reduce DB load

		$("#joinPrivateGameModal").on(env.click, "#joinPrivateGameBtn", function(){
			title.joinGame();
		});

		// events for title-chat buttons
		$("#refresh-game-button").on(env.click, function(){
			title.refreshGames();
			$("#title-chat-input").focus();
		});
		$("#titleChatPlayers").on(env.click, '#friend-status', function(){
			title.listFriends();
			$("#title-chat-input").focus();
		});
		$("#get-help").on(env.click, function(){
			title.help();
			$("#title-chat-input").focus();
		});
		$("#ignore-user").on(env.click, function(){
			$("#title-chat-input").val('/ignore ').focus();
		});
		$("#share-url").on(env.click, function(){
			$("#title-chat-input").val('/url ').focus();
		});
		$("#share-image").on(env.click, function(){
			$("#title-chat-input").val('/img ').focus();
		});
		$("#share-video").on(env.click, function(){
			$("#title-chat-input").val('/video ').focus();
		});
		$("#who-account").on(env.click, function(){
			$("#title-chat-input").val('/who ').focus();
		});
		$("#add-friend").on(env.click, function(){
			$("#title-chat-input").val('/friend ').focus();
		});
		$("#whisper-account").on(env.click, function(){
			$("#title-chat-input").val('@').focus();
		});
		$("#change-channel").on(env.click, function(){
			$("#title-chat-input").val('#').focus();
		});
		
		$("#body").on(env.click, "#cancelGame", function(){
			exitGame();
		}).on(env.click, "#startGame", function(){
			lobby.startGame();
		}).on(env.click, '.addFriend', function(){
			title.toggleFriend($(this).data('account'));
		}).on(env.click, '.ribbon', function(){
			var x = $(this).data('ribbon') * 1;
			g.chat(game.ribbonTitle[x] +": "+ game.ribbonDescription[x], 'chat-warning'); 
		});
		$("#toggleNation").on(env.click, function(){
			$.ajax({
				url: 'php/loadAvatar.php',
			}).done(function(data){
				document.getElementById('configureAvatarImage').src = data.uri;
			});
			TweenMax.to('#configureNation', g.modalSpeed, {
				startAt: {
					visibility: 'visible',
					y: 0,
					alpha: 0
				},
				y: 30,
				alpha: 1
			});
			title.showBackdrop();
		});
		$("#joinPrivateGameBtn").on(env.click, function(){
			var e = $("#joinGame");
			e.val('');
			TweenMax.to('#joinPrivateGameModal', g.modalSpeed, {
				startAt: {
					visibility: 'visible',
					y: 0,
					alpha: 0
				},
				y: 30,
				alpha: 1,
				onComplete: function(){
					e.focus();
				}
			});
			title.showBackdrop();
		});
		$("#mainWrap").on(env.click, ".unlockGameBtn", function(){ 
			title.closeModal();
			TweenMax.to('#unlockGame', g.modalSpeed, {
				startAt: {
					visibility: 'visible',
					y: 0,
					alpha: 0
				},
				y: 30,
				alpha: 1
			});
			setTimeout(function(){
				$("#card-number").focus();
			}, 100);
			title.showBackdrop();
		});
		$("#leaderboardBtn").on(env.click, function(){
			TweenMax.to(document.getElementById('leaderboard'), g.modalSpeed, {
				startAt: {
					visibility: 'visible',
					top: 0,
					alpha: 0
				},
				top: 30,
				alpha: 1
			});
			title.showBackdrop();
			title.getLeaderboard('FFA');
		});
		// leaderboard buttons
		$("#leaderboardFFABtn").on(env.click, function(){
			title.getLeaderboard('FFA');
		});
		$("#leaderboardRankedBtn").on(env.click, function(){
			title.getLeaderboard('Ranked');
		});
		$("#leaderboard-trips-btn").on(env.click, function(){
			title.getLeaderboard('Trips');
		});
		$("#leaderboard-quads-btn").on(env.click, function(){
			title.getLeaderboard('Quads');
		});
		$("#leaderboard-pents-btn").on(env.click, function(){
			title.getLeaderboard('Pents');
		});
		$("#leaderboardTeamBtn").on(env.click, function(){
			title.getLeaderboard('Team');
		});
		$("#endTurn").on(env.click, function(){
			action.endTurn();
		});

		$("#flagDropdown").on(env.click, '.flagSelect', function(e){
			my.selectedFlag = $(this).text();
			my.selectedFlagFull = my.selectedFlag === "Nepal" ? my.selectedFlag+".png" : my.selectedFlag+".jpg";
			$(".flagPurchaseStatus").css("display", "none");
			$("#updateNationFlag")
				.attr("src", "images/flags/" + my.selectedFlagFull)
				.css("display", "block");
			g.lock(1);
			$.ajax({
				url: 'php/updateFlag.php',
				data: {
					flag: my.selectedFlagFull
				}
			}).done(function(data) {
				my.flag = my.selectedFlagFull;
				$(".nationFlag").attr({
					src: "images/flags/" + my.selectedFlagFull,
					title: my.selectedFlag
				});
				Msg("Your nation's flag is now: " + my.selectedFlag);
				document.getElementById('selectedFlag').textContent = my.selectedFlag;
				if (!init.isMobile){
					$("[title]")
						.tooltip('fixTitle')
						.tooltip({
							animation: false
						});
				}
			}).always(function(){
				g.unlock(1);
				TweenMax.to("#updateNationFlag", 1, {
					startAt: {
						alpha: 0
					},
					alpha: 1
				});
			});
			e.preventDefault();
		});

		$("#submitNationName").on("mousedown", function(){
			title.submitNationName();
		});
		$("#updateNationName").on("focus", function(){
			g.focusUpdateNationName = true;
		}).on("blur", function(){
			g.focusUpdateNationName = false;
		});
		$("#refreshGameWrap").on("focus", "#gameName", function(){
			g.focusGameName = true;
		});
		$("#refreshGameWrap").on("blur", "#gameName", function(){
			g.focusGameName = false;
		});
		$("#titleViewBackdrop").on(env.click, function(){
			title.closeModal();
		});
		$("#mainWrap").on(env.click, '#unlockGameDone, #configureNationDone, #leaderboardDone', function(){
			audio.play('click');
			title.closeModal();
		});
		/*
		$("#autoJoinGame").on(env.click, function(){
			$("#joinGame").val('');
			audio.play('click');
			$("#joinGamePassword").val();
			$(".wars-FFA").filter(":first").trigger(env.click); 
			if (!$("#joinGame").val()){
				Msg("No FFA games found!", 1.5);
			} else {
				title.joinGame();
			}
		});
		$("#joinTeamGame").on(env.click, function(){
			$("#joinGame").val('');
			audio.play('click');
			$("#joinGamePassword").val();
			$(".wars-Team").filter(":first").trigger(env.click); 
			if (!$("#joinGame").val()){
				Msg("No team games found!", 1.5);
			} else {
				title.joinGame();
			}
		});
		*/
		$("#overlay").on(env.click, function(){
			g.searchingGame = false;
			TweenMax.set(dom.Msg, {
				opacity: 0
			});
			g.unlock();
		});
		$("#joinRankedGame").on(env.click, function(){
			audio.play('click');
			g.lock();
			g.searchingGame = true;
			Msg("Searching for ranked games...", 0);
			(function repeat(count){
				if (count < 4 && !g.joinedGame){
					setTimeout(function(){
						if (g.searchingGame){
							repeat(++count);
						}
					}, 1000);
					// ajax call to join ranked game
					$.ajax({
						url: 'php/joinRankedGame.php'
					}).done(function(data){
						if (g.searchingGame){
							TweenMax.set(dom.Msg, {
								opacity: 0
							});
							g.joinedGame = 1;
							g.unlock();
							g.searchingGame = false;
							title.joinGameCallback(data);
						}
					});
				} else {
					if (!g.joinedGame && g.searchingGame){
						Msg("No ranked games found! Try creating a ranked game instead.", 5);
						g.unlock();
						g.searchingGame = false;
					}
				}
			})(0);
		});
	})(),
	lobby: (function(){
		$("#chat-input-open").on(env.click, function(){
			toggleChatMode();
		});
		$("#chat-input-send").on(env.click, function(){
			toggleChatMode(true);
		});
		$("#lobby-chat-input").on('focus', function(){
			lobby.chatOn = true;
		}).on('blur', function(){
			lobby.chatOn = false;
		});
		$("#lobbyChatSend").on(env.click, function(){
			lobby.sendMsg(true);
		});
		// prevents auto scroll while scrolling
		$("#lobbyChatLog").on('mousedown', function(){
			lobby.chatDrag = true;
		}).on('mouseup', function(){
			lobby.chatDrag = false;
		});
		$("#joinGameLobby").on(env.click, '.governmentChoice', function(e){
			// changes player's own government only
			var government = $(this).text();
			lobby.updateGovernmentWindow(government);
			$.ajax({
				url: "php/changeGovernment.php",
				data: {
					government: government
				}
			});
		}).on(env.click, '.cpu-choice', function(e){
			var difficulty = $(this).text();
			$.ajax({
				url: "php/change-cpu-difficulty.php",
				data: {
					difficulty: difficulty,
					player: $(this).data('player')
				}
			});
		}).on(env.click, '.playerColorChoice', function(e){
			var playerColor = $(this).data('playercolor');
			$.ajax({
				url: 'php/changePlayerColor.php',
				data: {
					playerColor: playerColor*1
				}
			}).done(function(data){
				my.playerColor = data.playerColor;
			}).fail(function(data){
				Msg(data.statusText, 1.5);
			});
		}).on(env.click, '.teamChoice', function(e){
			var team = $(this).text().slice(5),
				player = $(this).data('player');
			console.info("TEAM: ", team, player);
			$.ajax({
				url: 'php/changeTeam.php',
				data: {
					team: team,
					player: player
				}
			}).done(function(data) {
				my.team = data.team;
			});
			
		}).on(env.click, '#cpu-add-player', function(e){
			//console.info("Adding player");
			audio.play('click');
			lobby.addCpuPlayer();
		}).on(env.click, '#cpu-remove-player', function(e){
			//console.info("Removing player");
			audio.play('click');
			$.ajax({
				url: 'php/cpu-remove-player.php' 
			});
		});
	})(),
	map: (function(){
		if (!env.isFirefox){
			$("body").on("mousewheel", function(e){
				if (g.view === 'game'){
					setMousePosition(e.offsetX, e.offsetY);
					worldMap[0].applyBounds();
				}
			});
			$("#worldWrap").on("mousewheel", function(e){
				e.originalEvent.wheelDelta > 0 ? mouseZoomIn(e) : mouseZoomOut(e);
				worldMap[0].applyBounds();
			});
		} else {
			$("body").on("DOMMouseScroll", function(e){
				if (g.view === 'game'){
					setMousePosition(e.originalEvent.layerX, e.originalEvent.layerY);
					worldMap[0].applyBounds();
				}
			});
			$("#worldWrap").on("DOMMouseScroll", function(e){
				e.originalEvent.detail > 0 ? mouseZoomOut(e) : mouseZoomIn(e);
				worldMap[0].applyBounds();
			});
		}

		$("#worldWrap").on("mousemove", function(e){
			if (env.isFirefox){
				setMousePosition(e.originalEvent.layerX, e.originalEvent.layerY);
			} else {
				setMousePosition(e.offsetX, e.offsetY);
				//console.info(e.offsetX, e.offsetY);
			}
		});
		$("#resources-ui").on(env.click, '#surrender', function(e){
			surrenderMenu(); 
		});
		$("#createGameWrap").on(env.click, '.mapSelect', function(e){
			var x = $(this).text();
			var key = x.replace(/ /g,'');
			g.map.name = x;
			g.map.key = key;
			document.getElementById('createGameMap').innerHTML = x;
			document.getElementById('createGameTiles').innerHTML = title.mapData[key].tiles;
			document.getElementById('createGamePlayers').innerHTML = title.mapData[key].players;
			var e1 = $("#gamePlayers");
			e1.attr("max", title.mapData[key].players);
			if (e1.val() * 1 > title.mapData[key].players){
				e1.val(title.mapData[key].players);
			}
			e.preventDefault();
		});
		$("#mainWrap").on(env.click, '.gameSelect', function(e){
			e.preventDefault();
		});
		$("#mainWrap").on(env.click, '.speedSelect', function(e){
			var x = $(this).text()*1;
			g.speed = x;
			$("#createGameSpeed").text(x);
			localStorage.setItem('gameSpeed2', x);
			e.preventDefault();
		});
	})(),
	audio: (function(){
		$("#bgmusic").on('ended', function() {
			var x = document.getElementById('bgmusic');
			x.currentTime = 0;
			x.play();
		});
		$("#bgamb1").on('ended', function() {
			var x = document.getElementById('bgamb1');
			x.currentTime = 0;
			x.play();
		});
		$("#bgamb2").on('ended', function() {
			var x = document.getElementById('bgamb2');
			x.currentTime = 0;
			x.play();
		});
	})(),
	game: (function(){
		$("#cancelSurrenderButton").on(env.click, function(){
			audio.play('click');
			document.getElementById('surrenderScreen').style.display = 'none';
		});
		$("#surrenderButton").on(env.click, function(){
			surrender();
		});
	})()
};


$(document).on('keydown', function(e){
	var x = e.keyCode;
	if (e.ctrlKey){
		if (x === 82){
			// ctrl+r refresh
			return false;
		}
	} else {
		if (g.view === 'title'){
			if (!g.isModalOpen){
				$("#title-chat-input").focus();
			}
		} else if (g.view === 'lobby'){
			$("#lobby-chat-input").focus();
		} else {
			// game
			if (x === 9){
				// tab
				if (!e.shiftKey){
					my.nextTarget(false);
				} else {
					my.nextTarget(true);
				}
				e.preventDefault();
			} else if (x === 86){
				// v
				if (g.view === 'game' && !g.chatOn){
					game.toggleGameWindows(1);
				}
			}
		}
	}
}).on('keyup', function(e) {
	var x = e.keyCode;
	//console.info(x);
	if (g.view === 'title'){
		if (x === 13){
			if (g.focusUpdateNationName){
				title.submitNationName();
			} else if (g.focusGameName){
				title.createGame();
			} else if (title.chatOn){
				if (x === 13){
					// enter - sends chat
					title.sendMsg();
				}
			} else if (title.createGameFocus){
				title.createGame();
			}
		} else if (x === 27){
			// esc
			title.closeModal();
		}
	} else if (g.view === 'lobby'){
		if (lobby.chatOn){
			if (x === 13){
				// enter - sends chat
				lobby.sendMsg();
			}
		}
	// game hotkeys
	} else if (g.view === 'game'){
		if (g.chatOn){
			if (x === 13){
				// enter/esc - sends chat
				toggleChatMode(true);
			} else if (x === 27){
				// esc
				toggleChatMode();
			}
		} else {
			if (x === 13){
				// enter
				toggleChatMode();
			}  else if (x === 27){
				// esc
				my.attackOn = false;
				my.attackName = '';
				my.clearHud();
				env.showTarget(DOM['land' + my.tgt]); 
				//console.clear();
			} else if (x === 65){
				// a
				var o = new Target();
				action.target(o);
			} else if (x === 83){
				// s
				var o = new Target({
					cost: 1, 
					attackName: 'splitAttack',
					hudMsg: 'Split Attack: Select Target',
					splitAttack: true
				});
				console.info(o.cost);
				action.target(o);
			} else if (x === 68){
				// d
				if (!g.keyLock){
					action.deploy();
				}
			} else if (x === 82){
				// r
				if (!g.keyLock){
					if (e.ctrlKey){
						var x = my.lastReceivedWhisper;
						if (x){
							if (g.view === 'title'){
								$("#title-chat-input").val('/w ' + x + ' ').focus();
							} else if (g.view === 'lobby'){
								$("#lobby-chat-input").val('/w ' + x + ' ').focus();
							} else {
								if (!g.chatOn){
									toggleChatMode();
								}
								$("#chat-input").val('/w ' + x + ' ').focus();
							}
						}
						return false;
					} else {
						action.rush();
					}
				}
			} else if (x === 89){
				// y
				research.masonry();
			} else if (x === 79){
				// o
				research.construction();
			} else if (x === 69){
				// e
				research.engineering();
			} else if (x === 71){
				// g
				research.gunpowder();
			} else if (x === 75){
				// k
				research.rocketry();
			} else if (x === 84){
				// t
				research.atomicTheory();
			} else if (x === 70){
				// f
				research.futureTech();
			} else if (x === 66){
				// b
				action.upgradeTileDefense();
			} else if (x === 67){
				// c
				var o = new Target({
					cost: 0,
					minimum: 0,
					attackName: 'cannons',
					hudMsg: 'Fire Cannons'
				});
				action.target(o);
			} else if (x === 77){
				// m
				var o = new Target({
					cost: 0,
					minimum: 0,
					attackName: 'missile',
					hudMsg: 'Launch Missile'
				});
				action.target(o);
			} else if (x === 78){
				// n
				var o = new Target({
					cost: 0,
					minimum: 0,
					attackName: 'nuke',
					hudMsg: 'Launch Nuclear Weapon'
				});
				action.target(o);
			}
		}
	}
});

 $("#dictatorAvatar").on('change', function(e){
	 var e2 = $("#uploadErr");
	 function imgError(msg){
		e2.html(msg);
		audio.play('error');
	 }
	 var file = e.target.files[0];
	 var reader = new FileReader();
	 reader.readAsDataURL(file);
	 if (file.type !== 'image/jpeg'){
		imgError('Wrong file type! Image must be in jpg format.');
	 } else {
		 reader.addEventListener("load", function(){
			if (reader.result.length < 64000){
				$.ajax({
					url: "php/uploadDictator.php",
					type: "POST",
					data: {
						uri: reader.result
					},
					beforeSend: function(){
						e2.text('');
					}
				}).done(function(data){
					e2.text("Avatar updated successfully!");
					document.getElementById('configureAvatarImage').src = reader.result;
				}).fail(function(data){
					imgError(data.statusText);
				});
			} else {
				imgError('File size too large! Image must be less than 40 kb.');
				e2.html();
			}
		 }, false);
	 }
 });var ai = {
	structureDefense: [0, 5, 15, 30],
	scoreTargetAttack: function(o){
		var score = 50;
		// score player
		if (!g.teamMode){
			if (o.defender === 0){
				// barb/empty
				score += 10;
			} else if (o.attacker !== o.defender){
				// another player
				score += 25;
			} else {
				// mine
				score -= 10;
			}
		} else {
			// 
			if (o.defender === 0){
				// barb/empty
				score += 10;
			} else if (game.player[o.attacker].team !== game.player[o.defender].team){
				// enemy
				score += 25;
			} else if (o.attacker === o.defender){
				// mine
				score -= 5;
			} else {
				// ally
				score -= 25;
			}
		}
		// defense
		if (o.attacker !== o.defender){
			score += o.unitDiff;
			/*
			if (o.unitDiff > 20){
				score += 20;
			} else if (o.unitDiff > 5){
				score += 10;
			} else if (o.unitDiff > -5){
				score -= 10;
			} else {
				score -= 20;
			}
			*/
			score -= ai.structureDefense[o.defense];
			score -= o.capital ? 10 : 0;
			// food
			score += ~~((o.food) + Math.random()*10 - 5);
		}
		return score;
	},
	getAttackTarget: function(player){
		var atkTile = -1,
			defTile = -1,
			maxScore = 0;
		
		game.tiles.forEach(function(d, index){
			if (d.player === player && d.units >= 5){
				// cpu's tile
				d.adj.forEach(function(defender){
					var z = game.tiles[defender];
					var score = ai.scoreTargetAttack({
						attacker: player,
						defender: z.player,
						attackerUnits: d.units,
						unitDiff: (d.units - z.units),
						defense: z.defense,
						food: z.food,
						production: z.production,
						culture: z.culture,
						capital: z.capital
					});
					if (score > maxScore){
						maxScore = score;
						atkTile = index;
						defTile = defender;
					}
				});
			}
		});
		//console.info("ATTACKING FROM: ", atkTile, defTile, maxScore);
		return [atkTile, defTile, maxScore];
	},
	scoreTargetWeapon: function(o){
		var score = 50;
		// score player
		if (!g.teamMode){
			if (o.defender === 0){
				// barb/empty
				score += 10;
			} else if (o.attacker !== o.defender){
				// another player
				score += 25;
			} else {
				// mine
				score -= 10;
			}
		} else {
			// 
			if (o.defender === 0){
				// barb/empty
				score -= 10;
			} else if (game.player[o.attacker].team !== game.player[o.defender].team){
				// enemy
				score += 30;
			} else if (o.attacker === o.defender){
				// mine
				score -= 5;
			} else {
				// ally
				score -= 25;
			}
		}
		// defense
		if (o.attacker !== o.defender){
			score -= o.unitDiff;
			// food
			score += ~~((o.food) + Math.random()*10 - 5);
		}
		return score;
	},
	getWeaponTarget: function(player){
		var atkTile = -1,
			defTile = -1,
			maxScore = 0;
		
		game.tiles.forEach(function(d, index){
			if (d.player === player){
				// cpu's tile
				d.adj.forEach(function(defender){
					var z = game.tiles[defender];
					var score = ai.scoreTargetWeapon({
						attacker: player,
						defender: z.player,
						attackerUnits: d.units,
						unitDiff: (d.units - z.units),
						defense: z.defense,
						food: z.food,
						production: z.production,
						culture: z.culture,
						capital: z.capital
					});
					if (score > maxScore){
						maxScore = score;
						atkTile = index;
						defTile = defender;
					}
				});
			}
		});
		//console.info("ATTACKING FROM: ", atkTile, defTile, maxScore);
		return [atkTile, defTile, maxScore];
	},
	getRangedWeaponTarget: function(player){
		var atkTile = -1,
			defTile = -1,
			maxScore = 0;
		
		game.tiles.forEach(function(tile, index){
			if (tile.player !== player){
				var score = 50;
				score += tile.units;
				score += tile.defense * 20;
				if (tile.capital){
					score += 5;
				}
				if (!tile.player){
					score = 0;
				}
				if (score > maxScore){
					maxScore = score;
					defTile = index;
				}
			} else {
				atkTile = index;
			}
		});
		//console.info("ATTACKING FROM: ", atkTile, defTile, maxScore);
		return [atkTile, defTile, maxScore];
	},
	attack: function(d){
		var tiles = ai.getAttackTarget(d.player);
		if (tiles[0] > -1){
			$.ajax({
				url: 'php/attack-ai.php',
				data: {
					attacker: tiles[0],
					defender: tiles[1],
					player: d.player,
					randomTile: action.getRandomDemocracyTile(tiles[1], game.tiles[tiles[1]].player),
					defGovernment: game.player[game.tiles[tiles[1]].player].government
				}
			});
		}
	},
	getRandomTile: function(player){
		var a = [],
			i = 0;
		game.tiles.forEach(function(d, index){
			if (d.player === player && d.units < 255){
				a[i++] = index;
			}
		});
		var randVal = ~~(Math.random() * i);
		return a[randVal];
	},
	scoreTargetDeploy: function(o){
		var score = 50;
		if (!o.player){
			// barb/empty
			score += 10;
		} else if (!o.sameTeam){
			// enemy player
			score += 25;
			// where are units needed?
			if (o.player && !o.unitDiff){
				score += o.unitDiff * -1;
			}
		} else if (o.sameTeam){
			// my tile
			score -= 10;
		}
		// food
		score += ~~(Math.random()*6 - 3);
		return score;
	},
	getDeployTarget: function(cpuPlayer){
		var tile = -1,
			maxScore = 0;
		
		game.tiles.forEach(function(d, index){
			var cpuUnits = game.tiles[index].units,
				score = 0,
				adjTiles = 0;
			//console.info(index, d.player === cpuPlayer, d.units, d.flag);
			if (d.player === cpuPlayer && d.units < 255 && d.flag){
				// cpu's tile
				// less than 255
				// not a barb or empty
				d.adj.forEach(function(defender){
					adjTiles++;
					var z = game.tiles[defender];
					z.sameTeam = cpuPlayer === z.player;
					z.unitDiff = cpuUnits - z.units;
					score += ai.scoreTargetDeploy(z);
				});
				var sum = ~~(score/adjTiles);
				if (sum > maxScore){
					maxScore = sum;
					tile = index;
				}
			}
		});
		// console.info('DEPLOYING TO: ', game.tiles[tile].name, maxScore);
		return tile;
	},
	getDefenseTarget: function(player){
		var tile = -1,
			maxScore = 0;
		
		game.tiles.forEach(function(d, index){
			var score = 0;
			//console.info(index, d.player === cpuPlayer, d.units, d.flag);
			if (d.player === player && d.units < 255 && d.flag){
				// cpu's tile
				// less than 255
				// not a barb or empty
				score += d.units;
				score += ( (3 - d.defense) * 10);
				if (score > maxScore){
					maxScore = score;
					tile = index;
				}
			}
		});
		//console.info('DEPLOYING TO: ', tile);
		return tile;
	},
	deploy: function(d, o){ 
		var tile = ai.getDeployTarget(d.player);
		if (tile !== undefined){
			$.ajax({
				url: 'php/deploy-ai.php',
				data: {
					tile: tile,
					food: o.food
				}
			});
		}
	},
	getResourceTotal: function(player){
		var o = {
			food: 0,
			production: 0,
			culture: 0
		}
		game.tiles.forEach(function(tile){
			if (player === tile.player){
				o.food += tile.food;
				o.production += tile.production;
				o.culture += tile.culture;
			}
		}); 
		return o;
	},
	weaponDelay: function(){
		return Math.random()*4000 + 1000;
	},
	fireCannons: function(d){
		var tiles = ai.getWeaponTarget(d.player);
		if (tiles[0] > -1){
			$.ajax({
				url: 'php/ai-fireCannons.php',
				data: {
					attacker: tiles[0],
					defender: tiles[1]
				}
			});
		}
	},
	launchMissile: function(d){
		var tiles = ai.getRangedWeaponTarget(d.player);
		if (tiles[0] > -1){
			$.ajax({
				url: 'php/ai-launchMissile.php',
				data: {
					attacker: tiles[0],
					defender: tiles[1]
				}
			}).done(function(){
				setTimeout(function(){
					$.ajax({
						url: 'php/ai-launchMissileHit.php',
						data: {
							account: d.account,
							attacker: tiles[0],
							defender: tiles[1]
						}
					});
				}, 1000);
			});
		}
	},
	launchNuke: function(d){
		var tiles = ai.getRangedWeaponTarget(d.player);
		if (tiles[0] > -1){
			$.ajax({
				url: 'php/ai-launchNuke.php',
				data: {
					attacker: tiles[0],
					defender: tiles[1]
				}
			}).done(function(){
				setTimeout(function(){
					$.ajax({
						url: 'php/ai-launchNukeHit.php',
						data: {
							account: d.account,
							defender: tiles[1]
						}
					});
				}, 6000);
			});
		}
	},
	upgradeTileDefense: function(d){
		var tile = ai.getDefenseTarget(d.player);
		if (tile > -1){
			$.ajax({
				url: 'php/ai-upgradeTileDefense.php',
				data: {
					target: tile,
					account: d.account
				}
			});
		}
	},
	deployRate: {
		VeryEasy: 6, 
		Easy: 5,
		Normal: 4,
		Hard: 4,
		VeryHard: 3,
		Mania: 2,
		Juggernaut: 1
	},
	deployFood: {
		VeryEasy: 50, 
		Easy: 40,
		Normal: 30,
		Hard: 22,
		VeryHard: 15,
		Mania: 10,
		Juggernaut: 5
	},
	attackFood: {
		VeryEasy: 40,
		Easy: 30,
		Normal: 50,
		Hard: 40,
		VeryHard: 30,
		Mania: 20,
		Juggernaut: 10
	},
	attackMax: {
		VeryEasy: 2,
		Easy: 3,
		Normal: 3,
		Hard: 4,
		VeryHard: 5,
		Mania: 6,
		Juggernaut: 8
	},
	attackBaseTurns: {
		VeryEasy: 0, 
		Easy: 0,
		Normal: 1,
		Hard: 1,
		VeryHard: 1,
		Mania: 2,
		Juggernaut: 3
	},
	unlockNuke: {
		VeryEasy: 250, 
		Easy: 150,
		Normal: 100,
		Hard: 90,
		VeryHard: 80,
		Mania: 60,
		Juggernaut: 20
	},
	unlockMissile: {
		VeryEasy: 100, 
		Easy: 65,
		Normal: 50,
		Hard: 40,
		VeryHard: 30,
		Mania: 20,
		Juggernaut: 10
	},
	unlockCannons: {
		VeryEasy: 50, 
		Easy: 30,
		Normal: 20,
		Hard: 15,
		VeryHard: 10,
		Mania: 5,
		Juggernaut: 0
	},
	missileRate: {
		VeryEasy: .875, 
		Easy: .75,
		Normal: .66,
		Hard: .6,
		VeryHard: .5,
		Mania: .33,
		Juggernaut: 0
	},
	cannonRate: {
		VeryEasy: .75, 
		Easy: .66,
		Normal: .5,
		Hard: .35,
		VeryHard: .2,
		Mania: .1,
		Juggernaut: 0
	},
	unlockStructures: {
		VeryEasy: 30, 
		Easy: 20,
		Normal: 10,
		Hard: 8,
		VeryHard: 5,
		Mania: 2,
		Juggernaut: 0
	},
	updateResources: function(o, player){
		$.ajax({
			url: 'php/ai-updateResources.php',
			data: {
				player: player,
				moves: (4 + ~~(o.food / 50)), 
				food: o.food,
				production: o.production,
				culture: o.culture
			}
		});
	},
	takeTurn: function(d){
		var o = ai.getResourceTotal(d.player);
		// deploy
		ai.updateResources(o, d.player);
		if (g.resourceTick % ai.deployRate[d.difficultyShort] === 0){
			ai.deploy(d, o); 
			// bonus deploy
			var len = ~~(o.food / ai.deployFood[d.difficultyShort]);
			if (len > 3){
				len = 3;
			}
			for (var i=0; i<len; i++){
				ai.deploy(d, o);
			}
		}
		// attack
		var turns = Math.ceil(o.food / ai.attackFood[d.difficultyShort]) + ai.attackBaseTurns[d.difficultyShort];
		if (turns > ai.attackMax[d.difficultyShort]){
			turns = ai.attackMax[d.difficultyShort];
		}
		for (var i=0; i<turns; i++){
			(function(delay, d){
				setTimeout(function(){
					ai.attack(d); 
				}, ((delay * 500) + 500) );
			})(i, d);
		}
		var usingNuke = 0;
		if (g.resourceTick > ai.unlockNuke[d.difficultyShort]){
			if (Math.random() > .95){
				usingNuke = 1;
				setTimeout(function(){
					ai.launchNuke(d);
				}, ai.weaponDelay());
			}
		}
		if (!usingNuke){
			if (g.resourceTick > ai.unlockMissile[d.difficultyShort]){
				if (Math.random() > ai.missileRate[d.difficultyShort]){
					var len = Math.ceil(o.food / 60);
					for (var i=0; i<len; i++){
						setTimeout(function(){
							ai.launchMissile(d);
						}, ai.weaponDelay());
					}
				}
			} else if (g.resourceTick > ai.unlockCannons[d.difficultyShort]){
				if (Math.random() > ai.cannonRate[d.difficultyShort]){
					var len = Math.ceil(o.food / 30);
					for (var i=0; i<len; i++){
						setTimeout(function(){
							ai.fireCannons(d);
						}, ai.weaponDelay());
					}
				}
			}
		}
		// defense
		if (g.resourceTick > ai.unlockStructures[d.difficultyShort]){
			if (Math.random() > .875){
				setTimeout(function(){
					ai.upgradeTileDefense(d);
				}, ai.weaponDelay());
			}
		}
	}
};})($,Math,document,location,TweenMax,TimelineMax,Power0,Power1,Power2,Power3,Power4,Back,Elastic,Bounce,SteppedEase,Circ,Expo,Sine,setTimeout,setInterval,undefined);