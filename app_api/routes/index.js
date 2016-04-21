var express = require('express');
var router = express.Router();
var ctrlBorrowers = require('../controllers/borrowers');
var ctrlLenders = require('../controllers/lenders');

//borrowers
router.get('/borrowers', ctrlBorrowers.getBorrowers); 
router.post('/borrowers', ctrlBorrowers.borrowersCreate); //create a new borrower
router.get('/borrowers/:borrowerid',ctrlBorrowers.borrowersReadOne);
router.put('/borrowers/:borrowerid',ctrlBorrowers.borrowersUpdateOne);
router.delete('/borrowers/:borrowerid',ctrlBorrowers.borrowersDeleteOne);

//lenders
router.post('/borrowers/:borrowerid/lenders', ctrlLenders.lendersCreate); //create a new lender for a borrower
router.get('/borrowers/:borrowerid/lenders/:lenderid', ctrlLenders.lendersReadOne);
router.put('/borrowers/:borrowerid/lenders/:lenderid', ctrlLenders.lendersUpdateOne);
router.delete('/borrowers/:borrowerid/lenders/:lenderid', ctrlLenders.lendersDeleteOne);

module.exports = router;