<?php

require '../header.php';
require '../db.php';
$mobId = isset($_POST['quest']['mobId']) ?
	$_POST['quest']['mobId'] * 1 : $_POST['quest']['mob_id'] * 1;

$mission_id = $_POST['quest']['row'] * 1;
$_SESSION['quest'] = [
	'row' => $mission_id,
	'zone' => $_POST['quest']['zone'],
	'level' => $_POST['quest']['level'] * 1,
	'mob_id' => $mobId,
	'title' => $_POST['quest']['title'],
	'description' => $_POST['quest']['description']
];

$_SESSION['ng2']['zone'] = '';

$dungeon = 'dng:' . $_POST['quest']['zone'];
$stmt = $link->prepare('update ng2_players set mission_id=?, zone=? where id=?');
$stmt->bind_param('isi', $mission_id, $dungeon, $_SESSION['ng2']['row']);
$stmt->execute();

if ($_SESSION['party']['id']) {
	$_SESSION['party']['mission_id'] = $_POST['quest']['row'] * 1;
}

echo json_encode($r);