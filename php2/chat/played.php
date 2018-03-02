<?php
require '../header.php';
require('../db.php');

$query = 'select created, playtime from `ng2_chars` where row=? limit 1';
$stmt = $link->prepare($query);
$stmt->bind_param('s', $_SESSION['ng2']['row']);
$stmt->execute();
$stmt->bind_result($created, $playtime);

$r['playtime'] = 0;

while ($stmt->fetch()) {
	$r['created'] = $created;
	$r['playtime'] = $playtime;
}

echo json_encode($r);