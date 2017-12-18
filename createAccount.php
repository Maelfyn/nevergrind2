<?php
	session_start();
	
	if($_SERVER["SERVER_NAME"] === "localhost"){
		error_reporting(E_ALL);
		ini_set('display_errors', true);
	}
	require('php/values.php');
	
	if(isset($_SESSION['email'])){
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
		.fancy-hr {
			border: 0;
			height: 1px;
			margin: 8px 0;
			background-image: -webkit-linear-gradient(left, rgba(16, 64, 176, .4), rgba(32, 128, 232, 1), rgba(16, 64, 176, .4));
			background-image: -moz-linear-gradient(left, rgba(16, 64, 176, .4), rgba(32, 128, 232, 1), rgba(16, 64, 176, .4));
			background-image: -ms-linear-gradient(left, rgba(16, 64, 176, .4), rgba(32, 128, 232, 1), rgba(16, 64, 176, .4));
			background-image: -o-linear-gradient(left, rgba(16, 64, 176, .4), rgba(32, 128, 232, 1), rgba(16, 64, 176, .4))
		}
		#currencyIndicator{
			width: 100%;
		}
		#mainBG{
			width: 100%;
			height: 1080px;
			background: url('/images/bg/ng2-bg.jpg');
		}
		#createAccount{
			color: #fff;
		}
		#createAccount:hover{
			color: #fff;
		}
		label{
			font-weight: normal;
			display: block;
			margin: .1em 0;
		}
		#login{
			border: 2px groove #357;
		}
		.textLeft, .signupHeader{
			margin-top: .375em;
		}
		.loginInputs{
			background: #132239;
			border: 1px solid #357;
		}
		#tosWrap, #loginVerifyPassword, #promoCode, #loginAccount, .create-account{
			display: block;
		}
		#loginWrap{
			top: 100px;
			bottom: auto;
			padding: 10px 0;
			border-radius: 6px;
			border: 2px ridge #337ab7;
			background: #0a0a1a;
			box-shadow: 0 0 20px #000,
				0 0 40px #000,
				0 0 60px #000;
		}
	</style>
</head>

<body id="body">
	<div id="mainBG">
		<header id="currencyIndicator" class="strongShadow">
		<img style="margin: 4px 0 0 2px; display: inline-block" 
		src="/images/neverworks-txt.png">
		<?php
			echo "<div class='modePanel'>";
				echo "Account Creation";
			echo '</div>';
		?>
		</header>
		<div class="message blackOutline3"></div>
	<?php
		echo 
		'<form id="loginWrap" 
			accept-charset="UTF-8" 
			class="strongShadow" 
			method="post"
			onSubmit="return createAccount(this);">
			<fieldset>
				<div id="createAccountWrap">
					<a id="createAccount" href="/login.php" class="strongShadow">Return to Login Page</a>
				</div>
				
				<hr class="fancy-hr">
			
				<label class="textLeft" for="loginEmail">Email Address
					<input name="username" type="text" id="loginEmail" class="loginInputs" maxlength="255" placeholder="Account or Email Address" required="required" />
				</label>
				
				<label class="textLeft" for="password">Password
					<input name="password" type="password" id="password" class="loginInputs" maxlength="20" placeholder="Password" required="required" />
				</label>
				
				<label class="textLeft create-account signupHeader" for="loginAccount">Account Name
					<input name="account" type="text" name="account" id="loginAccount" class="loginInputs create-account" maxlength="16" placeholder="Account Name" required="required" />
				</label>
				
				<label class="signupHeader create-account" for="promoCode">Promo Code
					<input name="promo" type="text" id="promoCode" class="loginInputs create-account" maxlength="20" placeholder="Promo Code" />
				</label>
				
				<div id="tosWrap" class="create-account">
					<span id="tos" class="aqua">
						<a target="_blank" href="//nevergrind.com/blog/terms-of-service/">Terms of Service</a> | <a target="_blank" href="//nevergrind.com/blog/privacy-policy/">Privacy Policy</a>
					</span>
				</div>
				
				<input id="login" type="submit" value="Create Account" class="btn btn-primary strongShadow" />
			</fieldset>
						
			<hr class="fancy-hr">
			<div>Problems?</div>
			<div>Contact: support@nevergrind.com</div>
		</form>';
	?>
	</div><!-- window 2 -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<script>
	$.ajaxSetup({
		type: 'POST',
		url: '/php/master1.php'
	});
	var fadeTimer = new TweenMax.delayedCall(0, '');;
	function fadeOut(){
		fadeTimer.kill();
		fadeTimer = TweenMax.to('.message', 0, {
			opacity: 1,
			display: 'block',
			onComplete: function(){
				TweenMax.to('.message', 1, {
					delay: 8,
					opacity: 0,
					onComplete: function(){
						TweenMax.set('.message', {
							display: 'none'
						});
					}
				});
			}
		});
	}
	function QMsg(msg){
		var str = "<p>" + msg + "</p>";
		$(".message").html(str);
		fadeOut();
	}
	function createAccount(f) {
		if (createAccountLock === true) {
			return false;
		}
		var pw = $("#password").val();
		var acc = $("#loginAccount").val();
		
		if (acc.length < 2) {
			QMsg("Your account name must be more than two characters long.");
			return false;
		}
		if (acc.length > 16) {
			QMsg("Your account name must be less than 16 characters long.");
			return false;
		}
		var tempAcc = acc.replace('_', '');
		if (tempAcc.match(/[a-z0-9]/gi, '').length < tempAcc.length) {
			QMsg("Your account name should only contain letters, numbers, and underscores.");
			return false;
		}
		if (pw.length < 6) {
			QMsg("Your password must be at least six characters long.");
			return false;
		}
		QMsg("Connecting to server...");
		createAccountLock = true;
		/*,
			referral: $("#referFriend").val().toLowerCase()
		*/
		$.ajax({
			data: {
				run: "createAccount",
				email: $("#loginEmail").val().toLowerCase(),
				account: acc.toLowerCase(),
				password: pw,
				promo: $("#promoCode").val().toLowerCase()
			}
		}).done(function(data) {
			if (data.indexOf("Account Created") === -1){
				QMsg(data);
			} else {
				QMsg(data + " Redirecting!");
				setTimeout(function(){
					location.replace("//" + location.host + (sessionStorage.getItem('refer') || ''));
				}, 100);
			}
			createAccountLock = false;
		}).fail(function() {
			QMsg("Could not contact the server!");
		});
		return false; // prevent form submission
	}
	$('#login').on('click', function() {
		createAccount();
	});
	
	var focusInputs = false,
		createAccountLock = false;
		
	$(".loginInputs").on('focus', function() {
		focusInputs = true;
	}).on('blur', function() {
		focusInputs = false;
	});
	
	$(document).on('keydown',function(e){
		// hit enter
		if(e.keyCode===13){
			createAccount();
		}
	});
	$(function(){
		$("#loginEmail").focus();
	});
	</script>
	<?php
		require($_SERVER['DOCUMENT_ROOT'] . "/includes/ga.html");
	?>
</body>
</html>