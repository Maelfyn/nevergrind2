<?php
require '../header.php';
require('../db.php');

// not leading a party yet
if (!empty($_SESSION['guild']) && $_SESSION['guild']['rank'] < 2) {
	// make sure they don't outrank me

	// find player row by name
	$stmt = $link->prepare('select row from ng2_chars where name=?');
	$stmt->bind_param('s', $_POST['name']);
	$stmt->execute();
	$stmt->bind_result($dbRow);
	$row = 0;
	while ($stmt->fetch()) {
		$row = $dbRow;
	}
	// check rank
	$stmt = $link->prepare('select rank from ng2_guild_members where c_id=?');
	$stmt->bind_param('i', $row);
	$stmt->execute();
	$stmt->bind_result($dbRank);
	$rank = 2;
	while ($stmt->fetch()) {
		$rank = $dbRank;
	}

	if ($rank <= $_SESSION['guild']['rank']) {
		exit('You may only boot members that you outrank.');
	}

	// notify party members
	require_once '../zmq.php';
	$zmq = [
		'name' => $_POST['name'],
		'msg' => $_POST['name'] . ' has been booted by  '. $_SESSION['ng2']['name'] .'!',
		'route' => 'guild->boot',
		'category' => 'guild:'. $_SESSION['guild']['id']
	];
	$socket->send(json_encode($zmq));
	echo json_encode($r);
}
else {
	exit("You are not in a guild.");
}