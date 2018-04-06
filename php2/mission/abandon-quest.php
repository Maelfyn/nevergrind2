<?php

require '../header.php';
require '../db.php';

require_once '../zmq.php';
if ($_SESSION['party']['id']) {
	$zmq = [
		'msg' => $_SESSION['ng2']['name'] . ' has abandoned the mission.',
		'route' => 'chat->log',
		'class' => 'chat-quest',
		'category' => 'party:' . $_SESSION['party']['id']
	];
	$socket->send(json_encode($zmq));
}

if ($_SESSION['party']['id']) {

	if ($_SESSION['party']['isLeader']) {
		$zmq = [
			'msg' => 'Mission abandoned: ' . $_SESSION['quest']['title'],
			'route' => 'party->notifyMissionStatus',
			'action' => 'abandon',
			'category' => 'party:'. $_SESSION['party']['id']
		];
		$socket->send(json_encode($zmq));
	}
}
else {
	$zmq = [
		'msg' => 'Mission abandoned: ' . $_SESSION['quest']['title'],
		'route' => 'party->notifyMissionStatus',
		'action' => 'abandon',
		'routeTo' => 'party',
		'category' => 'name:'. $_SESSION['ng2']['name']
	];
	$socket->send(json_encode($zmq));
}

require '../session/init-quest.php';

$r['success'] = 1;
echo json_encode($r);