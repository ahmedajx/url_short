var sh = require("shorthash");
var AWS = require("aws-sdk");
var DOC = require("dynamodb-doc");
const API = "https://c4ulf0pw7c.execute-api.eu-west-1.amazonaws.com/k/";
var docClient = new DOC.DynamoDB();

AWS.config.update({region: "eu-west-1"});

console.log('starting function')
exports.handle = function(e, ctx, cb) {
    var long = e.url
    if (
        long.substring(0, 3) === "www" ||
        long.includes("www") === false &&
        long.includes("http") === false
    ){
        long = "http://" + e.url
    }
    var hashedUrl = sh.unique(long);
    var params = {
        Item : {
            id : hashedUrl,
            url : long
        },
        TableName : "short"
    };
    docClient.putItem(params, function(err, data){
        if(err){
            cb(err, null)
        }else{
            cb(null, {
                url : API + hashedUrl
            })
        }
    });
}
