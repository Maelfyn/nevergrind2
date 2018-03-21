<?php

require '../header.php';
require '../db.php';
$mobId = isset($_POST['quest']['mobId']) ?
	$_POST['quest']['mobId'] * 1 : $_POST['quest']['mob_id'] * 1;

$_SESSION['quest'] = [
	'row' => $_POST['quest']['row'] * 1,
	'zone' => $_POST['quest']['zone'],
	'level' => $_POST['quest']['level'] * 1,
	'mob_id' => $mobId,
	'title' => $_POST['quest']['title'],
	'description' => $_POST['quest']['description']
];

if (!empty($_SESSION['party'])) {
	$_SESSION['party']['mission_id'] = $_POST['quest']['row'] * 1;
}

echo json_encode($r);