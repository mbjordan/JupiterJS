<!--
title: Publish and Subscribe API Documentation
description: Learn the API methods for Jupiter, the JavaScript publish and subscribe library
-->

## API Documentation

Jupter's goal is to have a simple and small publish & subscribe API that is super-powerful at the same time. Every method in Jupiter is chainable.

```javascript
jupiter(String || Array || Object-literal)
```

Initiates jupiter and accepts one of:

* A single topic as a string,
* An Array of topics
* An Object-literal

This method can be cached using a variable, or used directly every time.

Returns:

* Single topic - Only the one initiated topic
* Array of topics - An Object-literal of initiated topics
* Object-literal - An Object-literal of initiated topics, with `parent.children` structure

Object-literal schema:

```javascript
{
    'parent': ['child', '...etc']
}
```

Each parent topic (property) in the object must map to an Array of child topics. Each parent/child is then chainable.

---

```javascript
.sub([key, ]callback[, context])
```

Subscribe a function to a topic.

* `key` - optional. A key for use with unsubscribing a specific callback at any time.
* `callback` - required. The callback function to be called.
* `context` - optional. The context with which to call the callback.

Note: `key` and `context` can be optionally set, as long as they remain in the order of `key, callback, context`:

```javascript
.sub('myKey', myCallback) // key, callback
.sub(myCallback, this) // callback, context
```

Now that you have subscribers setup, any time a topic is published to, the subscriber will be called.

---

```javascript
.pub([arguments])
```

Publish (broadcast) the topic to all subscribers. Accepts unlimited optional arguments.

---

```javascript
.unsub([keyName])
```

Unsubscribe all callbacks from the topic, or when passing a key name (from the `.sub()` method), unsubscribe just one callback.

The callback(s) will no longer be called when a topic is published to.

---

```javascript
.list(callback[, true])
```

Returns all callbacks for the provided topic. Optionally pass `true` to return the entire callback Object. Does not publish.
