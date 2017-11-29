var payment = {
    init: function(){
        if (location.host==="localhost"){
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
        g.unlock();
    },
    send: function(){
        g.lock();
        payment.data = {
            ccNum: $('#card-number').val(),
            cvcNum: $('#card-cvc').val(),
            expMonth: $('#card-month').val(),
            expYear: $('#card-year').val()
        }
        var error = '';
        if (!Stripe.validateCardNumber(payment.data.ccNum)) {
            // Validate the number:
            error = 'The credit card number appears to be invalid.';
        }
        else if (!Stripe.validateCVC(payment.data.cvcNum)) {
            // Validate the CVC:
            error = 'The CVC number appears to be invalid.';
        }
        else if (!Stripe.validateExpiry(payment.data.expMonth, payment.data.expYear)) {
            // Validate the expiration:
            error = 'The expiration date appears to be invalid.';
        }
        if (error) {
            payment.error(error);
        }
        else {
            payment.createToken(payment.data);
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
            // submit the form
            g.msg("Communicating with the server...");
            $.ajax({
                url: 'php2/payment/unlockGame.php',
                data: {
                    stripeToken: response.id
                }
            }).done(function(data) {
                g.msg("You have unlocked the full game: Nevergrind Online<br>Thanks for your support!");
                modal.hide();
            }).fail(function(r) {
                g.msg(r.responseText, 8);
            }).always(function(){
                g.unlock();
            });
        }
    }
};