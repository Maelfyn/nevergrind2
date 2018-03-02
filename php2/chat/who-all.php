<?php
require '../header.php';
require('../db.php');

// get online players
$result = mysqli_query($link,
	'select p.name, p.level, p.race, p.job, g.name guild 
	from ng2_players p
	left join ng2_guild_members m
	on p.id=m.c_id 
	left join ng2_guilds g
	on m.g_id=g.row
	where timestamp > date_sub(now(), interval 15 second) limit 50'
);
$r['players'] = [];
$i = 0;

if ($result->num_rows){
	while ($row = mysqli_fetch_assoc($result)){
		$r['players'][$i++] = (object)[
			'name' => $row['name'],
			'level' => $row['level'],
			'race' => $row['race'],
			'job' => $row['job'],
			'guild' => $row['guild']
		];
	}
}
// total
$result = mysqli_query(
	$link,
	'SELECT count(row) count FROM `ng2_players` where timestamp > date_sub(now(), interval 15 second)'
);
$r['len'] = 0;
while ($row = mysqli_fetch_assoc($result)){
	$r['len'] = $row['count'];
}

echo json_encode($r);