<?php
require '../header.php';
require('../db.php');

// not leading a party yet
if ($_SESSION['party']['id']) {
	// delete from party
	$stmt = $link->prepare('delete from ng2_parties where c_id=?');
	$stmt->bind_param('s', $_SESSION['ng2']['row']);
	$stmt->execute();

	// notify party members
	require_once '../zmq.php';
	$zmq = new stdClass();
	$zmq->row = $_SESSION['ng2']['row'];
	$zmq->route = 'party->disband';
	$zmq->class = 'chat-warning';
	$zmq->category = 'party:'. $_SESSION['party']['id'];
	$socket->send(json_encode($zmq));

	// set party session values
	require '../session/init-party.php';
	require '../session/init-quest.php';
	echo json_encode($r);
}
else {
	exit("You are not in a party.");
}