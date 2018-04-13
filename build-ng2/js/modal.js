// modal.js
var modal = {
	isOpen: 0,
	overlay: document.getElementById('modal-overlay'),
	wrap: document.getElementById('modal-wrap'),
	show: function(e){
		modal.isOpen = 1;
		e.camelKey = ng.camel(e.key);
		var s = '<div class="stag-blue">'+
					modal.header(e) +
					modal.body(e) +
					(e.hideFooter ? '' : modal.footer(e)) +
				'</div>';
		modal.wrap.innerHTML = s;
		
		modal.isOpen = true;
		TweenMax.to(modal.overlay, .3, {
			startAt: {
				visibility: 'visible',
				alpha: 0
			},
			alpha: 1
		});
		TweenMax.to(modal.wrap, .3, {
			startAt: {
				visibility: 'visible',
				alpha: 0,
				top: 30
			},
			alpha: 1,
			top: 50
		});
		// assign events
		$("#modal-dismiss, #modal-overlay").on(env.click, function(){
			modal.hide();
		});
		// confirm event actions
		$('#modal-wrap').on(env.click, '#delete-character-confirm', function(){
			create.deleteCharacter();
		});
		/*if (e.key === 'unlock-game'){
            payment.init();
		}*/
		if (e.focus) {
            setTimeout(function () {
                $("#modal-wrap input:first").focus();
            }, 100);
        }
    },
	hide: function(){
		TweenMax.to([modal.overlay, modal.wrap], .3, {
			overwrite: 0,
			alpha: 0,
			onComplete: function(){
				modal.isOpen = 0;
				ng.unlock();
				TweenMax.set(this.target, {
					visibility: 'hidden'
				});
			}
		});
		
	},
	header: function(e){
		var z = {
			playerIdleBoot: '<div id="modal-header">Disconnected</div>',
			deleteCharacter: '<div id="modal-header">Delete '+ create.name +'?</div>',
			/*unlockGame: '<div id="modal-header">$5 to purchase Nevergrind 2?</div>',*/
		}
		return z[e.camelKey];
	},
	body: function(e){
		var z = {
			playerIdleBoot:
			'<div id="modal-body">'+
				'<p>You have been disconnected from the server.</p>'+
			'</div>',
			deleteCharacter:
			'<div id="modal-body">'+
				'<p>Are you sure you want to delete this character?</p>'+
			'</div>',
			/*unlockGame:
			'<div id="modal-body">'+
				'<p>Purchasing Nevergrind 2 unlocks:</p>'+
				'<div id="unlock-game-perks">'+
					'<div>8 character slots!</div>'+
					'<div>32-slot inventory per character!</div>'+
					'<div>64-slot bank! Account-shareable items!</div>'+
					'<div>Auction house!</div>'+
					'<div>Sending items by mail to friends!</div>'+
					'<div>Expand your friends list from 5 to 100!</div>'+
            	'</div>'+
				'<div id="unlock-game-card">'+
					'<hr class="fancy-hr">'+
					'<p>'+
						'<label>Card Number (no spaces or hyphens)</label>'+
						'<input id="card-number" type="text" maxlength="16" autocomplete="off" class="form-control ng-blue-input text-shadow"/>'+
					'</p>'+

					'<p>'+
						'<label>CVC (back of your credit card)</label>'+
						'<input id="card-cvc" type="text" maxlength="4" autocomplete="off" class="form-control ng-blue-input text-shadow"/>'+
					'</p>'+

					'<p class="container-fluid snug">'+
						'<div class="row justify-content-between">'+
							'<div class="col">'+
								'<label>Expiration Month (MM) </label>'+
								'<input id="card-month" type="text" maxlength="2" autocomplete="off"  class="form-control ng-blue-input text-shadow"/>'+
							'</div>'+
            				'<div class="col">'+
								'<label>Expiration Year (YYYY) </label>'+
								'<input id="card-year" type="text" maxlength="4" autocomplete="off" class="form-control ng-blue-input text-shadow"/>'+
							'</div>'+
            			'</div>'+
					'</p>'+
				'</div>'+
				'<div id="modal-error"></div>'+
			'</div>'*/
		}
		return z[e.camelKey];
	},
	footer: function(e){
		var str =
			'<div id="modal-footer" class="text-center">'+
				'<a id="modal-dismiss" class="ng-btn modal-buttons">Cancel</a>'+
				'<a id="'+ e.key +'-confirm" class="ng-btn modal-buttons">Confirm</a>'+
			'</div>';
		return str;
	}
};