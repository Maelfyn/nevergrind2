<?php
if ($_SERVER["SERVER_NAME"] === "localhost"){
	require '../../db.php';

	$name = "Charm";
	$damage = 0;
	$delay = 0;

	$armor = 0;
	$itemLevel = 10;

	$yPos = 15; // 13-15
	$getEquipJobs = 'all';

	$hp = 0;
	$mp = 3;

	$xPos = 11;
	$equipSlots = 'range';
	$req = 0;

	$query = "insert into ng2_loot (
			name, itemLevel, damage, delay, armor, hp, mp, str, sta, agi, dex, wis, intel, cha, bleed, poison, arcane,
			lightning, cold, fire, xPos, yPos, effect, rarityType, equipSlots, equipJobs, req ) VALUES (
			'$name',
			$itemLevel, "./*itemLevel*/"
			$damage, "./*damage*/"
			$delay, "./*delay*/"
			$armor, "./*armor*/"
			$hp,"./*hp*/"
			$mp, "./*mp*/"
			0, "./*str*/"
			0, "./*sta*/"
			0, "./*agi*/"
			0, "./*dex*/"
			0, "./*wis*/"
			0, "./*intel*/"
			0, "./*cha*/"
			0, "./*bleed*/"
			0, "./*poison*/"
			0, "./*arcane*/"
			0, "./*lightning*/"
			0, "./*fire*/"
			0, "./*cold*/"
			$xPos, "./*xPos*/"
			$yPos, "./*yPos*/"
			'', "./*effect*/"
			0,"./*rarityType*/"
			'$equipSlots', "./*equipSlots*/"
			'". $getEquipJobs ."',
			$req "./*req*/"
		)";
	mysqli_query($link, $query);
	echo 'Inserted '. $name .'! '. microtime(true);
}
