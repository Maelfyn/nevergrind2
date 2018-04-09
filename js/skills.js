var skills = {
	ALL: {
		route: function(id) {
			var key = skills[my.job].skillKeys[id];
			skills.RNG[key]();
		},
		pull: function() {
			console.info("skills.pull");
		},
		toggleAutoAttack: function() {
			console.info("toggleAutoAttack");
		}
	},
	WAR: {
		bash: function() {
			console.info("bash");
		},
		taunt: function() {
			console.info("taunt");
		},
		kick: function() {
			console.info("kick");
		},
		demoralize: function() {
			console.info("demoralize");
		},
		tearAsunder: function() {
			console.info("tearAsunder");
		},
		shout: function() {
			console.info("shout");
		},
		warCry: function() {
			console.info("warCry");
		},
		warStomp: function() {
			console.info("warStomp");
		},
	},
	PAL: {
		layHands: function() {
			console.info("layHands");
		},
		bash: function() {
			console.info("bash");
		},
		taunt: function() {
			console.info("taunt");
		},
		heal: function() {
			console.info("heal");
		},
		blessedHammer: function() {
			console.info("blessedHammer");
		},
		smite: function() {
			console.info("smite");
		},
		resolution: function() {
			console.info("resolution");
		},
		holyMight: function() {
			console.info("holyMight");
		}
	},
	SHD: {
		harmTouch: function() {
			console.info("harmTouch");
		},
		bash: function() {
			console.info("bash");
		},
		taunt: function() {
			console.info("taunt");
		},
		lifeTap: function() {
			console.info("lifeTap");
		},
		engulfingDarkness: function() {
			console.info("engulfingDarkness");
		},
		bloodBoil: function() {
			console.info("bloodBoil");
		},
		invokeFear: function() {
			console.info("invokeFear");
		},
		waveOfHorror: function() {
			console.info("waveOfHorror");
		}
	},
	RNG: {
		trueshotStrike: function() {
			console.info("trueshotStrike");
		},
		kick: function() {
			console.info("kick");
		},
		ensnare: function() {
			console.info("ensnare");
		},
		ignite: function() {
			console.info("ignite");
		},
		faerieFlame: function() {
			console.info("faerieFlame");
		},
		carelessLightning: function() {
			console.info("carelessLightning");
		},
		healing: function() {
			console.info("healing");
		},
		feetLikeCat: function() {
			console.info("feetLikeCat");
		},
	},
	MNK: {
		roundhouseKick: function() {
			console.info("roundhouseKick");
		},
		mend: function() {
			console.info("mend");
		},
		feignDeath: function() {
			console.info("feignDeath");
		},
		intimidation: function() {
			console.info("intimidation");
		},
		chiBlast: function() {
			console.info("chiBlast");
		},
		shoryuken: function() {
			console.info("shoryuken");
		},
		hadoken: function() {
			console.info("hadoken");
		},
		nirvana: function() {
			console.info("nirvana");
		},
	},
	ROG: {
		backstab: function() {
			console.info("backstab");
		},
		evade: function() {
			console.info("evade");
		},
		widowStrike: function() {
			console.info("widowStrike");
		},
		flashPowder: function() {
			console.info("flashPowder");
		},
		shadowStrike: function() {
			console.info("shadowStrike");
		},
		mirrorStrike: function() {
			console.info("mirrorStrike");
		},
		crossSlash: function() {
			console.info("crossSlash");
		},
		awestruck: function() {
			console.info("awestruck");
		},
	},
	DRU: {
		healing: function() {
			console.info("healing");
		},
		starfire: function() {
			console.info("starfire");
		},
		skinLikeWood: function() {
			console.info("skinLikeWood");
		},
		driftingDeath: function() {
			console.info("driftingDeath");
		},
		tornado: function() {
			console.info("tornado");
		},
		endureLightning: function() {
			console.info("endureLightning");
		},
		lightningBlast: function() {
			console.info("lightningBlast");
		},
		chloroplast: function() {
			console.info("chloroplast");
		},
	},
	CLR: {
		holyMight: function() {
			console.info("holyMight");
		},
		smite: function() {
			console.info("smite");
		},
		blessedHammer: function() {
			console.info("blessedHammer");
		},
		healing: function() {
			console.info("healing");
		},
		resolution: function() {
			console.info("resolution");
		},
		symbolOfYentus: function() {
			console.info("symbolOfYentus");
		},
		endureBleed: function() {
			console.info("endureBleed");
		},
		armorOfFaith: function() {
			console.info("armorOfFaith");
		},
	},
	SHM: {
		healing: function() {
			console.info("healing");
		},
		frostRift: function() {
			console.info("frostRift");
		},
		devouringPlague: function() {
			console.info("devouringPlague");
		},
		drowsy: function() {
			console.info("drowsy");
		},
		spiritOfTheBear: function() {
			console.info("spiritOfTheBear");
		},
		bloodRitual: function() {
			console.info("bloodRitual");
		},
		endureCold: function() {
			console.info("endureCold");
		},
		talismanOfTrogmaar: function() {
			console.info("talismanOfTrogmaar");
		},
	},
	BRD: {
		chantOfBattle: function() {
			console.info("chantOfBattle");
		},
		hymnOfRestoration: function() {
			console.info("hymnOfRestoration");
		},
		boastfulBellow: function() {
			console.info("boastfulBellow");
		},
		consonantChain: function() {
			console.info("consonantChain");
		},
		lucidLullaby: function() {
			console.info("lucidLullaby");
		},
		elementalRhythms: function() {
			console.info("elementalRhythms");
		},
		chorusOfClarity: function() {
			console.info("chorusOfClarity");
		},
		sirensSong: function() {
			console.info("sirensSong");
		},
	},
	NEC: {
		engulfingDarkness: function() {
			console.info("engulfingDarkness");
		},
		invokeDeath: function() {
			console.info("invokeDeath");
		},
		venomBolt: function() {
			console.info("venomBolt");
		},
		bloodBoil: function() {
			console.info("bloodBoil");
		},
		invokeFear: function() {
			console.info("invokeFear");
		},
		lifeTap: function() {
			console.info("lifeTap");
		},
		endurePoison: function() {
			console.info("endurePoison");
		},
		dyingBreath: function() {
			console.info("dyingBreath");
		},
	},
	ENC: {
		discordantMind: function() {
			console.info("discordantMind");
		},
		colorShift: function() {
			console.info("colorShift");
		},
		alacrity: function() {
			console.info("alacrity");
		},
		dazzle: function() {
			console.info("dazzle");
		},
		gaspingEmbrace: function() {
			console.info("gaspingEmbrace");
		},
		clarity: function() {
			console.info("clarity");
		},
		cajolingWhispers: function() {
			console.info("cajolingWhispers");
		},
		mysticRune: function() {
			console.info("mysticRune");
		},
	},
	MAG: {
		lavaBolt: function() {
			console.info("lavaBolt");
		},
		summonElemental: function() {
			console.info("summonElemental");
		},
		frozenOrb: function() {
			console.info("frozenOrb");
		},
		elementalFury: function() {
			console.info("elementalFury");
		},
		psionicStorm: function() {
			console.info("psionicStorm");
		},
		malaise: function() {
			console.info("malaise");
		},
		endureFire: function() {
			console.info("endureFire");
		},
		stasisField: function() {
			console.info("stasisField");
		},
	},
	WIZ: {
		iceBolt: function() {
			console.info("iceBolt");
		},
		arcaneMissiles: function() {
			console.info("arcaneMissiles");
		},
		manaShield: function() {
			console.info("manaShield");
		},
		fireball: function() {
			console.info("fireball");
		},
		viziersShielding: function() {
			console.info("viziersShielding");
		},
		lightningStrike: function() {
			console.info("lightningStrike");
		},
		glacialSpike: function() {
			console.info("glacialSpike");
		},
		mirrorImages: function() {
			console.info("mirrorImages");
		},
	},
};

(function() {
	var shortClassKeys = ng.getJobShortKeys();
	for (var key in skills) {
		if (shortClassKeys.indexOf(key) > -1) {
			// this is a player class
			skills[key].skillKeys = Object.keys(skills[key]);
			skills[key].skillKeys.unshift('toggleAutoAttack');
			skills[key].skillKeys.unshift('pull');
			for (var k2 in skills.ALL) {
				// assign ALL functions to each class
				skills[key][k2] = skills.ALL[k2];
			}
		}
	}
})();