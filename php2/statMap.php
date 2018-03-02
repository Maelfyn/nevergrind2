<?php
	$statMap = [
		// job bonuses
		'jobs' => [
			'Bard' => [0,2,2,2,0,0,4],
			'Cleric' => [0,2,2,0,4,2,0],
			'Druid' => [0,2,2,0,4,2,0],
			'Enchanter' => [0,0,0,0,2,4,4],
			'Magician' => [0,2,0,0,4,4,0],
			'Monk' => [4,2,2,2,0,0,0],
			'Necromancer' => [0,2,0,0,4,4,0],
			'Paladin' => [2,4,0,2,2,0,0],
			'Ranger' => [2,2,2,2,2,0,0],
			'Rogue' => [4,0,4,2,0,0,0],
			'Shadowknight' => [4,2,0,2,0,2,0],
			'Shaman' => [0,2,2,0,4,2,0],
			'Warrior' => [4,4,0,2,0,0,0],
			'Wizard' => [0,2,0,0,4,4,0]
		],
		// race base values and possible classes
		'Barbarian' => [
			'attrs' => [22,20,17,14,14,11,10],
			'jobs' => [
				'Rogue', 
				'Shaman',
				'Warrior' 
			]
		],
		'Dark Elf' => [
			'attrs' => [11,13,19,15,17,21,11],
			'jobs' => [
				'Cleric',
				'Enchanter',
				'Magician',
				'Necromancer',
				'Rogue', 
				'Shadowknight',
				'Warrior', 
				'Wizard'
			]
		],
		'Dwarf' => [
			'attrs' => [19,19,14,19,17,11,8],
			'jobs' => [
				'Cleric',
				'Paladin',
				'Rogue',
				'Warrior'
			]
		],
		'Erudite' => [
			'attrs' => [11,14,14,14,17,23,14],
			'jobs' => [
				'Cleric',
				'Enchanter',
				'Magician',
				'Necromancer',
				'Paladin',
				'Shadowknight',
				'Wizard'
			]
		],
		'Gnome' => [
			'attrs' => [11,14,18,18,13,21,11],
			'jobs' => [
				'Cleric',
				'Enchanter',
				'Magician',
				'Necromancer',
				'Rogue',
				'Warrior',
				'Wizard'
			]
		],
		'Half Elf' => [
			'attrs' => [14,14,19,18,11,15,15],
			'jobs' => [
				'Bard',
				'Druid',
				'Paladin',
				'Ranger',
				'Rogue',
				'Warrior'
			]
		],
		'Halfling' => [
			'attrs' => [14,15,20,19,16,9,9],
			'jobs' => [
				'Druid',
				'Cleric',
				'Rogue',
				'Warrior'
			]
		],
		'High Elf' => [
			'attrs' => [10,13,18,14,20,19,16],
			'jobs' => [
				'Cleric',
				'Enchanter',
				'Magician',
				'Paladin',
				'Wizard'
			]
		],
		'Human' => [
			'attrs' => [15,15,15,15,15,15,15],
			'jobs' => [
				'Bard',
				'Cleric',
				'Druid',
				'Enchanter',
				'Magician',
				'Monk',
				'Necromancer',
				'Paladin',
				'Ranger',
				'Rogue',
				'Shadowknight',
				'Warrior',
				'Wizard'
			]
		],
		'Ogre' => [
			'attrs' => [29,28,14,14,13,11,6],
			'jobs' => [
				'Shadowknight',
				'Shaman',
				'Warrior'
			]
		],
		'Troll' => [
			'attrs' => [23,25,17,15,11,9,6],
			'jobs' => [
				'Shadowknight',
				'Shaman',
				'Warrior'
			]
		],
		'Wood Elf' => [
			'attrs' => [13,13,20,16,15,15,15],
			'jobs' => [
				'Bard',
				'Druid',
				'Ranger',
				'Rogue',
				'Warrior'
			]
		]
	];