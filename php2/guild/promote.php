<?php
require '../header.php';
require('../db.php');

// not leading a party yet
if (!empty($_SESSION['guild']) &&
	$_SESSION['guild']['rank'] < 2) {
	// find player row by name
	$stmt = $link->prepare('select row from ng2_chars where name=?');
	$stmt->bind_param('s', $_POST['name']);
	$stmt->execute();
	$stmt->bind_result($dbId);


	$c_id = 0;
	while ($stmt->fetch()) {
		$c_id = $dbId;
	}

	// promote name
	$stmt = $link->prepare('update ng2_guild_members set rank=1 where c_id=?');
	$stmt->bind_param('s', $c_id);
	$stmt->execute();

	// notify guild members
	require_once '../zmq.php';
	$zmq = [
		'name' => $_POST['name'],
		'msg' => $_POST['name'] . ' has been promoted to Officer by '. $_SESSION['ng2']['name'] .'.',
		'route' => 'guild->promote',
		'category' => 'guild:'. $_SESSION['guild']['id']
	];
	$socket->send(json_encode($zmq));
	echo json_encode($r);
}
else {
	exit("You are not in a guild.");
}