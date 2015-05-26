<!--
title: Install options for many environments
description: How to install Jupiter publish and subscribe for the browser and Node.js
-->

## Install

There are several options for installing JupiterJS:

### Direct

[Download Latest Release](https://github.com/mbjordan/JupiterJS/releases/latest)

---

### CDN

Utilize the [JSDelivr](http://www.jsdelivr.com/#!jupiter) CDN:


[//cdn.jsdelivr.net/jupiter/1.3.0/jupiter.min.js](http://cdn.jsdelivr.net/jupiter/1.3.0/jupiter.min.js)


### Bower

```
bower install jupiter
```

---

### npm

```
npm install jupiter
```

Use in Node.js:

```javascript
var jupiter = require('jupiter');

jupiter('someTopic').sub(someFunction).pub('woot');
```
