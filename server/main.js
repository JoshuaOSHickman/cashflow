ScoreCardTemplates.allow({
	insert: function (userId, party) { return false; }
});


Meteor.startup(function () {
	if (ScoreCardTemplates.find().fetch().length === 0) {
		ScoreCardTemplates.in
	}
});