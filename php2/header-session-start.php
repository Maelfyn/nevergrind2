<?php

if (session_status() === PHP_SESSION_NONE) {
	session_start();
	session_set_cookie_params(86400);
	ini_set('session.gc_maxlifetime', 86400);
}