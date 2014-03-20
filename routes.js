Router.configure({autoRender: false})

Router.map(function () {
	this.route("home", {path: "/"});
	this.route("new-scorecard");
	this.route("scorecard", {
		path: "/scorecard/:_id",
		data: function () {
			return {
				scorecard: UserScoreCards.findOne({_id: this.params._id})
			};
		}
	});
});