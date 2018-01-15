// test methods
var mobs = [];
var mob = {
	test: 1,
	images: {
		'balrog': {
			imgW: 2000,
			imgH: 1200,
			imgCy: 135,
			w: 2000,
			h: 1200,
			yFloor: 3,
			yoyo: true,
			cache: [],
			speed: .05,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'ice-golem': {
			imgW: 1200,
			imgH: 1000,
			imgCy: 135,
			w: 1200,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'stone-golem': {
			imgW: 1200,
			imgH: 1000,
			imgCy: 135,
			w: 1200,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'clay-golem': {
			imgW: 1200,
			imgH: 1000,
			imgCy: 135,
			w: 1200,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'treant': {
			imgW: 1300,
			imgH: 1200,
			imgCy: 135,
			w: 1300,
			h: 1200,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .05,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'spider': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 135,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'wolf': {
			imgW: 900,
			imgH: 1000,
			imgCy: 135,
			w: 900,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'rat': {
			imgW: 1100,
			imgH: 1000,
			imgCy: 135,
			w: 1100,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'snake': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 135,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'dragonkin': {
			imgW: 1300,
			imgH: 1300,
			imgCy: 135,
			w: 1300,
			h: 1300,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .055,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'lizardman': {
			imgW: 1100,
			imgH: 1000,
			imgCy: 135,
			w: 1100,
			h: 1000,
			yFloor: 3,
			yoyo: true,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'dragon': {
			imgW: 3000,
			imgH: 1500,
			imgCy: 135,
			w: 3000,
			h: 1500,
			yFloor: 3,
			yoyo: true,
			cache: [],
			speed: .06,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'ghoul': {
			imgW: 900,
			imgH: 1000,
			imgCy: 135,
			w: 900,
			h: 1000,
			yFloor: 3,
			yoyo: true,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'mummy': {
			imgW: 800,
			imgH: 1000,
			imgCy: 135,
			w: 800,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'skeleton': {
			imgW: 900,
			imgH: 1000,
			imgCy: 135,
			w: 900,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'zombie': {
			imgW: 900,
			imgH: 1000,
			imgCy: 135,
			w: 900,
			h: 1000,
			yFloor: 3,
			yoyo: true,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'vampire': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 135,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: true,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'goblin': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 135,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'hobgoblin': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 135,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'kobold': {
			imgW: 1400,
			imgH: 1000,
			imgCy: 135,
			w: 1400,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'orc': {
			imgW: 1200,
			imgH: 1000,
			imgCy: 135,
			w: 1200,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'griffon': {
			imgW: 2000,
			imgH: 1000,
			imgCy: 135,
			w: 2000,
			h: 1200,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .05,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'harpy': {
			imgW: 1500,
			imgH: 1000,
			imgCy: 135,
			w: 1500,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'werewolf': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 135,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'centaur': {
			imgW: 1500,
			imgH: 1000,
			imgCy: 135,
			w: 1500,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'cerberus': {
			imgW: 1300,
			imgH: 1000,
			imgCy: 300,
			w: 1300,
			h: 1000,
			yFloor: -60,
			yoyo: false,
			cache: [],
			speed: .055,
			detailAliveBottom: 550,
			detailDeathBottom: 350,
			shadowBottom: 30,
			shadowWidth: 470,
			clickAliveY: 20,
			clickAliveW: 350,
			clickAliveH: 480,
			clickDeadY: 0,
			clickDeadW: 350,
			clickDeadH: 200
		},
		'fungoid': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 340,
			w: 800,
			h: 800,
			yFloor: -80,
			yoyo: true,
			cache: [],
			speed: .045,
			detailAliveBottom: 550,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 40,
			clickAliveW: 190,
			clickAliveH: 470,
			clickDeadY: 0,
			clickDeadW: 170,
			clickDeadH: 120
		},
		'gargoyle': {
			imgW: 1200,
			imgH: 1000,
			imgCy: 300,
			w: 1080,
			h: 900,
			yFloor: -30,
			yoyo: true,
			cache: [],
			speed: .0475,
			detailAliveBottom: 530,
			detailDeathBottom: 330,
			shadowBottom: 20,
			shadowWidth: 300,
			clickAliveY: 30,
			clickAliveW: 200,
			clickAliveH: 400,
			clickDeadY: 30,
			clickDeadW: 200,
			clickDeadH: 250
		},
		'beetle': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 150,
			w: 600,
			h: 600,
			yFloor: -60,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 370,
			detailDeathBottom: 250,
			shadowBottom: 20,
			shadowWidth: 400,
			clickAliveY: 120,
			clickAliveW: 190,
			clickAliveH: 170,
			clickDeadY: 20,
			clickDeadW: 200,
			clickDeadH: 170
		},
		'imp': {
			imgW: 1250,
			imgH: 1000,
			imgCy: 200,
			w: 625,
			h: 500,
			yFloor: -30,
			yoyo: true,
			cache: [],
			speed: .045,
			detailAliveBottom: 400,
			detailDeathBottom: 230,
			shadowBottom: 10,
			shadowWidth: 220,
			clickAliveY: 20,
			clickAliveW: 150,
			clickAliveH: 290,
			clickDeadY: 0,
			clickDeadW: 150,
			clickDeadH: 140
		},
		'minotaur': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 320,
			w: 900,
			h: 900,
			yFloor: -100,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 550,
			detailDeathBottom: 250,
			shadowBottom: 20,
			shadowWidth: 270,
			clickAliveY: 40,
			clickAliveW: 200,
			clickAliveH: 450,
			clickDeadY: 0,
			clickDeadW: 200,
			clickDeadH: 150
		},
		'aviak': {
			imgW: 1200,
			imgH: 1000,
			imgCy: 290,
			w: 900,
			h: 750,
			yFloor: -110,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 450,
			detailDeathBottom: 250,
			shadowBottom: 20,
			shadowWidth: 270,
			clickAliveY: 40,
			clickAliveW: 190,
			clickAliveH: 370,
			clickDeadY: 0,
			clickDeadW: 350,
			clickDeadH: 125
		},
		'elephant': {
			imgW: 1300,
			imgH: 1000,
			imgCy: 330,
			w: 1170,
			h: 900,
			yFloor: -100,
			yoyo: false,
			cache: [],
			speed: .05,
			detailAliveBottom: 630,
			detailDeathBottom: 340,
			shadowBottom: 10,
			shadowWidth: 350,
			clickAliveY: 10,
			clickAliveW: 260,
			clickAliveH: 580,
			clickDeadY: 0,
			clickDeadW: 440,
			clickDeadH: 250
		},
		'lion': {
			imgW: 900,
			imgH: 1200,
			imgCy: 260,
			w: 540,
			h: 720,
			yFloor: -50,
			yoyo: false,
			cache: [],
			speed: .05,
			detailAliveBottom: 460,
			detailDeathBottom: 230,
			shadowBottom: 15,
			shadowWidth: 250,
			clickAliveY: 10,
			clickAliveW: 180,
			clickAliveH: 380,
			clickDeadY: 0,
			clickDeadW: 320,
			clickDeadH: 140
		},
		'crocodile': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 110,
			w: 700,
			h: 700,
			yFloor: -60,
			yoyo: false,
			cache: [],
			speed: .05,
			detailAliveBottom: 300,
			detailDeathBottom: 250,
			shadowBottom: 10,
			shadowWidth: 350,
			clickAliveY: 10,
			clickAliveW: 330,
			clickAliveH: 200,
			clickDeadY: 30,
			clickDeadW: 350,
			clickDeadH: 130
		},
		'rhino': {
			imgW: 1200,
			imgH: 1200,
			imgCy: 235,
			w: 800,
			h: 800,
			yFloor: -70,
			yoyo: false,
			cache: [],
			speed: .05,
			detailAliveBottom: 500,
			detailDeathBottom: 300,
			shadowBottom: 20,
			shadowWidth: 250,
			clickAliveY: 20,
			clickAliveW: 240,
			clickAliveH: 420,
			clickDeadY: 0,
			clickDeadW: 450,
			clickDeadH: 200
		},
		'lioness': {
			imgW: 900,
			imgH: 1200,
			imgCy: 220,
			w: 450,
			h: 600,
			yFloor: -30,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 400,
			detailDeathBottom: 240,
			shadowBottom: 10,
			shadowWidth: 150,
			clickAliveY: 20,
			clickAliveW: 120,
			clickAliveH: 310,
			clickDeadY: 0,
			clickDeadW: 400,
			clickDeadH: 100
		},
		'bear': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 220,
			w: 600,
			h: 600,
			yFloor: -10,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 470,
			detailDeathBottom: 270,
			shadowBottom: 25,
			shadowWidth: 270,
			clickAliveY: 50,
			clickAliveW: 240,
			clickAliveH: 370,
			clickDeadY: 50,
			clickDeadW: 340,
			clickDeadH: 240
		},
		'toadlok': {
			imgW: 1200,
			imgH: 1000,
			imgCy: 200,
			w: 600,
			h: 500,
			yFloor: -20,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 400,
			detailDeathBottom: 270,
			shadowBottom: 40,
			shadowWidth: 200,
			clickAliveY: 50,
			clickAliveW: 200,
			clickAliveH: 300,
			clickDeadY: 30,
			clickDeadW: 200,
			clickDeadH: 170
		},
		'giant': {
			imgW: 1400,
			imgH: 1200,
			imgCy: 480,
			w: 1400,
			h: 1200,
			yFloor: -150,
			yoyo: false,
			cache: [],
			speed: .05,
			detailAliveBottom: 800,
			detailDeathBottom: 370,
			shadowBottom: 35,
			shadowWidth: 450,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 700,
			clickDeadY: -50,
			clickDeadW: 350,
			clickDeadH: 400
		},
		'ice-giant': {
			imgW: 1400,
			imgH: 1200,
			imgCy: 480,
			w: 1400,
			h: 1200,
			yFloor: -150,
			yoyo: false,
			cache: [],
			speed: .06,
			detailAliveBottom: 800,
			detailDeathBottom: 370,
			shadowBottom: 35,
			shadowWidth: 450,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 700,
			clickDeadY: -50,
			clickDeadW: 350,
			clickDeadH: 400
		},
		'fire-giant': {
			imgW: 1400,
			imgH: 1200,
			imgCy: 480,
			w: 1400,
			h: 1200,
			yFloor: -150,
			yoyo: false,
			cache: [],
			speed: .06,
			detailAliveBottom: 800,
			detailDeathBottom: 370,
			shadowBottom: 35,
			shadowWidth: 450,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 700,
			clickDeadY: -50,
			clickDeadW: 350,
			clickDeadH: 400
		},
		'spectre': {
			imgW: 1500,
			imgH: 1500,
			imgCy: 385,
			w: 1050,
			h: 1050,
			yFloor: -190,
			yoyo: false,
			cache: [],
			speed: .055,
			detailAliveBottom: 550,
			detailDeathBottom: 270,
			shadowBottom: 40,
			shadowWidth: 160,
			clickAliveY: 100,
			clickAliveW: 150,
			clickAliveH: 400,
			clickDeadY: 50,
			clickDeadW: 170,
			clickDeadH: 130
		},
		'angler': {
			imgW: 1500,
			imgH: 1200,
			imgCy: 235,
			w: 900,
			h: 720,
			yFloor: -60,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 400,
			detailDeathBottom: 270,
			shadowBottom: 35,
			shadowWidth: 240,
			clickAliveY: 50,
			clickAliveW: 200,
			clickAliveH: 280,
			clickDeadY: 10,
			clickDeadW: 200,
			clickDeadH: 120
		},
		'beholder': {
			imgW: 1200,
			imgH: 1000,
			imgCy: 210,
			w: 720,
			h: 600,
			yFloor: -100,
			yoyo: false,
			cache: [],
			speed: .05,
			detailAliveBottom: 410,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 250,
			clickAliveY: 50,
			clickAliveW: 200,
			clickAliveH: 300,
			clickDeadY: 50,
			clickDeadW: 200,
			clickDeadH: 200
		},
		'unicorn': {
			imgW: 2000,
			imgH: 1200,
			imgCy: 280,
			w: 1600,
			h: 960,
			yFloor: -20,
			yoyo: false,
			cache: [],
			speed: .055,
			detailAliveBottom: 480,
			detailDeathBottom: 270,
			shadowBottom: 40,
			shadowWidth: 200,
			clickAliveY: 50,
			clickAliveW: 120,
			clickAliveH: 350,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		'scorpion': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 135,
			w: 600,
			h: 600,
			yFloor: 0, // back row is *2
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 450,
			detailDeathBottom: 270,
			shadowBottom: 30,
			shadowWidth: 400,
			clickAliveY: 50,
			clickAliveW: 350,
			clickAliveH: 350,
			clickDeadY: 50, 
			clickDeadW: 350, 
			clickDeadH: 100
		}
	},
	imageKeysLen: 0,
	index: 0,
	cache: {},
	count: 0,
	imageKeys: [],
	getRandomMobKey: function(){
		var i = ~~(Math.random() * mob.imageKeysLen);
		return mob.imageKeys[i];
	},
	preloadMob: function(type){
		if (!mob.images[type].cache.length) {
			console.info("preloading ", type);
			for (var i = 1; i < 105; i++) {
				mob.images[type].cache[i] = new Image();
				mob.images[type].cache[i].src = 'mobs/' + type + '/' + i + '.png';
			}
		}
	},
	initialized: 0,
	max: 9,
	init: function(){
		mob.imageKeys = Object.keys(mob.images);
		mob.imageKeysLen = mob.imageKeys.length;
		battle.show();
		// init mob/dom connections
		for (var i=0; i<mob.max; i++){
			mobs[i] = {};
			var m = mobs[i];
			m.hp = 1;
			m.index = i;
			m.frame = 0;
			m.lastFrame = 0;
			m.animationActive = 0;
			m.size = m.index < 5 ? 1 : .8;
			m.deathState = 0;
			m.speed = 0;
			m.type = '';
			m.box = {};
			// cache mob elements
			m.dom = {};
			[
				'wrap',
				'center',
				'alive',
				'dead',
				'img',
				'details',
				'name',
				'shadow',
				'bar'
			].forEach(function(e){
				m.dom[e] = document.getElementById('mob-'+ e +'-' + i);
			});
		}
		battle.init();
	},
	element: {},
	animationActive: 0,
	frame: 1,
	setMob: function(m){
		// set memory
		m.size = m.size;
		m = Object.assign(m, mob.images[m.type]);
		delete m.cache;
		mob.sizeMob(m);
	},
	sizeMob: function(m){
		// TODO: perhaps modify this later responsively using window.innerWidth ?
		// set dom
		var w = ~~(m.size * (mob.images[m.type].w));

		m.box = battle.getBox(m.index);
		// wrapper
		// name
		m.dom.name.innerHTML = m.type.replace(/-/g, ' ');
		// img
		m.dom.img.style.left = (w * -.5) + 'px';
		m.dom.img.style.width = w + 'px';
		m.dom.img.style.bottom = (mob.images[m.type].yFloor * m.size) + 'px';
		// details
		TweenMax.set(m.dom.details, {
			bottom: m.detailAliveBottom * m.size
		});
		// shadow
		m.dom.shadow.style.width = (m.shadowWidth * m.size) + 'px';
		m.dom.shadow.style.left = ((m.shadowWidth * m.size ) * -.5) + 'px';
		m.dom.shadow.style.bottom = (m.shadowBottom * m.size) + 'px';
		// test stuff below
		// center dot
		m.dom.center.style.left = m.box.cx + 'px';
		m.dom.center.style.bottom = m.box.cy + 'px';
		mob.setClickBox(m);
	},
	setClickBox: function(m){
		// alive box
		m.dom.alive.style.left = ((m.clickAliveW  * m.size) * -.5) + 'px';
		m.dom.alive.style.bottom = (m.clickAliveY  * m.size) + 'px';
		m.dom.alive.style.width = (m.clickAliveW  * m.size) + 'px';
		m.dom.alive.style.height = (m.clickAliveH * m.size) + 'px';
		m.dom.alive.style.display = m.hp ? 'block' : 'none';
		// dead box
		m.dom.dead.style.left = ((m.clickDeadW * m.size) * -.5) + 'px';
		m.dom.dead.style.bottom = (m.clickDeadY * m.size) + 'px';
		m.dom.dead.style.width = (m.clickDeadW * m.size) + 'px';
		m.dom.dead.style.height = (m.clickDeadH * m.size) + 'px';
		m.dom.dead.style.display = m.hp ? 'none' : 'block';
	},
	setSrc: function(m){
		m.frame = ~~m.frame;
		if (m.frame !== m.lastFrame) {
			m.dom.img.src = 'mobs/' + m.type + '/' + m.frame + '.png';
			m.lastFrame = m.frame;
		}
	},
	resetIdle: function(m){
		m.animationActive = 0;
		mob.idle(m, 1);
	},
	idle: function(m, skip){
		var startFrame = 1,
			endFrame = 5.9,
			diff = endFrame - startFrame;

		TweenMax.to(m, m.speed * diff * 2, {
			startAt: {
				frame: startFrame
			},
			frame: endFrame,
			yoyo: true,
			repeat: -1,
			repeatDelay: m.speed,
			ease: Sine.easeOut,
			onUpdate: function(){
				mob.setSrc(m);
			}
		});
		if (skip) return;
		TweenMax.delayedCall(.25, function(){
			mob.test && mob.hit(m);
			//mob.death();
		})
	},
	hit: function(m){
		if (m.animationActive) return;
		m.animationActive = 1;
		var startFrame = 6,
			endFrame = 15.9,
			diff = endFrame - startFrame;

		TweenMax.to(m, m.speed * diff, {
			startAt: {
				frame: startFrame
			},
			overwrite: 1,
			frame: endFrame,
			ease: Linear.easeNone,
			yoyo: true,
			repeat: 1,
			onUpdate: function(){
				mob.setSrc(m);
			},
			onComplete: function(){
				mob.resetIdle(m);
				if (mob.test){
					TweenMax.delayedCall(.5, function() {
						mob.attack(m, 1);
					});
				}
			}
		});
	},
	attack: function(m, force){
		if (m.animationActive) return;
		m.animationActive = 1;
		var tl = g.TM(),
			foo = force ? force : !Math.round(Math.random()) ? 1 : 2,
			startFrame = foo === 1 ?
				15.9 : 35.9,
			endFrame = startFrame + 20,
			diff = endFrame - startFrame;

		tl.to(m, m.speed * diff, {
			startAt: {
				frame: startFrame
			},
			overwrite: 1,
			frame: endFrame,
			ease: Linear.easeNone,
			onUpdate: function() {
				mob.setSrc(m);
			},
			onComplete: function() {
				mob.resetIdle(m);
				if (mob.test){
					if (force === 1){
						TweenMax.delayedCall(.5, function() {
							mob.attack(m, 2);
						});
					}
					else {
						TweenMax.delayedCall(.5, function() {
							mob.special(m);
						});
					}
				}
			}
		});
	},
	special: function(m){
		if (m.animationActive) return;
		m.animationActive = 1;
		var startFrame = 56,
			endFrame = 75.9,
			diff = endFrame - startFrame;

		var tl = g.TM();
		tl.to(m, m.speed * diff, {
			startAt: {
				frame: startFrame
			},
			overwrite: 1,
			frame: endFrame,
			ease: Linear.easeNone,
			yoyo: m.yoyo,
			repeat: m.yoyo ? 1 : 0,
			onUpdate: function(){
				mob.setSrc(m);
			},
			onComplete: function () {
				mob.resetIdle(m);
				if (mob.test) {
					TweenMax.delayedCall(.5, function () {
						mob.death(m);
					});
				}
			}
		});
	},
	death: function(m){
		if (m.deathState) return;
		m.deathState = 1;
		m.hp = 0;
		mob.setClickBox(m);
		m.animationActive = 1;
		var tl = g.TM(),
			startFrame = 76,
			endFrame = 105.9,
			diff = endFrame - startFrame,
			d = m.speed * diff;
		TweenMax.to(m.dom.details, d, {
			bottom: m.detailDeathBottom * m.size,
			ease: Quart.easeIn
		});
		tl.to(m, d, {
			startAt: {
				frame: startFrame
			},
			overwrite: 1,
			frame: endFrame,
			ease: Linear.easeNone,
			onUpdate: function () {
				mob.setSrc(m);
			},
			onComplete: function() {
				var filters = {
						opacity: 'opacity(100%)',
						brightness: "brightness(100%)"
					},
					e = m.dom.wrap;

				var tl = new TimelineMax({
					onUpdate: function () {
						test.filters.death(e, filters);
					}
				});
				tl.to(filters, 2, {
					opacity: 'opacity(0%)',
					brightness: "brightness(0%)",
					ease: Linear.easeIn,
					onComplete: function () {
						if (mob.test) {
							m.hp = 1;
							mob.sizeMob(m);
							mob.idle(m);
						}
						TweenMax.delayedCall(.1, function () {
							m.deathState = 0;
							m.animationActive = 0;
							e.style.filter = 'opacity(100%) brightness(100%)';
						});
					}
				});
			}
		});
	},
	deathState: 0,
	blur: function(){
		var e = document.getElementById('sprite'),
			type = 'blur',
			filters = {
				blur: type + '(0px)'
			};

		TweenMax.to(filters, 1.5, {
			blur: type + '(5px)',
			yoyo: true,
			repeat: -1,
			onUpdate: function(){
				mob.filters.effect(e, filters, type);
			}
		});
	},
	brightness: function(){
		var e = document.getElementById('sprite'),
			type = 'brightness',
			filters = {
				brightness: type + '(0%)'
			};

		TweenMax.to(filters, 1.5, {
			brightness: type + '(100%)',
			yoyo: true,
			repeat: -1,
			onUpdate: function(){
				mob.filters.effect(e, filters, type);
			}
		});
	},
	contrast: function(){
		var e = document.getElementById('sprite'),
			type = 'contrast',
			filters = {
				contrast: type + '(0%)'
			};

		TweenMax.to(filters, 1.5, {
			contrast: type + '(200%)',
			yoyo: true,
			repeat: -1,
			onUpdate: function(){
				mob.filters.effect(e, filters, type);
			}
		});
	},
	grayscale: function(){
		var e = document.getElementById('sprite'),
			type = 'grayscale',
			filters = {
				grayscale: type + '(0%)'
			};

		TweenMax.to(filters, 1.5, {
			grayscale: type + '(100%)',
			yoyo: true,
			repeat: -1,
			onUpdate: function(){
				mob.filters.effect(e, filters, type);
			}
		});
	},
	invert: function(){
		var e = document.getElementById('sprite'),
			type = 'invert',
			filters = {
				invert: type + '(0%)'
			};

		TweenMax.to(filters, 1.5, {
			invert: type + '(400%)',
			yoyo: true,
			repeat: -1,
			onUpdate: function(){
				mob.filters.effect(e, filters, type);
			}
		});
	},
	saturate: function(){
		var e = document.getElementById('sprite'),
			type = 'saturate',
			filters = {
				saturate: type + '(0%)'
			};

		TweenMax.to(filters, 1.5, {
			saturate: type + '(500%)',
			yoyo: true,
			repeat: -1,
			onUpdate: function(){
				mob.filters.effect(e, filters, type);
			}
		});
	},
	sepia: function(){
		var e = document.getElementById('sprite'),
			type = 'sepia',
			filters = {
				sepia: type + '(0%)'
			};

		TweenMax.to(filters, 1.5, {
			sepia: type + '(100%)',
			yoyo: true,
			repeat: -1,
			onUpdate: function(){
				mob.filters.effect(e, filters, type);
			}
		});
	}
}
mob.count = mob.images.length - 1;
mob.init();