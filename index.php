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
?>
<!DOCTYPE html> 
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head id='head'>
	<title>Nevergrind Online | Free Multiplayer Browser RPG</title>
	<meta charset="utf-8">
	<meta name="keywords" content="realtime, rpg, browser, multiplayer, online, web, html5">
	<meta name="description" content="A free web-based cooperative multiplayer browser RPG! Gather your friends and go forth to conquer in this roguelike dungeon crawler!">
	<meta name="author" content="Joe Leonard">
	<meta name="referrer" content="always">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
	
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no">
	<meta name="google-signin-client_id" content="1015425037202-g5ri6qnj14b8vrk33lnu130ver9f43ef.apps.googleusercontent.com">
	<meta name="google-site-verification" content="iC9l4midOGIXERCwagfpkef9ifunV-aZd_zlUUOPjIU" />
	
	<link rel="stylesheet" href="css/all.min.css">
	<!--link rel="stylesheet" href="css/bootstrap-slider.min.css"-->
	<?php
	if (!isset($_SESSION['account'])){
		require $_SERVER['DOCUMENT_ROOT'] . "/includes/loginCss.html";
	}
	?>
	<link rel="stylesheet" href="css/ng2.css?v=0-0-9">
	<link rel="shortcut icon" href="/images/favicon.png">
	<script>
		var g = {
			version: '0-0-9'
		};
	</script>
</head>

