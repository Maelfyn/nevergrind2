<?php
	require '../header.php';
	require('../db.php');
	$query = 'select friend from ng2_friends where account=?';
	$stmt = $link->prepare($query);
	$stmt->bind_param('s', $_SESSION['account']);
	$stmt->execute();
	$stmt->bind_result($friend);

	$i = 0;
	while($stmt->fetch()){
		$r[$i++] = $friend;
	}
	echo json_encode($r);