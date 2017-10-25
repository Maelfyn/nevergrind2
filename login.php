<?php
	session_start();
	
	if($_SERVER["SERVER_NAME"] === "localhost"){
		error_reporting(E_ALL);
		ini_set('display_errors', true);
	}
	require('php/values.php');
	$refer = isset($_GET['back']) ? $_GET['back'] : "/";
	
	if (isset($_SESSION['email']) && isset($_SESSION['account'])){
		if(strlen($_SESSION['email']) > 0){
			header("Location: ". $refer);
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
			max-width: 1920px
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
			margin: 5px auto
		}
		.abcRioButtonBlue .abcRioButtonIcon {
			border-radius: 5px !important
		}
		.abcRioButtonBlue {
			border-radius: 5px !important
		}
		#divider{
			margin: 8px 0
		}
		#currencyIndicator{
			width: 100%
		}
		#mainBG{
			width: 100%;
			height: 1080px;
			background: url('/images/bg/ng2-bg.jpg')
		}
		label{
			font-weight: normal;
			display: block;
			margin: .1em 0
		}
		#login{
			border: 1px solid #000;
			width: 240px;
			border-radius: 5px;
		}
		#createAccount{
			color: #aef;
			font: 14px;
		}
		#createAccount:hover{
			color: #fff
		}
		#forgotPassword{
			color: #fff
		}
		.textLeft, .signupHeader{
			margin-top: .375em
		}
		.loginInputs{
			background: #132239;
			border: 1px solid #357
		}
		.hide{
			display: none
		}
		#rememberMe{
			position: relative;
			top: 2px
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
				0 0 60px #000
		}
	</style>
</head>

<body id="body">
	<div id="fb-root"></div>
<script>
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=737706186279455";
		fjs.parentNode.insertBefore(js, fjs);
		//console.info("ATTEMPTING FB LOGIN...");
	}(document, 'script', 'facebook-jssdk'));
</script>
	<div id="mainBG">
		<header id="currencyIndicator" class="strongShadow">
		<img style="margin: 4px 0 0 2px; display: inline-block" 
		src="/images/neverworks-txt.png">
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
						<p>Login with your Neverworks Account or <a id="createAccount" href="/createAccount.php?back=' . $refer . '" class="strongShadow">Create an Account</a></p>
						<label class="textLeft" for="loginEmail">Account or Email Address
							<input name="username" type="text" id="loginEmail" class="loginInputs" maxlength="255" placeholder="Account or Email Address" required="required" />
						</label>
						
						<label class="textLeft" for="password">Password
							<input name="password" type="password" id="password" class="loginInputs" maxlength="20" placeholder="Password" required="required" />
						</label>
						
						<label for="rememberMe">
							<input type="checkbox" id="rememberMe" name="rememberMe" checked> Remember Me
						</label>
						
						<input id="login" type="submit" value="Login" class="btn btn-primary strongShadow" />
						
						<div id="forgotPasswordWrap">
							<a title="Neverworks Games will send you an email. Click the link to reset your password." id="forgotPassword">Forgot Password?</a>
						</div>
						
						
						<hr class="fancy-hr">
						
						<p>Or login with existing accounts:</p>
						
						<div id="google-wrap">
							<span id="my-signin2"></span>
						</div>
						
						<fb:login-button 
							data-width="176" 
							data-max-rows="1" 
							data-size="large" 
							data-button-type="login_with" 
							data-show-faces="false" 
							data-auto-logout-link="false" 
							data-use-continue-as="false"
							scope="public_profile,email" >
						</fb:login-button>

						<hr class="fancy-hr">
						<div>Problems?</div>
						<div>Contact: support@nevergrind.com</div>
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
// FB SSO
window.fbAsyncInit = function() {
	FB.init({
		appId: '737706186279455',
		cookie: true,
		xfbml: true,
		version: 'v2.8'
	});
	FB.getLoginStatus(function(response) {
		//console.log("FB.getLoginStatus ", response);
		fbLoginCallback(response);
	});
	
	FB.Event.subscribe('auth.authResponseChange', function(response){ 
		//console.info("auth.authResponseChange", response);
		response.status === 'connected' && fbLoginCallback(response);
	});
}

function fbLoginCallback(response){
	//console.info("fbLoginCallback: ", response);
	if (response && response.status === 'connected') {
		// Logged into your app and Facebook.
		var token = response.authResponse.accessToken;
		if (token){
			authenticationLock = true;
			FB.api('/me', {
				fields: 'email'
			}, function(response) {
				//console.log('Successful FB graph response: ', response);
				$.ajax({
					type: 'POST',
					data: {
						run: "authenticate",
						facebookToken: token
					}
				}).done(function(data){
					//console.info('FB authenticate response: ', data);
					if (data === 'Create an account name!'){
						// redirect to 
						var to = '//nevergrind.com/setAccount.php' + $("#refer").attr("href");
						//console.info("Redirecting to: ", to);
						window.location = to;
					} else {
						// it's coming out here for some reason
						gotoRefer(data);
					}
				}).fail(function() {
					QMsg("Facebook credentials could not be verified!");
				}).always(function(){
					authenticationLock = false;
				});
			});
		} else {
			console.info("No tokens found");
			QMsg("Facebook credentials could not be verified.");
		}
	}
}

// google SSO
function renderButton() {
	// console.info("Rendering google button");
	gapi.signin2.render('my-signin2', {
		scope: 'profile email openid',
		width: 240,
		height: 40,
		longtitle: true,
		theme: 'dark',
		onsuccess: function(googleUser){
			var token = googleUser.getAuthResponse().id_token;
			if (token){
				authenticationLock = true;
				
				$.ajax({
					type: 'POST',
					data: {
						run: "authenticate",
						googleToken: token
					}
				}).done(function(data){
					if (data === 'Create an account name!'){
						// redirect to 
						var to = '//nevergrind.com/setAccount.php' + $("#refer").attr("href");
						//console.info("Redirecting to: ", to);
						window.location = to;
					} else {
						// it's coming out here for some reason
						gotoRefer(data);
					}
				}).fail(function() {
					QMsg("Google credentials could not be verified!");
				}).always(function(){
					authenticationLock = false;
				});
			}
		},
		onfailure: function(){
			console.log('error: ', error);
		}
	});
}

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
	console.info("Token authenticate!");
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
			console.error(data);
		}
	}
}

(function(){
	email = localStorage.getItem('email');
	token = localStorage.getItem('token');
	
	if (email){
		// attempt persistent login
		/*
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
		*/
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