<body id="body">
<div id="landscape">
	<div id="ng2-logo-wrap">
		<img src="images/bg/ng2-bg.jpg" id="ng2-bg" alt="Nevergrind 2 Background">
		<img style="position: absolute; bottom: 0; left: 0; width: 140px" 
				src="/images/neverworks.png">
	</div>
	
	<?php
	if (!isset($_SESSION['account'])){
		$backdrop = 1;
		require $_SERVER['DOCUMENT_ROOT'] . "/includes/loginModal.php";
		require $_SERVER['DOCUMENT_ROOT'] . "/includes/loginRefer.php";
	}
	?>
	<div id="title-scene-select-character">
	
		<header id="title-header" class="text-primary text-shadow">
			<?php
			if (isset($_SESSION['account']) && !isset($_SESSION['kong'])){
				echo '<a id="logout" class="btn btn-primary btn-sm pointer">Logout '. $_SESSION['account'] .'</a>';
			} else if (isset($_SESSION['kong'])){
				echo $_SESSION['account'];
			}
			?>
			<i id="options" class="pointer options fa fa-volume-up"></i>
			<div class="pull-right text-primary">
				<a href="//twitch.tv/maelfyn">
					<i class="fa fa-twitch text-primary pointer"></i>
				</a>
				<a href="//youtube.com/c/Maelfyn">
					<i class="fa fa-youtube text-primary pointer"></i>
				</a>
				<a href="//discord.gg/n2gp8rC">
					<i class="fa fa-discord text-primary pointer"></i>
				</a>
				<a href="//www.facebook.com/maelfyn">
					<i class="fa fa-facebook text-primary pointer"></i>
				</a>
				<a href="//twitter.com/maelfyn">
					<i class="fa fa-twitter text-primary pointer"></i>
				</a>
			</div>
		</header>
		
		<div id="title-screen-wrap" class="container-fluid text-shadow">
			<div id="title-menu-wrap" class="row title-menu-row stag-blue">
				<div class="col-6">
					<div class="title-ch-create-col">
						<h1>
							<div>Nevergrind 2<br>
								Cooperative Multiplayer<br>
								Browser RPG
							</div>
							<div class="small">a free online web game by</div>
							<img class="neverworks" src="images/neverworks-txt.png" alt="Neverworks Games">
							<hr class="fancy-hr-dark">
						</h1>
						<img id="ng2-logo" src="images/ng_logo_532x428.png">
					</div>
				</div>
				
				<div class="col-6">
					<div id="title-select-character" class="title-ch-create-col">
						<!-- well top -->
						<div id="title-well-top" class="title-ch-well ng-blue text-center">
							<a id="delete-character" 
								class="btn btn-secondary btn-lg title-ch-btn">
								Delete
							</a>
						</div>
						<!-- char cards -->
						<div id="ch-card-base">
							<div id="ch-card-wrap" class="stag-blue">
								<div id="ch-card-list">
									<div class="btn btn-info btn-lg ch-card center">
										<div class="ch-card-name">Maelfyn</div>
										<div class="ch-card-details">50 Half Elf Ranger</div>
									</div>
								</div>
								
								<div id="go-create-character" 
									class="btn btn-info btn-lg ch-card center">
									Create Character
								</div>
							</div>
						</div>
						<!-- well bottom -->
						<div id="title-well-bottom" class="title-ch-well ng-blue text-center">
							<a id="enter-world" 
								class="btn btn-secondary btn-sm title-ch-btn">
								Enter World
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div> <!-- end title-scene-select-character -->
	
	<div id="title-scene-create-character" class="none">
		
		<div id="create-character-wrap" class="container-fluid text-shadow">
			<div class="row title-menu-row stag-blue">
				<div class="col-3 tight">
					<div class="title-ch-create-col">
					
						<div id="race-wrap">
							<div class="select-create-wrap">
								<div class="select-race">Barbarian</div>
							</div>
							<div class="select-create-wrap">
								<div class="select-race">Dark Elf</div>
							</div>
							<div class="select-create-wrap">
								<div class="select-race">Dwarf</div>
							</div>
							<div class="select-create-wrap">
								<div class="select-race">Erudite</div>
							</div>
							<div class="select-create-wrap">
								<div class="select-race">Gnome</div>
							</div>
							<div class="select-create-wrap">
								<div class="select-race">Half Elf</div>
							</div>
							<div class="select-create-wrap">
								<div class="select-race">Halfling</div>
							</div>
							<div class="select-create-wrap">
								<div class="select-race">High Elf</div>
							</div>
							<div class="select-create-wrap">
								<div class="select-race">Human</div>
							</div>
							<div class="select-create-wrap">
								<div class="select-race">Ogre</div>
							</div>
							<div class="select-create-wrap">
								<div class="select-race">Troll</div>
							</div>
							<div class="select-create-wrap">
								<div class="select-race">Wood Elf</div>
							</div>
						</div>
						
						<div id="gender-wrap">
							<div class="gender-row">
								<span>Male</span>
								<div id="Male" class="select-radial select-gender active"></div>
							</div>
							<div class="gender-row">
								<span>Female</span>
								<div id="Female" class="select-radial select-gender"></div>
							</div>
						</div>
						
					</div>
				</div>
				
				<div class="col-3 tight">
					<div class="title-ch-create-col">
						<div id="create-info">
							<div class="character-info-header">Overview</div>
							<div>Gender: <span id="gender-value"></span></div>
							<div>Race: <span id="race-value"></span></div>
							<div>Class: <span id="job-value"></span></div>
							<div>Type: <span id="type-value"></span></div>
							
							<div class="character-info-header">Ratings</div>
							<div>Tank: <span id="tank-value"></div>
							<div>Physical DPS: <span id="physical-value"></div>
							<div>Magical DPS: <span id="magical-value"></div>
							<div>Healer: <span id="healer-value"></div>
							<div>Utility: <span id="utility-value"></div>
							
							<div class="character-info-header">Resistances</div>
							<div>Bleed: <span id="bleed-value"></span></div>
							<div>Poison: <span id="poison-value"></span></div>
							<div>Arcane: <span id="arcane-value"></span></div>
							<div>Lightning: <span id="lightning-value"></span></div>
							<div>Fire: <span id="fire-value"></span></div>
							<div>Cold: <span id="cold-value"></span></div>
							
							<div class="character-info-header">Dungeon</div>
							<div>Traps: <span id="traps-value"></span></div>
							<div>Treasure: <span id="treasure-value"></span></div>
							<div>Scout: <span id="scout-value"></span></div>
							<div>Pulling: <span id="pulling-value"></span></div>
						</div>
						
						<div id="create-character-name-wrap">
							<input id="create-character-name" 
								class="form-control ng-blue-input text-shadow" 
								type="text" 
								maxlength="16" 
								spellcheck="false"
								autocomplete="off"
								placeholder="Character Name">
						</div>
					</div>
				</div>
				
				<div class="col-3 tight">
					<div class="title-ch-create-col">
						
						<div id="class-wrap">
							<div class="select-create-wrap">
								<div id="create-Bard" class="select-class disabled">Bard</div>
							</div>
							<div class="select-create-wrap">
								<div id="create-Cleric" class="select-class disabled">Cleric</div>
							</div>
							<div class="select-create-wrap">
								<div id="create-Druid" class="select-class disabled">Druid</div>
							</div>
							<div class="select-create-wrap">
								<div id="create-Enchanter" class="select-class disabled">Enchanter</div>
							</div>
							<div class="select-create-wrap">
								<div id="create-Magician" class="select-class disabled">Magician</div>
							</div>
							<div class="select-create-wrap">
								<div id="create-Monk" class="select-class disabled">Monk</div>
							</div>
							<div class="select-create-wrap">
								<div id="create-Necromancer" class="select-class disabled">Necromancer</div>
							</div>
							<div class="select-create-wrap">
								<div id="create-Paladin" class="select-class disabled">Paladin</div>
							</div>
							<div class="select-create-wrap">
								<div id="create-Ranger" class="select-class disabled">Ranger</div>
							</div>
							<div class="select-create-wrap">
								<div id="create-Rogue" class="select-class disabled">Rogue</div>
							</div>
							<div class="select-create-wrap">
								<div id="create-Shadowknight" class="select-class disabled">Shadowknight</div>
							</div>
							<div class="select-create-wrap">
								<div id="create-Shaman" class="select-class disabled">Shaman</div>
							</div>
							<div class="select-create-wrap">
								<div id="create-Warrior" class="select-class disabled">Warrior</div>
							</div>
							<div class="select-create-wrap">
								<div id="create-Wizard" class="select-class disabled">Wizard</div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-3 tight">
					<div class="title-ch-create-col">
						Points Remaining<br>
						Attributes<br>
						Create Button
					</div>
				</div>
			</div>
		</div>
	</div>

	<div id="game-wrap" class="portal">
		<div id="hud" class="text-shadow"></div>
	</div> <!-- end game-wrap -->

	<audio id="bgmusic" autoplay loop preload="auto"></audio>
	
		
	<div id="title-backdrop"></div>
	<div id="screen-flash" class="overlay"></div>
	<div id="overlay" class="overlay"></div>
	<div id="msg" class="text-shadow"></div>
	
</div>

<div id="portrait">This application must be viewed in landscape mode. Turn your device 90 degrees for maximum enjoyment.</div>
</body>

<script src="js/libs/libs.min.js"></script>
<script src="//apis.google.com/js/platform.js?onload=loginRenderButton" async defer></script>
<?php
if (!isset($_SESSION['account'])){
	require $_SERVER['DOCUMENT_ROOT'] . "/includes/loginJs.html";
}
require $_SERVER['DOCUMENT_ROOT'] . '/includes/ga.php';
if (!isset($_SESSION['account'])){
	require $_SERVER['DOCUMENT_ROOT'] . "/includes/loginKong.html";
}
?>
<script>
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=737706186279455";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
var chat = {
	channel: 'usa-1'
};
g.guest = 0;
(function(d, scripts){
	if (//location.host === 'nevergrind.com' || 
		location.hash === '#test'){
		scripts = [
			'nevergrind2'
		];
	} else {
		scripts = [
			'init',
			'create',
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