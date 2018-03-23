// route.js
var route = {
	town: function(data, r) {
		if (r === 'chat->log') {
			if (data.name === my.name) {
				chat.log(data.msg, data.class);
			}
			else if (ng.ignore.indexOf(data.name) === -1) {
				chat.log(data.msg, data.class);
			}
			else {
				console.info("Message from " + data.name + " has been ignored.");
			}
		}
		else if (r === 'chat->add') {
			// console.info('chat.inChannel', data.row, chat.inChannel);
			chat.addPlayer(data);
		}
		else if (r === 'chat->remove') {
			chat.removePlayer(data);
		}
	},
	party: function(data, r) {
		if (r === 'party->hb') {
			bar.heartbeat.receive(data);
		}
		else if (r === 'party->updateBars') {
			bar.updateBars(data);
		}
		else if (r === 'party->notifyMissionStatus') {
			party.notifyMissionStatus(data);
		}
		else if (r === 'party->missionUpdate') {
			party.missionUpdate(data);
		}
		else if (r === 'party->linkdead') {
			bar.heartbeat.linkdead(data);
		}
		else if (r === 'party->join') {
			bar.party.join(data);
		}
		else if (r === 'party->disband') {
			bar.party.disband(data);
		}
		else if (r === 'party->promote') {
			bar.party.promote(data);
		}
		else if (r === 'party->boot') {
			bar.party.boot(data);
		}
		else if (r === 'party->bootme') {
			// remove booted player
			var slot = my.getPartySlotByRow(data.id * 1),
				promote = 0;
			if (my.party[slot].isLeader) {
				// we must promote a new leader
				promote = 1;
			}
			my.party[slot] = my.Party();
			//console.info("%c party->bootme", "background: #ff0", promote);
			// only boot if I'm the lowest id!
			if (my.isLowestPartyIdMine()) {
				//console.info('isLowestPartyIdMine ! YES PROMOTE! ', ng.copy(my.party));
				chat.boot(data.name, 1);
				if (my.partyCount() === 1) {
					// disband if one-man party
					console.info('partyCount === 1 ');
					chat.disband();
				}
				else if (promote) {
					// otherwise promote this player to leader
					//console.info('PROMOTING: ', my.name);
					chat.promote(my.name, 1);
				}
			}
			setTimeout(function(){
				bar.getParty();
			}, 1000);
		}
	},
	guild: function(data, r) {
		if (r === 'guild->hasJoined') {
			guild.hasJoined(data);
		}
		else if (r === 'guild->quit') {
			guild.hasQuit(data);
		}
		else if (r === 'guild->boot') {
			guild.wasBooted(data);
		}
		else if (r === 'guild->promote') {
			guild.wasPromoted(data);
		}
		else if (r === 'guild->leader') {
			guild.wasLeader(data);
		}
		else if (r === 'guild->motd') {
			guild.zmqMotd(data);
		}
	}
};