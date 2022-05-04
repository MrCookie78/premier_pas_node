// const memoryDb = new Map(); // est global
// let id = 0; // doit être global
// memoryDb.set(id++, {nom: "Alice"}) // voici comment set une nouvelle entrée.
// memoryDb.set(id++, {nom: "Bob"})
// memoryDb.set(id++, {nom: "Charlie"})

const db = {
	memoryDb : new Map(),
	id : 0
}

module.exports = db;