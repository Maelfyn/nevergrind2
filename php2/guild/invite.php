<?php
require '../header.php';
require('../db.php');

// get targeted player.id and party id by name
$query = 'select 
	p.id, 
	g.c_id 
	from ng2_players p 
	left join ng2_guild_members g 
	on p.id=g.c_id 
	where p.name=? limit 1';

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

if (is_null($r['id']) ) {
	exit("Player not found.");
}

// are they in a guild?
if (is_null($r['c_id'])) {

	// not leading a party yet
	if (!empty($_SESSION['guild']) ) {
		// party has been created
		if ($_SESSION['guild']['rank'] > 1) {
			// must be leader to invite
			exit ("Only the guild Leader and Officers can invite players to join the guild.");
		}
	}
	// send guild invite
	require_once '../zmq.php';
	$zmq = new stdClass();
	$zmq->row = $_SESSION['guild']['id'];
	$zmq->msg = $_SESSION['ng2']['name'] . ' has invited you to join the guild: '. $_SESSION['guild']['name'];
	$zmq->name = $_SESSION['ng2']['name'];
	$zmq->guildName = $_SESSION['guild']['name'];
	$zmq->action = 'guild-invite';
	$zmq->css = 'prompt-guild-invite';
	$zmq->category = 'name:'. $_POST['player'];
	$socket->send(json_encode($zmq));
	echo json_encode($r);
}
else {
	exit("Player is already in a guild.");
}