<?php
require '../header.php';
require('../db.php');
// are they even there
$stmt = $link->prepare('select friend from ng2_friends where friend=? and account=?');
$stmt->bind_param('ss', $_POST['friend'], $_SESSION['account']);
$stmt->execute();
$stmt->bind_result($friend);
$stmt->store_result();

if ($stmt->num_rows){
	$stmt = $link->prepare('delete from ng2_friends where friend=? and account=?');
	$stmt->bind_param('ss', $_POST['friend'], $_SESSION['account']);
	$stmt->execute();
}
else {
	$r['error'] = $_POST['friend'] . " isn't your friend!";
}
echo json_encode($r);
