<?php
	$ctx = new ZMQContext();
    $socket = $ctx->getSocket(ZMQ::SOCKET_PUSH);
    $socket->connect("tcp://localhost:5555");