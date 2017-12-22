<script>
	idle: function(skip){
		TweenMax.to(mob.element, .4, {
			startAt: {
				backgroundPosition: '0% 0%'
			},
			yoyo: true,
			repeat: -1,
			backgroundPosition: "-400% 0%",
			repeatDelay: .06,
			ease: SteppedEase.config(4)
		});
		if (skip) return;
		TweenMax.delayedCall(2, function(){
			mob.test && mob.hit();
		})
	},
	hit: function(){
		if (mob.animationActive) return;
		mob.animationActive = 1;
		var e = document.getElementById('sprite');
		TweenMax.to(e, .25, {
			startAt: {
				backgroundPosition: '-500% 0%'
			},
			yoyo: true,
			repeat: 1,
			backgroundPosition: "-900% 0%",
			ease: SteppedEase.config(4),
			onComplete: function(){
				mob.animationActive = 0;
				mob.idle(1);
				if (mob.test){
					TweenMax.delayedCall(1, function() {
						mob.attack(1);
					});
				}
			}
		});
	},
	attack: function(force){
		if (mob.animationActive) return;
		mob.animationActive = 1;
		var tl = g.TM(),
			foo = !Math.round(Math.random()) ? 1 : 2;
		if (force) foo = force;
		tl.to(mob.element, .5, {
			startAt: {
				backgroundPosition: '0% -'+ foo +'00%'
			},
			backgroundPosition: '-900% -'+ foo +'00%',
			ease: SteppedEase.config(9),
			onComplete: function(){
				mob.animationActive = 0;
				mob.idle(1);
				if (mob.test){
					if (force === 1){
						TweenMax.delayedCall(1, function() {
							mob.attack(2);
						});
					}
					else {
						TweenMax.delayedCall(1, function() {
							mob.special();
						});
					}
				}
			}
		});
	},
	special: function(){
		if (mob.animationActive) return;
		mob.animationActive = 1;
		var tl = g.TM();
		tl.to(mob.element, .5, {
			startAt: {
				backgroundPosition: '0% -400%'
			},
			backgroundPosition: '-900% -400%',
			ease: SteppedEase.config(9),
			yoyo: true,
			repeat: 1,
			onComplete: function(){
				mob.animationActive = 0;
				mob.idle(1);
				if (mob.test){
					TweenMax.delayedCall(1, function() {
						mob.death();
					});
				}
			}
		});
	},
	death: function(){
		if (mob.deathState) return;
		mob.deathState = 1;
		mob.animationActive = 1;
		var tl = g.TM();
		tl.set(mob.element, {
			overwrite: 1,
			backgroundPosition: '0% -300%'
		}).set(mob.element, {
			backgroundPosition: '-100% -300%'
		}, '+=.12')
			.set(mob.element, {
				backgroundPosition: '-200% -300%'
			}, '+=.12')
			.set(mob.element, {
				backgroundPosition: '-300% -300%'
			}, '+=.11')
			.to(mob.element, .4, {
				startAt: {
					backgroundPosition: '-400% -300%'
				},
				backgroundPosition: '-900% -300%',
				ease: SteppedEase.config(5),
				onComplete: function(){
					var filters = {
						opacity: 'opacity(100%)',
						brightness: "brightness(100%)"
					};

					var tl = new TimelineMax({
						onUpdate: function(){
							test.filters.death(mob.element, filters);
						}
					});
					tl.to(filters, 1.5, {
						opacity: 'opacity(0%)',
						brightness: "brightness(0%)",
						onComplete: function(){
							if (mob.test){
								$("#sprite").remove();
								mob.init();
							}
							else {
								mob.idle();
							}
							TweenMax.delayedCall(.1, function(){
								mob.deathState = 0;
								mob.animationActive = 0;
								mob.element.style.filter = 'opacity(100%) brightness(100%)';
							});
						}
					});
				}
			});
	},
	/*(function repeat(count){
		if (count++ < 20){
			console.warn('account: ', my.account);
			if (!my.account) {
				setTimeout(repeat, 100, count);
			}
		}
		else {
			location.replace(target);
		}
	})(0);*/

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
</script>

I am trying to convert my web game into a desktop app. Everything works except for the session data. I got websockets, images, audio, and all of that working. Great! But when I try to authenticate, it POSTs to the web server just fine, returns a successful authentication, and attempts to reload the page. However, upon page reload, the subsequent AJAX requests cannot get any of the $_SESSION values again.

I was able to find my PHPSESSID using win.cookies.getAll inside of the nw.js app, but I don't see how this helps me at all. Normally this is automatic when loading the webpage from the server. How do I fix this?

<?php
header('Content-Type: application/json');
if (session_status() === PHP_SESSION_NONE) {
	if (isset($_POST['session_id']) && strlen($_POST['session_id'])) {
		session_id($_POST['session_id']);
	}
	session_start();
	session_set_cookie_params(86400);
	ini_set('session.gc_maxlifetime', 86400);
}
require 'db.php';
$r = [];
$empty = empty($_SESSION['account']);
$r['account'] = $empty ? '' : $_SESSION['account'];

$r['empty'] = $empty;
if ($empty) {
	// no account data
} else {
	require 'create/loadAllCharacters.php';
}
$r['random'] = mt_rand(0,100);

echo json_encode($r);




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