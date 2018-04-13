<?php
require 'header.php';
require 'db.php';
require('../php/values.php');

if($_SERVER["SERVER_NAME"] === "localhost"){
	error_reporting(E_ALL);
	ini_set('display_errors', true);
} else {
	error_reporting(0);
}

$r = [];

// using this for twitterCallback.php because REQUEST_URI wasn't working right?!
$_SESSION['referPath'] = '/ng2-test-server';

$empty = empty($_SESSION['account']);

$r['empty'] = $empty;
// data to reset sessionStorage.clear();
$r['resetSession'] = null;
if (isset($_SESSION['ng2']['name'])) {
	$r['resetSession'] = $_SESSION['ng2']['name'];
}
if ($empty) {
	// no account data
}
else {
	$r['account'] = $_SESSION['account']; // ?
	require 'create/loadAllCharacters.php';
}

require 'session/init-timers.php';

echo json_encode($r);