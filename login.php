<?php
	session_start();
	
	if($_SERVER["SERVER_NAME"] === "localhost"){
		error_reporting(E_ALL);
		ini_set('display_errors', true);
	}
	require('php/values.php');
	
	if (isset($_SESSION['email']) && isset($_SESSION['account'])){
		if(strlen($_SESSION['email']) > 0){
			header("Location: /");
			exit();
		}
	}
	
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Nevergrind | Login & Account Creation</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="google-signin-client_id" content="1015425037202-g5ri6qnj14b8vrk33lnu130ver9f43ef.apps.googleusercontent.com">
	<link rel='stylesheet' type='text/css' href="/css/global.css">
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<?php
		include($_SERVER['DOCUMENT_ROOT'] . "/includes/head.html");
		require $_SERVER['DOCUMENT_ROOT'] . "/includes/loginCss.html";
	?>
	
</head>

<body id="body">
	<div id="mainBG">
		<header id="login-header" class="strongShadow">
		<img style="margin: 4px 0 0 2px; display: inline-block" 
		src="/images/neverworks-txt.png">
		<?php
			echo "<div class='modePanel'>";
				echo "Login to Nevergrind.com";
			echo '</div>';
		?>
		</header>
	<?php
		if (isset($_GET['reset'])){
			echo 
				'<form id="loginWrap" class="strongShadow" method="post">
					<div>Reset Your Password</div>
					<div class="textLeft">Password</div>
					<input type="password" id="resetPassword" class="loginInputs" maxlength="20" placeholder="Password" />
					<div class="textLeft">Re-type Password</div>
					<input type="password" id="resetVerifyPassword" class="loginInputs" maxlength="20" placeholder="Verify Password" />
					<div id="resetPW" class="strongShadow NGgradient">Reset Password</div>
				</form>';
		} else {
			require $_SERVER['DOCUMENT_ROOT'] . "/includes/loginModal.php";
		}
		require $_SERVER['DOCUMENT_ROOT'] . "/includes/loginRefer.php";
	?>
	</div>
	<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script src="https://apis.google.com/js/platform.js?onload=loginRenderButton" async defer></script>

<?php
if (!isset($_SESSION['account'])){
	require $_SERVER['DOCUMENT_ROOT'] . "/includes/loginJs.php";
}
require($_SERVER['DOCUMENT_ROOT'] . "/includes/ga.html");
?>
</body>
</html>