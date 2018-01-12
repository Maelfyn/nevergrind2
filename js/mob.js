// test methods
var mobs = [];
var mob = {
	test: 1,
	images: {
		'balrog': {
			imgW: 2000,
			imgH: 1200,
			w: 2000,
			h: 1200,
			yFloor: 3,
			yoyo: true,
			cache: [],
			size: 1,
			speed: .05,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'ice-golem': {
			imgW: 1200,
			imgH: 1000,
			w: 1200,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'stone-golem': {
			imgW: 1200,
			imgH: 1000,
			w: 1200,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'clay-golem': {
			imgW: 1200,
			imgH: 1000,
			w: 1200,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'treant': {
			imgW: 1300,
			imgH: 1200,
			w: 1300,
			h: 1200,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .05,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'spider': {
			imgW: 1000,
			imgH: 1000,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'wolf': {
			imgW: 900,
			imgH: 1000,
			w: 900,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'rat': {
			imgW: 1100,
			imgH: 1000,
			w: 1100,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'snake': {
			imgW: 1000,
			imgH: 1000,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'dragonkin': {
			imgW: 1300,
			imgH: 1300,
			w: 1300,
			h: 1300,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .055,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'lizardman': {
			imgW: 1100,
			imgH: 1000,
			w: 1100,
			h: 1000,
			yFloor: 3,
			yoyo: true,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'dragon': {
			imgW: 3000,
			imgH: 1500,
			w: 3000,
			h: 1500,
			yFloor: 3,
			yoyo: true,
			cache: [],
			size: 1,
			speed: .06,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'ghoul': {
			imgW: 900,
			imgH: 1000,
			w: 900,
			h: 1000,
			yFloor: 3,
			yoyo: true,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'mummy': {
			imgW: 800,
			imgH: 1000,
			w: 800,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'skeleton': {
			imgW: 900,
			imgH: 1000,
			w: 900,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'zombie': {
			imgW: 900,
			imgH: 1000,
			w: 900,
			h: 1000,
			yFloor: 3,
			yoyo: true,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'vampire': {
			imgW: 1000,
			imgH: 1000,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: true,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'goblin': {
			imgW: 1000,
			imgH: 1000,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'hobgoblin': {
			imgW: 1000,
			imgH: 1000,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'kobold': {
			imgW: 1400,
			imgH: 1000,
			w: 1400,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'orc': {
			imgW: 1200,
			imgH: 1000,
			w: 1200,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .045,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'griffon': {
			imgW: 2000,
			imgH: 1000,
			w: 2000,
			h: 1200,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .05,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'harpy': {
			imgW: 1500,
			imgH: 1000,
			w: 1500,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .045,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'werewolf': {
			imgW: 1000,
			imgH: 1000,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'centaur': {
			imgW: 1500,
			imgH: 1000,
			w: 1500,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .045,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'cerberus': {
			imgW: 1300,
			imgH: 1000,
			w: 1300,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'fungoid': {
			imgW: 1000,
			imgH: 1000,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: true,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'gargoyle': {
			imgW: 1200,
			imgH: 1000,
			w: 1200,
			h: 1000,
			yFloor: 3,
			yoyo: true,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'beetle': {
			imgW: 1000,
			imgH: 1000,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'imp': {
			imgW: 1250,
			imgH: 1000,
			w: 1250,
			h: 1000,
			yFloor: 3,
			yoyo: true,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'minotaur': {
			imgW: 1000,
			imgH: 1000,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'aviak': {
			imgW: 1200,
			imgH: 1000,
			w: 1200,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'elephant': {
			imgW: 1300,
			imgH: 1000,
			w: 1300,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .05,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'lion': {
			imgW: 900,
			imgH: 1200,
			w: 900,
			h: 1200,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'crocodile': {
			imgW: 1000,
			imgH: 1000,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'rhino': {
			imgW: 1200,
			imgH: 1200,
			w: 1200,
			h: 1200,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .045,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'lioness': {
			imgW: 900,
			imgH: 1200,
			w: 900,
			h: 1200,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'bear': {
			imgW: 1000,
			imgH: 1000,
			w: 1000,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'toadlok': {
			imgW: 1200,
			imgH: 1000,
			w: 1200,
			h: 1000,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .04,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'giant': {
			imgW: 1400,
			imgH: 1200,
			w: 1400,
			h: 1200,
			yFloor: 3,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .05,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'ice-giant': {
			imgW: 1400,
			imgH: 1200,
			w: 1400,
			h: 1200,
			yFloor: -2,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .06,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'fire-giant': {
			imgW: 1400,
			imgH: 1200,
			w: 1400,
			h: 1200,
			yFloor: -2,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .06,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'spectre': {
			imgW: 1500,
			imgH: 1500,
			w: 1500,
			h: 1500,
			yFloor: -18,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .055,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'angler': {
			imgW: 1500,
			imgH: 1200,
			w: 1500,
			h: 1200,
			yFloor: 1,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .045,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'beholder': {
			imgW: 1200,
			imgH: 1000,
			w: 1200,
			h: 1000,
			yFloor: -4,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .05,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'unicorn': {
			imgW: 2000,
			imgH: 1200,
			w: 2000,
			h: 1200,
			yFloor: 7,
			yoyo: false,
			cache: [],
			size: 1,
			speed: .055,
			nameBottom: 10,
			shadowBottom: 10,
			shadowWidth: 400,
			center: {
				x: 0,
				y: 0
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		},
		'scorpion': {
			imgW: 1000,
			imgH: 1000,
			w: 600,
			h: 600,
			yFloor: 0, // back row is *2
			yoyo: false,
			cache: [],
			size: 1,
			speed: .045,
			nameBottom: 450,
			shadowBottom: 30,
			shadowWidth: 400,
			center: {
				x: 296,
				y: 135
			},
			click: {
				alive: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				},
				dead: {
					x: 0,
					y: 0,
					w: 0,
					h: 0
				}
			}
		}
	},
	imageKeys: 0,
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
			m.index = i;
			m.frame = 0;
			m.lastFrame = 0;
			m.animationActive = 0;
			m.deathState = 0;
			m.speed = 0;
			m.type = '';
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
		m.size = m.index <= 4 ? 1 : .9;
		m = Object.assign(m, mob.images[m.type]);
		delete m.cache;
		mob.sizeMob(m);
	},
	sizeMob: function(m){
		// TODO: perhaps modify this later responsively using window.innerWidth ?
		// set dom
		var w = ~~(m.size * (mob.images[m.type].w)),
			h = ~~(m.size * (mob.images[m.type].h));
		// wrapper
		m.dom.wrap.style.width = w + 'px';
		m.dom.wrap.style.height = h + 'px';
		// name
		m.dom.name.innerHTML = m.type.replace(/-/g, ' ');
		// img
		m.dom.img.style.width = w + 'px';
		m.dom.img.style.bottom = mob.images[m.type].yFloor + 'px';
		// details
		m.dom.details.style.bottom = m.nameBottom + 'px';
		// shadow
		m.dom.shadow.style.width = m.shadowWidth + 'px';
		m.dom.shadow.style.left = ~~(m.shadowWidth * -.5) + 'px';
		m.dom.shadow.style.bottom = m.shadowBottom + 'px';
		// test only
		var b = battle.getBox(m.index);
		console.info('box: ', m.index, b);
		m.dom.center.style.bottom = b.centerY + 'px';
		m.dom.center.style.left = b.centerX + 'px';
		// alive box
		m.dom.alive.style.bottom = '400px';
		m.dom.alive.style.left = '200px';
		m.dom.alive.style.width = '200px';
		m.dom.alive.style.height = '400px';
		// dead box
		m.dom.dead.style.bottom = '400px';
		m.dom.dead.style.left = '100px';
		m.dom.dead.style.width = '400px';
		m.dom.dead.style.height = '200px';
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
		TweenMax.delayedCall(Math.random()*3 + 1, function(){
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
					TweenMax.delayedCall(1, function() {
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
						TweenMax.delayedCall(1, function() {
							mob.attack(m, 2);
						});
					}
					else {
						TweenMax.delayedCall(1, function() {
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
					TweenMax.delayedCall(1, function () {
						mob.death(m);
					});
				}
			}
		});
	},
	death: function(m){
		if (m.deathState) return;
		m.deathState = 1;
		m.animationActive = 1;
		var tl = g.TM(),
			startFrame = 76,
			endFrame = 105.9,
			diff = endFrame - startFrame;

		tl.to(m, m.speed * diff, {
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