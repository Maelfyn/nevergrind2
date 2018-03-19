<?php

require '../header.php';
require '../db.php';
$mobId = isset($_POST['quest']['mobId']) ?
	$_POST['quest']['mobId'] * 1 : $_POST['quest']['mob_id'] * 1;

$_SESSION['quest'] = [
	'row' => $_POST['quest']['row'] * 1,
	'zone' => $_POST['quest']['zone'],
	'level' => $_POST['quest']['level'] * 1,
	'mob_id' => $mobId,
	'title' => $_POST['quest']['title'],
	'description' => $_POST['quest']['description']
];

if (!empty($_SESSION['party'])) {

	$_SESSION['party']['mission_id'] = $_POST['quest']['row'] * 1;

	if ($_SESSION['party']['isLeader']) {
		// leader broadcasts mission update to party
		require '../zmq.php';
		$zmq = new stdClass();
		$zmq->quest = $_SESSION['quest'];
		$zmq->route = 'party->missionUpdate';
		$zmq->category = 'party:'. $_SESSION['party']['id'];
		$socket->send(json_encode($zmq));
	}
}

// load all zone mob images and preload them client-side

 $stmt = $link->prepare('SELECT i.name
	FROM ng2_mobs m
	join ng2_mob_img i
	on m.img=i.row
	join ng2_zones z
	on m.zone=z.row
	where z.zone=?
	group by i.name');
$stmt->bind_param('s', $_SESSION['quest']['zone']);
$stmt->execute();
$stmt->bind_result($name);
$i = 0;
$r['zoneMobs'] = [];
while ($stmt->fetch()) {
	$r['zoneMobs'][$i++] = $name;
}

$r['quest'] = $_SESSION['quest']['row'];

echo json_encode($r);