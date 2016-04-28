// Used to call the api
var database = require('./run_cypher_query')

module.exports = {
  all: function (callback) {
    req = 'MATCH (n:Spectacle)-[e]->(p:Spectacle) WHERE p.saison < "1415" AND n.saison < "1415" RETURN n, p, e'
    database.runCypherQuery(
      req,
      {}, function (err, resp) {
        callback(err, resp)
      }
    );
  },
  single: function (id,callback) {
    req = 'MATCH (n:Spectacle{id:"'+ id +'"})-[e]-(p:Spectacle) WHERE p.saison < "1415" RETURN p, e'
    database.runCypherQuery(
      req,
      {}, function (err, resp) {
        callback(err, resp)
      }
    );
  }
};
