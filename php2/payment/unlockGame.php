<?php
    require '../header.php';
    require '../db.php';
    require $_SERVER['DOCUMENT_ROOT'] . '/php/lib/Stripe.php';

    if($_SERVER["SERVER_NAME"] === "localhost"){
        $stripeKey = $_SESSION['STRIPE_TEST'];
    }else{
        $stripeKey = $_SESSION['STRIPE_LIVE'];
    }
    // did I already unlock the game?
    $query = 'select count(row) from ng2_paid where account=?';
    $stmt = $link->prepare($query);
    $stmt->bind_param('s', $_SESSION['account']);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($dbcount);
    while($stmt->fetch()){
        $count = $dbcount;
    }
    if ($count){
        exit("You have already unlocked the full game!");
    }
    // validate POST data
    $amount = 500;
    $customerId = '';

    // create customer if necessary
    Stripe::setApiKey($stripeKey);
    if (!isset($_SESSION['email'])){
        exit('Your session data is not valid!');
    }
    if (isset($_POST['stripeToken'])){
        $token = $_POST['stripeToken'];
        // Create a Customer
        $customer = Stripe_Customer::create(array(
            "card" => $token,
            "description" => $_SESSION['email']
        ));
        $customerId = $customer->id;
    }
    else {
        exit('The order cannot be processed. You have not been charged.');
    }
    // charge card
    $errorMessage='';
    try {
        // charge the customer, not the card
        $charge = Stripe_Charge::create(array(
            'amount' => $amount,
            'currency' => 'usd',
            'customer' => $customerId,
            'description' => $_SESSION['email']
        ));
    } catch (Stripe_ApiConnectionError $e) {
        // Network problem, perhaps try again.
        $errorMessage = "There appears to be a temporary network problem. Please try again later.";
    } catch (Stripe_InvalidRequestError $e) {
        // You screwed up in your programming. Shouldn't happen!
        $errorMessage = "There has been a server error. The administrator has been contacted to resolve this problem.";
    } catch (Stripe_ApiError $e) {
        // Stripe's servers are down!
        $errorMessage = "The payment processing servers are down. Please try again later.";
    } catch (Stripe_CardError $e) {
        // Card was declined.
        $e_json = $e->getJsonBody();
        $error = $e_json['error'];
        $errorMessage = "".$error['message'];
    }
    if ($errorMessage==''){
        if($charge->paid == true){
            // SUCCESS: insert purchase into db
            $query = "insert into ng2_paid (`account`) VALUES (?)";
            $stmt = $link->prepare($query);
            $stmt->bind_param('s', $_SESSION['account']);
            $stmt->execute();
            $r['time'] = microtime(true);
            echo json_encode($r);

			$account = $_SESSION['account'];
			$email = $_SESSION['email'];
			$msg1 =
				"<p>Hail, $account!</p>".
				"<p>Thank you for your $5 purchase of <a href='https://nevergrind.com'>Nevergrind 2</a>!</p>".
				"<p><div>If you have any questions or problems, contact us:</div>".
				"<div><a href='mailto:support@nevergrind.com'>support@nevergrind.com</a></div></p>".
				"<p>Have a great day!</p>";
			$msg2 =
				"Hail, $account!\n\n".
				"Thank you for your $5 purchase of Nevergrind 2!\n\n".
				"If you have any questions or problems, contact us:\n".
				"support@nevergrind.com\n\n".
				"Have a great day!";

			require $_SERVER['DOCUMENT_ROOT'] . '/php/values/mailpw.php';
			require $_SERVER['DOCUMENT_ROOT'] . '/php/PHPMailer/PHPMailerAutoload.php';
			$mail = new PHPMailer;
			$mail->isSMTP(); // Set mailer to use SMTP
			$mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers ;smtp2.example.com
			$mail->SMTPAuth = true; // Enable SMTP authentication
			$mail->Username = 'support@nevergrind.com'; // SMTP username
			$mail->Password = $mailpw; // SMTP password
			$mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
			$mail->Port = 587;  // TCP port to connect to 587 tls or 465 ssl
			$mail->From = 'support@nevergrind.com';
			$mail->FromName = 'Neverworks Games';
			$mail->addAddress($email);
			$mail->Subject = 'Nevergrind 2: Thank You For Your Purchase!';
			$mail->isHTML(true);
			$mail->Body = $msg1;
			$mail->altBody = $msg2;
			$mail->send();
        } else {
            exit("Something went wrong with the payment. Contact support@nevergrind.com for assistance!");
        }
    }
    else {
        // errors
        require $_SERVER['DOCUMENT_ROOT'] . '/php/values/mailpw.php';
		require $_SERVER['DOCUMENT_ROOT'] . '/php/PHPMailer/PHPMailerAutoload.php';
        $mail = new PHPMailer;
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers ;smtp2.example.com
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'support@nevergrind.com'; // SMTP username
        $mail->Password = $mailpw; // SMTP password
        $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587;  // TCP port to connect to 587 tls or 465 ssl
        $mail->From = 'support@nevergrind.com';
        $mail->FromName = 'Neverworks Games';
        $mail->addAddress('joemattleonard@gmail.com');
        $mail->Subject = 'Server Error';
		$mail->isHTML(true);
        $mail->Body = $errorMessage;
		$mail->send();
        exit($errorMessage);
    }