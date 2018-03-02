<?php
require '../header.php';
require '../db.php';

// get my character data
$query = 'select 
	g.is_leader,
	p.id,
	p.job, 
	p.level,  
	p.name, 
	g.hp, 
	g.maxHp, 
	g.mp, 
	g.maxMp 
	from ng2_players p 
	join ng2_parties g  
	on p.id=g.c_id
	where g.p_id=?
	limit 6';
$stmt = $link->prepare($query);
$stmt->bind_param('s', $_SESSION['party']['id']);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($isLeader, $id, $job, $level, $name, $hp, $maxHp, $mp, $maxMp);

$r['party'] = [];
$i = 0;

while($stmt->fetch()){
	// always sort with me first
	$arr = [
		'isLeader' => $isLeader,
		'id' => $id,
		'name' => $name,
		'job' => $job,
		'level' => $level,
		'hp' => $hp,
		'maxHp' => $maxHp,
		'mp' => $mp,
		'maxMp' => $maxMp
	];
	$r['party'][$i++] = $arr;
	if ($_SESSION['ng2']['name'] === $name) {
		// set session values for my character
		foreach ($arr as $key => $val) {
			if ($key !== 'isLeader') {
				$_SESSION['ng2'][$key] = $val;
			}
		}
		$_SESSION['party']['isLeader'] = $isLeader;

	}
}
echo json_encode($r);