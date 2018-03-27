<?php

$stmt = $link->prepare('select m.rank, 
	m.g_id, 
	m.member_number,
	n.motd,
	n.members,
	n.name 
	from ng2_guild_members m 
	left join ng2_guilds n 
	on m.g_id=n.row 
	where m.c_id=? 
	limit 1');
$stmt->bind_param('s', $_SESSION['ng2']['row']);
$stmt->execute();
$stmt->bind_result($rank, $g_id, $member_number, $motd, $members, $name);
// default value
require '../session/init-guild.php';

$r['guild'] = [
	'id' => 0,
	'rank' => 0,
	'memberNumber' => 0,
	'motd' => '',
	'members' => 0,
	'name' => ''
];
// assigned if exists
while($stmt->fetch()) {
	$found = 1;
	$r['guild'] = [
		'id' => $g_id,
		'rank' => $rank,
		'memberNumber' => $member_number,
		'motd' => $motd,
		'members' => $members,
		'name' => $name
	];
}
foreach ($r['guild'] as $key => $val) {
	$_SESSION['guild'][$key] = $val;
}
