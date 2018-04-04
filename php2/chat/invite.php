<?php
require '../header.php';
require('../db.php');

// get targeted player.id and party id by name
$query = 'select p.id, g.c_id from ng2_players p left join ng2_parties g on p.id=g.c_id where p.name=? limit 1';
$stmt = $link->prepare($query);
$stmt->bind_param('s', $_POST['player']);
$stmt->execute();
$stmt->bind_result($id, $c_id);

$r['id'] = null;
$r['c_id'] = null;

while ($stmt->fetch()) {
	$r['id'] = $id;
	$r['c_id'] = $c_id;
}
$newParty = 0;

if (is_null($r['id']) ) {
	exit("Player not found.");
}

// notify if null (not in a party)
if (is_null($r['c_id'])) {

	// cannot send invites from dungeon
	if (!$_SESSION['ng2']['zone']) {
		exit("You cannot invite adventurers from the depths of a dungeon.");
	}

	if ($_SESSION['party']['id']) {
		// party has been created
		if (!$_SESSION['party']['isLeader']) {
			// must be leader to invite
			exit ("Only the party leader can invite players to join.");
		}
	}
	else {
		// create new party with me as leader
		$newParty = 1;
		require '../session/init-party.php';
		$stmt = mysqli_query($link,
			'insert into ng2_parties (is_leader, c_id, hp, maxHp, mp, maxMp) VALUES (1, '. $_SESSION['ng2']['row'] .', '.
			$_SESSION['ng2']['hp'] .', '.
			$_SESSION['ng2']['maxHp'] .', '.
			$_SESSION['ng2']['mp'] .', '.
			$_SESSION['ng2']['maxMp'] .')'
		);

		// last insert id is GET value
		$p_id = $_SESSION['party']['id'] = mysqli_insert_id($link);
		$_SESSION['party']['isLeader'] = 1;

		// update p_id with what I just inserted with
		$stmt = mysqli_query($link,
			'update ng2_parties set p_id='. $p_id .' where row='. $p_id
		);
	}
	// send invite
	require_once '../zmq.php';
	$zmq = [
		'row' => $_SESSION['party']['id'],
		'msg' => $_SESSION['ng2']['name'] . ' has invited you to join his party.',
		'name' => $_SESSION['ng2']['name'],
		'cId' => $_SESSION['ng2']['row'],
		'action' => 'party-invite',
		'css' => 'prompt-party-invite',
		'category' => 'name:'. $_POST['player']
	];
	$socket->send(json_encode($zmq));

	$r['newParty'] = $newParty;
	$r['p_id'] = $_SESSION['party']['id'];
	echo json_encode($r);
}
else {
	exit("Player is already in a party.");
}