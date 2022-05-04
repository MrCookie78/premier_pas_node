const path = require('path');
const express = require('express')
const server = express()
const db = require('./db')


const verifyId = (req, res, next) => {
  let id = parseInt(req.params.id);

	// Si l'identifiant existe
	if (db.memoryDb.has(id)) {
		next();
	}

	// Sinon
	else {
		res.status(404).json({error: '404 - Data not found'});
	}
};


server.use(express.json());
server.use('/public', express.static('public'));

server.get('/', (req, res) => {
	res.type('html').sendFile(path.join(__dirname, 'public', 'pages', 'index.html'))
})


server.get('/api/names', (req, res) => {
	res.json(Object.fromEntries(db.memoryDb))
})

server.post('/api/names', (req, res) => {
	data = req.body;

	if ('name' in data) {
		let id = db.id;
		db.id++;
		db.memoryDb.set(id, data);
		res.status(201).json({id})
	}

	else{
		res.status(400).json({error: '400 - No data received'})
	}
})


// server.get('/api/name/:id', (req, res) => {
// 	let id = parseInt(req.params.id);

// 	if (db.memoryDb.has(id)){
// 		object = db.memoryDb.get(id);
// 		res.status(200).json(object);
// 	}
// 	else{
// 		res.status(404).json({error: '404 - Data not found'});
// 	}
// })

server.get("/api/name/:id", verifyId, (req, res) => {
  const id = parseInt(req.params.id);
  res.status(200).json(Object.fromEntries(db.memoryDb)[id]);
});

server.put('/api/name/:id', (req, res) => {
	let id = parseInt(req.params.id);
	if (db.memoryDb.has(id)){
		data = req.body;

		if ('name' in data) {
			let id = db.id;
			db.id++;
			db.memoryDb.set(id, data);
			res.status(201).json({id})
		}

		else{
			res.status(400).json({error: '400 - No data received'})
		}
	}
	else{
		res.status(404).json({error: '404 - Data not found'});
	}
})

server.delete('/api/name/:id', (req, res) => {
	let id = parseInt(req.params.id);
	if (db.memoryDb.has(id)){
		db.memoryDb.delete(id);
		res.status(201).json({id})
	}
	else{
		res.status(404).json({error: '404 - Data not found'});
	}
})

module.exports = server;

