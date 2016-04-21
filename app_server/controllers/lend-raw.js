

module.exports.homelist = function  (req,res) {
	res.render('borrowers-list',{
		title:'List of Borrowers',
		pageHeader:{
			title:'Lend'
		},
		borrowers:[
		{
			name:'Serine',
			country:'Armenia',
			category:'Education | Higher education costs',
			description:'A loan of $800 helps Serine to pay her university tuition fee.',
			funded:'6',
			required:'275',
			fundedBy:'Funding via SEF International'
		},
		{
			name:'Serine',
			country:'Armenia',
			category:'Education | Higher education costs',
			description:'A loan of $800 helps Serine to pay her university tuition fee.',
			funded:'10',
			required:'290',
			fundedBy:'Funding via SEF International'
		},
		{
			name:'Serine',
			country:'Armenia',
			category:'Education | Higher education costs',
			description:'A loan of $800 helps Serine to pay her university tuition fee.',
			funded:'15',
			required:'22',
			fundedBy:'Funding via SEF International'
		}]
	});
}

module.exports.borrowerInfo = function  (req,res) {
	res.render('borrower-info',{
		title:'Serine',
		pageHeader:{
			category:'Education | Higher education costs',
			address:'Vanadzor town, Armenia'
		},
		borrower:
		{
			personalStory:'Serine is a 22-year-old student who puts a lot of effort into her studies. Unfortunately, her family has financial problems and cannot pay her tuition fee. She needs your help to receive a loan in order to pay the university tuition. Please help Serine to continue her studies and be a good professional in her field.',
			description:'Although Armenia has a national student loan program, loans are disbursed by banks, which often reject low-income student loan applicants because they are considered too risky. This loan is part of Kiva and SEF International\'s new loan product built to allow those who are rejected by banks to pursue their education with financing that has terms similar to the national student loan program. This means that low-income students receive an affordable interest rate and a grace period that lasts during the student\'s entire studies. This allows students to secure an income before worrying about repayment obligations, but also means there is a longer loan term that may make this loan more risky. Additionally, funds are directly paid to the student\'s educational institution at the beginning of each academic term and there is a discounted rate for students who come from particularly impoverished areas. By supporting this loan, you’re contributing to a groundbreaking loan product that empowers this student to secure a better future.',
			aboutFunder:'SEF’s mission is to extend business development and financial services to emerging entrepreneurs in search of productive opportunities to support their families and communities and to build bright futures for children in Armenia. '
		}
	});
}