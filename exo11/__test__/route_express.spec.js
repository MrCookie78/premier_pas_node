const request = require("supertest");
const server = require('../server_express');
const db = require('../db');

describe('Test server', () => {

	test.skip('GET\t - Undefined route. Should return 404 error', () => {
		request(server)
		.get('/')
		.expect("Content-Type", /html/)
		.expect(404)
	});

	describe.skip('Route /', () => {

		test('GET\t - Should return html and code 200', async () => {
			const res = await request(server)
				.get('/')
				.expect("Content-Type", /html/)
				.expect(200)
		});

		test('POST\t - Should return 405 error',  () => {
			request(server)
				.get('/')
				.expect("Content-Type", /html/)
				.expect(405)
		});

		test('PUT\t - Should return 405 error',  () => {
			request(server)
				.get('/')
				.expect("Content-Type", /html/)
				.expect(405)
		});

		test('DELETE\t - Should return 405 error',  () => {
			request(server)
				.get('/')
				.expect("Content-Type", /html/)
				.expect(405)
		});

	});


	describe.skip('Route /public', () => {

		test.each(
			['style.css', 'image.jpg', 'script.js']
		)
		('GET\t - Récupération de fichier, exemple -> %p', (a) => {
			return request(server)
			.get('/public/' + a)
			.expect(200)
		})

		test('POST\t - Should return 405 error', () => {
			return request(server)
			.post('/public/script.js')
			.expect("Content-Type", /html/)
			.expect(405)
		});

		test('PUT\t - Should return 405 error', () => {
			return request(server)
			.put('/public/script.js')
			.expect("Content-Type", /html/)
			.expect(405)
		});

		test('DELETE\t - Should return 405 error', () => {
			return request(server)
			.delete('/public/script.js')
			.expect("Content-Type", /html/)
			.expect(405)
		});

	})

	describe('API', () => {
		describe('Route /api/names', () => {

			test('GET\t - Should return json', () => {
				return request(server)
				.get('/api/names')
				.expect("Content-Type", /json/)
				.expect(200)
			});

			test('POST\t - Correct data.\tShould return new id', () => {
				return request(server)
				.post('/api/names')
				.expect("Content-Type", /json/)
				.send({
					name: 'Aurelie'
				})
				.expect(201)
			});

			test('POST\t - Wrong data.\t\tShould return 400 error', () => {
				return request(server)
				.post('/api/names')
				.expect("Content-Type", /json/)
				.send({
					test: 'Aurelie'
				})
				.expect(400)
			});

			test('POST\t - No data.\t\tShould return 400 error', () => {
				return request(server)
				.post('/api/names')
				.expect("Content-Type", /json/)
				.expect(400)
			});

			test('PUT\t - Should return 404 error', () => {
				return request(server)
				.put('/api/names')
				.expect(404)
			});

			test('DELETE - Should return 404 error', () => {
				return request(server)
				.delete('/api/names')
				.expect(404)
			});

		})

		describe('Route /api/name/{id}', () => {

			test('GET\t - Existing ID.\t\tShould return the object', () => {
				return request(server)
				.get('/api/name/0')
				.expect("Content-Type", /json/)
				.expect(200)
			});

			test('GET\t - Not existing ID.\tShould return 404 error', () => {
				return request(server)
				.get('/api/name/1000')
				.expect("Content-Type", /json/)
				.expect(404)
			});

			test('PUT\t - Correct data.\tShould return json', () => {
				return request(server)
				.put('/api/name/0')
				.expect("Content-Type", /json/)
				.send({
					name: 'Aurelie'
				})
				.expect(201)
			});

			test('PUT\t - Wrong data.\t\tShould return 400 error', () => {
				return request(server)
				.put('/api/name/0')
				.expect("Content-Type", /json/)
				.send({
					test: 'Aurelie'
				})
				.expect(400)
			});

			test('PUT\t - No data.\t\tShould return 400 error', () => {
				return request(server)
				.put('/api/name/0')
				.expect("Content-Type", /json/)
				.expect(400)
			});

			test('PUT\t - Not existing ID.\tShould return 404 error', () => {
				return request(server)
				.put('/api/name/1000')
				.expect("Content-Type", /json/)
				.expect(404)
			});

			test('DELETE - Should return json and code 201', () => {
				return request(server)
				.delete('/api/name/0')
				.expect("Content-Type", /json/)
				.expect(201)
			});

			test('DELETE - Should return 404 error', () => {
				return request(server)
				.delete('/api/name/1000')
				.expect("Content-Type", /json/)
				.expect(404)
			});

			test('POST\t - Should return 405 error', () => {
				return request(server)
				.post('/api/name/0')
				.expect(404)
			});
		})
	})
})
