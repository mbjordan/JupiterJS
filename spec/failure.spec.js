var jupiter = require("../jupiter.min");

describe("Jupiter Expected Failures", function() {

	it('Return an error when no message is given', function() {
		expect(function() {
			jupiter();
		}).toThrow(new Error('Jupiter requires a topic'));
	});

});
