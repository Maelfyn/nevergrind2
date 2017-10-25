<?php
	$currentPlayers = 0;
	session_start();
	if($_SERVER["SERVER_NAME"] === "localhost"){
		error_reporting(E_ALL);
		ini_set('display_errors', true);
	} else {
		error_reporting(0);
	}
	require('php/connect1.php');
	require('php/values.php');
	
	if (!isset($_SESSION['guest'])){
		// first visit
		if ( !isset($_SESSION['email']) && !isset($_SESSION['account']) ){
			// guests
			mysqli_query($link, "insert into fwguests (`row`) VALUES (null)");
			$guestId = mysqli_insert_id($link);
			$_SESSION['guest'] = 1;
			$_SESSION['account'] = 'guest_'. $guestId;
		} else {
			// logged in - not a guest
			$_SESSION['guest'] = 0;
		}
	} else { 
		// guest already determined
		if (strpos($_SESSION['account'], '_') !== FALSE){
			$_SESSION['guest'] = 1;
		} else {
			$_SESSION['guest'] = 0;
		}
	}
?>
<!DOCTYPE html> 
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head id='head'>
	<title>Nevergrind Online | Free Multiplayer Browser RPG</title>
	<meta charset="utf-8">
	<meta name="keywords" content="realtime, rpg, browser, multiplayer, online, web, html5">
	<meta name="description" content="A free web-based multiplayer browser RPG playable in your web browser! Go forth to conquer in this fast-paced action RPG!">
	<meta name="author" content="Joe Leonard">
	<meta name="referrer" content="always">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
	
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no">
	<meta name="google-signin-client_id" content="1015425037202-g5ri6qnj14b8vrk33lnu130ver9f43ef.apps.googleusercontent.com">
	<meta name="google-site-verification" content="iC9l4midOGIXERCwagfpkef9ifunV-aZd_zlUUOPjIU" />
	
	<link rel="stylesheet" href="css/bootstrap4.min.css">
	<!--link rel="stylesheet" href="css/bootstrap-slider.min.css"-->
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<link rel="stylesheet" href="css/ng2.css?v=0-0-1">
	<link rel="shortcut icon" href="/images/favicon.png">
	
	<script>
		var g = {
			version: '0-0-1'
		};
	</script>
</head>

<body id="body">
<script>
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=737706186279455";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
</script>
	<div id="ng2-logo-wrap">
		<img src="images/bg/ng2-bg.jpg" id="ng2-bg" alt="Firmament Wars Background">
	</div>
	
	<div id="title-wrap">
	
		<header id="title-header" class="text-primary text-shadow">
			<?php
			if (isset($_SESSION['email'])){
				echo '<a id="logout" class="btn btn-primary btn-responsive">Logout '. $_SESSION['account'] .'</a>';
			} else {
				echo '<a id="login" class="btn btn-primary btn-responsive" href="/login.php?back=/">Login</a>';
			}
			?>
			<i id="options" class="pointer options fa fa-volume-up"></i>
			<div class="pull-right text-primary">
				<a href="//twitch.tv/maelfyn" target="_blank">
					<i class="fa fa-twitch text-primary pointer"></i>
				</a>
				<a href="//youtube.com/c/Maelfyn" target="_blank">
					<i class="fa fa-youtube text-primary pointer"></i>
				</a>
				<a href="//www.facebook.com/neverworksgames" target="_blank">
					<i class="fa fa-facebook text-primary pointer"></i>
				</a>
				<a href="//twitter.com/maelfyn" target="_blank">
					<i class="fa fa-twitter text-primary pointer"></i>
				</a>
			</div>
		</header>
		
		<div id="title-container-wrap">
			<div id="title-container" class="container-fluid shadow4">
				
				<div id="title-menu" class="ng-primary row">
					<div class="col-5">
						<h1>
							<div>Nevergrind 2</div>
							<div>Multiplayer Browser RPG</div>
							<div class="text-small">a free online web game by<div>
							<a class="neverworks" href="https://www.linkedin.com/company/neverworks-games-llc">
								<img src="images/neverworks-txt.png">
							</a>
						</h1>
						<img id="ng2-logo" src="images/ng_logo_532x428.png">
					</div>
					<div class="col"></div>
				</div>
			</div>
		</div>
		
		<img style="position: absolute; bottom: 0; left: 0; width: 140px" 
				src="/images/neverworks.png">
	</div> <!-- end title-wrap -->

	<div id="game-wrap" class="portal">
		<div id="hud" class="shadow4"></div>
	</div> <!-- end game-wrap -->

	<audio id="bgmusic" autoplay loop preload="auto"></audio>
	
		
	<div id="title-backdrop"></div>
	<div id="screen-flash" class="overlay"></div>
	<div id="overlay" class="overlay"></div>
	<div id="msg" class="shadow4"></div>
</body>

<script>
	function googleSsoSignIn(){
		gapi.load('auth2', function() {
			gapi.auth2.init();
		});
	}
</script>
<script src="js/libs/TweenMax.min.js"></script>
<script src="js/libs/jquery.min.js"></script>
<script src="js/libs/Draggable.min.js"></script>
<script src="js/libs/DrawSVGPlugin.min.js"></script>
<script src="js/libs/SplitText.min.js"></script>
<script src="js/libs/popper.min.js"></script>
<script src="js/libs/bootstrap4.min.js"></script>
<script src="js/libs/easelJS.min.js"></script>
<script src="js/libs/EaselPlugin.min.js"></script>
<script src="js/libs/autobahn.min.js"></script>
<script src="//apis.google.com/js/platform.js?onload=googleSsoSignIn" async defer></script>
<?php
require $_SERVER['DOCUMENT_ROOT'] . '/includes/ga.php';
?>
<script>
<?php
echo 'var chat = {};
	g.guest = '. $_SESSION['guest'] .';
	// set channel
	if (location.hash.length > 1){
		chat.channel = location.hash.slice(1);
	} else {
		chat.channel = "usa-" + (~~(Math.random()*'. ($currentPlayers / 1000) .') + 1);
	}'; 
?>
(function(d, scripts){
	if (location.host === 'nevergrind.com' || 
		location.hash === '#test'){
		scripts = [
			'nevergrind2'
		]
	} else {
		scripts = [
			'init',
			'g',
			'env',
			'my',
			'dom',
			'video',
			'audio',
			'game',
			'title',
			'events',
			'socket',
			'chat'
		]
	}
	for(var i=0, len=scripts.length; i<len; i++){
		var x = d.createElement('script');
		x.src = 'js/' + scripts[i]+'.js?v=' + g.version;
		x.async = false;
		d.head.appendChild(x);
	}
})(document, []);

</script>
</html>