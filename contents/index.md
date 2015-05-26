<!--
title: JavaScript Publish and Subscribe done right
description: Jupiter JS - A JavaScript publish and subscribe library for the browser and Node.js
-->

# Jupiter JS

Jupiter is a light-weight and simple to use Publish/Subscribe library for JavaScript. It's designed to work with both AMD & CommonJS and sports a clean, intuitive API.

## Quick Example

**foo.js**

```javascript
// Set the topic `someTopic` as a variable.
var someTopic = jupiter('someTopic');

// Utilize the variable to subscribe a function...
someTopic.sub(function(arg){
    console.log(arg);
});
```

**bar.js**

```javascript
// Again, set the topic `someTopic` as a variable.
var someTopic = jupiter('someTopic');

// Utilize the variable to publish to a function...
someTopic.pub('Console should log this topic');
```

For more examples, see the [examples page](examples.html)
