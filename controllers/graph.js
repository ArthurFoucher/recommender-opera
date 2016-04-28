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

function generateD3Data (callback) {
	get_scores.all(function (err, scores) {
		ponderation = this.ponderation
		d3_model = {}
		d3_client = {}
		scores_computed = []
		scores_clients = []
		for (i in scores) {
			row = scores[i].row
			s1 = row[0]
			s2 = row[1]
			score_s = computeScore(ponderation, row[2])

			if (!(s1.id in d3_model)) {
				d3_model[s1.id] = {};
				d3_client[s1.id] = {};
			};
			d3_model[s1.id][s2.id] = {name:s2.name, score:score_s}
			d3_client[s1.id][s2.id] = {name:s2.name, score:row[2].score_clients}
			if (!(s2.id in d3_model)) {
				d3_model[s2.id] = {};
				d3_client[s2.id] = {};
			};
			d3_model[s2.id][s1.id] = {name:s1.name, score:score_s}
			d3_client[s2.id][s1.id] = {name:s1.name, score:row[2].score_clients}

			scores_computed.push(score_s);
			scores_clients.push(parseFloat(row[2].score_clients));
		}
		return callback(null, [d3_model, d3_client], [scores_computed, scores_clients])
	})
}

router.get('/', function(req, res, next) {
	ponderation = deepParseFloat(req.query)
	async.parallel([
		get_spectacles.initialize,
		generateD3Data.bind({ponderation:ponderation})
	], function (err, results){
		/*
		  result 0 is the spectacle list
		  result 1 is an array
		  result 1 0 is the data to create the json file consumed by d3 (model, client)
		  result 1 1 is the score data (model, client)
		*/
		var fileName = shortid.generate()
		async.parallel([
			make_d3_json.bind({list_of_spectacles:results[0], score:results[1][0][0], fileName:fileName+".json"}),
			make_d3_json.bind({list_of_spectacles:results[0], score:results[1][0][1], fileName:fileName+"-client.json"})
		], function (err){
			c = correlation.calc(results[1][1][0], results[1][1][1])
			msg = {name:fileName+".json", correlation:c, ponderation:JSON.stringify(ponderation)}
			res.send(JSON.stringify(msg));	
		})			
	})
})

module.exports = router;



