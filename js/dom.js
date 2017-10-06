// dom.js
var dom,
	init = {
		dom: function(){
			var d = document;
			dom = {
				body: d.getElementById('body'),
				bgmusic: d.getElementById('bgmusic'),
				msg: d.getElementById('msg'),
				chatInput: d.getElementById('chat-input'),
				chatLog: d.getElementById('chat-log'),
				hud: d.getElementsByClassName('hud')
			}
		}
	}
init.dom();