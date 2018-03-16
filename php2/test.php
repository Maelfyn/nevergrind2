<?php
	session_start();
?>
<style>
	pre {
		border: 1px solid #444;
		background: #ddd;
		padding: 10px 20px;
		border-radius: 5px;
	}
</style>
<?php
	require('db.php');
	$name = "DRAGONSOD''d fs 'fds df ds fds";
	$arr = explode(" ", $name);
	foreach ($arr as $key => &$value){
		$arr[$key] = strtolower($value);
		if ($value === 'of' || $value === 'the') {
			// do nothing
		}
		else {
			$arr[$key] = ucfirst($value);
		}
	}
	$formattedName = join(" ", $arr);
	echo "FORMATTED: ". $formattedName .'<br>';
	if (!ctype_alpha($formattedName)){
		echo '<br>This name contains illegal characters!<br>';
	}

	$stmt = $link->prepare('select name from ng2_guilds where name=?');
	$stmt->bind_param('s', $formattedName);
	$stmt->execute();
	$stmt->bind_result($formattedName);
	$stmt->store_result();
	$count = $stmt->num_rows;
	echo "COUNT: ". $count .'<br>';

	echo 'DIFF: '. (time() - $_SESSION['ng2']['played']) .'<br>';


	// echo '<pre>$_SESSION '; var_dump($_SESSION); echo '</pre>';

	echo '$_SESSION["email"] '. $_SESSION["email"] .'<br>';
	echo '$_SESSION["account"] '. $_SESSION["account"] .'<br>';
	echo '$_SESSION["ng2"]["row"] '. $_SESSION["ng2"]['row'] .'<br>';
	// details object data
	echo '<pre>$_SESSION[account]'; var_dump($_SESSION['account']); echo '</pre>';
	echo '<pre>$_SESSION[ng2]'; var_dump($_SESSION['ng2']); echo '</pre>';
	echo '<pre>$_SESSION[party]'; var_dump($_SESSION['party']); echo '</pre>';
	echo '<pre>$_SESSION[guild] '; var_dump($_SESSION['guild']); echo '</pre>';

	if (!empty($_SESSION['quest'])) {
		echo '<pre>$_SESSION[quest] '; var_dump($_SESSION['quest']); echo '</pre>';
	}
	else {
		echo "QUEST EMPTY<br>";
	}

	echo '<pre>$_SERVER '; var_dump($_SERVER); echo '</pre>';

	$test = [
		//'id' => 5
	];

	if (empty($test)) {
		echo "<br>IT IS EMPTY!";
	}
	else {
		echo "<br>IT IS NOT EMPTY!";
	}
	if (empty($_SESSION['party'])) {
		echo "<br>party IS EMPTY!";
	}
	else {
		echo "<br>party IS NOT EMPTY!";
	}

	if (isset($test)) {
		echo "<br>IT IS SET!";
	}
	else {
		echo "<br>IT IS NOT SET!";
	}

	exit;
	echo '-->'. $pos .'<br><br>';
	if ($pos === false){
		echo 'NOT found '. $findme;
	} else {
		echo 'found '. $findme;
	}
	
	$arr = [0,5,10];
	
	foreach ($arr as $value){
		echo '<br>'. $value;
	}
	
	if ($_SERVER["SERVER_NAME"] === "localhost x"){
		require('values.php');
		require('db.php');
		
		
		require 'item/baseItem.php';
		$item = baseItem();
		// 24 items
		$r = [];
		$r['row'] = 2;
		$r['name'] = 'Maelfyn';
		
		function itemLoop($loops){
			global $item, $r;
			$s = '';
			for ($i = 0; $i < $loops; $i++){
				if ($i > 0){
					$s .= '(';
				}
				$s .= $r['row'] .',?,"item",'. $i .',0';
				if ($i+1 < $loops){
					$s .= '),';
				}
			}
			return $s;
		}
		
		$queryValues = itemLoop(2);
		echo '<pre>$queryValues: '. $queryValues .'</pre>';
		
		$query = 'insert into ng2_items (
			charRow, 
			uniqueId, 
			slotType, 
			slot,
			lootRow
		) VALUES 
		('. $queryValues .')';
		
		$uniqueId = [
			$r['row'] . '-10',
			$r['row'] . '-11'
		];
		echo "<pre>uniqueId"; var_dump($uniqueId); echo "</pre>";
		$stmt = $link->prepare($query);
		$stmt->bind_param('ss', 
			$uniqueId[0], 
			$uniqueId[1]);
		$stmt->execute();
		
		echo "<pre>baseItem"; var_dump($item); echo "</pre>";
		
		
		
		require 'statMap.php';
		require 'getBaseMaxHp.php';
		require 'getBaseMaxMp.php';
		
		
		$f = [
			'level' => 50,
			'hp' => 0,
			'mp' => 0,
			'maxHp' => 0,
			'maxMp' => 0,
			'sta' => 155,
			'intel' => 200,
			'race' => 'Dwarf',
			'job' => 'Druid'
		];
		$f['hp'] = $f['maxHp'] = getBaseMaxHp($f);
		echo '<pre>$hp: '. $f['hp'] .' '. $f['maxHp'] .'</pre>';
		$f['mp'] = $f['maxMp'] = getBaseMaxMp($f);
		echo '<pre>$mp: '. $f['mp'] .' '. $f['maxMp'] .'</pre>';
		
		require 'create/addStartingSkills.php';
		addStartingSkills($f);
		echo "<pre>addStartingSkills"; var_dump($f); echo "</pre>";
		
		$query = "select row from ng2_paid where account=?";
		$stmt = $link->prepare($query);
		$stmt->bind_param('s', $_SESSION['account']);
		$stmt->execute();
		$stmt->store_result();
		$count = $stmt->num_rows;
		$paid = 0;
		if($count > 0){
			$paid = 1;
		}
		echo '<pre>PAID: '. $paid .'</pre>';
		
		$query = "select row from ng2_chars where account=?";
		$stmt = $link->prepare($query);
		$stmt->bind_param('s', $_SESSION['account']);
		$stmt->execute();
		$stmt->store_result();
		$count = $stmt->num_rows;
		$totalCharacters = 0;
		if($count > 0){
			$totalCharacters = $count;
		}
		echo '<pre>CHARACTERS: '. $totalCharacters .'</pre>';
		
		
		require 'getResist.php';
		require 'getDungeonSkill.php';
		$_SESSION['hero'] = [
			'hp' => 50,
			'race' => 'Wood Elf',
			'job' => 'Ranger',
			'gender' => 'Male'
		];
		$resist = getResist('cold', $_SESSION['hero']);
		echo "<pre>Resist: "; echo $resist; echo "</pre>";
		
		$resist = getDungeonSkill('treasure', $_SESSION['hero']);
		echo "<pre>Skill: "; echo $resist; echo "</pre>";
		
		$attrs = array_keys($statMap[$f['race']]['attrs']);
		$baseAttrs = $statMap[$f['race']]['attrs'];
		$i = 0;
		foreach ($statMap['jobs'][$f['job']] as $value) {
			$baseAttrs[$i++] += $value;
		}
		
		echo "<pre>"; var_dump($baseAttrs); echo "</pre>";
		
		$t = 0;
		$i = 0;
		foreach ($baseAttrs as $value){
			$t += $baseAttrs[$i++];
		}
		echo '<pre>TOTAL: '. $t .'</pre>';
		
		echo "<pre>"; var_dump($statMap); echo "</pre>";
		
		exit;
	}
	