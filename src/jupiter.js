/**
 * JupiterJS - 1.3.1-dev
 * https://github.com/mbjordan/JupiterJS
 * MIT License (http://honyovk.com/mit.txt).
 */
(function(globals, factory) {
    if ('undefined' !== typeof module && module.exports) {
        module.exports = factory.call(globals);
        return;
    }

    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory.call(globals);
        });
        return;
    }

    globals.jupiter = factory.call(globals);

}(this, function factory() {
    var topics = {};

    function typeOf(value, comparator) {
        return Object.prototype.toString.call(value || null)
            .replace(/\[object\s|\]/g, '').toLowerCase() === comparator.toLowerCase();
    }

    function forEach(arr, fn) {
        for (var i = 0; i < arr.length; i++) {
            fn.call(arr, arr[i], i);
        }
    }

    // This is abstracted to it's own function so any future changes that need
    // to be made are done in one place.
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

        function listAllOrOne(all) {
            return (!!all) ? topics : topics[topic];
        }

        // ---- Public API Functions ----
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
            } else {
                delete topics[topic];
            }

            return this;
        }

        function listTopics(fn, all) {
            if (!!fn && typeOf(fn, 'function')) {
                fn.call(this, listAllOrOne(all));
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
                'list': listTopics,
                'prove': listTopics // Deprecated
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

        function objArrLoop(parent, child) {
            multiTopicObj[parent][child] = jupiter(this, child);
        }

        for (var prop in topics) {
            if (!typeOf(topics[prop], 'array')) continue;

            multiTopicObj[prop] = {};

            forEach(topics[prop], objArrLoop.bind(this, prop));
        }
        return multiTopicObj;
    }


    return function jupiterInstance(topic) {
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
    };
}));
