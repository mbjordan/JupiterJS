/**
 * JupiterJS
 * MIT License (http://honyovk.com/mit.txt).
 * Version 1.2.2
 */
;(function(context, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory.call(context);
        });
        return;
    }

    if ('undefined' !== typeof module && module.exports) {
        module.exports = factory.call(context);
        return;
    }

    if ('undefined' !== typeof window) {
        window.jupiter = factory.call(context);
    }
}(this, function factory() {
    var topics = {};

    function typeOf(what, comparitor) {
        return Object.prototype.toString.call(what || null)
            .replace(/\[object\s|\]/g, '').toLowerCase() === comparitor;
    }

    function getLength(arr) {
        return arr.length;
    }

    function forEach(arr, fn) {
        for (var i = 0; i < getLength(arr); i++) {
            fn(arr[i], i, arr);
        }
    }

    function error(err) {
        throw new Error(err);
    }

    function jupiter(defaultContext, topic) {

        // ---- Helper Functions ----
        function argsToArray(args) {
            return Array.prototype.slice.call(args);
        }

        // When using, `value` should be set to desired default
        function parseArguments(args, type, value) {
            forEach(argsToArray(args), function(val) {
                if (typeOf(val, type)) {
                    value = val;
                }
            });

            return value;
        }

        function getNewTopicObject() {
            return {
                'key': parseArguments(arguments, 'string', '_' + new Date().getTime()),
                'fn': parseArguments(arguments, 'function', function() {}),
                'context': parseArguments(arguments, 'object', defaultContext)
            };
        }

        function unsubWithKey(key) {
            forEach(topics[topic], function(val, i) {
                if (val.key === key) {
                    topics[topic].splice(i, 1);
                }
            });
        }

        function proveAllOrOne(all) {
            return (!!all) ? topics : topics[topic];
        }

        // ---- Main Functions ----
        function sub() {
            if (!topics.hasOwnProperty(topic)) {
                topics[topic] = [];
            }
            topics[topic].push(getNewTopicObject.apply(this, arguments));
            return this;
        }

        function pub() {
            var args = arguments;

            if (!topics.hasOwnProperty(topic)) {
                return this;
            }
            forEach(topics[topic], function(val) {
                val.fn.apply(val.context, args);
            });
            return this;
        }

        function unsub(key) {
            if (!topics.hasOwnProperty(topic)) {
                return this;
            }

            if (!!key) {
                unsubWithKey(key);
                return this;
            }

            delete topics[topic];
            return this;
        }

        function prove(fn, all) {
            if (!!fn && typeOf(fn, 'function')) {
                fn.call(this, proveAllOrOne(all));
            }
            return this;
        }

        // Define the public API
        // Gives full control & useful for aliasing
        return {
            'sub': sub,
            'pub': pub,
            'unsub': unsub,
            'prove': prove
        };
    }

    function JupiterInstanceMultiTopic(topics) {
        var _this = this;
        var multiTopicObj = {};

        forEach(topics, function(val) {
            multiTopicObj[val] = jupiter(_this, val);
        });
        return multiTopicObj;
    }

    function JupiterInstance(topic) {
        if (!topic) {
            error('Jupiter requires a topic');
        }

        if (typeOf(topic, 'array')) {
            return JupiterInstanceMultiTopic.call(this, topic);
        }

        return jupiter.call(this, topic);
    }

    return JupiterInstance;
}));
