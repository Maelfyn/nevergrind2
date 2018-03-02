<?php

require '../header.php';
require('../db.php');
// get all players in chat room
$result = mysqli_query(
	$link,
	'SELECT id FROM `ng2_players` where zone="ng2:town" and timestamp > date_sub(now(), interval 15 second)'
);
$r['players'] = [];
$i = 0;
if ($result->num_rows) {
	while ($row = mysqli_fetch_assoc($result)) {
		$r['players'][$i++] = $row['id'];
	}
}

echo json_encode($r);