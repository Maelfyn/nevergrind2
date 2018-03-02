<?php
function getDungeonSkill($type, $hero){
	$dungeon = [
		'Bard' => [
			'traps' => 30,
			'treasure' => 20,
			'scout' => 20,
			'pulling' => 20
		],
		'Cleric' => [
			'traps' => 5,
			'treasure' => 0,
			'scout' => 5,
			'pulling' => 0
		],
		'Druid' => [
			'traps' => 10,
			'treasure' => 20,
			'scout' => 25,
			'pulling' => 15
		],
		'Enchanter' => [
			'traps' => 10,
			'treasure' => 10,
			'scout' => 10,
			'pulling' => 10
		],
		'Magician' => [
			'traps' => 60,
			'treasure' => 5,
			'scout' => 0,
			'pulling' => 5
		],
		'Monk' => [
			'traps' => 20,
			'treasure' => 10,
			'scout' => 20,
			'pulling' => 50
		],
		'Necromancer' => [
			'traps' => 0,
			'treasure' => 5,
			'scout' => 0,
			'pulling' => 5
		],
		'Paladin' => [
			'traps' => 10,
			'treasure' => 5,
			'scout' => 10,
			'pulling' => 10
		],
		'Ranger' => [
			'traps' => 30,
			'treasure' => 30,
			'scout' => 50,
			'pulling' => 30
		],
		'Rogue' => [
			'traps' => 50,
			'treasure' => 30,
			'scout' => 25,
			'pulling' => 10
		],
		'Shadowknight' => [
			'traps' => 5,
			'treasure' => 10,
			'scout' => 5,
			'pulling' => 10
		],
		'Shaman' => [
			'traps' => 5,
			'treasure' => 5,
			'scout' => 10,
			'pulling' => 5
		],
		'Warrior' => [
			'traps' => 10,
			'treasure' => 10,
			'scout' => 5,
			'pulling' => 40
		],
		'Wizard' => [
			'traps' => 5,
			'treasure' => 0,
			'scout' => 5,
			'pulling' => 0
		],
	];
	$val = 15 + $dungeon[$hero['job']][$type];
	// race bonus check
	if ($type === 'traps'){
		if ($hero['race'] === 'Dark Elf'){
			$val += 5;
		} 
		else if ($hero['race'] === 'Halfling' || $hero['race'] === 'Wood Elf'){
			$val += 10;
		} 
		else if ($hero['race'] === 'Half Elf'){
			$val += 7;
		}
	}
	else if ($type === 'treasure'){
		if ($hero['race'] === 'Gnome'){
			$val += 5;
		}
		else if ($hero['race'] === 'Dwarf' || $hero['race'] === 'Human'){
			$val += 10;
		}
		else if ($hero['race'] === 'Halfling'){
			$val += 20;
		}
		else if ($hero['race'] === 'Half Elf'){
			$val += 7;
		}
	}
	else if ($type === 'scout'){
		if ($hero['race'] === 'Wood Elf'){
			$val += 15;
		}
		else if ($hero['race'] === 'Dark Elf'){
			$val += 8;
		}
		else if ($hero['race'] === 'Half Elf'){
			$val += 7;
		}
		else if ($hero['race'] === 'Barbarian'){
			$val += 5;
		}
	}
	else if ($type === 'pulling'){
		if ($hero['race'] === 'Human'){
			$val += 20;
		}
		else if ($hero['race'] === 'Halfling'){
			$val += 10;
		}
		else if ($hero['race'] === 'Half Elf'){
			$val += 7;
		}
		else if ($hero['race'] === 'Erudite'){
			$val += 5;
		}
	}
	return $val;
}