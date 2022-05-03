const memoryDb = new Map();

// Création d'objet
memoryDb.set("Alice", { name: 'Alice', age: 22 });
memoryDb.set(0, { name: 'Carole', age: 29 });

console.log(memoryDb);

console.log(memoryDb.get(0))
console.log(memoryDb.get("Alice"))

// Modifier une clé existante
memoryDb.set("Alice", {blabla: 'hey'})
console.log(memoryDb.get("Alice"))

// Suppression
memoryDb.delete(0)
console.log(memoryDb)
