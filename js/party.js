var party = {
	missionUpdate: function (data) {
		console.warn("MISSION UPDATE! ", data);
		mission.setQuest(data.quest);
		my.zoneMobs = data.zoneMobs;
		if (my.p_id && !my.party[0].isLeader) {
			$.ajax({
				data: {
					quest: data.quest
				},
				url: app.url + 'php2/mission/update-quest.php'
			}).done(function (data) {
				// console.info(data);
			});
		}
	}
}