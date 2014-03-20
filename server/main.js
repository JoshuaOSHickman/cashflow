Meteor.startup(function () {
	var housing = 'housing', studentLoan = 'studentLoan', 
		car = 'car', credit = 'credit', retail = 'retail';
	var scorecardtemplates = [
		{
			name: "Mechanic", 
			salary: 2000, 
			taxes: 360, 
			otherExpenses: 450, 
			perChild: 110,
			debts: [
				{name: housing, amount: 31000, payment: 300},
				{name: car, amount: 3000, payment: 60},
				{name: credit, amount: 2000, payment: 60},
				{name: retail, amount: 1000, payment: 50}
			],
			savings: 670,
		},
		{
			name: "Engineer", 
			salary: 4900, 
			taxes: 1050, 
			otherExpenses: 1090, 
			perChild: 250,
			debts: [
				{name: housing, amount: 75000, payment: 700},
				{name: studentLoan, amount: 12000, payment: 60},
				{name: car, amount: 7000, payment: 140},
				{name: credit, amount: 4000, payment: 120},
				{name: retail, amount: 1000, payment: 50}
			],
			savings: 400,
		},
		{
			name: "Business Manager", 
			salary: 4600, 
			taxes: 910, 
			otherExpenses: 1000, 
			perChild: 240,
			debts: [
				{name: housing, amount: 75000, payment: 700},
				{name: studentLoan, amount: 12000, payment: 60},
				{name: car, amount: 6000, payment: 120},
				{name: credit, amount: 3000, payment: 90},
				{name: retail, amount: 1000, payment: 50}
			],
			savings: 400,
		},
		{
			name: "Lawyer", 
			salary: 7500, 
			taxes: 1830, 
			otherExpenses: 1650, 
			perChild: 380,
			debts: [
				{name: housing, amount: 115000, payment: 1100},
				{name: studentLoan, amount: 78000, payment: 390},
				{name: car, amount: 11000, payment: 220},
				{name: credit, amount: 6000, payment: 180},
				{name: retail, amount: 1000, payment: 50}
			],
			savings: 400,
		},
		{
			name: "Secretary", 
			salary: 2500, 
			taxes: 460, 
			otherExpenses: 570, 
			perChild: 140,
			debts: [
				{name: housing, amount: 38000, payment: 400},
				{name: car, amount: 4000, payment: 80},
				{name: credit, amount: 2000, payment: 60},
				{name: retail, amount: 1000, payment: 50}
			],
			savings: 710,
		},
		{
			name: "Doctor (MD)", 
			salary: 13200, 
			taxes: 3420, 
			otherExpenses: 2880, 
			perChild: 640,
			debts: [
				{name: housing, amount: 202000, payment: 1900},
				{name: studentLoan, amount: 150000, payment: 750},
				{name: car, amount: 19000, payment: 380},
				{name: credit, amount: 9000, payment: 270},
				{name: retail, amount: 1000, payment: 50}
			],
			savings: 400,
		},
		{
			name: "Police Officer", 
			salary: 3000, 
			taxes: 580, 
			otherExpenses: 690, 
			perChild: 160,
			debts: [
				{name: housing, amount: 46000, payment: 400},
				{name: car, amount: 5000, payment: 100},
				{name: credit, amount: 2000, payment: 60},
				{name: retail, amount: 1000, payment: 50}
			],
			savings: 520,
		},
		{
			name: "Nurse", 
			salary: 3100, 
			taxes: 600, 
			otherExpenses: 710, 
			perChild: 170,
			debts: [
				{name: housing, amount: 47000, payment: 400},
				{name: studentLoan, amount: 6000, payment: 30},
				{name: car, amount: 5000, payment: 100},
				{name: credit, amount: 3000, payment: 90},
				{name: retail, amount: 1000, payment: 50}
			],
			savings: 480,
		},
		{
			name: "Truck Driver", 
			salary: 2500, 
			taxes: 460, 
			otherExpenses: 570, 
			perChild: 140,
			debts: [
				{name: housing, amount: 36000, payment: 400},
				{name: car, amount: 4000, payment: 80},
				{name: credit, amount: 2000, payment: 60},
				{name: retail, amount: 1000, payment: 50}
			],
			savings: 750,
		},
		{
			name: "Airline Pilot", 
			salary: 9500, 
			taxes: 2350, 
			otherExpenses: 2210, 
			perChild: 480,
			debts: [
				{name: housing, amount: 143000, payment: 1330},
				{name: car, amount: 15000, payment: 300},
				{name: credit, amount: 22000, payment: 660},
				{name: retail, amount: 1000, payment: 50}
			],
			savings: 400,
		},
		{
			name: "Teacher (K-12)", 
			salary: 3300, 
			taxes: 630, 
			otherExpenses: 760, 
			perChild: 180,
			debts: [
				{name: housing, amount: 50000, payment: 500},
				{name: studentLoan, amount: 12000, payment: 60},
				{name: car, amount: 5000, payment: 100},
				{name: credit, amount: 3000, payment: 90},
				{name: retail, amount: 1000, payment: 50}
			],
			savings: 400,
		},
		{
			name: "Janitor", 
			salary: 1600, 
			taxes: 280, 
			otherExpenses: 300, 
			perChild: 70,
			debts: [
				{name: housing, amount: 20000, payment: 200},
				{name: car, amount: 4000, payment: 60},
				{name: credit, amount: 2000, payment: 60},
				{name: retail, amount: 1000, payment: 50}
			],
			savings: 560,
		}];
	ScoreCardTemplates.remove({});
	for (var i = 0; i < scorecardtemplates.length; i += 1) {
		ScoreCardTemplates.insert(scorecardtemplates[i]);
	}
});