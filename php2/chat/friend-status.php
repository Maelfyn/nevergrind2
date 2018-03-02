<?php
require '../header.php';
require '../db.php';
// get online players
$result = mysqli_query($link,
	'select p.name, p.level, p.race, p.job, g.name guild
			from ng2_players p 
			left join ng2_guild_members m
			on p.id=m.c_id 
			left join ng2_guilds g
			on m.g_id=g.row
			where p.timestamp > date_sub(now(), interval 15 second)'
);
$r['players'] = [];
$r['stats'] = [];
$count = 0;

if ($result->num_rows){
	while ($row = mysqli_fetch_assoc($result)){
		$r['players'][$count] = $row['name'];
		$r['stats'][$count++] = (object)[
			'level' => $row['level'],
			'race' => $row['race'],
			'job' => $row['job'],
			'guild' => $row['guild']
		];
	}
}

// get friends
$r['friends'] = [];

$query = 'select friend from `ng2_friends` where account=?';
$stmt = $link->prepare($query);
$stmt->bind_param('s', $_SESSION['account']);
$stmt->execute();
$stmt->bind_result($friend);
$i = 0;
while($stmt->fetch()){
	$r['friends'][$i++] = $friend;
}

echo json_encode($r);