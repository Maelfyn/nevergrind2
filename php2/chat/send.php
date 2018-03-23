<?php
	session_start();
	require('prepare.php');
	
    require_once '../zmq.php';
	$zmq = new stdClass();
	$zmq->msg = $postMsg;
	$zmq->name = $_SESSION['ng2']['name'];
	$zmq->level = $_SESSION['ng2']['level'];
	$zmq->job = $_SESSION['ng2']['job'];
	$zmq->class = $_POST['class'];
	$zmq->route = 'chat->log';

	if ($_POST['class'] === 'chat-whisper') {
		$zmq->action = $_POST['action'];
	}

	$zmq->category = $_POST['category'];
	$socket->send(json_encode($zmq));