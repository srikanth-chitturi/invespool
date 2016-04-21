var express = require('express');
var router = express.Router();

var ctrlHome = require('../controllers/index');
var ctrlLender = require('../controllers/lend');
var ctrlBorrow = require('../controllers/borrow');

var ctrlOthers = require('../controllers/others');

/* GET home page. */
router.get('/',ctrlHome.index);
router.get('/lend',ctrlLender.homelist);
router.get('/borrower/:borrowerid',ctrlLender.borrowerInfo);
router.get('/borrow',ctrlBorrow.homelist);


//others
router.get('/about',ctrlOthers.about);
router.get('/howitworks',ctrlOthers.howitworks);


module.exports = router;
