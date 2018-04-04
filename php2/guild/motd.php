<?php
require '../header.php';
require('../db.php');

// not leading a party yet
if (!empty($_SESSION['guild']) &&
	$_SESSION['guild']['rank'] < 2) {
	// delete from party
	$stmt = $link->prepare('update ng2_guilds set motd=? where row=?');
	$stmt->bind_param('si', $_POST['msg'], $_SESSION['guild']['id']);
	$stmt->execute();

	// notify guild members
	require_once '../zmq.php';
	$zmq = [
		'msg' => $_SESSION['ng2']['name'] . ' has set a new message of the day:<br>' . $_POST['msg'],
		'route' => 'guild->motd',
		'category' => 'guild:'. $_SESSION['guild']['id']
	];
	$socket->send(json_encode($zmq));

	echo json_encode($r);
}
else {
	exit("You must be a guild Leader or Officer to use this command.");
}