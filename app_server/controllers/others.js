
module.exports.about = function  (req,res) {
	res.render('index',{title:'About Us'});
}

module.exports.howitworks = function  (req,res) {
	res.render('index',{title:'How it works'});
}


