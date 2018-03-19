<?php
	function hpRegen() {
		$val = 1 + ($_SESSION['ng2']['level'] / 16) + ($_SESSION['ng2']['sta'] / 50);
		return $val;
	}
	function mpRegen() {
		$val = $_SESSION['ng2']['wis'] / 25;
		return $val;

	}
	$_SESSION['ng2']['hpRegen'] = floor(hpRegen());
	$_SESSION['ng2']['mpRegen'] = floor(mpRegen());