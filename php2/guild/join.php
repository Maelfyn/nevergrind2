<?php
require '../header.php';
require('../db.php');

// Count number of players in the party already
$query = 'SELECT row count FROM ng2_guild_members where c_id=?';
$stmt = $link->prepare($query);
$stmt->bind_param('s', $_POST['row']);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows) exit("You are already in a guild.");
// increment guild member count
$query = 'update ng2_guilds set members=members+1, member_number=member_number+1 where row=?';
$stmt = $link->prepare($query);
$stmt->bind_param('s', $_POST['row']);
$stmt->execute();

// get guild number
$query = 'SELECT member_number FROM ng2_guilds where row=?';
$stmt = $link->prepare($query);
$stmt->bind_param('s', $_POST['row']);
$stmt->execute();
$stmt->bind_result($dbCount);
$memberNumber = 0;
while ($stmt->fetch()){
	$memberNumber = $dbCount * 1;
}

// insert into member table
$stmt = $link->prepare('insert into ng2_guild_members (
	rank, c_id, g_id, member_number
	) values (
	2, ?, ?, '. $memberNumber .')');

$stmt->bind_param('is', $_SESSION['ng2']['row'], $_POST['row']);
$stmt->execute();

// get guild info
require '../guild/getGuildData.php';

// notify party
require_once '../zmq.php';
$zmq = [
	'msg' => $_SESSION['ng2']['name'] . ' has joined ' . $_POST['guildName'] .'.',
	'route' => 'guild->hasJoined',
	'category' => 'guild:'. $_POST['row']
];
$socket->send(json_encode($zmq));

echo json_encode($r);
