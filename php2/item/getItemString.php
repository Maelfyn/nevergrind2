<?php
	/*
	insert into ng2_items (
			charRow, 
			type (0 eq, 1 inv)
			$slots (key is slot, value is lootRow)
			slot
		) VALUES '
	*/
	function getItemString($charRow, $slots, $type){
		$s = '';
		$i = 0;
		$lastRow = count($slots) - 1;
		foreach ($slots as $key => $value){
			$s .= '('. $charRow .',?,'. $type .','. $key .','. $value;
			if ($i === $lastRow){
				$s .= ')';
			} 
			else {
				$s .= '),';
			}
			$i++;
		}
		return $s;
	}