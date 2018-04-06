<?php
require '../header-session-start.php';
require '../db.php';
// from players log
$stmt = $link->prepare('delete from ng2_players where account=?');
$stmt->bind_param('s', $_SESSION['account']);
$stmt->execute();