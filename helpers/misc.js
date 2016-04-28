function deepParseFloat (inputDict){
	if (typeof inputDict === 'object') {
		for (key in inputDict){
			inputDict[key] = deepParseFloat(inputDict[key])
		}
	}else{
		inputDict = parseFloat(inputDict);
	}
	return inputDict
}

function generatePonderationList(rangesDict){
	ponderations = [];
	for (var i = rangesDict.words.start; i.toFixed(2) <= rangesDict.words.end; i+=rangesDict.words.step) {
		for (var j = rangesDict.meta.start; j.toFixed(2) <= rangesDict.meta.end; j+=rangesDict.meta.step) {	
			for (var k = rangesDict.compositeur.start; k.toFixed(2) <= rangesDict.compositeur.end; k+=rangesDict.compositeur.step) {
				for (var l = rangesDict.chef.start; l.toFixed(2) <= rangesDict.chef.end; l+=rangesDict.chef.step) {
					for (var m = rangesDict.choregraphe.start; m.toFixed(2) <= rangesDict.choregraphe.end; m+=rangesDict.choregraphe.step) {
						for (var n = rangesDict.type.start; n.toFixed(2) <= rangesDict.type.end; n+=rangesDict.type.step) {
							for (var o = rangesDict.salle.start; o.toFixed(2) <= rangesDict.salle.end; o+=rangesDict.salle.step) {
								for (var q = rangesDict.metteur.start; q.toFixed(2) <= rangesDict.metteur.end; q+=rangesDict.metteur.step) {
									p = {
										words:i,
										meta:j,
										compositeur:k,
										chef:l,
										choregraphe:m,
										type:n,
										salle:o,
										metteur:q
									}		
									ponderations.push(p);
								}
							}
						}
					}
				}
			}
		}
	};
	return ponderations;
}

module.exports = {
	deepParseFloat: deepParseFloat,
	generatePonderationList: generatePonderationList
}