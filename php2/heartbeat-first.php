<?php
require 'header.php';
if (!isset($_SESSION['account'])) {
	header('HTTP/1.1 500 Your session has expired.');
}
else {
	require 'db.php';

	$r['hp'] = $_SESSION['ng2']['hp'];
	$r['mp'] = $_SESSION['ng2']['mp'];

	$stmt = $link->prepare('insert into ng2_players 
		(`id`, `account`, `name`, `level`, `race`, `job`, `zone`) 
		values (?, ?, ?, ?, ?, ?, ?)');

	$stmt->bind_param('ississs',
		$_SESSION['ng2']['row'],
		$_SESSION['account'],
		$_SESSION['ng2']['name'],
		$_SESSION['ng2']['level'],
		$_SESSION['ng2']['race'],
		$_SESSION['ng2']['job'],
		$_SESSION['ng2']['zone']);
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
		$zmq = [
			'hp' =>	$_SESSION['ng2']['hp'],
			'mp' =>	$_SESSION['ng2']['mp'],
			'name' =>	$_SESSION['ng2']['name'],
			'route' =>	'party->updateBars',
			'category' =>	'party:'. $_SESSION['party']['id']
		];
		$socket->send(json_encode($zmq));
	}

	echo json_encode($r);
}