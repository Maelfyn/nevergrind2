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
	
	$refer = isset($_GET['back']) ? $_GET['back'] : "/";
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Nevergrind | Login & Account Creation</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="google-signin-client_id" content="1015425037202-g5ri6qnj14b8vrk33lnu130ver9f43ef.apps.googleusercontent.com">
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
		.abcRioButton{
			margin: 5px auto;
		}
		#divider{
			margin: 8px 0;
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
			padding: 10px 0;
			border-radius: 6px;
			border: 2px ridge #337ab7;
			background: rgba(0,0,0,.9);
			box-shadow: 0 0 4px #000;
		}
	</style>
</head>

<body id="body">
	<div id="mainBG">
		<header id="currencyIndicator" class="strongShadow">
		<?php
			echo "<div class='modePanel'>";
				echo "Login to Nevergrind.com";
			echo '</div>';
		?>
		</header>
		<div class="message blackOutline3"></div>
	<?php
		if (isset($_GET['reset'])){
			echo 
				'<form id="loginWrap" class="strongShadow">
					<div>Reset Your Password</div>
					<div class="textLeft">Password</div>
					<input type="password" id="resetPassword" class="loginInputs" maxlength="20" placeholder="Password" />
					<div class="textLeft">Re-type Password</div>
					<input type="password" id="resetVerifyPassword" class="loginInputs" maxlength="20" placeholder="Verify Password" />
					<div id="resetPW" class="strongShadow NGgradient">Reset Password</div>
				</form>';
		} else {
			echo 
				'<form id="loginWrap" accept-charset="UTF-8" class="strongShadow" onSubmit="return authenticate(this);">
					<fieldset>
						<div id="createAccountWrap">
							<a id="createAccount" href="/createAccount.php?back=' . $refer . '" class="btn btn-primary strongShadow">Create Account</a>
						</div>
						
						<label class="textLeft" for="loginEmail">Account or Email Address
							<input name="username" type="text" id="loginEmail" class="loginInputs" maxlength="255" placeholder="Account or Email Address" required="required" />
						</label>
						
						<label class="textLeft" for="password">Password
							<input name="password" type="password" id="password" class="loginInputs" maxlength="20" placeholder="Password" required="required" />
						</label>
						
						<label for="rememberMe">
							<input type="checkbox" id="rememberMe" name="rememberMe" checked> Remember Me
						</label>
						
						<input id="login" type="submit" value="Login" class="btn btn-primary strongShadow" />';
						
						echo '
						<hr class="fancy-hr">
						<div id="divider">Or Authenticate Using Google</div>
						<div id="google-wrap">
							<span id="my-signin2"></span>
						</div>';
						
						echo'
						<hr class="fancy-hr">
						<div id="forgotPasswordWrap">
							<span title="Neverworks Games will send you an email. Click the link to reset your password." id="forgotPassword">Forgot Password?</span>
						</div>
					</fieldset>
				</form>';
		}
		echo "<a id='refer' style='display:none' href='{$refer}'></a>";
	?>
	</div>
	<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>
	<script>
	
	function onSuccess(googleUser) {
		var token = googleUser.getAuthResponse().id_token;
		var user = googleUser.getBasicProfile();
		
		if (token){
			authenticationLock = true;
			
			$.ajax({
				type: 'POST',
				data: {
					run: "authenticate",
					googleToken: token
				}
			}).done(function(data){
				if (data === 'Account created!' ||
					data === 'Create an account name!'){
					// redirect to 
					location.replace('/setAccount.php' + $("#refer").attr("href"));
				} else {
					gotoRefer(data);
				}
			}).fail(function() {
				QMsg("Google credentials could not be verified!");
			}).always(function(){
				authenticationLock = false;
			});
		}
	}
	function onFailure(error) {
	  console.log('error: ', error);
	}
	function renderButton() {
		gapi.signin2.render('my-signin2', {
			scope: 'profile email openid',
			width: 176,
			height: 40,
			longtitle: false,
			theme: 'dark',
			onsuccess: onSuccess,
			onfailure: onFailure
		});
	}
	
	$.ajaxSetup({
		type: 'POST',
		url: '/php/master1.php'
	});
	function QMsg(msg){
		var str = "<p>" + msg + "</p>";
		$(".message").html(str);
	}
	$('#login').on('click', function() {
		authenticate();
	});
	$("#forgotPassword").on('click', function() {
		if (this.textContent === "Checking...") {
			return;
		}
		var email = $("#loginEmail").val().toLowerCase();
		var msg = "Forgot Password?";
		$("#forgotPassword").text("Checking...");
		if (!email || email.length < 3) {
			QMsg("Enter a valid email address");
			$("#forgotPassword").text(msg);
			return;
		}
		QMsg("Checking account status...");
		$.ajax({
			data: {
				run: "forgotPassword",
				email: email
			}
		}).done(function(data){
			QMsg(data, 0, 0, 8000);
			$("#forgotPassword").text(msg);
		});
	});
	
	var focusInput = false,
		authenticationLock = false;
		
	$(".loginInputs").on('focus', function() {
		focusInput = true;
	}).on('blur', function() {
		focusInput = false;
	});
	
	$(document).on('keydown',function(e){
		// hit enter
		if(e.keyCode === 13){
			authenticate();
		}
	});
	function authenticate(f) {
		if (authenticationLock === true) {
			return false;
		}
		if ($("#loginEmail").val().length < 3) {
			QMsg("This is not a valid email address.");
			return false;
		}
		if ($("#password").val().length < 6 && !token) {
			QMsg("Passwords must be at least six characters long.");
			return false;
		}
		var login = $("#loginEmail").val().toLowerCase();
		var setToken = false;
		if ($("#rememberMe").prop('checked')){
			localStorage.setItem('email', login);
			localStorage.setItem('token', token);
			setToken = true;
		} else {
			localStorage.removeItem('email');
		}
		QMsg("Connecting to server...");
		authenticationLock = true;
		
		$.ajax({
			type: 'POST',
			data: {
				run: "authenticate",
				email: login,
				password: $("#password").val()
			}
		}).done(function(data){
			gotoRefer(data);
		}).fail(function() {
			QMsg("Could not contact the server!");
		}).always(function(){
			authenticationLock = false;
		});
		return false; // prevent form submission
	}
	function tokenAuthenticate(){
		$.ajax({
			type: 'POST',
			data: {
				run: "authenticate",
				email: email,
				token: token
			}
		}).done(function(data){
			gotoRefer(data, true);
		}).always(function(){
			document.getElementById('body').style.visibility = 'visible';
		});
	}
	function gotoRefer(data, suppress){
		var target = "//" + location.host + $("#refer").attr("href");
		if (data === "Login successful!"){
			location.replace(target);
		} else {
			if (!suppress){
				QMsg(data);
			}
		}
	}
	
	(function(){
		email = localStorage.getItem('email');
		token = localStorage.getItem('token');
		
		if (email){
			// attempt persistent login
			$("#loginEmail").val(email);
			if (token){
				tokenAuthenticate();
			} else {
				$("#password").focus();
				$.ajax({
					type: 'POST',
					data: {
						run: "getToken",
						email: email
					}
				}).done(function(data){
					token = data;
				}).always(function(){
					document.getElementById('body').style.visibility = 'visible';
				});
			}
		} else {
			
			$("#loginEmail").focus();
			document.getElementById('body').style.visibility = 'visible';
		}
	})();
	</script>
	<?php
		require($_SERVER['DOCUMENT_ROOT'] . "/includes/ga.html");
	?>
</body>
</html>