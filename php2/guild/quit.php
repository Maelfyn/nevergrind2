<?php
require '../header.php';
require('../db.php');

if (!empty($_SESSION['guild']) &&
	isset($_SESSION['guild']['id']) ) {
	if ($_SESSION['guild']['rank'] === 0) {
		exit("You must promote another officer to Leader using /gleader first");
	}
	// delete from guild
	$stmt = $link->prepare('update ng2_guild_members set c_id=NULL where c_id=?');
	$stmt->bind_param('s', $_SESSION['ng2']['row']);
	$stmt->execute();

	// notify guild members
	require '../zmq.php';
	$zmq = new stdClass();
	if (isset($_POST['action'])) {
		$zmq->msg = $_SESSION['ng2']['name'] . ' has left '. $_SESSION['guild']['name'] .'.';
	}
	$zmq->route = 'guild->quit';
	$zmq->category = 'guild:'. $_SESSION['guild']['id'];
	$socket->send(json_encode($zmq));

	// set guild session values
	require 'guildReset.php';
	echo json_encode($r);
}
else {
	exit("You are not in a guild.");
}