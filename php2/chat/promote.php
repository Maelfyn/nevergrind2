<?php
require '../header.php';
require '../db.php';

// not leading a party yet
if (!empty($_SESSION['party']) ) {
	// set all to non-leader
	$stmt = $link->prepare('update ng2_parties set is_leader=0 where p_id=?');
	$stmt->bind_param('i', $_SESSION['party']['id']);
	$stmt->execute();

	// promote to leader by id
	$stmt = $link->prepare('update ng2_parties set is_leader=1 where c_id=?');
	$stmt->bind_param('s', $_POST['leaderId']);
	$stmt->execute();

	// notify party members
	require '../zmq.php';
	$zmq = new stdClass();
	$zmq->row = $_SESSION['ng2']['row'];
	$zmq->name = $_POST['name'];
	$zmq->route = 'party->promote';
	$zmq->category = 'party:'. $_SESSION['party']['id'];
	$socket->send(json_encode($zmq));
	echo json_encode($r);
}
else {
	exit("You are not in a party.");
}