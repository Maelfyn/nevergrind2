// env.js

var env = {
	setMobile: function(){
		 $("head").append('<style>'+
			'*{ box-shadow: none !important; border-radius: 0 !important; } '+
			'.fw-primary{ background: #04061a; border: 1px solid #357; } '+
			'#titleChatPlayers,#statWrap, #joinGameLobby{ background: rgba(0,12,32,1); } '+
			'#refreshGameWrap{ background: none; } '+
			'#hud{ top: 40px; }'+
			'#diplomacy-ui, #ui2{ top: .25vh; }'+
			'#resources-ui{ bottom: .5vh; }'+
			'#lobbyLeftCol, #lobbyRightCol{ top: 1vh; }'+
			'#chat-ui{ bottom: 4vh; }'+
			'#refreshGameWrap{ height: 64vh; }'+
			/*'.titlePanelLeft{ height: 80vh; } '+
			'#chat-input{ bottom: 3vh; }'+
			'#titleMenu, #titleChat{ bottom: 7vh; } '+*/
			'.lobbyButtons, .fwDropdown, .govDropdown{ font-size: 1.25em; }'+
			'#target-ui, #targetLineShadow, .chat-img{ display: none; }'+
			'.chat-hidden{ color: #fff; }'+
		'</style>');
	},
	click: init.isMobile ? 'mousedown' : 'click',
	resizeWindow: function() {
		var winWidth = window.innerWidth,
			winHeight = window.innerHeight
			b = document.getElementById('body');
		if (init.isMobile){
			winHeight = ~~(winHeight * 1.1);
		}
		// game ratio
		var widthToHeight = window.innerWidth / window.innerHeight;
		// current window size
		var w = winWidth > window.innerWidth ? window.innerWidth : winWidth;
		var h = winHeight > window.innerHeight ? window.innerHeight : winHeight;
		if(w / h > widthToHeight){
			// too tall
			w = ~~(h * widthToHeight);
		} else {
			// too wide
			h = ~~(w / widthToHeight);
		}
		b.style.width = w + 'px';
		b.style.height = h + 'px';
		TweenMax.set(b, {
			x: ~~(w/2 + ((winWidth - w) / 2)),
			y: ~~(h/2 + ((winHeight - h) / 2)),
			opacity: 1,
			visibility: 'visible',
			yPercent: -50,
			xPercent: -50,
			force3D: false
		});
		g.resizeX = w / window.innerWidth;
		g.resizeY = h / window.innerHeight;
		TweenMax.set("#worldTitle", {
			xPercent: -50,
			yPercent: -50
		});
		if (g.view === 'game'){
			g.screen.resizeMap();
			if (typeof worldMap[0] !== 'undefined'){
				worldMap[0].applyBounds();
			}
		}
	},
	isXbox: /Xbox/i.test(navigator.userAgent),
    isPlaystation: navigator.userAgent.toLowerCase().indexOf("playstation") >= 0,
    isNintendo: /Nintendo/i.test(navigator.userAgent),
    isOpera: !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
    isFirefox: typeof InstallTrigger !== 'undefined',
    isSafari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
    isChrome: !!window.chrome && !this.isOpera,
    isMSIE: /*@cc_on!@*/ false,
    isMSIE11: !!navigator.userAgent.match(/Trident\/7\./)
};
// browser dependent
(function(){
	var x = localStorage.getItem('isMobile');
	if (env.isMSIE || env.isMSIE11){
		//alert("Firmament Wars does not support Internet Explorer. Consider using Chrome or Firefox for an enjoyable experience.");
		//window.stop();
		if (x === null){
			//alert("Oh no! It looks like you're using Internet Explorer! Please consider using Chrome or Firefox for a better experience!");
		}
	} else if (env.isSafari){
		//alert("Firmament Wars does not support Safari. Consider using Chrome or Firefox for an enjoyable experience.");
		//window.stop();
		if (x === null){
			//alert("Oh no! It looks like you're using Safari! Please consider using Chrome or Firefox for a better experience!");
		}
	}
	if (init.isMobile || location.hash === '#mobiletest'){
		env.setMobile();
	}
	if (location.hash === '#synergist' || location.hash === '#sfw'){
		env.setWorkSafe();
	}
	localStorage.setItem('isMobile', init.isMobile);
	setTimeout(function(){
		$("script").remove();
	}, 1000);
})();