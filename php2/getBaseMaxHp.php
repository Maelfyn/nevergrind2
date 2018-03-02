<?php
function getBaseMaxHp($hero){
	$tierMulti = [
		'Bard' => 4,
		'Cleric' => 3.5,
		'Druid' => 3.5,
		'Enchanter' => 3,
		'Magician' => 3,
		'Monk' => 4, 
		'Necromancer' => 3, 
		'Paladin' => 4.5, 
		'Ranger' => 4, 
		'Rogue' => 4, 
		'Shadowknight' => 4.5, 
		'Shaman' => 3.5, 
		'Warrior' => 5, 
		'Wizard' => 3
	];
	$levelTier = [
		'Bard' => 11,
		'Cleric' => 11,
		'Druid' => 11,
		'Enchanter' => 7,
		'Magician' => 7,
		'Monk' => 11, 
		'Necromancer' => 7, 
		'Paladin' => 13, 
		'Ranger' => 11, 
		'Rogue' => 11, 
		'Shadowknight' => 13, 
		'Shaman' => 11, 
		'Warrior' => 13, 
		'Wizard' => 7
	];
	$v = 20;
	$tierBonus = $tierMulti[$hero['job']];
	$levelBonus = $levelTier[$hero['job']];
	$v += round(($hero['sta'] * $tierBonus) * ($hero['level'] / 50) + ($hero['level'] * $levelBonus));
	return $v;
}