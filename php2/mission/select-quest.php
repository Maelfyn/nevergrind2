<?php

require '../header.php';
require '../db.php';

$_SESSION['quest'] = [
	'id' => $_POST['id'] * 1
];

$r['quest'] = $_POST['id'] * 1;

echo json_encode($r);