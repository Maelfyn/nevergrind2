// modal
var modalTemplate = '<div id="login-backdrop"></div>' +
'<div id="login-container">'+
'<form id="loginWrap"'+
	'accept-charset="UTF-8"'+
	'class="strongShadow"'+
	'method="post"'+
	'onSubmit="return loginAuthenticate(this);">'+
	'<fieldset>'+
	'<p>Login with your Neverworks Account or '+
	'<a id="createAccount" href="/createAccount.php?" class="strongShadow">Create an Account</a></p>'+
	'<label class="textLeft" for="loginEmail">Account or Email Address'+
		'<input name="username" type="text" id="loginEmail" class="loginInputs" maxlength="255" placeholder="Account or Email Address" required="required" />'+
	'</label>'+

	'<label class="textLeft" for="password">Password'+
	'<input name="password"'+
		'type="password"'+
		'id="password"'+
		'class="loginInputs"'+
		'maxlength="20"'+
		'placeholder="Password"'+
		'autocomplete="current-password"'+
		'required="required" />'+
	'</label>'+

	'<label for="rememberMe">'+
		'<input type="checkbox" id="rememberMe" name="rememberMe" checked> Remember Me'+
	'</label>'+

	'<input id="login-btn" type="submit" value="Login" class="btn btn-primary strongShadow" />'+

	'<div class="error-msg blackOutline3"></div>'+

	'<div id="forgotPasswordWrap">'+
		'<a title="Neverworks Games will send you an email. Click the link to reset your password." id="forgotPassword">Forgot Password?</a>'+
	'</div>'+


	'<hr class="fancy-hr">'+

	'<p>Or login with existing accounts:</p>'+

	'<div id="google-wrap">'+
		'<span id="my-signin2"></span>'+
		'</div>'+

		'<a id="twitter-wrap" href="/twitterLogin.php">'+
		'<div id="twitter-icon-wrap">'+
		'<i id="twitter-icon" class="fa fa-twitter"></i>'+
		'</div>'+
		'<div id="twitter-text">Sign in with Twitter</div>'+
	'</a>'+

	'<div id="fb-root"></div>'+

	'<fb:login-button'+
		'class="fb_button"'+
		'data-width="176"'+
		'data-max-rows="1"'+
		'data-size="large"'+
		'data-button-type="login_with"'+
		'data-show-faces="false"'+
		'data-auto-logout-link="false"'+
		'data-use-continue-as="false"'+
		'scope="public_profile,email"'+
		'onlogin="checkLoginState();">'+
	'</fb:login-button>'+

	'<hr class="fancy-hr">'+
	'<div>Problems?</div>'+
	'<div>Contact: support@nevergrind.com</div>'+
'</fieldset>'+
'</form>'+
'</div>';
document.getElementById('login-modal').innerHTML = modalTemplate;
/*

<link rel="stylesheet" href="css/ng2.<?php
	echo $_SERVER["SERVER_NAME"] === "localhost" ? '' : 'min.'; ?>css?v=<?php echo $version;
?>">
 */
sessionStorage.setItem('refer', location.pathname);
// FB SSO
window.fbAsyncInit = function() {
	console.warn("fbAsyncInit called!");
	FB.init({
		appId: '737706186279455',
		cookie: true,
		xfbml: true,
		version: 'v2.8'
	});
	FB.getLoginStatus(function(response) {
		console.info('getLoginStatus response: ', response);
		fbLoginCallback(response);
	});
	// only triggers upon login event
	FB.Event.subscribe('auth.authResponseChange', function(response){
		console.info('auth.authResponseChange ', response);
		//response.status === 'connected' && fbLoginCallback(response);
	});
}
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		console.info('checkLoginState ', response);
		fbLoginCallback(response);
	});
}
function fbLoginCallback(response){
	if (response && response.status === 'connected') {
		// Logged into your app and Facebook.
		var token = response.authResponse.accessToken;
		if (token){
			console.info('Token: ', token);
			loginAuthenticationLock = true;
			FB.api('/me', {
				fields: 'email'
			}, function(response) {
				console.info('FB authenticate request: ');
				$.ajax({
					type: 'POST',
					url: '/php/master1.php',
					data: {
						run: 'authenticate',
						facebookToken: token
					}
				}).done(function(data){
					console.info('FB authenticate response: ', data);
					if (data === 'Create an account name!'){
						// redirect to
						var to = '//nevergrind.com/setAccount.php';
						window.location = to;
					} else {
						// it's coming out here for some reason
						loginGotoRefer(data);
					}
				}).fail(function(data) {
					loginMsg(data.statusText);
				}).always(function(){
					loginAuthenticationLock = false;
				});
			});
		} else {
			console.info("No tokens found");
			loginMsg("Facebook credentials could not be verified.");
		}
	}
}

// google SSO
function loginRenderButton() {
	gapi.load('auth2', function() {
		gapi.auth2.init();
		//console.info("Rendering google button");
		gapi.signin2.render('my-signin2', {
			scope: 'profile email openid',
			width: 240,
			height: 40,
			longtitle: true,
			theme: 'dark',
			onsuccess: function(googleUser){
				var token = googleUser.getAuthResponse().id_token;
				if (token){
					loginAuthenticationLock = true;
					console.info('Google authenticate request: ');
					$.ajax({
						type: 'POST',
						url: '/php/master1.php',
						data: {
							run: 'authenticate',
							googleToken: token
						}
					}).done(function(data){
						if (data === 'Create an account name!'){
							// redirect to
							var to = '//nevergrind.com/setAccount.php';
							window.location = to;
						} else {
							// it's coming out here for some reason
							loginGotoRefer(data);
						}
					}).fail(function(data) {
						loginMsg(data.statusText);
					}).always(function(){
						loginAuthenticationLock = false;
					});
				}
			},
			onfailure: function(){
				console.log('error: ', error);
			}
		});
	});
}

