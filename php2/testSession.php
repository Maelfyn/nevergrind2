<?php
require('../php/values.php');
header('Content-Type: application/json');
session_start();
ini_set('session.gc_maxlifetime', 86400);
$r = [];

if (empty($_SESSION['test'])){
	$_SESSION['test'] = '.';
}
else {
	$_SESSION['test'] .= '.';
}
$r['test'] = $_SESSION['test'];
$r['random'] = mt_rand(0,100);

echo json_encode($r);