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
    _.reduce(scorecard.realEstate, adder("cashflow"), 0)
    ); // kinda, there could be net liabilities in here
  var expenses = (scorecard.taxes + 
    scorecard.otherExpenses + 
    (scorecard.children * scorecard.perChild) +
    _.reduce(scorecard.debts, adder("payment"), 0) + 
    (scorecard.bankLoans / 100));
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
    UserScoreCards.update({'_id': this._id}, {'$inc': {savings: netMonthly(this)}});
    // TODO warn about needing to sell things, etc.
  },

  'click .change-savings': function () {
    var amount = $(".savings-change-amount");
    UserScoreCards.update({'_id': this._id}, {'$inc': {savings: +(amount.val())}});
    amount.val("");
  },

  'click .more-children': function () {
    UserScoreCards.update({_id: this._id}, {$inc: {children: 1}});
  },

  'click .buy-new-stock': function () {
    var stock = {_scorecardId: this._id}; // this kinda sucks, but I need the up link when I sell
    _.each(["ticker", "dividend", "price", "shares"], function (attr) {
      var value = $(".stock-" + attr).val();
      if (!(attr === "ticker")) { value = +value; }

      stock[attr] = value;
    });
    UserScoreCards.update({_id: this._id}, {$push: {stocks: stock}, $inc: {savings: -1 * stock.shares * stock.price}});
  },
  'click .sell-stock': function (event) {
    var sellPrice = $(event.currentTarget).parent().find(".selling-price").val();
    UserScoreCards.update({_id: this._scorecardId}, {
      $pull: {stocks: this}, 
      $inc: {savings: this.shares * (+sellPrice)}
    });
  },

  'click .buy-real-estate': function () {
    var realEstate = {_scorecardId: this._id}; // this kinda sucks, but I need the up link when I sell
    _.each(["description", "downpayment", "mortgage", "cashflow"], function (attr) {
      var value = $(".real-estate-" + attr).val();
      if (!(attr === "description")) { value = +value; }

      realEstate[attr] = value;
    });
    UserScoreCards.update({_id: this._id}, {$push: {realEstate: realEstate}, $inc: {savings: -1 * realEstate.downpayment}});
  },
  'click .sell-real-estate': function (event) {
    var sellPrice = $(event.currentTarget).parent().find(".selling-price").val();
    UserScoreCards.update({_id: this._scorecardId}, {
      $pull: {realEstate: this}, 
      $inc: {savings: (+sellPrice) - this.mortgage}
    });
  },

  'click .payoff-debt': function () {
    UserScoreCards.update({_id: Session.get('scorecardId')}, { // TODO get rid of storing the _scorecardId in sub objects, just keep the info in the router
      $pull: {debts: this},
      $inc: {savings: -1 * this.amount}
    });
  },
  'click .new-debt': function () {
    var debt = {_scorecardId: this._id}; // this kinda sucks, but I need the up link when I sell
    _.each(["name", "amount", "payment"], function (attr) {
      var value = $(".debt-" + attr).val();
      if (!(attr === "name")) { value = +value; }

      debt[attr] = value;
    });
    UserScoreCards.update({_id: this._id}, {$push: {debts: debt}});
  }
});

Deps.autorun(function () {
  Meteor.subscribe('users-scorecards', Meteor.userId());
});
Meteor.subscribe('all-scorecard-templates');