<?php
	require '../header.php';
	
	$f['row'] = $_POST['row'];
	// name is not taken
	require('../db.php');
	$query = "select row from ng2_chars where row=? and account=?";
	$stmt = $link->prepare($query);
	$stmt->bind_param('ss', $f['row'], $_SESSION['account']);
	$stmt->execute();
	$stmt->bind_result($db_row);
	$stmt->store_result();
	if($stmt->num_rows){
		while($stmt->fetch()){
			$row = $db_row;
		}
		$query = 'update ng2_chars set deleted=1, name=NULL where row=?';
		$stmt = $link->prepare($query);
		$stmt->bind_param('i', $row);
		$stmt->execute();
	} 
	else {
		// error
		exit("Character data not found!");
	}
	$r['file'] = 'delete-character.php';
	$r['row'] = $f['row'];
	echo json_encode($r);