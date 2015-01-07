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

	jupiter = function(_context, message) {
		var proto = {};

		proto.sub = function(key, fn, context) {
			var newMessage = {};

			if (!topics.hasOwnProperty(message)) {
				topics[message] = [];
			}

			newMessage.key = (typeOf(key) === 'string') ? key : '_' + new Date().getTime();
			newMessage.fn = (typeOf(key) === 'function') ? key : ((!!fn && typeOf(fn) === 'function') ? fn : function() {});
			newMessage.context = (!!fn && typeOf(fn) === 'object') ? fn : ((!!context) ? context : _context);

			topics[message].push(newMessage);

			return this;
		};

		proto.pub = function() {
			var msg, i, len;

			if (!topics.hasOwnProperty(message)) {
				return this;
			}

			msg = topics[message];

			for (i = 0, len = msg.length; i < len; i++) {
				msg[i].fn.apply(msg[i].context, arguments);
			}

			return this;
		};

		proto.unsub = function(key) {
			var i, len;

			if (!topics.hasOwnProperty(message)) {
				return this;
			}

			if (!!key) {
				for (i = 0, len = topics[message].length; i < len; i++) {
					if (topics[message][i].key === key) {
						topics[message].splice(i, 1);
						break;
					}
				}
				return this;
			}

			delete topics[message];
			return this;
		};

		proto.prove = function(callback, all) {
			var _this = this,
				retValue = (!!all) ? topics : topics[message];

			if (!!callback && typeOf(callback) === 'function') {
				callback.call(_this, retValue);
			}
			return _this;
		};

		return proto;
	};

	init = function(message) {
		var _this = this,
			protos, i, len;

		if (!message) {
			throw new Error('Jupiter requires a message');
		}

		if (typeOf(message) === 'array') {
			protos = {};

			for (i = 0, len = message.length; i < len; i++) {
				protos[message[i]] = jupiter(_this, message[i]);
			}
			return protos;
		}

		return jupiter(_this, message);
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
