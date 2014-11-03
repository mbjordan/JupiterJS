/**
* JupiterJS
* MIT License (http://honyovk.mit-license.org/).
* Version 1.0.0
*/
(function(window) {
    var topics = {},
        jupiterProto, jupiter;

    function typeOf(what) {
        return Object.prototype.toString.call(what || null).replace(/\[object\s|\]/g, "").toLowerCase();
    }

    jupiterProto = function(_this, message) {
        function setNewCallback(options) {
            var topic = {
                "key": "_" + new Date().getTime(),
                "callback": function() {},
                "context": _this
            };

            if (typeof options === "function") {
                topic.callback = options;
                return topic;
            }

            if (typeOf(options) === "object") {
                for (var i in topic) {
                    if (options.hasOwnProperty(i)) {
                        topic[i] = options[i];
                    }
                }
                return topic;
            }

            return topic;
        }

        return {
            "sub": function(options) {
                var i, len;

                if (!topics.hasOwnProperty(message)) {
                    topics[message] = [];
                }

                if (typeOf(options) === "array") {
                    for (i = 0, len = options.length; i < len; i++) {
                        topics[message].push(setNewCallback(options[i]));
                    }
                    return this;
                }

                topics[message].push(setNewCallback(options));

                return this;
            },

            "pub": function() {
                var topic, i, len;

                if (!topics.hasOwnProperty(message)) {
                    return this;
                }

                topic = topics[message];

                for (i = 0, len = topic.length; i < len; i++) {
                    topic[i].callback.apply(topic[i].context, arguments);
                }

                return this;
            },

            "unsub": function(key) {
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
            },

            "list": function(all) {
                return (!!all) ? topics : topics[message];
            }
        };
    };

    jupiter = function(message) {
        var _this = this,
            protos = {},
            i, len;

        if (!message) {
            throw new Error("Jupiter requires a message");
        }

        if (typeOf(message) === "array") {
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
