<?php
require_once '../header-session-start.php';
require_once '../db.php';
$_SESSION['quest'] = [
	'row' => 0,
	'zone' => '',
	'level' => 0,
	'mob_id' => 0,
	'title' => '',
	'description' => ''
];
$stmt = $link->prepare('update ng2_players set mission_id=0, zone="ng2:town" where id=?');
$stmt->bind_param('i', $_SESSION['ng2']['row']);
$stmt->execute();