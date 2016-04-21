var mongoose = require('mongoose');


var lenderSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	address:{
		type:String,
		required:true
	}
});

var teamSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	category:{
		type:String,
		required:true
	}
});

var borrowerSchema = new mongoose.Schema({
	name:{
		type: String,
        required: true
	},
	country:{
		type: String,
        required: true
	},
	address:{
		type: String,
        required: true
	},
	shortDescription:{
		type: String,
        required: true
	},
	fundedBy:{
		type: String,
        required: true
	},
	percentageFunded:{
		type: String,
        required: true
	},
	longDescription:{
		type: String,
        required: true
	},
	moreInfo: {
    	type:String,
    	required:true
    },
	category:{
		type: String,
        required: true
	},
	aboutFunder:{
    	type:String,
    	required:true
    },
    stillRequired:{
    	type:Number,
    },
    lenders: [lenderSchema],
    teams:[teamSchema]
});

mongoose.model('Borrower',borrowerSchema);