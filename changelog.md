### 1.3.1

* Removed the `window.jupiter` exposure and replaced with `context.jupiter`, where `context` is the `this` keyword passed at the first argument to the IIFE.

---

### 1.3.0

* Added new method for using objects during initiation.
* Now using `Function.prototype.bind`, so IE8 is not supported. (Considering adding a polyfill).

---

### 1.2.1

* Converted the pattern of the closure
* Internal changes. API Still the same.

---

### 1.2.0

* Changed the `sub` method to accept only 3 static arguments (`[key, ]callback[, context]`). No more Objects or Arrays.

---

### 1.1.1

* Converted the `prove` method to utilize a callback rather than return the list.

---

### 1.1.0

* Renamed `.list([true])` to `.prove([true])` as this method is more for testing rather than casual use.
    * the method `list` will remain in use for now.
