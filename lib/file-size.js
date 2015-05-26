var fs = require("fs");

module.exports = function(filename) {
    var size = fs.statSync(filename).size,
        types = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        k = 1000,
        i = Math.floor(Math.log(size) / Math.log(k));

    if (size === 0) {
        return "0 Bytes";
    }
    
    return (size / Math.pow(k, i)).toPrecision(3) + " " + types[i];
};
