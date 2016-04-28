// Used to call the api
var database = require('./run_cypher_query')

module.exports = {
  initialize: function (callback) {
    req = 'MATCH (p:Spectacle) WHERE p.saison < "1415" RETURN p.id, p.name, p.type';
    database.runCypherQuery(
      req,
      {}, function (err, resp) {
        callback(err, resp)
      }
    );
  },
  last_season: function (callback) {
    req = 'MATCH (p:Spectacle) WHERE p.saison = "1415" RETURN p.id, p.name';
    database.runCypherQuery(
      req,
      {}, function (err, resp) {
        callback(err, resp)
      }
    );
  }
};



