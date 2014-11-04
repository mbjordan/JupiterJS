var jupiter = require("../jupiter.min.js");

describe("Jupiter Single Message (Min)", function() {

    it("should allow a direct function to subscribe", function() {
        var ns = {
            "name": "directSubscribe",
            "fn": function(arg) {},
            "arg": "_argumentDirect"
        };

        spyOn(ns, "fn");

        jupiter(ns.name).sub(ns.fn).pub(ns.arg);

        expect(ns.fn).toHaveBeenCalledWith(ns.arg);
    });


    it("should allow a single Object-literal to subscribe", function() {
        var ns = {
            "name": "objectSubscribe",
            "fn": function(arg) {},
            "arg": "_argumentObject",
            "key": "fn1"
        };

        spyOn(ns, "fn");

        jupiter(ns.name).sub({
            "key": ns.key,
            "callback": ns.fn
        }).pub(ns.arg);

        expect(ns.fn).toHaveBeenCalledWith(ns.arg);
    });


    it("should allow an array with a direct funtion and an Object-literal to subscribe", function() {
        var ns = {
            "name": "arraySubscribe",
            "fn1": function(arg) {},
            "fn2": function(arg) {},
            "arg": "_argumentArray",
            "key": "fn1"
        };

        spyOn(ns, "fn1");
        spyOn(ns, "fn2");

        jupiter(ns.name).sub([{
                "key": ns.key,
                "callback": ns.fn1
            }, ns.fn2
        ]).pub(ns.arg);

        expect(ns.fn1).toHaveBeenCalledWith(ns.arg);
        expect(ns.fn2).toHaveBeenCalledWith(ns.arg);
    });


    it("should allow a single Object-literal to subscribe, be called, & unsubscribed", function() {
        var ns = {
                "name": "testUnsubscribe",
                "fn": function(arg) {},
                "arg": "_argumentUnsub",
                "key": "_testFn"
            },
            testUnsubscribe = jupiter(ns.name);

        spyOn(ns, "fn");

        testUnsubscribe.sub({
            "key": ns.key,
            "callback": ns.fn
        }).pub(ns.arg);

        expect(ns.fn).toHaveBeenCalledWith(ns.arg);

        expect(testUnsubscribe.prove()[0].key).toBe(ns.key);

        testUnsubscribe.unsub();

        expect(testUnsubscribe.list()).toBeUndefined();
    });
});
