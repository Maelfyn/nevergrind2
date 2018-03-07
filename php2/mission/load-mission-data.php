<?php

require '../header.php';
require '../db.php';

require 'get-mission-data.php';

echo json_encode($r);