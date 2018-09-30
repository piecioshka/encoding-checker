'use strict';

var fs = require('fs');
var MATCH_CHARSET_REGEXP = /charset=([\w\d\-/]*)/;

function parseCharset(file) {
    var stdout = file.replace(/(.*):/, '').trim();
    var matched = stdout.match(MATCH_CHARSET_REGEXP);
    if (matched && matched.length > 1) {
        return matched[1];
    }
    return stdout;
}

function isFile(path) {
    var stat = fs.lstatSync(path);
    return stat.isFile();
}

function printFileRecord(encoding, filename) {
    console.log('[%s] %s', encoding, filename);
}

function verifyCharsetSingleFile(encoding, file) {
    var filename = file.replace(/:(.*)/, '');

    var charset = parseCharset(file);

    if (!filename) {
        return;
    }

    if (!isFile(filename)) {
        return;
    }

    if (charset !== encoding) {
        printFileRecord(charset, filename);
    }
}

function verifyCharsetFileList(encoding, files) {
    var handler = verifyCharsetSingleFile.bind(this, encoding);
    files.forEach(handler);
}

module.exports = {
    parseCharset: parseCharset,
    isFile: isFile,
    printFileRecord: printFileRecord,
    verifyCharsetSingleFile: verifyCharsetSingleFile,
    verifyCharsetFileList: verifyCharsetFileList
};
