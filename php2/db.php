<?php
	if($_SERVER["SERVER_NAME"] === "localhost"){
		$link = mysqli_connect("localhost:3306","root","","nevergrind");
	} else {
		require $_SERVER['DOCUMENT_ROOT'] . '/php/values/dbpw.php';
		$link = mysqli_connect("localhost", "nevergri_fw", $dbpw, "nevergri_ngLocal");
	}
	if (!$link) {
		exit('Could not connect to the database!');
	}