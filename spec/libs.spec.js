var typeOf = require('../lib/type-of');

describe('typeOf', function() {

    it('Match Array', function() {
        expect(typeOf([])).toBe('array');
    });

    it('Match Object', function() {
        expect(typeOf({})).toBe('object');
    });

    it('Match String', function() {
        expect(typeOf('s')).toBe('string');
    });

    it('Match Number', function() {
        expect(typeOf(123e7)).toBe('number');
    });

    it('Match Function', function() {
        expect(typeOf(function() {})).toBe('function');
    });

    it('Match RegExp', function() {
        expect(typeOf(/\s/)).toBe('regexp');
    });

    it('Match Null', function() {
        expect(typeOf()).toBe('null');
    });
});
