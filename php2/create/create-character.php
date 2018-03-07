<?php
	require '../header.php';
	
	$f = $_POST['form'];
	
	// validate name
	// length is not too long
	$f['name'] = substr($f['name'], 0, 16);
	if (strlen($f['name']) < 2){
		exit('This name is too short!');
	}
	// remove illegal characters - must be capitalized
	$illegal = array("\\", "/", ":", "*", "?", '"', "'", ">", "<", "1", "2", "3", "4", "5", "6", "7", "8", "9", "`", "0", "_", " ");
	$f['name'] = str_replace($illegal, "", $f['name']);
	$f['name'] = ucfirst(strtolower($f['name']));
	if (!ctype_alpha($f['name'])){
		exit('This name contains illegal characters!');
	}
	// name is not taken
	require('../db.php');
	$query = "select name from ng2_chars where name=?";
	$stmt = $link->prepare($query);
	$stmt->bind_param('s', $f['name']);
	$stmt->execute();
	$stmt->store_result();
	$count = $stmt->num_rows;
	if($count > 0){
		exit('This name is already taken!');
	}
	require '../enum/races.php';
	if (in_array($f['name'], $races, true)){
		exit('This name is not valid.');
	}
	require '../enum/jobs.php';
	if (in_array($f['name'], $jobs, true)){
		exit('This name is not valid.');
	}

	// how many characters do they have?
	$query = "select row from ng2_chars where account=? and deleted=0";
	$stmt = $link->prepare($query);
	$stmt->bind_param('s', $_SESSION['account']);
	$stmt->execute();
	$stmt->store_result();
	$count = $stmt->num_rows;
	$totalCharacters = 0;
	if($count > 0){
		$totalCharacters = $count;
	}
	// max is 8
	if ($totalCharacters >= 8){
		exit('Eight is the maximum number of characters you can have!');
	}

	// validate gender
	$genders = ['Male', 'Female'];
	if (!in_array($f['gender'], $genders, true)){
		$f['gender'] = 'Male';
	}
	// validate race
	require '../statMap.php';
	$raceKeys = array_keys($statMap);
	if (!in_array($f['race'], $raceKeys, true)){
		$f['race'] = 'Human';
	}
	// validate class
	if (!in_array($f['job'], $jobs, true)){
		$f['job'] = 'Warrior';
	}
	// ensure ability points spent using attributes + 10
	if ($f['left'] > 0){
		exit('You have not spent all of your ability points!');
	}
	// validate that the race can play that class
	if (!in_array($f['job'], $statMap[$f['race']]['jobs'], true)){
		exit('This class is not available to that race!');
	}
	// validate minimum attributes using race/class function that returns object with min values
	$baseAttrs = $statMap[$f['race']]['attrs'];
	$i = 0;
	foreach ($statMap['jobs'][$f['job']] as $value) {
		$baseAttrs[$i++] += $value;
	}
	require '../enum/attrs.php';
	$clientTotal = 0;
	$i = 0;
	foreach ($attrs as $value){
		if ($baseAttrs[$i++] > $f[$value]){
			exit('Those race/class values are not possible!');
		}
		$clientTotal += $f[$value];
	}
	// validate total values for each race/job combo
	$serverTotal = 10;
	$i = 0;
	foreach ($baseAttrs as $value){
		$serverTotal += $baseAttrs[$i++];
	}
	if ($clientTotal !== $serverTotal){
		exit('That race/class combination has the wrong attribute totals! '. $clientTotal .' vs '. $serverTotal);
	}
	// check resists
	require '../getResist.php';
	require '../enum/resists.php';
	foreach ($resists as $type){
		$f[$type] = getResist($type, $f);
	}
	
	// check dungeon
	require '../getDungeonSkill.php';
	require '../enum/dungeonSkills.php';
	foreach ($dungeonSkills as $type){
		$f[$type] = getDungeonSkill($type, $f);
	}
	// hp
	$f['level'] = 1;
	require '../getBaseMaxHp.php';
	$f['hp'] = $f['maxHp'] = getBaseMaxHp($f);
	// mp
	require '../getBaseMaxMp.php';
	$f['mp'] = $f['maxMp'] = getBaseMaxMp($f);
	
	// default skill values
	require 'addStartingSkills.php';
	addStartingSkills($f);
	
	// success
	$query = 'insert into ng2_chars (
		`account`, 
		`name`, 
		`gender`, 
		`race`,
		`job`,
		`hp`,
		`maxHp`,
		`mp`,
		`maxMp`,
		`str`,
		`sta`,
		`agi`,
		`dex`,
		`wis`,
		`intel`,
		`cha`,
		`dualWield`,
		`oneHandSlash`,
		`twoHandSlash`,
		`oneHandBlunt`,
		`twoHandBlunt`,
		`piercing`,
		`dodge`,
		`alteration`,
		`evocation`,
		`conjuration`
	) VALUES (
		?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
	$stmt = $link->prepare($query);
	$stmt->bind_param('sssssiiiiiiiiiiiiiiiiiiiii', 
		$_SESSION['account'], $f['name'], $f['gender'], $f['race'], $f['shortJob'],
		$f['hp'], $f['maxHp'], $f['mp'], $f['maxMp'], $f['str'], 
		$f['sta'], $f['agi'], $f['dex'], $f['wis'], $f['intel'], 
		$f['cha'], $f['dualWield'], $f['oneHandSlash'], $f['twoHandSlash'], $f['oneHandBlunt'], 
		$f['twoHandBlunt'], $f['piercing'], $f['dodge'], $f['alteration'], $f['evocation'], 
		$f['conjuration']);
	$stmt->execute();
	
	$r['row'] = mysqli_insert_id($link);
	// add inventory data

	// insert items
	require '../item/getItemString.php';
	$loops = 32;
	$slots = [];
	for ($i = 0; $i < $loops; $i++){
		$slots[$i] = 0;
	}
	$queryValues = getItemString($r['row'], $slots, 1);

	$query = 'insert into ng2_items (
		charRow, 
		uniqueId, 
		slotType, 
		slot,
		lootRow
	) VALUES '. $queryValues;
	// must set inventory to 1
	$uniqueId = [];
	for ($i = 0; $i < $loops; $i++){
		$uniqueId[$i] = $r['row'] . '-1' . $i;
	}

	$stmt = $link->prepare($query);
	$stmt->bind_param('ssssssssssssssssssssssssssssssss',
		$uniqueId[0],
		$uniqueId[1],
		$uniqueId[2],
		$uniqueId[3],
		$uniqueId[4],
		$uniqueId[5],
		$uniqueId[6],
		$uniqueId[7],
		$uniqueId[8],
		$uniqueId[9],
		$uniqueId[10],
		$uniqueId[11],
		$uniqueId[12],
		$uniqueId[13],
		$uniqueId[14],
		$uniqueId[15],
		$uniqueId[16],
		$uniqueId[17],
		$uniqueId[18],
		$uniqueId[19],
		$uniqueId[20],
		$uniqueId[21],
		$uniqueId[22],
		$uniqueId[23],
		$uniqueId[24],
		$uniqueId[25],
		$uniqueId[26],
		$uniqueId[27],
		$uniqueId[28],
		$uniqueId[29],
		$uniqueId[30],
		$uniqueId[31]);
	$stmt->execute();

	// add equipment data
	$loops = 16;
	$slots = [];
	// starting equipment map
	// sets the item id for each equipment slot
	$jobEquipment = [
		'WAR' => [0,0,0,0,0,0,2,0,0,0,0,0,0,5,0,0],
		'SHD' => [0,0,0,0,0,0,2,0,0,0,0,0,0,5,0,0],
		'PLD' => [0,0,0,0,0,0,2,0,0,0,0,0,0,6,0,0],
		'MNK' => [0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0],
		'ROG' => [0,0,0,0,0,0,2,0,0,0,0,0,0,7,0,0],
		'RNG' => [0,0,0,0,0,0,2,0,0,0,0,0,0,5,0,8],
		'DRU' => [0,0,0,0,0,0,2,0,0,0,0,0,0,6,0,0],
		'CLR' => [0,0,0,0,0,0,2,0,0,0,0,0,0,6,0,0],
		'SHM' => [0,0,0,0,0,0,2,0,0,0,0,0,0,6,0,0],
		'BRD' => [0,0,0,0,0,0,2,0,0,0,0,0,0,5,0,0],
		'NEC' => [0,0,0,0,0,0,2,0,0,0,0,0,0,7,0,0],
		'ENC' => [0,0,0,0,0,0,2,0,0,0,0,0,0,7,0,0],
		'MAG' => [0,0,0,0,0,0,2,0,0,0,0,0,0,7,0,0],
		'WIZ' => [0,0,0,0,0,0,2,0,0,0,0,0,0,7,0,0]
	];
	for ($i = 0; $i < $loops; $i++){
		$slots[$i] = $jobEquipment[$f['shortJob']][$i];
	}
	// type 0 is equipment
	$queryValues = getItemString($r['row'], $slots, 0);
	
	$query = 'insert into ng2_items (
		charRow, 
		uniqueId, 
		slotType, 
		slot,
		lootRow
	) VALUES '. $queryValues;
	// must set equipment to 0
	$uniqueId = [];
	for ($i = 0; $i < $loops; $i++){
		$uniqueId[$i] = $r['row'] . '-0' . $i;
	}
	
	$stmt = $link->prepare($query);
	$stmt->bind_param('ssssssssssssssss', 
		$uniqueId[0], 
		$uniqueId[1], 
		$uniqueId[2], 
		$uniqueId[3], 
		$uniqueId[4], 
		$uniqueId[5], 
		$uniqueId[6], 
		$uniqueId[7], 
		$uniqueId[8], 
		$uniqueId[9], 
		$uniqueId[10], 
		$uniqueId[11], 
		$uniqueId[12], 
		$uniqueId[13], 
		$uniqueId[14], 
		$uniqueId[15]);
	$stmt->execute();
	
	// add mission data
	$query = 'insert into ng2_missions (c_id) VALUES (?)';
	$stmt = $link->prepare($query);
	$stmt->bind_param('s', $f['row']);
	$stmt->execute();
	
	// echo something for fun
	$r['hero'] = $f;
	echo json_encode($r);