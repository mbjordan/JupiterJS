/**
 * JupiterJS
 * MIT License (http://honyovk.com/mit.txt).
 * Version 1.3.0
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

    function typeOf(value, comparator) {
        return Object.prototype.toString.call(value || null)
            .replace(/\[object\s|\]/g, '').toLowerCase() === comparator.toLowerCase();
    }

    function getLength(value) {
        return value.length;
    }

    function forEach(arr, fn) {
        for (var i = 0; i < getLength(arr); i++) {
            fn.call(arr, arr[i], i);
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

        function unSubscribeWithKey(key) {
            forEach(topics[topic], function(val, i) {
                if (val.key === key) {
                    topics[topic].splice(i, 1);
                }
            });
        }

        function proveAllOrOne(all) {
            return (!!all) ? topics : topics[topic];
        }

        // ---- Main API Functions ----
        function subscribe() {
            if (!topics.hasOwnProperty(topic)) {
                topics[topic] = [];
            }
            topics[topic].push(getNewTopicObject.apply(this, arguments));
            return this;
        }

        function publish() {
            var args = arguments;
            if (!topics.hasOwnProperty(topic)) {
                return this;
            }
            forEach(topics[topic], function(val) {
                val.fn.apply(val.context, args);
            });
            return this;
        }

        function unSubscribe(key) {
            if (!!key) {
                unSubscribeWithKey(key);
                return this;
            }
            delete topics[topic];
            return this;
        }

        function list(fn, all) {
            if (!!fn && typeOf(fn, 'function')) {
                fn.call(this, proveAllOrOne(all));
            }
            return this;
        }

        // Define the public API
        // Gives full control & useful for aliasing
        function createPublicApi() {
            return {
                'subscribe': subscribe,
                'sub': subscribe,
                'publish': publish,
                'pub': publish,
                'unsubscribe': unSubscribe,
                'unsub': unSubscribe,
                'list': list,
                'prove': list // deprecated
            };
        }

        return createPublicApi();
    }

    function jupiterArrayMultiTopic(topics) {
        var multiTopicObj = {};

        function arrLoop(val) {
            multiTopicObj[val] = jupiter(this, val);
        }

        forEach(topics, arrLoop.bind(this));
        return multiTopicObj;
    }

    // Only allows for 1 sub-level
    function jupiterObjectMultiTopic(topics) {
        var multiTopicObj = {};

        function objArrLoop(loopIndex, arrElement) {
            multiTopicObj[loopIndex][arrElement] = jupiter(this, arrElement);
        }

        for (var i in topics) {
            if (!typeOf(topics[i], 'array')) continue;

            multiTopicObj[i] = {};
            forEach(topics[i], objArrLoop.bind(this, i));
        }
        return multiTopicObj;
    }


    function jupiterInstance(topic) {
        if (!topic) {
            error('Jupiter requires a topic');
        }

        if (typeOf(topic, 'array')) {
            return jupiterArrayMultiTopic(topic);
        }

        if (typeOf(topic, 'object')) {
            return jupiterObjectMultiTopic(topic);
        }

        return jupiter(topic);
    }

    return jupiterInstance;
}));
