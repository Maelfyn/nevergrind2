// modal.js
var modal = {
	isOpen: 0,
	overlay: document.getElementById('modal-overlay'),
	show: function(e){
		modal.isOpen = 1;
		e.camelKey = g.camel(e.key);
		//console.info('show: ', e);
		var s = 
			'<div id="modal-wrap">' +
				modal.header(e) +
				modal.body(e) +
			'</div>';
		modal.overlay.innerHTML = s;
		
		modal.isOpen = true;
		TweenMax.to('#modal-overlay', .3, {
			startAt: {
				visibility: 'visible',
				alpha: 0
			},
			alpha: 1
		});
		TweenMax.to('#modal-wrap', .5, {
			startAt: {
				top: 30
			},
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
	},
	hide: function(){
		TweenMax.to('#modal-overlay', .3, {
			overwrite: 0,
			alpha: 0,
			onComplete: function(){
				modal.isOpen = 0;
				g.unlock();
				TweenMax.set(this.target, {
					visibility: 'hidden'
				});
			}
		});
		
	},
	header: function(e){
		var z = {
			deleteCharacter: '<div id="modal-header">Delete '+ create.name +'?</div>'
		}
		return z[e.camelKey];
	},
	body: function(e){
		var z = {
			deleteCharacter: 
			'<div id="modal-body" class="stag-blue">'+
				'<p>Are you sure you want to delete this character?</p>'+
				'<div>'+
					'<a id="modal-dismiss" class="btn btn-info btn-sm modal-buttons">Cancel</a>'+
					'<a id="'+ e.key +'-confirm" class="btn btn-info btn-sm modal-buttons">Confirm</a>'+
				'</div>'+
			'</div>'
		}
		return z[e.camelKey];
	},
};