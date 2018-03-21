<?php
require '../header.php';
require('../db.php');

// Count number of players in the party already
$query = 'SELECT count(row) count FROM ng2_parties where p_id=?';
$stmt = $link->prepare($query);
$stmt->bind_param('s', $_POST['row']);
$stmt->execute();
$stmt->bind_result($dbCount);
$partyCount = 0;

while ($stmt->fetch()){
	$partyCount = $dbCount;
}
$r['partyCount'] = $partyCount;
// if between 1 and 6 allow to join
if ($partyCount >= 1 && $partyCount < 6) {
	// valid!
	if (empty($_SESSION['party']) || empty($_SESSION['party']['id'])) {
		// not leading a party yet
		$_SESSION['party'] = [];

		$stmt = $link->prepare('insert into ng2_parties (c_id, p_id, hp, maxHp, mp, maxMp) values (?, ?, ?, ?, ?, ?)');

		$stmt->bind_param('ssiiii',
			$_SESSION['ng2']['row'],
			$_POST['row'],
			$_SESSION['ng2']['hp'],
			$_SESSION['ng2']['maxHp'],
			$_SESSION['ng2']['mp'],
			$_SESSION['ng2']['maxMp']);

		$stmt->execute();

		$_SESSION['party']['id'] = $_POST['row'] * 1;

		// notify party
		require '../zmq.php';
		$zmq = new stdClass();
		$zmq->msg = $_SESSION['ng2']['name'] . ' has joined the party.';
		$zmq->route = 'party->join';
		$zmq->category = 'party:'. $_POST['row'];
		$socket->send(json_encode($zmq));

		echo json_encode($r);
	}
	else {
		exit("You must disband your party before joining another.");
	}
}
else {
	exit("You cannot join this party.");
}