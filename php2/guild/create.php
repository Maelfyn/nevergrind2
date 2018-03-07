<?php
require '../header.php';

// standardize the name

// length is not too long
$name = $_POST['name'];
$name = substr($name, 0, 30);
if (strlen($name) < 4){
	exit('This guild name is too short!');
}
// remove illegal characters - must be capitalized
$illegal = ["\\", "/", ":", "*", "?", '"', ">", "<", "1", "2", "3", "4", "5", "6", "7", "8", "9", "`", "0", "_"];
$name = str_replace($illegal, "", $name);
// apply standardized capitalization
$arr = explode(" ", $name);
foreach ($arr as $key => &$value){
	$arr[$key] = strtolower($value);
	if ($value === 'of' || $value === 'the' || $value === 'and') {
		// do nothing
	}
	else {
		$arr[$key] = ucfirst($value);
	}
}
$name = join(" ", $arr);
$illegal = array("'", " ");
$nameCheck = str_replace($illegal, "", $name);
if (!ctype_alpha($nameCheck)){
	exit('This name contains illegal characters!');
}
// name is not taken
require('../db.php');

// check if this guild name is taken
$stmt = $link->prepare('select name from ng2_guilds where name=?');
$stmt->bind_param('s', $name);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows) {
	exit("This guild name is already taken!");
}

// make sure I'm not in a guild
$stmt = $link->prepare('select row from ng2_guild_members where c_id=?');
$stmt->bind_param('s', $_SESSION['ng2']['row']);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows) {
	exit("You are already in a guild!");
}
// add to ng2_guilds
$stmt = $link->prepare("insert into ng2_guilds (`name`) values (?)");
$stmt->bind_param('s', $name);
$stmt->execute();
$g_id = mysqli_insert_id($link);

// add to ng2_guild_members
$stmt = $link->prepare("insert into ng2_guild_members (rank, c_id, g_id, member_number) values (0, ?, ?, 1)");
$stmt->bind_param('si', $_SESSION['ng2']['row'], $g_id);
$stmt->execute();
// get guild id
$lastInsert = mysqli_insert_id($link);


// return to client
require 'getGuildData.php';
echo json_encode($r);
