<?php
require '../header.php';
require('../db.php');
// limit to 18
$_POST['channel'] = substr($_POST['channel'], 0, 16);
$illegal = array("\\", "/", ":", "*", "?", ">", "<");
$_POST['channel'] = str_replace($illegal, "", $_POST['channel']);
if ($_POST['channel']) {
	$r['channel'] = $_POST['channel'];
	$r['fullChannel'] = 'ng2:'. $_POST['channel'];

	// update my zone/channel
	$stmt = $link->prepare('update ng2_players set zone=? where id=?');
	$stmt->bind_param('ss', $r['fullChannel'], $_SESSION['ng2']['row']);
	$stmt->execute();

	// get channel players
	$stmt = $link->prepare('select id, name, level, race, job from ng2_players where zone=? and timestamp > date_sub(now(), interval 15 second) order by row desc');
	$stmt->bind_param('s', $r['fullChannel']);
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

	$_SESSION['ng2']['zone'] = $r['fullChannel'];
	echo json_encode($r);
}
else {
	exit("Invalid channel name");
}
