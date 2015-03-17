var jupiter = require('../src/jupiter');
var messageArr = ['testMessage1', 'testMessage2', 'testMessage3'];
var jupiterTestObj = jupiter(messageArr);

describe('Jupiter Message Array', function() {

    it('should return an Object-literal when passed an Array', function() {
        expect(jupiterTestObj).toEqual(jasmine.any(Object));
    });


    it('The object should contain 4 properties', function() {
        expect(Object.keys(jupiterTestObj).length).toEqual(messageArr.length);
    });


    it('Allow a direct function to subscribe & be called for testMessage1', function() {
        var ns = {
            'fn': function(arg) {},
            'arg': '_testMessage1'
        };

        spyOn(ns, 'fn');

        jupiterTestObj.testMessage1.sub(ns.fn).pub(ns.arg);

        expect(ns.fn).toHaveBeenCalledWith(ns.arg);
    });


    it('Allow a direct function to subscribe & be called for testMessage2', function() {
        var ns = {
            'fn': function(arg) {},
            'arg': '_testMessage2'
        };

        spyOn(ns, 'fn');

        jupiterTestObj.testMessage2.sub(ns.fn).pub(ns.arg);

        expect(ns.fn).toHaveBeenCalledWith(ns.arg);
    });


    it('Allow a direct function to subscribe & be called for testMessage3', function() {
        var ns = {
            'fn': function(arg) {},
            'arg': '_testMessage3'
        };

        spyOn(ns, 'fn');

        jupiterTestObj.testMessage3.sub(ns.fn).pub(ns.arg);

        expect(ns.fn).toHaveBeenCalledWith(ns.arg);
    });
});
