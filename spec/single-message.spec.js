var jupiter = require('../jupiter');

describe('Jupiter Single Message', function() {

	it('Allow a function to subscribe & be called', function() {
		var ns = {
			'name': 'directSubscribe',
			'fn': function(arg) {},
			'arg': '_argumentDirect'
		};

		spyOn(ns, 'fn');

		jupiter(ns.name).sub(ns.fn).pub(ns.arg);

		expect(ns.fn).toHaveBeenCalledWith(ns.arg);
	});

	it('Allow a function to subscribe & be called with optional context', function() {
		var ns = {
			'name': 'directSubscribe',
			'fn': function(arg) {
				expect(typeof this.results_).toEqual('object');
			},
			'arg': '_argumentDirect'
		};

		spyOn(ns, 'fn').andCallThrough();

		jupiter(ns.name).sub(ns.fn, this).pub(ns.arg);

		expect(ns.fn).toHaveBeenCalledWith(ns.arg);
	});


	it('Allow a function to subscribe & be called with optional key & context', function() {
		var _this = this,
			ns = {
				'name': 'directSubscribe',
				'fn': function(arg) {
					expect(typeof this.results_).toEqual('object');
				},
				'arg': '_argumentDirect',
				'key': '_testFn'
			};

		spyOn(ns, 'fn').andCallThrough();

		jupiter(ns.name).sub(ns.key, ns.fn, _this).pub(ns.arg);

		expect(ns.fn).toHaveBeenCalledWith(ns.arg);
	});



	it('Allow a function to subscribe, be called, & unsubscribed', function() {
		var ns = {
			'name': 'testUnsubscribe',
			'fn': function(arg) {},
			'arg': '_argumentUnsub'
		},
		testUnsubscribe = jupiter(ns.name);

		spyOn(ns, 'fn');

		testUnsubscribe.sub(ns.fn).pub(ns.arg);

		expect(ns.fn).toHaveBeenCalledWith(ns.arg);

		testUnsubscribe.unsub();

		testUnsubscribe.prove(function(topics) {
			expect(topics).toBeUndefined();
		});
	});





	it('Allow a function with optional key to subscribe, be called, & unsubscribed', function() {
		var ns = {
				'name': 'testUnsubscribe',
				'fn': function(arg) {},
				'arg': '_argumentUnsub',
				'key': '_testFn'
			},
			testUnsubscribe = jupiter(ns.name);

		spyOn(ns, 'fn');

		testUnsubscribe.sub(ns.key, ns.fn).pub(ns.arg);

		expect(ns.fn).toHaveBeenCalledWith(ns.arg);

		testUnsubscribe.prove(function(topics) {
			expect(topics[0].key).toBe(ns.key);
		});

		testUnsubscribe.unsub(ns.key);

		testUnsubscribe.prove(function(topics) {
			expect(topics).toEqual([]);
		});
	});
});
