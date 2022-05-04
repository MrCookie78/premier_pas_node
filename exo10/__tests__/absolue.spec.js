const absolue = require('../absolue.js');

describe('La fonction Absolue', () => {

	beforeAll(() => { /* console.log("beforeAll") */ });
	afterAll(() => { /* console.log("afterAll") */ });
	beforeEach(() => { /* console.log("beforeEach") */ });
	afterEach(() => { /* console.log("afterEach") */ });

	test('Absolue - Doit retourner 0 si on lui passe 0', () => {
		const result = absolue(0);
		expect(result).toBe(0);
	})

	test('Absolue - Doit retourner 15 si on lui passe 15', () => {
		const result = absolue(15);
		expect(result).toBe(15);
	})

	test('Absolue - Doit retourner 15 si on lui passe -15', () => {
		const result = absolue(-15);
		expect(result).toBe(15);
	})

	test('Absolue - Doit retourner Infinity si on lui passe Infinity', () => {
		const result = absolue(Infinity);
		expect(result).toBe(Infinity);
	})

	test('Absolue - Doit retourner Infinity si on lui passe -Infinity', () => {
		const result = absolue(-Infinity);
		expect(result).toBe(Infinity);
	})

	test('Absolue - Doit retourner NaN si on lui passe NaN', () => {
		const result = absolue(NaN);
		expect(result).toBe(NaN);
	})

	test.each(
		[undefined, 'aaa', '', ' ', [], [1], {}, {i: '2'}, true]
	)
	('Absolue - Doit throw une exception si on ne passe pas un nombre, ici : %p', (a) => {
		// L'exception contient une erreur dont le message contient le mot "nombre"
		expect(() => absolue(a)).toThrow(/nombre/);
	})
})
