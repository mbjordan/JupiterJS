## Jupiter JS

[![Build Status](https://travis-ci.org/mbjordan/JupiterJS.svg?branch=master)](https://travis-ci.org/mbjordan/JupiterJS)

Jupiter is a JavaScript Publish/Subscribe library that aims to be lightweight, dependency-free, and simple to use. Drop it into any project to quickly get up and running with a super sweet event-based model.

Here's an example 4 u:

**foo.js**

```javascript
// Set the message `someMessage` as a variable.
var someMessage = jupiter("someMessage");

// Utilize the variable to subscribe a function...
someMessage.sub(function(arg){
    console.log(arg);
});

```

**bar.js**

```javascript
// Again, set the message `someMessage` as a variable.
var someMessage = jupiter("someMessage");

// Utilize the variable to publish to a function...
someMessage.pub("Console should log this message");
```

For more examples, see the [examples page](https://github.com/mbjordan/JupiterJS/wiki/Examples)

---

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
