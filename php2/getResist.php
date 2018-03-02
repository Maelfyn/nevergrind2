<?php
function getResist($type, $hero){
	$resist = [
		'Barbarian' => [
			'bleed' => 15,
			'poison' => 15,
			'arcane' => 15,
			'lightning' => 15,
			'fire' => 15,
			'cold' => 40,
		],
		'Dark Elf' => [
			'bleed' => 25,
			'poison' => 15,
			'arcane' => 25,
			'lightning' => 15,
			'fire' => 15,
			'cold' => 15,
		],
		'Dwarf' => [
			'bleed' => 15,
			'poison' => 25,
			'arcane' => 25,
			'lightning' => 15,
			'fire' => 15,
			'cold' => 15,
		],
		'Erudite' => [
			'bleed' => 15,
			'poison' => 15,
			'arcane' => 40,
			'lightning' => 15,
			'fire' => 15,
			'cold' => 15,
		],
		'Gnome' => [
			'bleed' => 15,
			'poison' => 15,
			'arcane' => 15,
			'lightning' => 35,
			'fire' => 15,
			'cold' => 15,
		],
		'Half Elf' => [
			'bleed' => 18,
			'poison' => 18,
			'arcane' => 18,
			'lightning' => 18,
			'fire' => 18,
			'cold' => 18,
		],
		'Halfling' => [
			'bleed' => 15,
			'poison' => 15,
			'arcane' => 15,
			'lightning' => 15,
			'fire' => 15,
			'cold' => 15,
		],
		'High Elf' => [
			'bleed' => 15,
			'poison' => 15,
			'arcane' => 15,
			'lightning' => 15,
			'fire' => 15,
			'cold' => 40,
		],
		'Human' => [
			'bleed' => 15,
			'poison' => 15,
			'arcane' => 15,
			'lightning' => 15,
			'fire' => 15,
			'cold' => 15,
		],
		'Ogre' => [
			'bleed' => 15,
			'poison' => 15,
			'arcane' => 15,
			'lightning' => 15,
			'fire' => 15,
			'cold' => 15,
		],
		'Troll' => [
			'bleed' => 15,
			'poison' => 15,
			'arcane' => 15,
			'lightning' => 15,
			'fire' => 5,
			'cold' => 15,
		],
		'Wood Elf' => [
			'bleed' => 15,
			'poison' => 15,
			'arcane' => 15,
			'lightning' => 15,
			'fire' => 25,
			'cold' => 25,
		]
	];
	$val = $resist[$hero['race']][$type];
	// gender check
	if ($hero['gender'] === 'Male'){
		if ($type === 'arcane'){
			$val += 5;
		}
		else if ($type === 'cold'){
			$val += 5;
		}
	}
	else {
		if ($type === 'bleed'){
			$val += 5;
		}
		else if ($type === 'poison'){
			$val += 5;
		}
	}
	return $val;
}