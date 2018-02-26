var cache = {
	images: [],
	imageStrings: [],
	audio: [],
	audioStrings: [],
	preload: {
		images: function(a) {
			a.forEach(function(v){
				if (!~cache.imageStrings.indexOf(v)) {
					var e = new Image();
					e.src = v;
					cache.images.push(e);
					cache.imageStrings.push(v);
				}
			});
		},
		audio: function(a){
			a.forEach(function(v){
				if (!~cache.audioStrings.indexOf(v)) {
					var e = new Audio();
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