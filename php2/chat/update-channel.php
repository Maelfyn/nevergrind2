<?php

require '../header.php';
require('../db.php');

// get channel players
$stmt = $link->prepare('select id, name, level, race, job from ng2_players where zone=? and timestamp > date_sub(now(), interval 15 second) order by row desc');
$stmt->bind_param('s', $_SESSION['ng2']['zone']);
$stmt->execute();
$stmt->bind_result($id, $name, $level, $race, $job);

$r['players'] = [];
$i = 0;
while ($stmt->fetch()) {
	$r['players'][$i++] = (object)[
		'id' => $id,
		'name' => $name,
		'level' => $level,
		'race' => $race,
		'job' => $job
	];
}

echo json_encode($r);