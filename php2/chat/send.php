<?php
	session_start();
	require('prepare.php');
	
    require_once '../zmq.php';
	$zmq = [
		'msg' => $postMsg,
		'name' => $_SESSION['ng2']['name'],
		'level' => $_SESSION['ng2']['level'],
		'job' => $_SESSION['ng2']['job'],
		'class' => $_POST['class'],
		'route' => 'chat->log'
	];

	if ($_POST['class'] === 'chat-whisper') {
		$zmq['action'] = $_POST['action'];
	}

	$zmq['category'] = $_POST['category'];
	$socket->send(json_encode($zmq));