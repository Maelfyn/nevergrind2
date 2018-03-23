<?php
require 'header.php';
if (empty($_SESSION['account'])) {
	header('HTTP/1.1 500 Your session has expired.');
}
else {
	require 'db.php';
	// tick HP & MP
	$_SESSION['ng2']['hp'] += $_SESSION['ng2']['hpRegen'];
	if ($_SESSION['ng2']['hp'] > $_SESSION['ng2']['maxHp']) {
		$_SESSION['ng2']['hp'] = $_SESSION['ng2']['maxHp'];
	}
	$r['hp'] = $_SESSION['ng2']['hp'];

	$_SESSION['ng2']['mp'] += $_SESSION['ng2']['mpRegen'];
	if ($_SESSION['ng2']['mp'] > $_SESSION['ng2']['maxMp']) {
		$_SESSION['ng2']['mp'] = $_SESSION['ng2']['maxMp'];
	}
	$r['mp'] = $_SESSION['ng2']['mp'];

	// insert / replace into ng2_players
	$stmt = $link->prepare('insert into ng2_players 
			(`id`, `account`, `name`, `leader`, `level`, `race`, `job`, `zone`) 
			values (?, ?, ?, ?, ?, ?, ?, ?) 
			on duplicate key update timestamp=now(), name=?, leader=?, level=?, race=?, job=?, zone=?');

	$stmt->bind_param('isssisssssisss',
		$_SESSION['ng2']['row'],
		$_SESSION['account'],
		$_SESSION['ng2']['name'],
		$_SESSION['ng2']['leader'],
		$_SESSION['ng2']['level'],
		$_SESSION['ng2']['race'],
		$_SESSION['ng2']['job'],
		$_SESSION['ng2']['zone'],
		$_SESSION['ng2']['name'],
		$_SESSION['ng2']['leader'],
		$_SESSION['ng2']['level'],
		$_SESSION['ng2']['race'],
		$_SESSION['ng2']['job'],
		$_SESSION['ng2']['zone']);

	$stmt->execute();
	// update ng2_chars
	$stmt = $link->prepare('update ng2_chars set hp=?, mp=? where row=?');
	$stmt->bind_param('iii',
		$_SESSION['ng2']['hp'],
		$_SESSION['ng2']['mp'],
		$_SESSION['ng2']['row']);
	$stmt->execute();
	// update ng2_parties hp/mp
	if ($_SESSION['party']['id']) {
		$stmt = $link->prepare('update ng2_parties set hp=?, mp=? where c_id=?');
		$stmt->bind_param('iii',
			$_SESSION['ng2']['hp'],
			$_SESSION['ng2']['mp'],
			$_SESSION['ng2']['row']);
		$stmt->execute();

		require_once 'zmq.php';
		$zmq = new stdClass();
		$zmq->hp = $_SESSION['ng2']['hp'];
		$zmq->mp = $_SESSION['ng2']['mp'];
		$zmq->name = $_SESSION['ng2']['name'];
		$zmq->route = 'party->updateBars';
		$zmq->category = 'party:'. $_SESSION['party']['id'];
		$socket->send(json_encode($zmq));
	}

	echo json_encode($r);
}
