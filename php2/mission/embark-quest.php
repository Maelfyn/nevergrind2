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
$dungeon = 'dng:' . $_POST['quest']['zone'];
$stmt = $link->prepare('update ng2_players set mission_id=?, zone=? where id=?');
$stmt->bind_param('isi', $mission_id, $dungeon, $_SESSION['ng2']['row']);
$stmt->execute();

$_SESSION['ng2']['zone'] = '';

require 'get-zone-mobs.php';

require_once '../zmq.php';

$_SESSION['party']['mission_id'] = $_POST['quest']['row'] * 1;
if (!$_SESSION['party']['id'] || $_SESSION['party']['isLeader']) {
	// solo/leader broadcasts mission update to party
	// my.quest updates
	$zmq = new stdClass();
	$zmq->quest = $_SESSION['quest'];
	$zmq->zoneMobs = $r['zoneMobs'];
	$zmq->route = 'party->missionUpdate';
	$zmq->category = 'party:'. $_SESSION['party']['id'];
	$socket->send(json_encode($zmq));
}

$zmq = [
	'msg' => $_SESSION['ng2']['name'] . ' has embarked into ' . $_SESSION['quest']['zone'],
	'route' => 'chat->log',
	'class' => 'chat-quest',
	'category' => 'party:'. $_SESSION['party']['id']
];
$socket->send(json_encode($zmq));

if ($_SESSION['party']['isLeader']) {
	$zmq = [
		'msg' => 'Mission started: ' . $_SESSION['quest']['title'],
		'route' => 'party->notifyMissionStatus',
		'category' => 'party:'. $_SESSION['party']['id']
	];
	$socket->send(json_encode($zmq));
}

$r['quest'] = $_SESSION['quest']['row'];

echo json_encode($r);