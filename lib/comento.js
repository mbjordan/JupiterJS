var trim = function(str) {
    if (!str) {
        return;
    }
    return str.replace(/^\s+|\s+$/g, "");
};

module.exports = function(file) {
    var O = {},
        pattern, comment, i, line, key, value;

    pattern = /<!--((.|\n|\r)*)-->/g;
    comment = pattern.exec(file);
    comment = trim(comment[1]).split("\n");

    for (i in comment) {
        if (comment.hasOwnProperty(i)) {
            line = comment[i];

            line = line.split(":");
            key = line[0];
            value = trim(line[1]);

            O[key] = value;
        }
    }

    O.markdown = file.replace(pattern, "");

    return O;
};
