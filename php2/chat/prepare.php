<?php
	$preMsg = strip_tags($_POST['msg']);

	!$preMsg && exit('no message found');
	!isset($_SESSION['ng2']['name']) && exit('Session not found');

	function getPrefix() {
		return '[' . $_SESSION['ng2']['level'] .':<span class="chat-'.
			$_SESSION['ng2']['job'] .'">'.
			$_SESSION['ng2']['name'] . '</span>]';
	}

	if ($_POST['class'] === 'chat-whisper') {
		$postMsg = getPrefix() . ' whispers: ' . $preMsg;
	}
	else {
		if ($_POST['class'] === 'chat-normal') {
			$postMsg = getPrefix() . ' says: ' . $preMsg;
		}
		else if ($_POST['class'] === 'chat-emote') {
			$postMsg = $_SESSION['ng2']['name'] . ' ' . $preMsg;
		}
		else if ($_POST['class'] === 'chat-guild') {
			// needs a guild channel pubsub
			$postMsg = getPrefix() .' tells the guild: '.  $preMsg;
		}
		else if ($_POST['class'] === 'chat-party') {
			$postMsg = getPrefix() . ' tells the party: ' . $preMsg;
		}
		else if ($_POST['class'] === 'chat-broadcast' &&
			($_SESSION['account'] === 'maelfyn' || $_SESSION['account'] === 'tester') ) {
			$postMsg = "SYSTEM BROADCAST: " . $preMsg;
		}
	}