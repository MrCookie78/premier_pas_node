const http = require('http');
const server = http.createServer((req, res) => {
let start = performance.now();;

	try {
		// ICI MIDDLEWARE A EXECUTER AVANT DE TRAITER LA REQUETE
		console.log(req.httpVersion, req.url, req.method)
		console.time("Durée requête");
		// FIN MIDDLEWARE

		if(req.url === "/"){
			res.writeHead(200, {'content-type' : 'text/html'});
			res.write('<h1>Hello World</h1>\n');
		}
		else {
			res.writeHead(404, {'content-type' : 'text/html'});
			res.write('<h1>404 Not Found</h1>\n');
		}

	}
	catch (err) {
		res.writeHead(500, {'content-type' : 'text/html'});
		res.write('<h1>500 Internal Server Error</h1>\n');
	}
	res.end();

	// ICI MIDDLEWARE A EXECUTER APRES AVOIR TRAITER LA REQUETE
	console.timeEnd("Durée requête");
	let end = performance.now();
	console.log(end - start + 'ms');
	// FIN MIDDLEWARE

	
} );

server.listen(3000);
console.log("Server écoute sur le port 3000");