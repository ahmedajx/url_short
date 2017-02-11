console.log('starting function');

var AWS = require("aws-sdk");
var DOC = require("dynamodb-doc");

AWS.config.update({region: "eu-west-1"});

var dynamodb = new DOC.DynamoDB();

exports.handle = function(e, ctx, cb) {
	var params = {
		Key: {
	   		id:  e.hash
	  	}, 
	  	TableName: "short"
	};
	dynamodb.getItem(params, function(err, data) {
	   	if (err) {
	   		cb(err, null) 
	   	}else{
	   	    if (Object.keys(data).length === 0) {
	   	        cb(null, {error : "Not Found"})
	   	    }else{
	   	        cb(null, {url : data.Item.url})    
	   	    }
	   	}
	});
}