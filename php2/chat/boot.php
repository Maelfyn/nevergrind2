<?php
require '../header.php';
require '../db.php';

// not leading a party yet
if (!empty($_SESSION['party']) ) {
	// delete from party
	$stmt = $link->prepare('delete from ng2_parties where c_id=?');
	$stmt->bind_param('s', $_POST['id']);
	$stmt->execute();

	// notify party members
	require '../zmq.php';
	$zmq = new stdClass();
	$zmq->row = $_POST['id'];
	$zmq->name = $_POST['name'];
	$zmq->route = 'party->boot';
	$zmq->category = 'party:'. $_SESSION['party']['id'];
	$socket->send(json_encode($zmq));
	echo json_encode($r);
}
else {
	exit("You are not in a party.");
}