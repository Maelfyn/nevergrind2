var cache = {
	images: [], // actual image in memory
	imageStrings: [], // string values
	audio: [],
	audioStrings: [],
	preload: {
		mob: function(type) {
			var a = [];
			for (var i = 1; i <= 105; i++) {
				a[i] = 'mobs/' + type + '/' + i + '.png';
			}
			cache.preload.images(a);
		},
		images: function(a) {
			var e;
			a.forEach(function(v){
				if (v && !~cache.imageStrings.indexOf(v)) {
					e = new Image();
					e.src = v;
					cache.images.push(e);
					cache.imageStrings.push(v);
				}
			});
		},
		audio: function(a){
			var e;
			a.forEach(function(v){
				if (!~cache.audioStrings.indexOf(v)) {
					e = new Audio();
					e.src = v;
					cache.audio.push(e);
					cache.audioStrings.push(v);
				}
			});
		}
	},
	clear: {
		all: function() {
			cache.clear.images();
			cache.clear.audio();
		},
		images: function() {
			cache.images = [];
			cache.imageStrings = [];
		},
		audio: function() {
			cache.audio = [];
			cache.audioStrings = [];
		}
	}
}