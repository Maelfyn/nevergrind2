<?php
	session_start();
	
	if($_SERVER["SERVER_NAME"] === "localhost"){
		error_reporting(E_ALL);
		ini_set('display_errors', true);
	}
	require('php/values.php');
	$refer = isset($_GET['back']) ? $_GET['back'] : "/";
	
	if(!isset($_SESSION['tempEmail']) || !strlen($_SESSION['tempEmail'])){
		header("Location: login.php");
		exit();
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Nevergrind | Set Account Name</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel='stylesheet' type='text/css' href="/css/global.css">
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
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
		#currencyIndicator{
			width: 100%;
		}
		#mainBG{
			width: 100%;
			height: 1080px;
			background: url('/images/bg/ng2-bg.jpg');
		}
		label{
			font-weight: normal;
			display: block;
			margin: .1em 0;
		}
		#login{
			border: 2px groove #357;
		}
		#createAccount{
			color: #fff;
		}
		#createAccount:hover{
			color: #fff;
		}
		#forgotPassword{
			color: #fff;
		}
		.textLeft, .signupHeader{
			margin-top: .375em;
		}
		.loginInputs{
			background: #132239;
			border: 1px solid #357;
		}
		.hide{
			display: none;
		}
		#rememberMe{
			position: relative;
			top: 2px;
		}
		#loginWrap{
			top: 100px;
			bottom: auto;
			padding: 10px;
			border-radius: 6px;
			border: 2px ridge #337ab7;
			background: rgba(0,0,0,.9);
			box-shadow: 0 0 4px #000;
		}
		#error {
			color: #bf1717;
			margin: 12px 0;
		}
	</style>
</head>

<body id="body">
	<div id="mainBG">
		<header id="currencyIndicator" class="strongShadow">
		<?php
			echo "<div class='modePanel'>";
				echo "Set Account Name";
			echo '</div>';
		?>
		</header>
		<div class="message blackOutline3"></div>
	<?php
echo 
	'<form id="loginWrap" accept-charset="UTF-8" class="strongShadow" onSubmit="return false">
		<fieldset>
			<label class="textLeft" for="loginEmail">Set Your Account Name:
				<input name="account" type="text" id="account" class="loginInputs" maxlength="16" placeholder="Account Name" required="required" />
			</label>
			
			<input id="login" type="submit" value="Set Account Name" class="btn btn-primary strongShadow" />
			<div id="error" class="text-danger"></div>
		</fieldset>
	</form>';
	echo "<a id='refer' style='display:none' href='{$refer}'></a>";
	?>
	</div>
	<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script>
	var inputLock = false;
	function setError(msg){
		document.getElementById('error').textContent = msg;
	}
	$("#login").on('click', function(){
		var account = $("#account").val();
		(!account || account.length < 2 || account.length > 16) 
			&& setError('Choose an account name 2-16 characters long.');
			
		if (!inputLock && account){
			inputLock = true;
			$.ajax({
				type: 'POST',
				url: '/php/setAccountName.php',
				data: {
					account: account
				}
			}).done(function(data){
				console.info("OK ", data);
				setError('');
				var target = "//" + location.host + $("#refer").attr("href");
				location.replace(target);
			}).fail(function(data){
				console.info("FAIL ", data);
				setError(data.statusText);
			}).always(function(){
				inputLock = false;
			});
		}
	});
	</script>
	<?php
		require($_SERVER['DOCUMENT_ROOT'] . "/includes/ga.html");
	?>
</body>
</html>