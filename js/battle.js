// battle
var battle = {
	html:
		`
		<img id="battle-bg" class="abs view" src="img2/bg/fw2.jpg">
		<div id="center-line"></div>
		<div id="mob-wrap-0" class="mob-wrap text-shadow">
			<div id="mob-details-0" class="mob-details">
				<div id="mob-name-0" class="mob-name">Scorpion</div>
				<div id="mob-bar-0" class="mob-bar">
					<div id="mob-health-0" class="mob-health"></div>
				</div>
			</div>
			<img id="mob-img-0" class="mob-image" src="mobs/scorpion/1.png">
			<div id="mob-image-click-0" class="mob-image-click">
		</div>
		`,
	show: function(){
		g.setScene('battle');
		document.getElementById('scene-battle').innerHTML = battle.html;
	},
	init: function(){
		if (!mob.initialized) {
			mob.initialized = 1;
			mob.imageKeys = Object.keys(mob.images);
			mob.index = mob.imageKeys.length - 1;
			var setMob = '';
			if (setMob) {
				var index = 0,
					i = 0;
				for (var key in mob.images){
					if (setMob === key){
						index = i;
					}
					i++;
				}
				mob.index = index;
			}
		}
		var size = .85;

		mob.lastKey = mob.imageKeys[Math.abs(mob.index-- % mob.imageKeys.length)];
		mob.preloadMob(mob.lastKey);
		var nextKey = mob.imageKeys[Math.abs(mob.index % mob.imageKeys.length)];
		mob.preloadMob(nextKey);

		var w = ~~(size * (mob.images[mob.lastKey].w)),
			h = ~~(size * (mob.images[mob.lastKey].h)),
			scale = window.innerWidth / 1920;

		console.info(mob.lastKey, w, h);
		var m = mobs[0];
		mob.setMob(m, 'scorpion');

		m.wrap.style.width = w + 'px';
		m.wrap.style.height = h + 'px';

		m.name.innerHTML = mob.lastKey.replace(/-/g, ' ');
		// img
		m.img.style.width = w + 'px';
		m.img.style.bottom = mob.images[mob.lastKey].yFloor + 'px';
		mob.idle(m);
	}
};