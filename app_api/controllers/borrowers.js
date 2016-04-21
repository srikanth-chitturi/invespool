var mongoose = require('mongoose');
var Borrower = mongoose.model('Borrower');


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


module.exports.getBorrowers = function  (req,res) {
	Borrower.find({})
	.exec(function(err,borrowers) {
		sendJSONresponse(res,200,borrowers);	
	});
}

module.exports.borrowersCreate = function  (req,res) {
	console.log(req.body);
	Borrower.create({
    name: req.body.name,
    country:req.body.country,
    address:req.body.address,
    shortDescription:req.body.shortDescription,
    fundedBy:req.body.fundedBy,
    percentageFunded:req.body.percentageFunded,
    longDescription:req.body.longDescription,
    moreInfo:req.body.moreInfo,
    category:req.body.category,
    aboutFunder:req.body.aboutFunder,
    stillRequired:req.body.stillRequired
  }, function(err, location) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(location);
      sendJSONresponse(res, 201, location);
    }
  });
}

module.exports.borrowersReadOne = function  (req,res) {
	console.log('reading from db')
	if(req.params && req.params.borrowerid)
	{
		Borrower.findById(req.params.borrowerid)
		.exec(function  (err,borrower) {
			if(!borrower){
				sendJSONresponse(res,404,{
					"message":"borrowerid not found"
				});		
				return;
			}
			else if(err){
				sendJSONresponse(res,404,err);
			}
			sendJSONresponse(res,200,borrower);	
		});
	}
	else{
		sendJSONresponse(res,200,{
			"message":"No borrowerid in request"
		});	
	}
}

module.exports.borrowersUpdateOne = function  (req,res) {
	if (!req.params.borrowerid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, borrowerid is required"
    });
    return;
  }
  Borrower
    .findById(req.params.borrowerid)
    .select('-lenders -teams')
    .exec(
      function(err, borrower) {
        if (!borrower) {
          sendJSONresponse(res, 404, {
            "message": "borrowerid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        borrower.name = req.body.name;
        borrower.address = req.body.address;
        borrower.category = req.body.category;
        borrower.personalStory = req.body.personalStory;
        borrower.description = req.body.description;
        borrower.aboutFunder = req.body.aboutFunder;
        borrower.save(function(err, borrower) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, borrower);
          }
        });
      }
  );
}

module.exports.borrowersDeleteOne = function  (req,res) {
	var borrowerid = req.params.borrowerid;
    if (borrowerid) {
    Borrower
      .findByIdAndRemove(borrowerid)
      .exec(
        function(err, borrower) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Borrower id " + borrowerid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No borrowerid"
    });
  }
}