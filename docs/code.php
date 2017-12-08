

<?php
	session_start();
	// database examples






	
	// PREPARED STATEMENTS
	
	// check if value exists already
	$query = "select name from ng2_chars where name=?";
	$stmt = $link->prepare($query);
	$stmt->bind_param('s', $f->name);
	$stmt->execute();
	$stmt->store_result();
	$count = $stmt->num_rows;
	if($count > 0){
		$r->err = 'This name is already taken!';
	}
?>grayscaleasdf

<script>
	/* css filter types
		blur(5px)
		hue-rotate(360deg)
		brightness(100%)
		contrast(100%)
		shadow(100%) (chrome not supported?)
		grayscale(100%)
		invert(100%)
		opacity(100%)
		saturate(100%)
		sepia(100%)

	*/

	// animate spritemap
	TweenMax.to('#characterslot1', 1, {
		startAt: {
			backgroundPosition: '0 0'
		},
		repeat:-1,
		backgroundPosition: "0 -1300%",
		ease: SteppedEase.config(13)
	});


	var x = {
		getRatings: { // tank, phy, mag, heal, utility
			Warrior: 		[10, 7, 1, 1, 1],
			Paladin: 		[9, 7, 3, 4, 3],
			Shadowknight: 	[9, 8, 3, 2, 2],
			Monk: 			[6, 10, 1, 3, 2],
			Rogue: 			[6, 10, 1, 1, 4],
			Ranger: 		[6, 9, 3, 3, 3],
			Bard: 			[5, 5, 5, 5, 9],
			Cleric: 		[4, 3, 6, 10, 6],
			Druid: 			[4, 3, 8, 9, 7],
			Shaman: 		[4, 4, 7, 9, 8],
			Enchanter: 		[1, 1, 7, 3, 10],
			Magician: 		[1, 1, 8, 2, 8],
			Necromancer: 	[1, 1, 9, 3, 6],
			Wizard: 		[1, 1, 10, 1, 5]
		},
	}
	/*
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
	*/
	
	
	/*
		39 - 6
		43 - 7
		47 - 8
		51 - 9
		55 - 10
		59 - 11
		63 - 12
		67 - 13
		71 - 14
		75 - 15
		79 - 16
		83 - 17
		87 - 18
		91 - 19
		95 - 20
		99 - 21
		103 - 22
		107 - 23
		111 - 24
		115 - 25
		119 - 26
		123 - 27
		127 - 28
		131 - 29
		135 - 30
	*/
</script>