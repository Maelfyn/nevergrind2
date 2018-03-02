<?php
if ($_SERVER["SERVER_NAME"] === "localhost"){
	require '../../db.php';
	require 'initInsertItem.php';

	// must change
	$name = "Glyphed Cowl";
	$armor = 0;
	$itemLevel = 15;
	$yPos = 0; // 6-9
	$getEquipJobs = 1;
	// probably changes
	$hp = 5;
	$mp = 5;
	$str = 0;
	$sta = 0;
	$agi = 0;
	$dex = 0;
	$wis = 3;
	$intel = 3;
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
	$xPos = 1;
	$equipSlots = 'head';

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
