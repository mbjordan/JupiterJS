## Jupiter JS

[![npm install jupiter](https://nodei.co/npm/jupiter.png?downloads=true)](https://www.npmjs.org/package/jupiter)

[![Build Status](https://travis-ci.org/mbjordan/JupiterJS.svg?branch=master)](https://travis-ci.org/mbjordan/JupiterJS)
[![Coverage Status](https://img.shields.io/coveralls/mbjordan/JupiterJS.svg)](https://coveralls.io/r/mbjordan/JupiterJS?branch=master)

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

For more examples, see the [examples page](http://mbjordan.github.io/JupiterJS/examples.html)
