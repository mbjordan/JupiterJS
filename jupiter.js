/**
 * JupiterJS
 * MIT License (http://honyovk.mit-license.org/).
 * Version 1.2.1
 */
(function(window) {
    var topics = {},
        jupiterProto, jupiter;

    function typeOf(what) {
        return Object.prototype.toString.call(what || null).replace(/\[object\s|\]/g, "").toLowerCase();
    }

    jupiterProto = function(jupiterContext, message) {
        var proto = {};

        proto.sub = function(key, fn, context) {
            var newTopic = {};

            if (!topics.hasOwnProperty(message)) {
                topics[message] = [];
            }

            newTopic.key = (typeOf(key) === "string") ? key : "_" + new Date().getTime();
            newTopic.fn = (typeOf(key) === "function") ? key : ((!!fn && typeOf(fn) === "function") ? fn : function() {});
            newTopic.context = (!!fn && typeOf(fn) === "object") ? fn : ((!!context) ? context : jupiterContext);

            topics[message].push(newTopic);

            return this;
        };

        proto.pub = function() {
            var topic, i, len;

            if (!topics.hasOwnProperty(message)) {
                return this;
            }

            topic = topics[message];

            for (i = 0, len = topic.length; i < len; i++) {
                topic[i].fn.apply(topic[i].context, arguments);
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

        proto.prove = function(callback, all) { // Renamed, as this is more for testing (Both package and regular use)
            var _this = this,
                retValue = (!!all) ? topics : topics[message];

            if (!!callback && typeOf(callback) === "function") {
                callback.call(_this, retValue);
            }
            return _this;
        };
        proto.list = proto.prove;

        return proto;
    };

    jupiter = function(message) {
        var _this = this,
            protos, i, len;

        if (!message) {
            throw new Error("Jupiter requires a message");
        }

        if (typeOf(message) === "array") {
            protos = {};

            for (i = 0, len = message.length; i < len; i++) {
                protos[message[i]] = jupiterProto(_this, message[i]);
            }
            return protos;
        }

        return jupiterProto(_this, message);
    };

    if (typeof define === "function" && define.amd) {
        define(function() {
            return jupiter;
        });
        return;
    }

    if ("undefined" !== typeof module && module.exports) {
        module.exports = jupiter;
        return;
    }

    window.jupiter = jupiter;
}(("undefined" !== typeof window) ? window : {}));
