<?php

require '../header.php';
require '../db.php';

$stmt = $link->prepare('SELECT m.row, m.level, m.title, z.zone 
	FROM ng2_mission_list m
	join ng2_zones z
	on m.zone=z.row
	where m.zone=?');
$stmt->bind_param('s', $_POST['id']);
$stmt->execute();
$stmt->bind_result(
	$row,
	$level,
	$title,
	$zone
);
$i = 0;
while ($stmt->fetch()) {
	$r['quests'][$i++] = [
		'row' => $row,
		'level' => $level,
		'title' => $title,
		'zone' => $zone
	];
}

echo json_encode($r);