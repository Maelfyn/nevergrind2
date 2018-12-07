<?php
	session_start();
	if($_SERVER["SERVER_NAME"] === "localhost"){
		error_reporting(E_ALL);
		ini_set('display_errors', true);
	}
	require('php/values.php');
	
	if (!isset($_GET['reset'])){
		unset($_SESSION['reset']);
		unset($_SESSION['tempEmail']);
		exit();
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Nevergrind | Password Reset</title>
	<link rel='stylesheet' type='text/css' href="/css/global.css">
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php
		include($_SERVER['DOCUMENT_ROOT'] . "/includes/head.html");
	?>
	<style>
		body{
			position: relative;
			width: 100%;
			height: auto;
			top: 0;
			left: 0;
			right: 0;
			margin: 0 auto;
			max-width: 1920px;
		}
		#message{
			position: absolute;
			top: 50px;
			text-align: center;
			font-size: 24px;
			color: #fff;
			width: 100%;
			padding: 0;
			background: rgba(0,0,0,.9);
		}
		#currencyIndicator{
			width: 100%;
		}
		#mainBG{
			width: 100%;
			height: 1080px;
			background: url('/images/bg/ng2-bg.jpg');
		}
		#loginWrap {
			top: 100px;
			bottom: auto;
			background: #0a0a1a;
			padding: 10px 0;
			border: 2px ridge #337ab7;
			border-radius: 6px;
			box-shadow: 0 0 20px #000, 0 0 40px #000, 0 0 60px #000;
		}
		#resetPW {
			border: 1px solid #000;
		}
		input {
			border: 1px solid #357 !important;
		}
	</style>
</head>

<body>
	<div id="mainBG">
		<header id="currencyIndicator" class="strongShadow">
		<img style="margin: 4px 0 0 2px; display: inline-block" 
		src="/images/neverworks-txt.png">
		<?php
		require_once('php/connect1.php');
		
		echo "<div class='modePanel'>";
			echo "Reset Password";
		echo '</div>';
			?>
		</header>
		
		<?php
		$showReset = true;
		$checkHash = true;
		
		echo '<div id="message" class=" blackOutline3">';
		
		$_SESSION['reset'] = $_GET['reset'];
		$hash = crypt($_SESSION['reset'], '$2a$07$'.$_SESSION['salt'].'$');
		$verify = crypt($_SESSION['reset'], $hash);
		
		require("php/connect1.php");
		// 1-hour valid token - check if expired
		$query = "select email from resetpassword where reset='".$_SESSION['reset']."' and timestamp>date_sub(now(), interval 1 hour)";
		$stmt = $link->prepare($query);
		$stmt->execute();
		$stmt->store_result();
		if($stmt->num_rows==0){
			echo "<p>Your token has expired. Tokens are valid for one hour. Reset your password again at <a href='//nevergrind.com/'>Nevergrind</a>.</p>";
			$showReset = false;
			$checkHash = false;
		} else {
			// email token found - set temp email
			$stmt->bind_result($stmtEmail);
			while($stmt->fetch()){
				$_SESSION['tempEmail'] = $stmtEmail;
			}
		}
		
		
		
		// hash token and make sure it matches
		if($checkHash){
			$query = "select hashedReset from accounts where email=? limit 1";
			if($stmt = $link->prepare($query)){
				$stmt->bind_param('s', $_SESSION['tempEmail']);
				$stmt->execute();
				$stmt->store_result();
				$count = $stmt->num_rows;
				$stmt->bind_result($stmtPassword);
				$dbPassword = '';
				while($stmt->fetch()){
					$dbPassword = $stmtPassword;
				}
				if($dbPassword!=$verify){
					// receives this error if they clicked twice or the token is wrong
					echo "<p>{$_SESSION['tempEmail']} Password reset failed due to mismatched or expired string! If you believe this is in error, contact <a href='mailto:support@nevergrind.com'>support@nevergrind.com</a> or visit <a href='//nevergrind.com/login.php'>Nevergrind</a> to reset your password again.</p>";
					// exit if not localhost
					$showReset = false;
				}else{
					// sets hashedReset to nothing; only works once
					/*
					$query = 'update accounts set hashedReset="" where email=?';
					$stmt = $link->prepare($query);
					$stmt->bind_param('s', $_SESSION['tempEmail']);
					$stmt->execute();
					*/
				}
			}
		}
		
		echo '</div>';
		// end
		if(isset($_GET['reset']) && $showReset){
			echo 
			'<form id="loginWrap" class="strongShadow" method="post">
				<div>Reset Your Password</div>
				<div class="textLeft">Password</div>
				<input type="password" id="resetPassword" class="loginInputs strongShadow" maxlength="20" placeholder="Password">
				<div class="textLeft">Re-type Password</div>
				<input type="password" id="resetVerifyPassword" class="loginInputs strongShadow" maxlength="20" placeholder="Verify Password">
				<div id="resetPW" class="btn btn-primary strongShadow">Reset Password</div>
			</form>';
		}
		?>
	</div><!-- window 2 -->
	
	<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<?php
		require($_SERVER['DOCUMENT_ROOT'] . "/includes/ga.html");
	?>
	<script>
		$(document).on('keydown', function(e){
			if (e.keyCode === 13){
				$("#resetPW").trigger('click');
			}
		});
		setTimeout(function(){
			$("#resetPassword").focus();
		}, 500);
		var lock = false;
		
		$("#resetPW").on('click', function() {
			if (lock){
				return;
			}
			if ($("#resetPassword").val() !== $("#resetVerifyPassword").val()) {
				$("#message").html("<p>Your passwords do not match.</p>");
				return;
			}
			if ($("#resetPassword").val().length < 6) {
				$("#message").html("<p>Your password be at least six characters long.</p>");
				return;
			}
			$("#message").html("<p>Connecting to server...</p>");
			lock = true;
			$.ajax({
				type: 'POST',
				url: '/php/master1.php',
				data: {
					run: "resetPW",
					password: $("#resetPassword").val(),
					verify: $("#resetVerifyPassword").val()
				}
			}).done(function(data){
				if (data === "Password Reset Successful.") {
					document.getElementById('loginWrap').style.display = 'none';
					$("#message").html("<p>Your password has been reset!</p>" +
						"<div><a href='/'>Play Nevergrind</a></div>" +
						"<div><a href='https://store.steampowered.com/app/849790/Firmament_Wars'>Play Firmament Wars</a></div>");
				} else {
					$("#message").html("<p>There was a server error when resetting your password.</p>");
				}
			}).fail(function() {
				$("#message").html("<p>Could not contact the server!</p>");
			}).always(function() {
				lock = false;
			});
		});
	</script>
</body>
</html>