var express = require('express');
var correlation = require('node-correlation')
var async = require('async');
var shortid = require('shortid');
var router = express.Router();

var get_scores = require('../models/get_scores.js')
var get_spectacles = require('../models/get_spectacles.js')
var clients_list = require('../models/get_clients_list.js')

var make_d3_json = require('../helpers/create_json.js')
var sort_spectacles = require('../helpers/sort_spectacles.js')
var computeScore = require('../helpers/compute_score.js')
var deepParseFloat = require('../helpers/misc.js').deepParseFloat


router.get('/', function(req, res, next) {
	ponderation = deepParseFloat(req.query)

	get_spectacles.last_season(function (err, spectacles_list) {
		async.map(spectacles_list, computeKPI.bind({ponderation:ponderation}), function(err, info){
			if (err) {
				console.log(err)
			}else{
				res.render('kpi', {layout:false, data: info});				
			};
		})
	})
});

function computeKPI (s, callback){
	// compute the performance of the model on a 
	// given spectacle according to client data
	ponderation = this.ponderation

	id = s.row[0]
	get_scores.single(id, function (err, scores){
		output = {}
		output[id] = {}
		for (i in scores) {
			row = scores[i].row
			s2 = row[0]
			score = computeScore(ponderation, row[1])
			output[id][s2.id] = {name:s2.name, score:score}
		}
		spect_sorted = sort_spectacles(output, id, 5)[0];
		clients_list.check(id, JSON.stringify(spect_sorted), function(r, results){
			clients_actual = 0;
			total = null
			for (el in results){
				row = results[el].row
				if (row[2] != null) {
					clients_actual += parseInt(row[3]);
					if (total == null) {
						total = row[2];
					};
				};
			}
			rappel = clients_actual/total*100;
			precision = clients_actual/results.length*100;
			callback(null, [s.row[1], precision.toFixed(2), rappel.toFixed(2)])
		})
	})
}
module.exports = router;



