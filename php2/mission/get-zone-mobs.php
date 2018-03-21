<?php

// load all zone mob images and preload them client-side
 $stmt = $link->prepare('SELECT i.name
	FROM ng2_mobs m
	join ng2_mob_img i
	on m.img=i.row
	join ng2_zones z
	on m.zone=z.row
	where z.zone=?
	group by i.name');
$stmt->bind_param('s', $_SESSION['quest']['zone']);
$stmt->execute();
$stmt->bind_result($name);
$i = 0;
$r['zoneMobs'] = [];
while ($stmt->fetch()) {
	$r['zoneMobs'][$i++] = $name;
}