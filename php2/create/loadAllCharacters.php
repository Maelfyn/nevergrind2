<?php
	$query = 'select row, name, level, race, job from `ng2_chars` where account=? and deleted=0';
	$stmt = $link->prepare($query);
	$stmt->bind_param('s', $_SESSION['account']);
	$stmt->execute();
	$stmt->store_result();
	$stmt->bind_result($row, $name, $level, $race, $job);
	$r['characterData'] = [];
	$i = 0;
	while($stmt->fetch()){
		$r['characterData'][$i++] = [
			'row' => $row,
			'name' => $name,
			'level' => $level,
			'race' => $race,
			'job' => $job
		];
	}
	