var loginFadeTimer = new TweenMax.delayedCall(0, '');;
function fadeOut(){
	loginFadeTimer.kill();
	loginFadeTimer = TweenMax.to('.error-msg', 0, {
		opacity: 1,
		display: 'block',
		onComplete: function(){
			TweenMax.to('.error-msg', 1, {
				delay: 8,
				opacity: 0
			});
		}
	});
}
function loginMsg(msg){
	var str = "<p>" + msg + "</p>";
	$(".error-msg").html(str);
	fadeOut();
}
$('#login').on('click', function() {
	loginAuthenticate();
});
$("#forgotPassword").on('click', function() {
	if (this.textContent === "Checking...") {
		return;
	}
	var email = $("#loginEmail").val().toLowerCase();
	var msg = "Forgot Password?";
	$("#forgotPassword").text("Checking...");
	if (!email || email.length < 3) {
		loginMsg("Enter a valid email address");
		$("#forgotPassword").text(msg);
		return;
	}
	loginMsg("Checking account status...");
	$.ajax({
		url: '/php/master1.php',
		data: {
			run: "forgotPassword",
			email: email
		}
	}).done(function(data){
		loginMsg(data, 0, 0, 8000);
		$("#forgotPassword").text(msg);
	});
});

var loginFocusInput = false,
	loginAuthenticationLock = false;

$(".loginInputs").on('focus', function() {
	loginFocusInput = true;
}).on('blur', function() {
	loginFocusInput = false;
});

$('.loginInputs').on('keydown', function(e){
	// hit enter
	if(e.keyCode === 13){
		loginAuthenticate();
	}
});
function loginAuthenticate(f) {
	if (loginAuthenticationLock === true) {
		return false;
	}
	if ($("#loginEmail").val().length < 3) {
		loginMsg("This is not a valid email address.");
		return false;
	}
	if ($("#password").val().length < 6 && !token) {
		loginMsg("Passwords must be at least six characters long.");
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
	loginMsg("Connecting to server...");
	loginAuthenticationLock = true;

	console.info('loginAuthenticate request: ');
	$.ajax({
		type: 'POST',
		url: '/php/master1.php',
		data: {
			run: 'authenticate',
			email: login,
			password: $("#password").val()
		}
	}).done(function(data){
		loginGotoRefer(data);
	}).fail(function(data) {
		loginMsg(data.statusText);
	}).always(function(){
		loginAuthenticationLock = false;
	});
	return false; // prevent form submission
}
function loginTokenAuthenticate(){
	console.info("Token authenticate!");
	$.ajax({
		type: 'POST',
		url: '/php/master1.php',
		data: {
			run: 'authenticate',
			email: email,
			token: token
		}
	}).done(function(data){
		loginGotoRefer(data, true);
	}).always(function(){
		document.getElementsByTagName('body')[0].style.visibility = 'visible';
	});
}
function loginGotoRefer(data, suppress){
	var target = "//" + location.host + sessionStorage.getItem('refer') || '';
	if (data === 'Create an account name!'){
		location.replace("//" + location.host + '/setAccount.php');
	} else if (data === "Login successful!"){
		location.replace(target);
	} else {
		if (!suppress){
			loginMsg(data);
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
			loginTokenAuthenticate();
		} else {
			$("#password").focus();
			$.ajax({
				url: '/php/master1.php',
				type: 'POST',
				data: {
					run: "getToken",
					email: email
				}
			}).done(function(data){
				token = data;
			}).always(function(){
				document.getElementsByTagName('body')[0].style.visibility = 'visible';
			});
		}
		*/
	} else {

		$("#loginEmail").focus();
		document.getElementsByTagName('body')[0].style.visibility = 'visible';
	}
})();

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=737706186279455";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


// only try if not logged in
kongregateAPI.loadAPI(function(){

	function loginKong(){
		loginAuthenticationLock = true;
		var kongGames = {
			'/': 'ng', // TODO: this changes later
			'/ng2-test-server/': 'ng2',
			'/classic': 'ng',
			'/games/firmament-wars/': 'fw'
		};
		var o = {
			kongUserName: kongregate.services.getUsername(),
			kongToken: kongregate.services.getGameAuthToken(),
			kongGame: kongGames[location.pathname],
			run: 'authenticate'
		}
		//console.info('kong creds: ', o);
		$.ajax({
			type: 'POST',
			url: '/php/master1.php',
			data: o
		}).done(function(data){
			//console.info('KONG: ', data);
			if (data === 'Create an account name!'){
				// redirect to
				var to = '//nevergrind.com/setAccount.php' + (sessionStorage.getItem('refer') || '');
				window.location = to;
			} else {
				// it's coming out here for some reason
				loginGotoRefer(data);
			}
		}).fail(function(data) {
			loginMsg(data.statusText);
		}).always(function(){
			loginAuthenticationLock = false;
		});
	}
	kongregate = kongregateAPI.getAPI();
	if (!kongregate.services.isGuest()) {
		loginKong();
	} else {
		kongregate.services.addEventListener('login', function () {
			loginKong();
		});
	}
});