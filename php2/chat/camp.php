<?php

require '../header-session-start.php';
require '../db.php';
// from players log
$stmt = $link->prepare('delete from ng2_players where account=?');
$stmt->bind_param('s', $_SESSION['account']);
$stmt->execute();
// try party log
if ($_SESSION['party']['id']){
	// delete from party
	$stmt = $link->prepare('delete from ng2_parties where c_id=?');
	$stmt->bind_param('s', $_SESSION['party']['id']);
	$stmt->execute();
}