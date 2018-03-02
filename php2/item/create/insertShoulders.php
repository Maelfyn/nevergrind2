<?php
if ($_SERVER["SERVER_NAME"] === "localhost"){
    require '../../db.php';
    require 'getEquipJobs.php';

    $query = "insert into ng2_loot (
			name,
			itemLevel,
			damage,
			delay,
			armor,
			hp,
			mp,
			str,
			sta,
			agi,
			dex,
			wis,
			intel,
			cha,
			bleed,
			poison,
			arcane,
			lightning,
			cold,
			fire,
			xPos,
			yPos,
			effect,
			rarityType,
			equipSlots,
			equipJobs,
			req
		) VALUES (
			'Monarch Pauldrons',
			0, "./*itemLevel*/"
			0, "./*damage*/"
			0, "./*delay*/"
			12, "./*armor*/"
			0,"./*hp*/"
			0, "./*mp*/"
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
			2, "./*xPos*/"
			15, "./*yPos*/"
			'', "./*effect*/"
			0,"./*rarityType*/"
			'shoulders', "./*equipSlots*/"
			'". getEquipJobs('plate') ."',
			0 "./*req*/"
		)";
    mysqli_query($link, $query);
}
