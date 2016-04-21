var mongoose = require('mongoose');
var Borrower = mongoose.model('Borrower');


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


module.exports.lendersCreate = function  (req,res) {
	 if (req.params.borrowerid) {
    Borrower
      .findById(req.params.borrowerid)
      .select('lenders')
      .exec(
        function(err, borrower) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            doAddLender(req, res, borrower);
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, locationid required"
    });
  }
}


var doAddLender = function(req, res, borrower) {
  if (!borrower) {
    sendJSONresponse(res, 404, "borrower not found");
  } else {
    borrower.lenders.push({
      name: req.body.name,
      address: req.body.address
    });
    borrower.save(function(err, borrower) {
      var thisLender;
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
      	thisLender = borrower.lenders[borrower.lenders.length - 1];
        sendJSONresponse(res, 201, thisLender);
      }
    });
  }
};

module.exports.lendersReadOne = function  (req,res) {
	 console.log("Getting single lender");
  if (req.params && req.params.borrowerid && req.params.lenderid) {
    Borrower
      .findById(req.params.borrowerid)
      .select('name lenders')
      .exec(
        function(err, borrower) {
          console.log(borrower);
          var response, lender;
          if (!borrower) {
            sendJSONresponse(res, 404, {
              "message": "borrowerid not found"
            });
            return;
          } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
          }
          if (borrower.lenders && borrower.lenders.length > 0) {
           // sendJSONresponse(res, 200, borrower.lenders)
            lender = borrower.lenders.id(req.params.lenderid);
            if (!lender) {
              sendJSONresponse(res, 404, {
                "message": "lenderid not found"
              });
            } else {
              response = {
                borrower: {
                  name: borrower.name,
                  id: req.params.borrowerid
                },
                lender: lender
              };
              sendJSONresponse(res, 200, response);
            }
          } else {
            sendJSONresponse(res, 404, {
              "message": "No lenders found"
            });
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, borrowerid and lenderid are both required"
    });
  }
}

module.exports.lendersUpdateOne = function  (req,res) {
	if (!req.params.borrowerid || !req.params.lenderid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, locationid and reviewid are both required"
    });
    return;
  }
  Borrower
    .findById(req.params.borrowerid)
    .select('lenders')
    .exec(
      function(err, borrower) {
        var thisLender;
        if (!borrower) {
          sendJSONresponse(res, 404, {
            "message": "borrowerid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        if (borrower.lenders && borrower.lenders.length > 0) {
          //sendJSONresponse(res, 404, borrower.lenders);
           thisLender = borrower.lenders.id(req.params.lenderid);
          if (!thisLender) {
            sendJSONresponse(res, 404, {
              "message": "lenderid not found"
            });
          } else {
            thisLender.name = req.body.name;
            thisLender.address = req.body.address;
            borrower.save(function(err, borrower) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                sendJSONresponse(res, 200, thisLender);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No lender to update"
          });
        }
      }
  );
}

module.exports.lendersDeleteOne = function  (req,res) {
	if (!req.params.borrowerid || !req.params.lenderid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, borrowerid and lenderid are both required"
    });
    return;
  }
  Borrower
    .findById(req.params.borrowerid)
    .select('lenders')
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
        if (borrower.lenders && borrower.lenders.length > 0) {
          if (!borrower.lenders.id(req.params.lenderid)) {
            sendJSONresponse(res, 404, {
              "message": "lenderid not found"
            });
          } else {
            borrower.lenders.id(req.params.lenderid).remove();
            borrower.save(function(err) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                sendJSONresponse(res, 204, null);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No lender to delete"
          });
        }
      }
  );
}
