function normalise (d) {
	var output = {};
	var sum = 0
	for (i in d){
		sum += d[i]
	}
	for (i in d){
		if (sum != 0) {
			output[i] = d[i]/sum
			output[i] = output[i].toFixed(2)
		}else{
			output[i] = d[i]
		};
	}
	return output
}

function floatDict(string_dict){
	int_dict = {}
	for (el in string_dict){
		int_dict[el] = parseFloat(string_dict[el])
	}
	return int_dict
}

function computeScore(ponderation, scores){
	ponderation = floatDict(ponderation)
	global = normalise({words:ponderation.words, meta:ponderation.meta})
	meta = normalise({compositeur:ponderation.compositeur, chef:ponderation.chef, choregraphe:ponderation.choregraphe, metteur:ponderation.metteur, salle:ponderation.salle, type:ponderation.type})
	meta_score = meta.chef*scores.chef_score + meta.compositeur*scores.compositeur_score + meta.choregraphe*scores.choregraphe_score + meta.metteur*scores.metteurenscene_score + meta.salle*scores.salle_score + meta.type*scores.type_score;
	return global.words*parseFloat(scores.score_tf)+global.meta*parseFloat(meta_score);
}

module.exports = computeScore