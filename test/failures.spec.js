var jupiter = require('../src/jupiter');

describe('Jupiter Expected Failures', function() {
    it('Throw an error when no message is given', function() {
        expect(function() {

            jupiter();

        }).toThrow(new Error('Jupiter requires a topic'));
    });
});
