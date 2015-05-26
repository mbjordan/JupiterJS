var marked = require('marked');
var jade = require('jade');
var hjs = require('highlight.js');
var fs = require('fs');
var filesize = require('./lib/file-size');
var comento = require('./lib/comento');
var config = require('./config.json');
var page = '';
var html = '';
var fileData;

// Update the config file with most recent file stats
// config.sizes.unminified = filesize('../master/jupiter.js');
// config.sizes.minified = filesize('../master/jupiter.min.js');
// fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));

if (typeof String.prototype.ucWords !== 'function') {
    String.prototype.ucWords = function() {
        return this.replace(/^([a-z])|\s+([a-z])/g, function($1) {
            return $1.toUpperCase();
        });
    };
}

marked.setOptions({
    highlight: function(code) {
        return hjs.highlightAuto(code).value;
    }
});

page = jade.renderFile('./templates/page.jade', {
    'pretty': true
});

fs.readdirSync(__dirname + '/contents').forEach(function(file) {
    if (file.match(/.+\.md$/) !== null) {

        fileData = fs.readFileSync(__dirname + '/contents/' + file, {
            'encoding': 'utf8'
        });

        fileData = comento(fileData);

        html = page.replace('{~content}', marked(fileData.markdown)).replace('{~canon}', function() {
            var canon = 'http://honyovk.com/JupiterJS/';

            if (file !== 'index.md') {
                canon += file.replace('.md', '.html');
            }

            return canon;
        }).replace('{~title}', fileData.title).replace('{~description}', fileData.description);

        fs.writeFileSync('../gh-pages/' + file.replace('.md', '') + '.html', html);
    }
});
