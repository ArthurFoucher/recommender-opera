// Used to call the api
var database = require('./run_cypher_query')

module.exports = {
  check:function (id_spectacle, id_list,callback) {
    req = 'MATCH (c:Client)-[:ACHETE]-(s2:Spectacle) WHERE s2.id in '+ id_list +' OPTIONAL MATCH (s1:Spectacle{id:"'+ id_spectacle +'"})-[e:ACHETE]-(c:Client) RETURN c.id, count(distinct s2), s1.places_available, e.nb_place ORDER BY count(distinct s2) DESC LIMIT 35000'
    database.runCypherQuery(
      req,
      {}, function (err, resp) {
        callback(err, resp)
      }
    );
  }
}
