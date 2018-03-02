<?php
	header('Content-Type: application/json');
	$r = [];
	require '../statMap.php';
	// success
	$r['statMap'] = $statMap;
	echo json_encode($r);