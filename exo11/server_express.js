// const fs = require('fs');
// const path = require('path');
const express = require('express')
const server = express()
const db = require('./db')

server.use(express.json());
server.use(express.static('public'));

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


server.get('/api/name/:id', (req, res) => {
	let id = parseInt(req.params.id);

	if (db.memoryDb.has(id)){
		object = db.memoryDb.get(id);
		res.status(200).json(object);
	}
	else{
		res.status(404).json({error: '404 - Data not found'});
	}
})

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

