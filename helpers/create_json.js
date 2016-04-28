var fs = require('fs');
var sort_spectacles = require('./sort_spectacles.js')


module.exports = function (callback) {
	list_of_spectacles = this.list_of_spectacles;
	score = this.score;

	fs.writeFile("./public/data/score/" + this.fileName, JSON.stringify(score), function(err) {
	    if(err) {
	        return console.log(err);
	    }
	}); 
	var writeStream = fs.createWriteStream('./public/data/d3/' + this.fileName);

	writeStream.write("{\"nodes\":[");

	spect_index = []
	for (row in list_of_spectacles){
		var s_name = list_of_spectacles[row].row[1];
		var se_id = list_of_spectacles[row].row[0];
		var type = (list_of_spectacles[row].row[2] == "BALLET") ? 1 : 2;

		spect_index.push(se_id)

		str = "{\"name\":\""+ s_name +"\",\"test\":"+ type +",\"group\":1}";
		if (list_of_spectacles[row] != list_of_spectacles[list_of_spectacles.length-1]) {
			str += ","
		};
		str += "\n"
		writeStream.write(str)
	}
	writeStream.write("],\"links\":[");
	for (var val_row in list_of_spectacles){
		var se_id = list_of_spectacles[val_row].row[0];
		neighbors = sort_spectacles(score, se_id, 2)[0];
		for (var i = 0; i < neighbors.length; i++) {
			d3_id_source = String(spect_index.indexOf(se_id));
			d3_id_target = String(spect_index.indexOf(neighbors[i]));
			str = "{\"source\":"+ d3_id_source +",\"target\":"+ d3_id_target +",\"value\":1},";
			if (list_of_spectacles[val_row] == list_of_spectacles[list_of_spectacles.length-1] && i == neighbors.length-1) {
				str = str.slice(0, -1);
			};
			str += "\n"
			writeStream.write(str);
		};
		
	};
	writeStream.write("]}")
	writeStream.end()

	callback(null)
}

