module.exports = function(a) {
	// vérifier que l'argument est un nombre
	if (typeof a !== 'number') throw new Error('a doit être un nombre');
	// retourne la valeur absolue
	return (a >= 0) ? a : -a;
}