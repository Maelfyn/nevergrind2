<?php

require '../header.php';
require '../db.php';
if ($_SESSION['party']['id']) {
	require_once '../zmq.php';
	$zmq = [
		'msg' => $_SESSION['ng2']['name'] . ' has abandoned the mission.',
		'route' => 'chat->log',
		'class' => 'chat-quest',
		'category' => 'party:'. $_SESSION['party']['id']
	];
	$socket->send(json_encode($zmq));

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

require '../session/init-quest.php';

$r['success'] = 1;
echo json_encode($r);