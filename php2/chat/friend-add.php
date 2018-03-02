<?php
require '../header.php';
require('../db.php');
// is our friends list full?
$stmt = $link->prepare('select count(friend) from ng2_friends where account=?');
$stmt->bind_param('s', $_SESSION['account']);
$stmt->execute();
$stmt->bind_result($friend);
$count = 0;
while ($stmt->fetch()){
	$count = $friend;
}
if ($count < 20){
	// add
	$stmt = $link->prepare("insert into ng2_friends (`account`, `friend`) values (?, ?)");
	$stmt->bind_param('ss', $_SESSION['account'], $_POST['friend']);
	$stmt->execute();
} else {
	// too many
	$r['error'] = 'You cannot have more than 20 friends!';
}
echo json_encode($r);
