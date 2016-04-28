var express = require('express')
var router = express.Router()
var DBCheck = require('../models/check_availability.js')



router.get('/', function(req, res, next) {
  DBCheck(function(err, resp){
  	console.log(err)
  	res.render('index', { title: 'Model tester | Opera de Paris' , error:err!=null}); // landing page/ponderation range
  })
});

router.use('/display', require('./display')) // Compute and display correlation between model and actual client data

router.use('/graph', require('./graph')) // Generate the files consumed by d3.js to create the force oriented graph

router.use('/select', require('./select')) // Get closest spectacles in the past seasons for any spectacle of the last season

router.use('/kpi', require('./kpi')) // Compute KPIs for each spectacle of the new season

module.exports = router;
