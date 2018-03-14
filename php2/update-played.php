<?php
require 'header-session-start.php';
require 'db.php';

$now = time();
if (!empty($_SESSION['ng2'])) {
	if ($now - $_SESSION['ng2']['played'] >= 60) {
		$stmt = $link->prepare('update ng2_chars set playtime=playtime+1 where row=?');
		$stmt->bind_param('s', $_SESSION['ng2']['row']);
		$stmt->execute();
		$_SESSION['ng2']['played'] = $now;
	}
}
