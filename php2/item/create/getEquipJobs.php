<?php
	function getEquipJobs($type){
		if ($type === null) {
			$type = 'all';
		}
		$arr = [
			'all' => '',
            'none' => '0', /*2*/
			'cloth' => 'NEC ENC MAG WIZ',
			'leather' => 'WAR PAL SHD BRD CLR SHM ROG RNG MNK DRU', /*4*/
			'chain' => 'WAR PAL SHD BRD CLR SHM ROG RNG',
			'plate' => 'WAR PAL SHD BRD CLR', /*6*/
			'1hs' => 'WAR PAL SHD ROG RNG BRD DRU',
			'2hs' => 'WAR PAL SHD RNG', /*8*/
			'2hb' => 'WAR PAL SHD MNK RNG CLR DRU SHM NEC ENC MAG WIZ',
			'piercer' => 'WAR ROG RNG BRD NEC ENC MAG WIZ', /*10*/
			'shield' => 'WAR PAL SHD RNG ROG DRU CLR SHM',
			'bow' => 'WAR PAL SHD RNG ROG', /*12*/
			'allCasters' => 'CLR DRU BRD SHM NEC ENC MAG WIZ',
            'allMelee' => 'WAR PAL SHD MNK ROG RNG BRD', /*14*/
            'WAR' => 'WAR',
            'PLD' => 'PAL', /*16*/
            'SHD' => 'SHD',
            'MNK' => 'MNK', /*18*/
            'ROG' => 'ROG',
            'RNG' => 'RNG', /*20*/
            'BRD' => 'BRD',
            'DRU' => 'DRU', /*22*/
            'CLR' => 'CLR',
            'SHM' => 'SHM', /*24*/
            'NEC' => 'NEC',
            'ENC' => 'ENC', /*26*/
            'MAG' => 'MAG',
            'WIZ' => 'WIZ' /*28*/
		];
		return $arr[$type];
	}

/*
insert into ng2_equip_jobs (`equipJobs`) values
(''),
('0'),
('NEC ENC MAG WIZ'),
('WAR PAL SHD BRD CLR SHM ROG RNG MNK DRU'),
('WAR PAL SHD BRD CLR SHM ROG RNG'),
('WAR PAL SHD BRD CLR'),
('WAR PAL SHD ROG RNG BRD DRU'),
('WAR PAL SHD RNG'),
('WAR PAL SHD MNK RNG CLR DRU SHM NEC ENC MAG WIZ'),
('WAR ROG RNG BRD NEC ENC MAG WIZ'),
('WAR PAL SHD RNG ROG DRU CLR SHM'),
('WAR PAL SHD RNG ROG'),
('CLR DRU BRD SHM NEC ENC MAG WIZ'),
('WAR PAL SHD MNK ROG RNG BRD'),
('WAR'),
('PAL'),
('SHD'),
('MNK'),
('ROG'),
('RNG'),
('BRD'),
('DRU'),
('CLR'),
('SHM'),
('NEC'),
('ENC'),
('MAG'),
('WIZ');
*/