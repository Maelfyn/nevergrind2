// test methods
var mobs = [];
var mob = {
	test: 1,
	images: {
		'balrog': {
			imgW: 2000,
			imgH: 1200,
			imgCy: 360,
			w: 2000,
			h: 1200,
			yFloor: -195,
			yoyo: true,
			cache: [],
			speed: .05,
			detailAliveBottom: 620,
			detailDeathBottom: 240,
			shadowBottom: 40,
			shadowWidth: 400,
			shadowHeight: 80,
			clickAliveY: 20,
			clickAliveW: 230,
			clickAliveH: 500,
			clickDeadY: -70,
			clickDeadW: 400,
			clickDeadH: 200
		},
		'ice-golem': {
			imgW: 1200,
			imgH: 1000,
			imgCy: 450,
			w: 1200,
			h: 1000,
			yFloor: -190,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 720,
			detailDeathBottom: 300,
			shadowBottom: 40,
			shadowWidth: 440,
			shadowHeight: 120,
			clickAliveY: 40,
			clickAliveW: 350,
			clickAliveH: 600,
			clickDeadY: -50,
			clickDeadW: 500,
			clickDeadH: 250
		},
		'stone-golem': {
			imgW: 1200,
			imgH: 1000,
			imgCy: 450,
			w: 1200,
			h: 1000,
			yFloor: -190,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 720,
			detailDeathBottom: 300,
			shadowBottom: 40,
			shadowWidth: 440,
			shadowHeight: 120,
			clickAliveY: 40,
			clickAliveW: 350,
			clickAliveH: 600,
			clickDeadY: -50,
			clickDeadW: 500,
			clickDeadH: 250
		},
		'iron-golem': {
			imgW: 1200,
			imgH: 1000,
			imgCy: 450,
			w: 1200,
			h: 1000,
			yFloor: -190,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 720,
			detailDeathBottom: 300,
			shadowBottom: 40,
			shadowWidth: 440,
			shadowHeight: 120,
			clickAliveY: 40,
			clickAliveW: 350,
			clickAliveH: 600,
			clickDeadY: -50,
			clickDeadW: 500,
			clickDeadH: 250
		},
		'treant': {
			imgW: 1300,
			imgH: 1200,
			imgCy: 420,
			w: 1170,
			h: 1080,
			yFloor: -135,
			yoyo: false,
			cache: [],
			speed: .05,
			detailAliveBottom: 750,
			detailDeathBottom: 270,
			shadowBottom: 40,
			shadowWidth: 420,
			shadowHeight: 70,
			clickAliveY: 30,
			clickAliveW: 200,
			clickAliveH: 600,
			clickDeadY: -80,
			clickDeadW: 350,
			clickDeadH: 200
		},
		'spider': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 190,
			w: 1000,
			h: 1000,
			yFloor: -190,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 380,
			detailDeathBottom: 270,
			shadowBottom: 40,
			shadowWidth: 900,
			shadowHeight: 100,
			clickAliveY: 10,
			clickAliveW: 800,
			clickAliveH: 280,
			clickDeadY: 50,
			clickDeadW: 500,
			clickDeadH: 180
		},
		'wolf': {
			imgW: 900,
			imgH: 1000,
			imgCy: 240,
			w: 630,
			h: 700,
			yFloor: -125,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 410,
			detailDeathBottom: 220,
			shadowBottom: 40,
			shadowWidth: 200,
			shadowHeight: 100,
			clickAliveY: 30,
			clickAliveW: 150,
			clickAliveH: 320,
			clickDeadY: 0,
			clickDeadW: 250,
			clickDeadH: 120
		},
		'rat': {
			imgW: 1100,
			imgH: 1000,
			imgCy: 135,
			w: 550,
			h: 500,
			yFloor: -70,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 260,
			detailDeathBottom: 200,
			shadowBottom: 40,
			shadowWidth: 200,
			shadowHeight: 80,
			clickAliveY: 30,
			clickAliveW: 150,
			clickAliveH: 180,
			clickDeadY: 20,
			clickDeadW: 210,
			clickDeadH: 120
		},
		'snake': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 160,
			w: 500,
			h: 500,
			yFloor: -60,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 320,
			detailDeathBottom: 200,
			shadowBottom: 40,
			shadowWidth: 200,
			shadowHeight: 60,
			clickAliveY: 30,
			clickAliveW: 150,
			clickAliveH: 230,
			clickDeadY: 0,
			clickDeadW: 150,
			clickDeadH: 100
		},
		'dragonkin': {
			imgW: 1300,
			imgH: 1300,
			imgCy: 340,
			w: 845,
			h: 845,
			yFloor: -70,
			yoyo: false,
			cache: [],
			speed: .055,
			detailAliveBottom: 510,
			detailDeathBottom: 240,
			shadowBottom: 40,
			shadowWidth: 360,
			shadowHeight: 100,
			clickAliveY: 30,
			clickAliveW: 200,
			clickAliveH: 440,
			clickDeadY: -50,
			clickDeadW: 250,
			clickDeadH: 200
		},
		'lizardman': {
			imgW: 1100,
			imgH: 1000,
			imgCy: 350,
			w: 880,
			h: 800,
			yFloor: -130,
			yoyo: true,
			cache: [],
			speed: .045,
			detailAliveBottom: 520,
			detailDeathBottom: 250,
			shadowBottom: 40,
			shadowWidth: 320,
			shadowHeight: 60,
			clickAliveY: 20,
			clickAliveW: 160,
			clickAliveH: 450,
			clickDeadY: 0,
			clickDeadW: 300,
			clickDeadH: 140
		},
		'dragon': {
			imgW: 3000,
			imgH: 1500,
			imgCy: 240,
			w: 3000,
			h: 1500,
			yFloor: -80,
			yoyo: true,
			cache: [],
			speed: .055,
			detailAliveBottom: 650,
			detailDeathBottom: 350,
			shadowBottom: 40,
			shadowWidth: 640,
			shadowHeight: 160,
			clickAliveY: -50,
			clickAliveW: 500,
			clickAliveH: 600,
			clickDeadY: 0,
			clickDeadW: 500,
			clickDeadH: 250
		},
		'ghoul': {
			imgW: 900,
			imgH: 1000,
			imgCy: 350,
			w: 630,
			h: 700,
			yFloor: -80,
			yoyo: true,
			cache: [],
			speed: .045,
			detailAliveBottom: 510,
			detailDeathBottom: 210,
			shadowBottom: 40,
			shadowWidth: 320,
			shadowHeight: 40,
			clickAliveY: 30,
			clickAliveW: 270,
			clickAliveH: 450,
			clickDeadY: -50,
			clickDeadW: 250,
			clickDeadH: 140
		},
		'mummy': {
			imgW: 800,
			imgH: 1000,
			imgCy: 370,
			w: 560,
			h: 700,
			yFloor: -30,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 550,
			detailDeathBottom: 210,
			shadowBottom: 40,
			shadowWidth: 260,
			shadowHeight: 60,
			clickAliveY: 40,
			clickAliveW: 180,
			clickAliveH: 480,
			clickDeadY: 0,
			clickDeadW: 160,
			clickDeadH: 120
		},
		'skeleton': {
			imgW: 900,
			imgH: 1000,
			imgCy: 340,
			w: 720,
			h: 800,
			yFloor: -30,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 520,
			detailDeathBottom: 240,
			shadowBottom: 40,
			shadowWidth: 280,
			shadowHeight: 60,
			clickAliveY: 30,
			clickAliveW: 150,
			clickAliveH: 430,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 100
		},
		// questionable
		'zombie': {
			imgW: 900,
			imgH: 1000,
			imgCy: 400,
			w: 720,
			h: 800,
			yFloor: -15,
			yoyo: true,
			cache: [],
			speed: .045,
			detailAliveBottom: 590,
			detailDeathBottom: 230,
			shadowBottom: 40,
			shadowWidth: 230,
			shadowHeight: 70,
			clickAliveY: 30,
			clickAliveW: 160,
			clickAliveH: 520,
			clickDeadY: 10,
			clickDeadW: 240,
			clickDeadH: 150
		},
		'vampire': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 350,
			w: 650,
			h: 650,
			yFloor: -60,
			yoyo: true,
			cache: [],
			speed: .04,
			detailAliveBottom: 510,
			detailDeathBottom: 230,
			shadowBottom: 40,
			shadowWidth: 300,
			shadowHeight: 60,
			clickAliveY: 40,
			clickAliveW: 200,
			clickAliveH: 420,
			clickDeadY: -50,
			clickDeadW: 250,
			clickDeadH: 200
		},
		'goblin': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 250,
			w: 700,
			h: 700,
			yFloor: -40,
			yoyo: false,
			cache: [],
			speed: .042,
			detailAliveBottom: 400,
			detailDeathBottom: 220,
			shadowBottom: 40,
			shadowWidth: 200,
			shadowHeight: 40,
			clickAliveY: 50,
			clickAliveW: 150,
			clickAliveH: 330,
			clickDeadY: 40,
			clickDeadW: 300,
			clickDeadH: 100
		},
		'hobgoblin': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 340,
			w: 1000,
			h: 1000,
			yFloor: -120,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 530,
			detailDeathBottom: 220,
			shadowBottom: 40,
			shadowWidth: 340,
			shadowHeight: 70,
			clickAliveY: 40,
			clickAliveW: 220,
			clickAliveH: 450,
			clickDeadY: 0,
			clickDeadW: 330,
			clickDeadH: 150
		},
		'kobold': {
			imgW: 1400,
			imgH: 1000,
			imgCy: 230,
			w: 700,
			h: 500,
			yFloor: -40,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 380,
			detailDeathBottom: 200,
			shadowBottom: 40,
			shadowWidth: 230,
			shadowHeight: 60,
			clickAliveY: 30,
			clickAliveW: 170,
			clickAliveH: 310,
			clickDeadY: 10,
			clickDeadW: 250,
			clickDeadH: 100
		},
		'orc': {
			imgW: 1200,
			imgH: 1000,
			imgCy: 340,
			w: 960,
			h: 800,
			yFloor: -55,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 520,
			detailDeathBottom: 250,
			shadowBottom: 40,
			shadowWidth: 260,
			shadowHeight: 70,
			clickAliveY: 30,
			clickAliveW: 200,
			clickAliveH: 440,
			clickDeadY: 0,
			clickDeadW: 240,
			clickDeadH: 150
		},
		'griffon': {
			imgW: 2000,
			imgH: 1200,
			imgCy: 250,
			w: 1600,
			h: 960,
			yFloor: -40,
			yoyo: false,
			cache: [],
			speed: .05,
			detailAliveBottom: 520,
			detailDeathBottom: 230,
			shadowBottom: 40,
			shadowWidth: 280,
			shadowHeight: 80,
			clickAliveY: 20,
			clickAliveW: 180,
			clickAliveH: 380,
			clickDeadY: 20,
			clickDeadW: 400,
			clickDeadH: 130
		},
		'harpy': {
			imgW: 1500,
			imgH: 1000,
			imgCy: 290,
			w: 900,
			h: 600,
			yFloor: -30,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 490,
			detailDeathBottom: 270,
			shadowBottom: 40,
			shadowWidth: 300,
			shadowHeight: 40,
			clickAliveY: 50,
			clickAliveW: 200,
			clickAliveH: 400,
			clickDeadY: 50,
			clickDeadW: 350,
			clickDeadH: 130
		},
		'werewolf': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 260,
			w: 800,
			h: 800,
			yFloor: -60,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 450,
			detailDeathBottom: 220,
			shadowBottom: 40,
			shadowWidth: 380,
			shadowHeight: 60,
			clickAliveY: 40,
			clickAliveW: 350,
			clickAliveH: 330,
			clickDeadY: -20,
			clickDeadW: 400,
			clickDeadH: 200
		},
		'centaur': {
			imgW: 1500,
			imgH: 1000,
			imgCy: 330,
			w: 1050,
			h: 700,
			yFloor: -25,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 560,
			detailDeathBottom: 240,
			shadowBottom: 40,
			shadowWidth: 190,
			shadowHeight: 80,
			clickAliveY: 20,
			clickAliveW: 150,
			clickAliveH: 470,
			clickDeadY: 20,
			clickDeadW: 380,
			clickDeadH: 150
		},
		// dont like the cerberus
		'cerberus': {
			imgW: 1800,
			imgH: 1200,
			imgCy: 300,
			w: 1200,
			h: 800,
			yFloor: -50,
			yoyo: false,
			cache: [],
			speed: .055,
			detailAliveBottom: 530,
			detailDeathBottom: 350,
			shadowBottom: 40,
			shadowWidth: 470,
			shadowHeight: 180,
			clickAliveY: 20,
			clickAliveW: 420,
			clickAliveH: 480,
			clickDeadY: 0,
			clickDeadW: 400,
			clickDeadH: 250
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
			shadowBottom: 40,
			shadowWidth: 260,
			shadowHeight: 70,
			clickAliveY: 40,
			clickAliveW: 190,
			clickAliveH: 470,
			clickDeadY: 0,
			clickDeadW: 210,
			clickDeadH: 140
		},
		'gargoyle': {
			imgW: 1200,
			imgH: 1000,
			imgCy: 300,
			w: 1080,
			h: 900,
			yFloor: -20,
			yoyo: true,
			cache: [],
			speed: .045,
			detailAliveBottom: 530,
			detailDeathBottom: 350,
			shadowBottom: 40,
			shadowWidth: 320,
			shadowHeight: 60,
			clickAliveY: 40,
			clickAliveW: 200,
			clickAliveH: 400,
			clickDeadY: 40,
			clickDeadW: 200,
			clickDeadH: 250
		},
		'beetle': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 210,
			w: 600,
			h: 600,
			yFloor: -60,
			yoyo: false,
			cache: [],
			speed: .04,
			detailAliveBottom: 370,
			detailDeathBottom: 250,
			shadowBottom: 40,
			shadowWidth: 400,
			shadowHeight: 90,
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
			yFloor: -15,
			yoyo: true,
			cache: [],
			speed: .045,
			detailAliveBottom: 400,
			detailDeathBottom: 230,
			shadowBottom: 40,
			shadowWidth: 220,
			shadowHeight: 60,
			clickAliveY: 30,
			clickAliveW: 150,
			clickAliveH: 290,
			clickDeadY: 0,
			clickDeadW: 150,
			clickDeadH: 140
		},
		'minotaur': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 380,
			w: 1000,
			h: 1000,
			yFloor: -100,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 620,
			detailDeathBottom: 250,
			shadowBottom: 40,
			shadowWidth: 270,
			shadowHeight: 80,
			clickAliveY: 40,
			clickAliveW: 200,
			clickAliveH: 500,
			clickDeadY: 0,
			clickDeadW: 250,
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
			detailDeathBottom: 200,
			shadowBottom: 40,
			shadowWidth: 270,
			shadowHeight: 40,
			clickAliveY: 40,
			clickAliveW: 190,
			clickAliveH: 380,
			clickDeadY: 0,
			clickDeadW: 350,
			clickDeadH: 125
		},
		'elephant': {
			imgW: 1300,
			imgH: 1000,
			imgCy: 330,
			w: 1300,
			h: 1000,
			yFloor: -100,
			yoyo: false,
			cache: [],
			speed: .05,
			detailAliveBottom: 720,
			detailDeathBottom: 340,
			shadowBottom: 40,
			shadowWidth: 380,
			shadowHeight: 110,
			clickAliveY: 10,
			clickAliveW: 290,
			clickAliveH: 650,
			clickDeadY: 0,
			clickDeadW: 440,
			clickDeadH: 250
		},
		'lion': {
			imgW: 900,
			imgH: 1200,
			imgCy: 300,
			w: 540,
			h: 720,
			yFloor: -20,
			yoyo: false,
			cache: [],
			speed: .05,
			detailAliveBottom: 500,
			detailDeathBottom: 230,
			shadowBottom: 40,
			shadowWidth: 250,
			shadowHeight: 90,
			clickAliveY: 30,
			clickAliveW: 180,
			clickAliveH: 420,
			clickDeadY: 0,
			clickDeadW: 320,
			clickDeadH: 140
		},
		'crocodile': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 120,
			w: 800,
			h: 800,
			yFloor: -50,
			yoyo: false,
			cache: [],
			speed: .05,
			detailAliveBottom: 320,
			detailDeathBottom: 250,
			shadowBottom: 40,
			shadowWidth: 420,
			shadowHeight: 110,
			clickAliveY: 10,
			clickAliveW: 330,
			clickAliveH: 240,
			clickDeadY: 30,
			clickDeadW: 370,
			clickDeadH: 170
		},
		'rhino': {
			imgW: 1200,
			imgH: 1200,
			imgCy: 275,
			w: 1000,
			h: 1000,
			yFloor: -90,
			yoyo: false,
			cache: [],
			speed: .05,
			detailAliveBottom: 620,
			detailDeathBottom: 320,
			shadowBottom: 40,
			shadowWidth: 370,
			shadowHeight: 130,
			clickAliveY: 20,
			clickAliveW: 280,
			clickAliveH: 540,
			clickDeadY: 0,
			clickDeadW: 450,
			clickDeadH: 240
		},
		'lioness': {
			imgW: 900,
			imgH: 1200,
			imgCy: 300,
			w: 540,
			h: 720,
			yFloor: -20,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 460,
			detailDeathBottom: 230,
			shadowBottom: 40,
			shadowWidth: 250,
			shadowHeight: 90,
			clickAliveY: 30,
			clickAliveW: 180,
			clickAliveH: 390,
			clickDeadY: 0,
			clickDeadW: 320,
			clickDeadH: 140
		},
		'bear': {
			imgW: 1000,
			imgH: 1000,
			imgCy: 260,
			w: 600,
			h: 600,
			yFloor: -10,
			yoyo: false,
			cache: [],
			speed: .05,
			detailAliveBottom: 470,
			detailDeathBottom: 320,
			shadowBottom: 40,
			shadowWidth: 280,
			shadowHeight: 100,
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
			yFloor: -35,
			yoyo: false,
			cache: [],
			speed: .045,
			detailAliveBottom: 390,
			detailDeathBottom: 270,
			shadowBottom: 40,
			shadowWidth: 200,
			shadowHeight: 70,
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
			detailAliveBottom: 830,
			detailDeathBottom: 370,
			shadowBottom: 40,
			shadowWidth: 480,
			shadowHeight: 120,
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
			detailAliveBottom: 830,
			detailDeathBottom: 370,
			shadowBottom: 40,
			shadowWidth: 480,
			shadowHeight: 120,
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
			detailAliveBottom: 830,
			detailDeathBottom: 370,
			shadowBottom: 40,
			shadowWidth: 480,
			shadowHeight: 120,
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
			imgCy: 455,
			w: 1200,
			h: 1200,
			yFloor: -220,
			yoyo: false,
			cache: [],
			speed: .055,
			detailAliveBottom: 610,
			detailDeathBottom: 270,
			shadowBottom: 40,
			shadowWidth: 200,
			shadowHeight: 80,
			clickAliveY: 100,
			clickAliveW: 150,
			clickAliveH: 470,
			clickDeadY: 40,
			clickDeadW: 190,
			clickDeadH: 150
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
			shadowBottom: 40,
			shadowWidth: 240,
			shadowHeight: 60,
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
			imgCy: 240,
			w: 720,
			h: 600,
			yFloor: -100,
			yoyo: false,
			cache: [],
			speed: .05,
			detailAliveBottom: 410,
			detailDeathBottom: 270,
			shadowBottom: 40,
			shadowWidth: 250,
			shadowHeight: 80,
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
			yFloor: -40,
			yoyo: false,
			cache: [],
			speed: .055,
			detailAliveBottom: 450,
			detailDeathBottom: 260,
			shadowBottom: 40,
			shadowWidth: 220,
			shadowHeight: 70,
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
			shadowBottom: 40,
			shadowWidth: 400,
			shadowHeight: 80,
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
		m.dom.shadow.style.height = (m.shadowHeight * m.size) + 'px';
		m.dom.shadow.style.left = ((m.shadowWidth * m.size ) * -.5) + 'px';
		m.dom.shadow.style.bottom = ((m.shadowBottom - (m.shadowHeight * .3))* m.size) + 'px';
		// test stuff below
		// center dot
		m.dom.center.style.left = (m.box.cx - 11) + 'px';
		m.dom.center.style.bottom = (m.box.cy - 11) + 'px';
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