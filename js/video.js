

var video = {
	cache: {},
	load: {
		title: function(){
			var x = [
				'xicotl.png'
			];
			for (var i=0, len=x.length; i<len; i++){
				var z = x[i];
				video.cache[z] = new Image();
				video.cache[z].src = "images/" + z;
			}
		}
	}
}
video.load.title();