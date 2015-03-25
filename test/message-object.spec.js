var jupiter = require('../src/jupiter');

var messageObj = {
    'testMessage1': ['red', 'blue'],
    'testMessage2': ['red', 'blue'],
    'testMessage3': ['red', 'blue']
};

var jupiterTestObj = jupiter(messageObj);

describe('Jupiter Message Object', function() {

    it('should return an Object-literal when passed an Object', function() {
        expect(jupiterTestObj).toEqual(jasmine.any(Object));
    });


    it('Allow a direct function to subscribe & be called for testMessage1.blue', function() {
        var ns = {
            'fn': function(arg) {},
            'arg': '_testMessage1'
        };

        spyOn(ns, 'fn');

        jupiterTestObj.testMessage1.blue.sub(ns.fn).pub(ns.arg);

        expect(ns.fn).toHaveBeenCalledWith(ns.arg);
    });

    it('Allow a direct function to subscribe & be called for testMessage1.red', function() {
        var ns = {
            'fn': function(arg) {},
            'arg': '_testMessage1'
        };

        spyOn(ns, 'fn');

        jupiterTestObj.testMessage1.red.sub(ns.fn).pub(ns.arg);

        expect(ns.fn).toHaveBeenCalledWith(ns.arg);
    });


    it('Allow a direct function to subscribe & be called for testMessage2.blue', function() {
        var ns = {
            'fn': function(arg) {},
            'arg': '_testMessage2'
        };

        spyOn(ns, 'fn');

        jupiterTestObj.testMessage2.blue.sub(ns.fn).pub(ns.arg);

        expect(ns.fn).toHaveBeenCalledWith(ns.arg);
    });

    it('Allow a direct function to subscribe & be called for testMessage2.red', function() {
        var ns = {
            'fn': function(arg) {},
            'arg': '_testMessage2'
        };

        spyOn(ns, 'fn');

        jupiterTestObj.testMessage2.red.sub(ns.fn).pub(ns.arg);

        expect(ns.fn).toHaveBeenCalledWith(ns.arg);
    });


    it('Allow a direct function to subscribe & be called for testMessage3.blue', function() {
        var ns = {
            'fn': function(arg) {},
            'arg': '_testMessage3'
        };

        spyOn(ns, 'fn');

        jupiterTestObj.testMessage3.blue.sub(ns.fn).pub(ns.arg);

        expect(ns.fn).toHaveBeenCalledWith(ns.arg);
    });

    it('Allow a direct function to subscribe & be called for testMessage3.red', function() {
        var ns = {
            'fn': function(arg) {},
            'arg': '_testMessage3'
        };

        spyOn(ns, 'fn');

        jupiterTestObj.testMessage3.red.sub(ns.fn).pub(ns.arg);

        expect(ns.fn).toHaveBeenCalledWith(ns.arg);
    });
});
