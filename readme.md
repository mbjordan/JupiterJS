## Jupiter JS

[![Travis Build Status](https://travis-ci.org/mbjordan/jupiter.svg?branch=master)](https://travis-ci.org/mbjordan/jupiter)

Jupiter is a JavaScript Publish/Subscribe library that aims to be lightweight, dependency-free, and simple to use. Drop it into any project to quickly get up and running with a super sweet event-based model.


### API Reference

```
jupiter(message || Array)
```

Initiates jupiter, accepts only message(s) as a single string, or an Array of strings. This can be cached using a variable, or used directly every time.

---

```
.sub(function || Object-literal || Array)
```

Subscribe a function to a message. Can be a single function, or an object-literal.

Object properties:

* `key` - optional. A key for use with unsubscribing a specific callback at any time.
* `callback` - required. The callback function to be called.
* `context` - optional. The context with which to call the callback.

`.sub()` also allows for an Array to be passed. This Array can be any mix of functions or Object-literals as described above.


---

```
.pub([argument, ...])
```

Publish/broadcast the message. Accepts optional unlimited arguments.

---

```
.unsub([keyName])
```

Unsubscribe all callbacks from the message, or when passing a key name (from the `.sub()` method), unsubscribe just one callback.

---

```
.list([true])
```

Returns all callbacks provided for the provided message. Optionally pass `true` to return the entire callback Object. Method not chainable.
