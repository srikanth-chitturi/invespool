var request = require('request');

var apiOptions = {
	server: "http://localhost:3000"
};

var renderBorrowersPage = function(req, res, responseBody) {
	res.render('borrowers-list', {
		title: 'List of Borrowers',
		pageHeader: {
			title: 'Lend'
		}
	});
}

module.exports.homelist = function(req, res) {
	renderBorrowersPage(req, res);
}

var renderBorrowerDetails = function  (req,res,borrower) {
	res.render('borrower-info', {
		borrower: borrower
	});
}


module.exports.borrowerInfo = function(req, res) {

	var requestOptions, path;
	path = '/api/borrowers/'+req.params.borrowerid;
	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {},
	};
	request(
		requestOptions,
		function(err, response, body) {
			console.log(body);
			renderBorrowerDetails(req,res,body);
		}
	);
	
}