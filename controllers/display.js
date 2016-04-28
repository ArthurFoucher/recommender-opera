var express = require('express')
var router = express.Router()
var async = require('async');
var correlation = require('node-correlation')

var get_scores = require('../models/get_scores.js').all
var get_spectacles = require('../models/get_spectacles.js')
var computeScore = require('../helpers/compute_score.js')
var generatePonderationList = require('../helpers/misc.js').generatePonderationList
var deepParseFloat = require('../helpers/misc.js').deepParseFloat

function modelCorrelation(ponderation, callback){
	edges = this.edges;
	scores_computed = [];
	scores_clients = [];
	
	for (el in edges){
		edge = edges[el].row[2]
		scores_computed.push(computeScore(ponderation, deepParseFloat(edge)));
		scores_clients.push(parseFloat(edge.score_clients));
	}
	res = correlation.calc(scores_computed, scores_clients)*100
	callback(null, [ponderation, res.toFixed(2)]);
}


function computeAllCorrelations(callback) {
	get_scores(function (err, edges) {
		async.mapLimit(this.ponderations, 200, modelCorrelation.bind({ edges: edges }), function (e, r) {
			r.sort(function(a,b){
				return parseFloat(b[1]) - parseFloat(a[1]);
			})
			return callback(err, r);
		});	
	});
}

function getLastSeasonSpectacles(callback){
	get_spectacles.last_season(function (err, spectacles_list) {
		data = []
		for (row in spectacles_list){
			data.push({id:spectacles_list[row].row[0], name:spectacles_list[row].row[1]})
		}
		return callback(err, data);
	})	
}


router.get('/', function(req, res, next) {
	query = deepParseFloat(req.query)

	ponderations = generatePonderationList(query)
	async.parallel([
		computeAllCorrelations.bind(ponderations),
		getLastSeasonSpectacles
	], function (err, results){
		res.render('index', { title: 'Ponderations tester',  rows: results[0], best:JSON.stringify(results[0][0][0]), spectacles: results[1]});
	})
});


module.exports = router;



