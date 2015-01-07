/**
 * JupiterJS
 * MIT License (http://honyovk.com/mit.txt).
 * Version 1.2.1
 */

(function(window) {
	var topics = {},
		jupiter, init;

	function typeOf(what) {
		return Object.prototype.toString.call(what || null).replace(/\[object\s|\]/g, '').toLowerCase();
	}

	jupiter = function(_context, topic) {
		var proto = {};

		proto.sub = function(key, fn, context) {
			var newTopic = {};

			if (!topics.hasOwnProperty(topic)) {
				topics[topic] = [];
			}

			newTopic.key = (typeOf(key) === 'string') ? key : '_' + new Date().getTime();
			newTopic.fn = (typeOf(key) === 'function') ? key : ((!!fn && typeOf(fn) === 'function') ? fn : function() {});
			newTopic.context = (!!fn && typeOf(fn) === 'object') ? fn : ((!!context) ? context : _context);

			topics[topic].push(newTopic);

			return this;
		};

		proto.pub = function() {
			var msg, i, len;

			if (!topics.hasOwnProperty(topic)) {
				return this;
			}

			msg = topics[topic];

			for (i = 0, len = msg.length; i < len; i++) {
				msg[i].fn.apply(msg[i].context, arguments);
			}

			return this;
		};

		proto.unsub = function(key) {
			var i, len;

			if (!topics.hasOwnProperty(topic)) {
				return this;
			}

			if (!!key) {
				for (i = 0, len = topics[topic].length; i < len; i++) {
					if (topics[topic][i].key === key) {
						topics[topic].splice(i, 1);
						break;
					}
				}
				return this;
			}

			delete topics[topic];
			return this;
		};

		proto.prove = function(callback, all) {
			var _this = this,
				retValue = (!!all) ? topics : topics[topic];

			if (!!callback && typeOf(callback) === 'function') {
				callback.call(_this, retValue);
			}
			return _this;
		};

		return proto;
	};

	init = function(topic) {
		var _this = this,
			protos, i, len;

		if (!topic) {
			throw new Error('Jupiter requires a topic');
		}

		if (typeOf(topic) === 'array') {
			protos = {};

			for (i = 0, len = topic.length; i < len; i++) {
				protos[topic[i]] = jupiter(_this, topic[i]);
			}
			return protos;
		}

		return jupiter(_this, topic);
	};

	if (typeof define === 'function' && define.amd) {
		define(function() {
			return init;
		});
		return;
	}

	if ('undefined' !== typeof module && module.exports) {
		module.exports = init;
		return;
	}

	window.jupiter = init;
}(('undefined' !== typeof window) ? window : {}));
