// Used to call the api
var database = require('./run_cypher_query')

module.exports = function (callback) {
	req = 'MATCH (p:Spectacle) RETURN p';
	database.runCypherQuery(
	  req,
	  {}, function (err, resp) {
	    callback(err, resp)
	  }
	);
};



