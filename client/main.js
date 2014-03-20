Template.scorecards.current_scorecards = function () {
  return UserScoreCards.find({});
};

Template['new-scorecard'].professions = function () {
  return ScoreCardTemplates.find({});
}

function formData(formjQueryObj) {
  var form = {};

  $.each(formjQueryObj.serializeArray(), function() {
    form[this.name] = this.value;
  });

  return form;
}

function scorecardFromTemplate(template, characterName, userId) {
  template = _.pick(template, 'name', 'salary', 'taxes', 'otherExpenses', 
                            'perChild', 'debts', 'savings');
  var basic = _.extend({
    userId: userId,
    characterName: characterName,
    createdAt: new Date, 
    bankLoans: 0,
    children: 0,
    stocks: [],
    realEstate: [], // includes mortgage info in case of sale
    businesses: [], // includes business liabilities
  }, template);
  console.log(basic)
  basic.profession = basic.name;
  return _.omit(basic, '_id', 'name');
}

function netMonthly(scorecard) {
  function adder(field) {
    return function(memo, value) {
      return memo + value[field];
    }
  }
  var income = (scorecard.salary +
    _.reduce(scorecard.stocks, adder("dividend"), 0) +
    _.reduce(scorecard.businesses, adder("cashflow"), 0) +
    _.reduce(scorecard.realEstate, adder("cashflow"), 0)
    ); // kinda, there could be net liabilities in here
  var expenses = (scorecard.taxes + 
    scorecard.otherExpenses + 
    (scorecard.children * scorecard.perChild) +
    _.reduce(scorecard.debts, adder("payment"), 0) + 
    (scorecard.bankLoans / 100));
  console.log(income, expenses)
  return income - expenses;
}

Template['new-scorecard'].events({
  'click .done': function () {
    var data = formData($("form")),
        template = ScoreCardTemplates.findOne({_id: data.profession}),
        user = scorecardFromTemplate(template, data.characterName, Meteor.userId());
    UserScoreCards.insert(user, function (error, result) {
      if (error) { 
        alert("Log in to create a scorecard");
      } else {
        Router.go("/");
      }
    });
  }
});

Template.scorecard.events({
  'click .next-day': function () {
    console.log(this)
    UserScoreCards.update({'_id': this._id}, {'$inc': {savings: netMonthly(this)}});
    // TODO warn about needing to sell things, etc.

  }
});

Deps.autorun(function () {
  Meteor.subscribe('users-scorecards', Meteor.userId());
});
Meteor.subscribe('all-scorecard-templates');