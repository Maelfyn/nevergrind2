<?php
require '../header.php';
require('../db.php');

// not leading a party yet
if ($_SESSION['party']['id']) {
	// delete from party
	$stmt = $link->prepare('delete from ng2_parties where c_id=?');
	$stmt->bind_param('s', $_SESSION['ng2']['row']);
	$stmt->execute();

	// bars notify party members
	require_once '../zmq.php';
	$zmq = [
		'row' => $_SESSION['ng2']['row'],
		'route' => 'party->disband',
		'class' => 'chat-warning',
		'category' => 'party:'. $_SESSION['party']['id']
	];
	$socket->send(json_encode($zmq));

	// set party session values
	require '../session/init-party.php';
	if ($_POST['count'] > 1) {
		require '../session/init-quest.php';
		// from players log
		$stmt = $link->prepare('delete from ng2_players where account=?');
		$stmt->bind_param('s', $_SESSION['account']);
		$stmt->execute();
	}
}
echo json_encode($r);
