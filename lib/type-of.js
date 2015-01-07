module.exports = function typeOf(what) {
	return Object.prototype.toString.call(what || null).replace(/\[object\s|\]/g, '').toLowerCase();
};
