UserScoreCards = new Meteor.Collection("userscorecards");
ScoreCardTemplates = new Meteor.Collection("scorecardtemplates");

if (Meteor.isServer) {
  Meteor.publish('all-scorecard-templates', function () {
    return ScoreCardTemplates.find();
  });
  var nope = function () {return false;};
  ScoreCardTemplates.allow({
    insert: nope,
    update: nope,
    remove: nope
  });


  Meteor.publish('users-scorecards', function (userId) {
    // later: {$or : [{"game": users current game}]}
    if (userId == this.userId) {
      return UserScoreCards.find({userId: this.userId}); 
    }
  });
  var userMatch = function (userId, scorecard) {
    return userId === scorecard.userId;
  };
  UserScoreCards.allow({
    insert: userMatch,
    update: userMatch,
    remove: userMatch
  });
}

