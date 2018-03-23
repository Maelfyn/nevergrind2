<?php
	require '../header.php';
	require('../db.php');
	// delete all from ng2_players to clean up the table
	mysqli_query($link, 'delete from ng2_players where timestamp < date_sub(now(), interval 60 second)');

	// are they already logged in?
	if ($_SERVER["SERVER_NAME"] !== "localhost") {

		$query = 'SELECT count(row) count FROM ng2_players where account=? and timestamp > date_sub(now(), interval 15 second)';
		$stmt = $link->prepare($query);
		$stmt->bind_param('s', $_SESSION['account']);
		$stmt->execute();
		$stmt->bind_result($account);
		$iAmOnline = 0;

		while ($stmt->fetch()){
			$iAmOnline = $account;
		}

		if ($iAmOnline) {
			exit("One of your characters is already logged in or has not timed out yet.");
		}
	}
	if (!isset($_SESSION['party'])) {
		require '../session/init-party.php';
	}
	if (!isset($_SESSION['quest'])) {
		require '../session/init-quest.php';
	}

	// check party data
	if (!$_SESSION['party']['id']) {
		require '../session/init-party.php';
		if (isset($_SESSION['ng2']['row'])) {
			// delete from parties if player data is known
			mysqli_query(
			$link, 'delete from ng2_parties where c_id='. $_SESSION['ng2']['row']
			);
		}
		// am I in a party? This will trigger party-get-all client-side
		/*$stmt = $link->prepare('SELECT count(row) count FROM ng2_parties where c_id=?');
		$stmt->bind_param('i', $r['characterData']['row']);
		$stmt->execute();
		$stmt->bind_result($inParty);
		$inParty = 0;
		while ($stmt->fetch()) {
			$r['inParty'] = $inParty;
		}*/
	}
	else {
		$r['party']['id'] = $_SESSION['party']['id'];
	}
	// init session values
	require '../session/init-ng.php';
	require '../session/init-guild.php';

	// get my character data
	$query = 'select row, name, level, race, job, hp, maxHp, mp, maxMp,
		exp, gold,
	 	str, sta, agi, dex, wis, intel, cha,
	 	offense, defense, dualWield, doubleAttack, 
	 	oneHandSlash, twoHandSlash, oneHandBlunt, twoHandBlunt, piercing, handToHand,
	 	dodge, parry, riposte,
	 	alteration, conjuration, evocation
	 	from `ng2_chars` where account=? and row=? limit 1';
	$stmt = $link->prepare($query);
	$stmt->bind_param('ss', $_SESSION['account'], $_POST['row']);
	$stmt->execute();
	$stmt->store_result();
	$stmt->bind_result($row, $name, $level, $race, $job, $hp, $maxHp, $mp, $maxMp,
		$exp, $gold,
		$str, $sta, $agi, $dex, $wis, $intel, $cha,
		$offense, $defense, $dualWield, $doubleAttack,
		$oneHandSlash, $twoHandSlash, $oneHandBlunt, $twoHandBlunt, $piercing, $handToHand,
		$dodge, $parry, $riposte,
		$alteration, $conjuration, $evocation);

	$r['characterData'] = [];
	$i = 0;

	while($stmt->fetch()){
		$r['characterData'] = [
			'row' => $row,
			'name' => $name,
			'level' => $level,
			'race' => $race,
			'job' => $job,
			'hp' => $hp,
			'maxHp' => $maxHp,
			'mp' => $mp,
			'maxMp' => $maxMp,
			'exp' => $exp,
			'gold' => $gold,
			'str' => $str,
			'sta' => $sta,
			'agi' => $agi,
			'dex' => $dex,
			'wis' => $wis,
			'intel' => $intel,
			'cha' => $cha,
			'offense' => $offense,
			'defense' => $defense,
			'dualWield' => $dualWield,
			'doubleAttack' => $doubleAttack,
			'oneHandSlash' => $oneHandSlash,
			'twoHandSlash' => $twoHandSlash,
			'oneHandBlunt' => $oneHandBlunt,
			'twoHandBlunt' => $twoHandBlunt,
			'piercing' => $piercing,
			'handToHand' => $handToHand,
			'dodge' => $dodge,
			'parry' => $parry,
			'riposte' => $riposte,
			'alteration' => $alteration,
			'conjuration' => $conjuration,
			'evocation' => $evocation
		];
		$i++;
	}

	if ($i) {

		// set session values for my character
		foreach ($r['characterData'] as $key => $val) {
			$_SESSION['ng2'][$key] = $val;
		}
		// set hp/mp regen, etc
		require 'setEquipmentValues.php';
		// count active players
		$result = mysqli_query(
			$link,
			'SELECT count(row) count FROM `ng2_players` where timestamp > date_sub(now(), interval 15 second)'
		);
		$r['count'] = 0;
		while ($row = mysqli_fetch_assoc($result)){
			$r['count'] = $row['count'];
		}
		// get all players in chat room
		$result = mysqli_query(
			$link,
			'SELECT id, name, level, race, job FROM `ng2_players` where zone="ng2:town" and timestamp > date_sub(now(), interval 15 second)'
		);
		$r['players'] = [];
		$i = 0;
		if ($result->num_rows) {
			while ($row = mysqli_fetch_assoc($result)) {
				$r['players'][$i++] = (object)[
					'id' => $row['id'],
					'name' => $row['name'],
					'level' => $row['level'],
					'race' => $row['race'],
					'job' => $row['job'],
				];
			}
		}
		// get guild info
		require '../guild/getGuildData.php';

		// get mission info
		$r['quest'] = [];
		if (!empty($_SESSION['quest'])) {
			$r['quest'] = $_SESSION['quest'];
			require '../mission/get-zone-mobs.php';
		};

		echo json_encode($r);
	}
	else {
		exit("No character data found!");
	}
	