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

	// init session values
	$_SESSION['ng2'] = [];
	$_SESSION['ng2'] = [
		'zone' => 'ng2:town',
		'leader' => '',
		'played' => time()
	];
	$_SESSION['party'] = [];
	$_SESSION['guild'] = [];

	// get my character data
	$query = 'select row, name, level, race, job, hp, maxHp, mp, maxMp from `ng2_chars` where account=? and row=? limit 1';
	$stmt = $link->prepare($query);
	$stmt->bind_param('ss', $_SESSION['account'], $_POST['row']);
	$stmt->execute();
	$stmt->store_result();
	$stmt->bind_result($row, $name, $level, $race, $job, $hp, $maxHp, $mp, $maxMp);

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
			'maxMp' => $maxMp
		];
		$i++;
	}

	if ($i) {
		// delete from any party
		mysqli_query($link,
			'delete from ng2_parties where c_id='. $r['characterData']['row']
		);

		// set session values for my character
		foreach ($r['characterData'] as $key => $val) {
			$_SESSION['ng2'][$key] = $val;
		}
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
		echo json_encode($r);
	}
	else {
		exit("No character data found!");
	}
	