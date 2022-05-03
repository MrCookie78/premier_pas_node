const http = require('http');
const { endianness } = require('os');

const server = http.createServer((req, res) => {
	let data = '';

	req.on('data', chunk => { 
		data += chunk;
	})

	req.on('end', () => {
		data = JSON.parse(data);
		console.log(data);

		results = {name: 'Hello', age: 12};
		results = JSON.stringify(results);
		res.write(results);
		
		res.end();
	})

} );

server.listen(3000);