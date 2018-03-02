<?php
// skills that don't start the same for everyone
function addStartingSkills(&$hero){
	$v = [
		'keys' => [
			'dualWield', 
			'oneHandSlash', 
			'twoHandSlash', 
			'oneHandBlunt', 
			'twoHandBlunt', 
			'piercing', 
			'dodge', 
			'alteration', 
			'conjuration',
			'evocation'
		],
		'jobs' => [
			'Bard' => 			[0,1,0,1,0,1,0,0,0,0],
			'Cleric' => 		[0,0,0,1,1,0,0,1,1,1],
			'Druid' => 			[0,1,0,1,1,0,0,1,1,1],
			'Enchanter' => 		[0,0,0,1,1,1,0,1,1,1],
			'Magician' => 		[0,0,0,1,1,1,0,1,1,1],
			'Monk' => 			[1,0,0,1,1,0,1,0,0,0],
			'Necromancer' => 	[0,0,0,1,1,1,0,1,1,1],
			'Paladin' => 		[0,1,1,1,1,0,0,0,0,0],
			'Ranger' => 		[0,1,1,1,1,1,0,0,0,0],
			'Rogue' => 			[0,1,0,1,0,1,0,0,0,0],
			'Shadowknight' => 	[0,1,1,1,1,0,0,0,0,0],
			'Shaman' => 		[0,0,0,1,1,0,0,1,1,1],
			'Warrior' => 		[0,1,1,1,1,1,0,0,0,0],
			'Wizard' => 		[0,0,0,1,1,1,0,1,1,1]
		]
	];
	$i = 0;
	foreach ($v['keys'] as $value){
		$hero[$value] = $v['jobs'][$hero['job']][$i++];
	}
}