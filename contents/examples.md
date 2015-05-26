<!--
title: Examples on Publishing and Subscribing
description: See some publish and subscribe examples for the Jupiter JavaScript library
-->

## Examples

### Invocation Examples

Examples on different ways to initialize subscribers and publishers.

**Method 1:** - Invoking with a single plain String:

```javascript
// Set the init method to a varible
var myJupiter = jupiter('someTopic');

// Somewhere in a project
myJupiter.sub(function(arg){
    console.log(arg);
});

// Somewhere else in a project
myJupiter.pub('myArgument');
```

**Method 2:** - Array of Strings

```javascript
// Usually at the beginning of a project
// Note: when using an array, you'll need to cache the `jupiter` method to a variable.
var myTopics = jupiter( ['someTopic1', 'someTopic2', 'someTopic3'] );

// Somewhere in a project
myTopics.someTopic1.sub(function(){
    console.log(arguments);
});
myTopics.someTopic2.sub(function(arg){
    console.log(arg);
});

// Somewhere else in a project
myTopics.someTopic1.pub('can', 'be', 'any', 'number', 'of', 'arguments');
myTopics.someTopic2.pub('Boom!');
```

**Method 3:** - Object-literal

This method allows you to create sub-topics (at one level deep) for common operations.

```javascript
var events = jupiter({
    'get_user': ['success', 'fail'/*, etc*/],
    'set_user': ['success', 'fail']
});


events.get_user.success.sub(function(data){ /* do something */ });
events.get_user.fail.sub(function(error){ /* handle the error */ });


$.ajax({
    'url': '/api/data/get',
    'type': 'get',
    /* ...etc... */
    success: events.get_user.success.pub,
    error: events.get_user.fail.pub
});
```
