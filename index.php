<?php
	error_log("Testing error log! ". microtime(true));
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
	<title>Nevergrind 2 | Free Multiplayer Browser RPG</title>
	<meta charset="utf-8">
	<meta name="keywords" content="realtime, rpg, browser, multiplayer, online, fantasy, html5">
	<meta name="description" content="A free multiplayer RPG playable in your web browser! Gather your allies, create your hero, and venture forth in this fast-paced action RPG !">
	<meta name="author" content="Joe Leonard">
	<meta name="referrer" content="always">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
	
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no">
	<meta name="google-site-verification" content="iC9l4midOGIXERCwagfpkef9ifunV-aZd_zlUUOPjIU" />
	
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/bootstrap-slider.min.css">
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<link rel="stylesheet" href="css/ng2.css?v=0-0-1">
	<link rel="shortcut icon" href="/images1/favicon.png">
	
	<script>
		var g = {
			version: '0-0-1'
		};
	</script>
</head>

<body id="body">
		
	<div id="titleViewBackdrop"></div>

	<div id="ng2-logo-wrap">
		<img src="images/bg/ng2-bg.jpg" id="ng2-bg" title="Firmament Wars Background">
	</div>
	
	<div id="title-wrap">
	
		<div id="titleMain" class="container-fluid">
			
			<header class="shadow4 text-primary row">
				<div class="col-xs-12">
					<a href="/blog/how-to-play-firmament-wars/" target="_blank" title="Nevergrind Browser Game Development News and Articles">How to Play</a>&ensp;
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
				</div>
				
			</header>
			
			<div id="titleMenu" class="ng-primary col-xs-5">
				
				<div id="menuHead">
					<button id="toggleNation" type="button" class="btn ng-blue btn-responsive shadow4">
						Configure Nation
					</button>
					<button id="leaderboardBtn" type="button" class="btn ng-blue btn-responsive shadow4">
						Leaderboard
					</button>
				</div>
				
				<h1>
					<div>Nevergrind 2 | Multiplayer Browser RPG</div>
					<div>
						a free online game by <a href="https://www.linkedin.com/company/neverworks-games-llc">Neverworks Games</a>
					</div>
				</h1>
				<img id="ng2-logo" src="images/ng_logo_532x428.png">
				
				<div class="ng-text">
					
					<div>
						<button id="refresh-game-button" type="button" class="btn btn-md ng-blue btn-responsive shadow4 pull-right" title="Refresh Game List">
							<i class="fa fa-refresh pointer"></i>
						</button>
						<button id="play-now-btn" type="button" class="btn btn-md ng-blue btn-responsive shadow4">
							Play Now
						</button>
						<div class="btn-group" class="ng-blue">
							<button id="createGameBtn" type="button" class="titleButtons btn btn-md btn-responsive shadow4 dropdown-toggle fwDropdownButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Create Game <span class="titleCaret caret chat-warning"></span>
							</button>
							<ul class="dropdown-menu fwDropdown">
								<li id="create" class="gameSelect">
									<a href="#">Free For All</a>
								</li>
								<li id="createTeamBtn" class="gameSelect">
									<a href="#">Team Game</a>
								</li>
							</ul>
						</div>
						<button id="joinPrivateGameBtn" type="button" class="btn btn-md ng-blue btn-responsive shadow4">Join Private Game</button>
					</div>
					
					<hr class="fancy-hr">
				</div>

				<div id="refreshGameWrap" class="buffer2">
					<table id="gameTable" class="table table-condensed table-borderless">
						<thead>
							<tr id="gameTableHead">
								<th class="gameTableCol1 warCells">Game Name</th>
								<th class="gameTableCol2 warCells">Map</th>
								<th class="gameTableCol3 warCells">Turn Duration</th>
								<th class="gameTableCol4 warCells">Game Type</th>
							</tr>
						</thead>
						<tbody id="gameTableBody"></tbody>
					</table>
				</div>
				
				<hr class="fancy-hr">
			</div>
			
			<div id="titleChat" class="ng-primary text-center col-xs-7">
				<div id="titleChatPlayers" class="titlePanelLeft row">
					<div class="col-xs-5 tight">
						<div id="titleChatHeader" class="chat-warning nowrap">
							<span id="titleChatHeaderChannel"></span> 
							<span id="titleChatHeaderCount"></span>
						</div>
						<div id="title-chat-btn-wrap" class="text-center">
							<div id="title-chat-btns" class="btn-group" role="group">
								<button id="friend-status" class="btn-group btn btn-xs btn-responsive ng-blue shadow4" title="Friend list">
									<i class="fa fa-users pointer"></i>
								</button>
								<button id="add-friend" class="btn-group btn btn-xs btn-responsive ng-blue shadow4" title="Toggle friend">
									<i class="fa fa-user-plus pointer"></i>
								</button>
								<button id="who-account" class="btn-group btn btn-xs btn-responsive ng-blue shadow4" title="Query account data">
									<i class="fa fa-vcard pointer"></i>
								</button>
								<button id="whisper-account" class="btn-group btn btn-xs btn-responsive ng-blue shadow4" title="Send another account a private message">@</button>
								<button id="change-channel" class="btn-group btn btn-xs btn-responsive ng-blue shadow4" title="Change Channel">#</button>
								<button id="share-url" class="btn-group btn btn-xs btn-responsive ng-blue shadow4" title="Share hyperlink with channel">
									<i class="fa fa-external-link pointer"></i>
								</button>
								<button id="share-image" class="btn-group btn btn-xs btn-responsive ng-blue shadow4" title="Share image with channel using URL from another website">
									<i class="fa fa-file-image-o pointer"></i>
								</button>
								<button id="share-video" class="btn-group btn btn-xs btn-responsive ng-blue shadow4" title="Share video with channel using a youtube video URL">
									<i class="fa fa-file-video-o pointer"></i>
								</button>
								<button id="ignore-user" class="btn-group btn btn-xs btn-responsive ng-blue shadow4" title="Ignore account messages">
									<i class="fa fa-microphone-slash pointer"></i>
								</button>
								<button id="get-help" class="btn-group btn btn-xs btn-responsive ng-blue shadow4" title="Help">
									<i class="fa fa-question pointer"></i>
								</button>
							</div>
						</div>
						<div id="titleChatBody"></div>
					</div>
					
					<div class="col-xs-7 tight">
						<div id="chat-log" class="titlePanelLeft">
							<div class="chat-warning">Game night every Thursday @ 9 p.m. EST, 1 a.m. GMT.</div>
							<a href="//discord.gg/D4suK8b" target="_blank">Join our Discord Server to receive notifications!</a>
						</div>
					</div>
				</div>
					
				
				<div id="titleChatWrap">
					<div class="input-group">
						<input id="chat-input" class="ng-text noselect nobg form-control" type="text" maxlength="240" autocomplete="off" spellcheck="false" />
						<div id="chat-send-wrap" class="input-group-btn">
							<button id="chat-send-btn" class="btn shadow4 ng-blue">Send</button>
						</div>
					</div>
				</div>
			</div>
				
		</div>
	
		<div id="joinGameLobby" class="shadow4">
		
			<img id="worldTitle" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=">
		
			<div id="lobbyLeftCol">
			
				<div id="lobbyPlayers" class="ng-primary"></div>
				
				<div id="lobbyChatLogWrap" class="ng-primary lobbyRelWrap">
					<div id="lobbyChatLog"></div>
					
					<div id="lobbyChatWrap" class="lobbyRelWrap input-group">
						<input id="lobby-chat-input" class="ng-text noselect nobg form-control" type='text' maxlength="240" autocomplete="off" spellcheck="false"/>
						<span id="lobbyChatSend" class="input-group-addon shadow4 ng-blue">Chat</span>
					</div>
				</div>
				
			</div>
			
			<div id="lobbyRightCol">
			
				<div id="lobbyGame" class="ng-primary">
					<img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" id="lobbyFirmamentWarsLogo">
					<div id="lobbyRankedMatch" class="shadow4 ranked">Ranked Match</div> 
					<div id="lobbyGameNameWrap">
						<div class='text-primary margin-top'>Game Name:</div> 
						<div id='lobbyGameName'></div>
					</div>
					<div id="lobbyGamePasswordWrap" class="none">
						<div class='text-primary margin-top'>Password:</div> 
						<div id='lobbyGamePassword'></div>
					</div>
					<div class='text-primary margin-top'>Game Mode:</div> 
					<div id='lobbyGameMode'></div>
					<div class='text-primary margin-top'>Map:</div>
					<div id='lobbyGameMap'></div>
					<div class='text-primary margin-top'>Speed:</div>
					<div id='lobbyGameSpeed'></div>
					<div class='text-primary margin-top'>Max Players:</div>
					<div id='lobbyGameMax'></div>
				</div>
				
				<div id="lobbyGovernmentDescription" class="ng-primary text-center lobbyRelWrap">
					<div id="lobbyGovName" class='text-primary'>Despotism</div>
					<div id="lobbyGovPerks"></div>
				</div>
				
				<div id="lobbyButtonWrap" class="ng-primary text-center lobbyRelWrap">
					<button id='startGame' type='button' class='btn btn-default btn-md btn-block btn-responsive shadow4 lobbyButtons none'>Start Game</button>
					<button id='cancelGame' type='button' class='btn btn-default btn-md btn-block btn-responsive shadow4 lobbyButtons'>Exit</button>
					<div id='countdown' class='text-warning'></div>
				</div>
			</div>
			
		</div>
		
		<div id='createGameWrap' class='ng-primary title-modals'>
			<div class='header text-center'>
				<h2 id="createGameHead" class="header">Create FFA Game</h2>
				<h2 id="createRankedGameHead" class='header ranked'>Create Ranked Game</h2>
			</div>
			<hr class="fancy-hr">
			<div id="createGameFormWrap">
				
				<div id="createGameNameWrap">
					<div class='buffer2'>
						<label>Game Name</label>
					</div>
					<div class='buffer'>
						<input id='gameName' class='form-control createGameInput' type='text' maxlength='32' autocomplete='off'>
					</div>
				</div>
				
				<div id="createGamePasswordWrap">
					<div class='buffer2'>
						<label>Password (Private Game)</label>
					</div>
					
					<div class='buffer'>
						<input id='gamePassword' class='form-control createGameInput' type='text' maxlength='16' autocomplete='off'>
					</div>
				</div>
				
				<div id="createGameMaxPlayerWrap" class="pull-right">
					<div class='buffer2'>
						<label class='control-label'>Maximum Number of Players</label>
					</div>
					
					<div class='buffer'>
						<input id='gamePlayers' type='number' class='form-control createGameInput' id='gamePlayers' value='8' min='2' max='8'>
					</div>
				</div>
				
				<div id="createGameSpeedWrap">
					<div class='buffer2'>
						<label class='control-label'>Turn Duration</label>
					</div>
					
					<div class='buffer w33'>
						<div class='dropdown'>
							<button id="speedDropdownBtn" class='btn btn-primary dropdown-toggle shadow4 fwDropdownButton' type='button' data-toggle='dropdown'>
								<span id='createGameSpeed'>15</span>
								<i class="fa fa-caret-down text-warning lobbyCaret"></i>
							</button>
							<ul id='speedDropdown' class='dropdown-menu fwDropdown createGameInput' value="15">
								<li><a class='speedSelect' href='#'>15</a></li>
								<li><a class='speedSelect' href='#'>20</a></li>
								<li><a class='speedSelect' href='#'>25</a></li>
								<li><a class='speedSelect' href='#'>30</a></li>
							</ul>
						</div>
					</div>
				</div>
				
				<div>
					<div class='buffer2'>
						<label class='control-label'>Map</label>
					</div>
					
					<div class='buffer w33'>
						<div class='dropdown'>
							<button class='btn btn-primary dropdown-toggle shadow4 fwDropdownButton' type='button' data-toggle='dropdown'>
								<span id='createGameMap'>Earth Omega</span>
								<i class="fa fa-caret-down text-warning lobbyCaret"></i>
							</button>
							<ul id='mapDropdown' class='dropdown-menu fwDropdown createGameInput'></ul>
						</div>
					</div>
					
					<div class='buffer2'>
						<label class='control-label'>Map Details</label>
					</div>
					<div class='buffer'>
						<span title='Max players on this map'>
							<i class='fa fa-users'></i>
							<span id='createGamePlayers'>8</span>
						</span>&ensp;
						<span title='Number of territories on this map'>
							<i class='fa fa-globe'></i> 
							<span id='createGameTiles'>78</span>
						</span>
					</div>
				</div>
			</div>
			<div>
				<hr class='fancy-hr'>
			</div>
			<div class='text-center'>
				<button id='createGame' type='button' class='btn btn-md ng-green btn-responsive shadow4'>Create Game</button>
				<button id='cancelCreateGame' type='button' class='btn btn-md ng-green btn-responsive shadow4'>Cancel</button>
			</div>
		</div>
		
		<div id="joinPrivateGameModal" class="ng-primary container title-modals">
			<div class="row text-center">
				<div class='col-xs-12'>
					<h2 class='header'>Join Private Game</h2>
					<hr class="fancy-hr">
				</div>
			</div>
			
			<div class="row buffer2 privateRow">
				<div class='col-xs-4 privateLabel'>
					<label class="control-label">Game Name</label>
				</div>
				<div class='col-xs-8'>
					<input type="text" class="joinGameInputs ng-blueInput" id="joinGame" maxlength="32" placeholder="Game Name">
				</div>
			</div>
			
			<div class="row buffer2 privateRow">
				<div class='col-xs-4 privateLabel'>
					<label class="control-label">Password</label>
				</div>
				<div class='col-xs-8'>
					<input type="text" class="joinGameInputs ng-blueInput" id="joinGamePassword" maxlength="16" placeholder="Password (Private Game)">
				</div>
			</div>
			
			<div class='row buffer text-center'>
				<div class='col-xs-12'>
					<hr class="fancy-hr">
					<button id="joinPrivateGameBtn" type="button" class="btn btn-md ng-green btn-responsive shadow4">Join Game</button>
					<button id='cancelCreateGame' type='button' class='btn btn-md ng-green btn-responsive shadow4'>Cancel</button>
				</div>
			</div>
		</div>
	</div> <!-- end title wrap -->

	<div id="game-wrap" class="portal">
		<div id="hud" class="shadow4"></div>
	</div> <!-- end game wrap -->

	<audio id="bgmusic" autoplay loop preload="auto"></audio>
	
	<div id="screen-flash" class="overlay"></div>
	<div id="overlay" class="overlay"></div>
	<div id="msg" class="shadow4"></div>
</body>

<script src="js/libs/TweenMax.min.js"></script>
<script src="js/libs/jquery.min.js"></script>
<script src="js/libs/Draggable.min.js"></script>
<script src="js/libs/DrawSVGPlugin.min.js"></script>
<script src="js/libs/SplitText.min.js"></script>
<script src="js/libs/bootstrap.min.js"></script>
<script src="js/libs/bootstrap-slider.min.js"></script>
<script src="js/libs/easelJS.min.js"></script>
<script src="js/libs/EaselPlugin.min.js"></script>
<script src="js/libs/autobahn.min.js"></script>
<?php
require $_SERVER['DOCUMENT_ROOT'] . '/includes/ga.php';
?>
<script>
<?php
echo '
	var chat = {};
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