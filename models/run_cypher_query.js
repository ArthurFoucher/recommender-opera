var request = require("request");

//Define your host and port. This is where your database is running. Here it is defined on localhost.
var host = 'localhost', port = 7474;

var password = "password"

//This is the URL where we will POST our data to fire the cypher query. This is specified in Neo4j docs.
var httpUrlForTransaction = 'http://' + host + ':' + port + '/db/data/transaction/commit';

//Let’s define a function which fires the cypher query.
function runCypherQuery(query, params, callback) {
  request.post({
      uri: httpUrlForTransaction,
      json: {statements: [{statement: query, parameters: params}]}
    },
    function (err, res, body) {
		if (err) {
		  console.log(err);
		  callback("err", null)
		} else {
		  output = {}
		  if (body["errors"].length != 0){
		    console.log("Error code : " + body["errors"][0]["code"])
		    callback("err", null)
		  }else{
		    callback(null, body.results[0].data)   
		  }
		}
    }).auth('neo4j', password, true);
}

exports.runCypherQuery = runCypherQuery;