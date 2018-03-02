<?php
if ($_SERVER["SERVER_NAME"] === "localhost"){
	require '../../db.php';
	require 'initInsertItem.php';

	// must change
	$name = "";
	$armor = 2;
	$itemLevel = 5;
	$yPos = 0;
	$getEquipJobs = 'all';
	// probably changes
	$hp = 0;
	$mp = 0;
	$str = 0;
	$sta = 0;
	$agi = 0;
	$dex = 0;
	$wis = 0;
	$intel = 0;
	$cha = 0;
	$bleed = 0;
	$poison = 0;
	$arcane = 0;
	$lightning = 0;
	$fire = 0;
	$cold = 0;
	$rarityType = 1;
	$req = 0;
	// normally doesn't change
	$effect = '';
	$xPos = 3;
	$equipSlots = 'chest';

	$query = "insert into ng2_loot (
			name, itemLevel, damage, delay, armor, hp, mp, str, sta, agi, dex, wis, intel, cha, bleed, poison, arcane,
			lightning, cold, fire, xPos, yPos, effect, rarityType, equipSlots, equipJobs, req ) VALUES (
			'$name',
			$itemLevel, 
			$damage,
			$delay,
			$armor,
			$hp,
			$mp,
			$str,
			$sta,
			$agi,
			$dex,
			$wis,
			$intel,
			$cha,
			$bleed,
			$poison,
			$arcane,
			$lightning,
			$fire,
			$cold,
			$xPos,
			$yPos,
			'$effect',
			$rarityType,
			'$equipSlots',
			'". $getEquipJobs ."',
			$req
		)";
	mysqli_query($link, $query);
	echo 'Inserted '. $name .'! '. microtime(true);
}
