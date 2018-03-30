<?php
// notify party when non-party members embark
// DEPRECATED: no longer valid since all embark together now
if ($_SESSION['party']['id']) {
	require_once '../zmq.php';
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
}