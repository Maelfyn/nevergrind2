<?php
require '../header.php';
require '../db.php';

if ($_SESSION['party']['id']) {
	// delete from party
	$stmt = $link->prepare('delete from ng2_parties where c_id=?');
	$stmt->bind_param('s', $_POST['id']);
	$stmt->execute();

	// notify party members
	require_once '../zmq.php';
	$zmq = [
		'row' => $_POST['id'],
		'name' => $_POST['name'],
		'route' => 'party->boot',
		'category' => 'party:'. $_SESSION['party']['id']
	];
	$socket->send(json_encode($zmq));
	echo json_encode($r);
}
else {
	exit("You are not in a party.");
}