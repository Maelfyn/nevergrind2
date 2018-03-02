<?php
require '../header.php';
require '../db.php';

require 'getGuildData.php';

echo json_encode($r);