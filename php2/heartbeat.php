<?php
require 'header-session-start.php';
if (empty($_SESSION['account'])) {
	header('HTTP/1.1 500 Your session has expired.');
}
else {
	require 'db.php';
	// insert / replace into fwplayers
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
}
