var party = {
	missionUpdate: function (data) {
		console.info("MISSION UPDATE! ", data);
		mission.setQuest(data.quest);
		my.zoneMobs = data.zoneMobs;
		if (my.p_id && !my.party[0].isLeader) {
			$.ajax({
				data: {
					quest: data.quest
				},
				url: app.url + 'php2/mission/update-quest.php'
			}).done(function (data) {
				console.info('missionUpdate ', data);
				town.aside.selected === 'town-mission' && mission.showEmbark();
				mission.updateTitle();
			});
		}
	},
	length: function() {
		var count = 0;
		my.party.forEach(function(v) {
			if (v.name) count++;
		});
		return count;
	},
	isSoloOrLeading: function() {
		var leading = 0;
		var partyLen = party.length();
		if (partyLen === 1 || partyLen > 1 && my.party[0].isLeader) {
			leading = 1;
		}
		return leading;
	},
	notifyMissionStatus: function(data) {
		ng.msg(data.msg, 6);
	}
}