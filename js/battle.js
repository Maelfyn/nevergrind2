// battle
var battle = {
	html: function(){
		var s = `<img id="battle-bg" class="abs view no-pointer" src="img2/bg/fw2.jpg">`;

		for (var i=0; i<mob.max; i++){
			s += `
			<div id="mob-center-${i}" class="mob-center"></div>
			<div id="mob-alive-${i}" class="mob-alive"></div>
			<div id="mob-dead-${i}" class="mob-dead"></div>
			<div id="mob-wrap-${i}" class="mob-wrap text-shadow">
				<div id="mob-details-${i}" class="mob-details">
					<div id="mob-name-${i}" class="mob-name">Scorpion</div>
					<div id="mob-bar-${i}" class="mob-bar">
						<div id="mob-health-${i}" class="mob-health"></div>
					</div>
				</div>
				<div id="mob-shadow-${i}" class="mob-shadow"></div>
				<img id="mob-img-${i}" class="mob-image" src="img2/blank.png">
				<div id="mob-image-click-${i}" class="mob-image-click"></div>
			</div>`;
		}

		return s;
	},
	show: function(){
		g.setScene('battle');
		document.getElementById('scene-battle').innerHTML = battle.html();
	},
	init: function(){
		if (!mob.initialized) {
			// initialization things only
			mob.initialized = 1;
			mob.imageKeys = Object.keys(mob.images);
			mob.index = mob.imageKeys.length - 1;
		}

		for (var i=0; i<mob.max; i++){
			var m = mobs[i],
				//mobKey = mob.getRandomMobKey();
				mobKey = 'scorpion';
			mob.preloadMob(mobKey);
			m.type = mobKey;
			mob.setMob(m);
			mob.idle(m);
		}
	},
	boxCoordsCenter: [192,576,960,1344,1728,384,768,1152,1536],
	boxCoordsBottom: [0,0,0,0,0,108,108,108,108],
	getBoxCoordsLeft: function(i){
		// based on 1080p
		// abs left
		//
		return ~~((battle.boxCoordsCenter[i] * (window.innerWidth / 1920)) - ~~(mobs[i].w * .5));
	},
	getBox: function(i){
		// return absolute positioning about a specific mob box
		var m = mobs[i],
			b = battle.boxCoordsBottom[i],
			l = battle.getBoxCoordsLeft(i),
			x = {
				bottom: b,
				left: l,
				centerX: l + m.center.x,
				centerY: b + m.center.y
			};
		return x;
	}
};