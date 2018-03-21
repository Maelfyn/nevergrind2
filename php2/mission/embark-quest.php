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

require 'get-zone-mobs.php';

require '../zmq.php';
if (!empty($_SESSION['party'])) {

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
// notify party
$zmq = new stdClass();
$zmq->msg = $_SESSION['ng2']['name'] . ' has embarked into ' . $_SESSION['quest']['zone'] . '.';
$zmq->route = 'chat->log';
$zmq->class = 'chat-warning';
$zmq->category = 'party:'. $_SESSION['party']['id'];
$socket->send(json_encode($zmq));

$r['quest'] = $_SESSION['quest']['row'];

echo json_encode($r);