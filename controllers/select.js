var express = require('express');
var router = express.Router();

var get_scores = require('../models/get_scores.js').single
var computeScore = require('../helpers/compute_score.js')
var sort_spectacles = require('../helpers/sort_spectacles.js')


router.get('/', function(req, res, next) {
	// get a given spectacle's 5 closest neighbour according 
	// to the best model tested on the last batch
	var id = req.query.spectacle
	ponderation = JSON.parse(req.query.ponderation)
	get_scores(id, function (err, scores){
		output = {}
		output[id] = {}
		for (i in scores) {
			row = scores[i].row
			s2 = row[0]
			score = computeScore(ponderation, row[1])
			output[id][s2.id] = {name:s2.name, score:score}
		}
		spect_sorted = sort_spectacles(output, id, 5)[1]
		res.render('select', {layout:false, data: spect_sorted});	
	})
});

module.exports = router;