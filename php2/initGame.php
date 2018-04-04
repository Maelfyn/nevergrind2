<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
if (session_status() === PHP_SESSION_NONE) {
	session_start();
	session_set_cookie_params(86400);
	ini_set('session.gc_maxlifetime', 86400);
}
require 'db.php';
require('../php/values.php');
$r = [];

// using this for twitterCallback.php because REQUEST_URI wasn't working right?!
$_SESSION['referPath'] = '/ng2-test-server';

$empty = empty($_SESSION['account']);

$r['empty'] = $empty;
if ($empty) {
	// no account data
}
else {
	$r['account'] = $_SESSION['account']; // ?
	require 'create/loadAllCharacters.php';
}
require 'session/init-timers.php';

echo json_encode($r);