// env.js

var env = {
	setMobile: function(){
	},
	click: init.isMobile ? 'mousedown' : 'click',
	resizeWindow: function() {
		var w = window.innerWidth,
			h = window.innerHeight
		// portrait/landscape
		if (init.isMobile){
			document.getElementById('portrait').style.display = w < h ? 'block' : 'none';
			document.getElementById('landscape').style.display = w < h ? 'none' : 'block';
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
	if (init.isMobile){
		env.setMobile();
	}
	localStorage.setItem('isMobile', init.isMobile);
	setTimeout(function(){
		$("script").remove();
	}, 1000);
})();