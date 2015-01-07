var typeOf = require('../lib/type-of');

describe('typeOf', function() {

	it('Match Array', function() {
		var match = typeOf([]);

		expect(match).toBe('array');
	});

	it('Match Object', function() {
		var match = typeOf({});

		expect(match).toBe('object');
	});

	it('Match String', function() {
		var match = typeOf(' ');

		expect(match).toBe('string');
	});

	it('Match Number', function() {
		var match = typeOf(123e7);

		expect(match).toBe('number');
	});

	// it('Match ', function() {
	// });

});
