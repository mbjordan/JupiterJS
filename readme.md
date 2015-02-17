## Jupiter JS

[![npm install jupiter](https://nodei.co/npm/jupiter.png?downloads=true)](https://www.npmjs.org/package/jupiter)

[![Build Status](https://travis-ci.org/mbjordan/JupiterJS.svg?branch=master)](https://travis-ci.org/mbjordan/JupiterJS)
[![Coverage Status](https://img.shields.io/coveralls/mbjordan/JupiterJS.svg)](https://coveralls.io/r/mbjordan/JupiterJS?branch=master)
![Dep Status](https://david-dm.org/mbjordan/JupiterJS.svg)

Jupiter is a JavaScript Publish/Subscribe library that aims to be lightweight, dependency-free, and simple to use. It's designed to work with both AMD & CommonJS and sports a clean, intuitive API.

Quick example:

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

For more examples & documentation, go to http://honyovk.com/JupiterJS/.
