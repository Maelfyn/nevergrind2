var party = {
	missionUpdate: function (data) {
		console.warn("MISSION UPDATE! ", data);
		if (my.p_id && !my.party[0].isLeader) {
			$.ajax({
				data: {
					quest: data.quest
				},
				url: app.url + 'php2/mission/embark-quest.php'
			}).done(function (data) {
				console.info(data);
				mission.embarkHandle(data);
			});
		}
	}
}