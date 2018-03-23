<?php

require '../header.php';
require '../db.php';
$mobId = isset($_POST['quest']['mobId']) ?
	$_POST['quest']['mobId'] * 1 : $_POST['quest']['mob_id'] * 1;

$mission_id = $_POST['quest']['row'] * 1;

$_SESSION['quest'] = [
	'row' => $mission_id,
	'zone' => $_POST['quest']['zone'],
	'level' => $_POST['quest']['level'] * 1,
	'mob_id' => $mobId,
	'title' => $_POST['quest']['title'],
	'description' => $_POST['quest']['description']
];

$stmt = $link->prepare('update ng2_players set mission_id=? where id=?');
$stmt->bind_param('ii', $mission_id, $_SESSION['ng2']['row']);
$stmt->execute();

require 'get-zone-mobs.php';

require_once '../zmq.php';

if ($_SESSION['party']['id']) {

	$_SESSION['party']['mission_id'] = $_POST['quest']['row'] * 1;

	if ($_SESSION['party']['isLeader']) {
		// leader broadcasts mission update to party
		// my.quest updates
		$zmq = new stdClass();
		$zmq->quest = $_SESSION['quest'];
		$zmq->zoneMobs = $r['zoneMobs'];
		$zmq->route = 'party->missionUpdate';
		$zmq->category = 'party:'. $_SESSION['party']['id'];
		$socket->send(json_encode($zmq));
	}
}

require 'send-party-embark-message.php';

$r['quest'] = $_SESSION['quest']['row'];

echo json_encode($r);