module.exports = function (score, index, amount){
	var tuples = [];
	for (var key in score[index]) tuples.push([key, score[index][key]["score"], score[index][key]["name"]]);

	tuples.sort(function(a, b) {
	    a = a[1];
	    b = b[1];

	    return a > b ? -1 : (a < b ? 1 : 0);
	});
	ids = []
	names = []
	for (var i = 0; i < amount; i++) {
		ids.push(tuples[i][0])
		names.push([tuples[i][1], tuples[i][2]])
	};
	return [ids, names];
}