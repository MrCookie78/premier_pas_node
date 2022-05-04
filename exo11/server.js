const http = require('http');
const fs = require('fs');
const path = require('path');

const db = require('./db')

const server = http.createServer((req, res) => {
	let data = '';

	try {
		// Route "/"
		if(req.url === "/"){

			// Route "/" avec la méthode GET
			if(req.method === 'GET'){
				res.writeHead(200, {'content-type' : 'text/html'});
				const index = fs.readFileSync(path.join(__dirname, 'public', 'pages', 'index.html'), 'utf8');
				res.write(index);
			}

			// Route "/" avec les autres méthodes
			else {
				res.writeHead(405, {'content-type' : 'text/html'});
				const file405 = fs.readFileSync(path.join(__dirname, 'public', 'pages', '405.html'), 'utf8');
				res.write(file405);
			}
			res.end();
		}

		// Route de du dossier public
		else if(req.url.match("/public/*")){
			if(req.method === 'GET'){
				file = req.url.split('/')[2].split('.');

				contentType = '';
				if(file[1] === 'js') contentType = 'application/javascript';
				else if (file[1] === 'css') contentType = 'text/css';
				else if (file[1] === 'jpg') contentType = 'image/jpg';

				res.writeHead(200, {'content-type' : contentType});
				const image = fs.readFileSync(path.join(__dirname, 'public', file[1], file[0] + '.' + file[1]));
				res.write(image);
			}

			// Route avec autres méthodes
			else {
				res.writeHead(405, {'content-type' : 'text/html'});
				const file405 = fs.readFileSync(path.join(__dirname, 'public', 'pages', '405.html'), 'utf8');
				res.write(file405);
			}
			res.end();
		}

		// Route API
		else if(req.url.match("/api/names")){

			if(req.method === 'GET'){
				res.writeHead(200, {'content-type' : 'application/json'});
				jsonText = JSON.stringify(Array.from(db.memoryDb.entries()));
				res.write(jsonText);
				res.end();
			}
			
			else if(req.method === 'POST'){
				req.on('data', chunk => {
					data += chunk;
				});
				req.on('end', () => {
					try{
						data = JSON.parse(data);

						if ('name' in data) {
							let idAdd = db.id;
							db.id++;
							db.memoryDb.set(idAdd, data);
							res.writeHead(201, {'content-type' : 'text'});
							jsonText = JSON.stringify(idAdd);
							res.write(jsonText);
						}

						else{
							res.writeHead(400, {'content-type' : 'application/json'});
							res.write(JSON.stringify({error: '400 - No data received'}));
						}
					}
					catch{
						res.writeHead(400, {'content-type' : 'application/json'});
						res.write(JSON.stringify({error: '400 - No data received'}));
					}
					res.end();
				});
			}

			// Route avec autres méthodes
			else {
				res.writeHead(405, {'content-type' : 'application/json'});
				res.write(JSON.stringify({error: '405 - Method Not Allowed'}));
				res.end();
			}
		}

		else if(req.url.match("/api/name/*")){

			if(req.method === 'GET'){
				let id = parseInt(req.url.replace("/api/name/", ""));
				if (db.memoryDb.has(id)){
					object = db.memoryDb.get(id);
				
					res.writeHead(200, {'content-type' : 'application/json'});
					jsonText = JSON.stringify(object);
					res.write(jsonText);
				}
				else{
					res.writeHead(404, {'content-type' : 'application/json'});
					res.write(JSON.stringify({error: '404 - Data not found'}));
				}
				res.end();
			}

			else if(req.method === 'PUT'){
				let id = parseInt(req.url.replace("/api/name/", ""));
				if(db.memoryDb.has(id)){
					req.on('data', chunk => {
						data += chunk;
					});
					req.on('end', () => {
						try{
							data = JSON.parse(data);
	
							if ('name' in data) {
								db.memoryDb.set(id, data);
								res.writeHead(201, {'content-type' : 'application/json'});
								jsonText = JSON.stringify(Array.from(db.memoryDb.entries()));
								res.write(jsonText)
							}
	
							else{
								res.writeHead(400, {'content-type' : 'application/json'});
								res.write(JSON.stringify({error: '400 - No data received'}));
							}
						}
						catch{
							res.writeHead(400, {'content-type' : 'application/json'});
							res.write(JSON.stringify({error: '400 - No data received'}));
						}
						res.end();
					});
				}
				else{
					res.writeHead(404, {'content-type' : 'application/json'});
					res.write(JSON.stringify({error: '404 - Data not found'}));
					res.end();
				}
			}

			else if(req.method === 'DELETE'){
				let id = parseInt(req.url.replace("/api/name/", ""));
				if(db.memoryDb.has(id)){
					db.memoryDb.delete(id);

					res.writeHead(201, {'content-type' : 'application/json'});
					jsonText = JSON.stringify(Array.from(db.memoryDb.entries()));
					res.write(jsonText)
				}
				else{
					res.writeHead(404, {'content-type' : 'application/json'});
					res.write(JSON.stringify({error: '404 - Data not found'}));
				}
				res.end();
			}

			// Route avec autres méthodes
			else {
				res.writeHead(405, {'content-type' : 'application/json'});
				res.write(JSON.stringify({error: '405 - Method Not Allowed'}));
				res.end();
			}
			
		}

		// Gestion des routes non définies
		else {
			res.writeHead(404, {'content-type' : 'text/html'});
			const file404 = fs.readFileSync(path.join(__dirname, 'public', 'pages', '404.html'), 'utf8');
			res.write(file404);
			res.end();
		}

	}
	catch (err) {
		res.writeHead(500, {'content-type' : 'text/html'});
		const file500 = fs.readFileSync(path.join(__dirname, 'public', 'pages', '500.html'), 'utf8');
		res.write(file500);
		res.end();
	}

} );

module.exports = server;

