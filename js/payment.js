var payment = {
    init: function(){
        if (location.hostname === "localhost"){
            Stripe.setPublishableKey('pk_test_GtNfTRB1vYUiMv1GY2kSSRRh');
        }
        else {
            Stripe.setPublishableKey('pk_live_rPSfoOYjUrmJyQYLnYJw71Zm');
        }
        $("#unlock-game-confirm").on(env.click, function(){
            payment.send();
        })
    },
    error: function(msg){
        $("#modal-error").text(msg);
        ng.unlock();
    },
    send: function(){
        var f = {
            ccNum: $('#card-number').val(),
            cvcNum: $('#card-cvc').val(),
            expMonth: $('#card-month').val(),
            expYear: $('#card-year').val()
        }
        var error = '';
        if (!Stripe.validateCardNumber(f.ccNum)) {
            // Validate the number:
            error = 'The credit card number appears to be invalid.';
        }
        else if (!Stripe.validateCVC(f.cvcNum)) {
            // Validate the CVC:
            error = 'The CVC number appears to be invalid.';
        }
        else if (!Stripe.validateExpiry(f.expMonth, f.expYear)) {
            // Validate the expiration:
            error = 'The expiration date appears to be invalid.';
        }
        if (error) {
            payment.error(error);
        }
        else {
            payment.createToken(f);
        }
    },
    createToken: function(d){
        Stripe.createToken({
            number: d.ccNum,
            cvc: d.cvcNum,
            exp_month: d.expMonth,
            exp_year: d.expYear
        }, payment.stripeResponseHandler);
        payment.error('');
    },
    stripeResponseHandler: function(status, response){
        if (response.error) {
            payment.error(response.error.message);
        } else {
		    if (ng.locked) return;
            // submit the form
            ng.lock();
            ng.msg("Communicating with the server...");
            $.ajax({
                url: app.url + 'php2/payment/unlockGame.php',
                data: {
                    stripeToken: response.id
                }
            }).done(function(data) {
                ng.msg("You have unlocked the full game: Nevergrind 2<br>Thanks for your support!");
                console.info(data);
                modal.hide();
            }).fail(function(r) {
                ng.msg(r.responseText, 8);
            }).always(function(){
                ng.unlock();
            });
        }
    }
};