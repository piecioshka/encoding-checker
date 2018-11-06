'use strict';

const sequence = require('sequence-as-promise');
const jschardet = require('jschardet');
const fs = require('fs');

function fetchCharset(file) {
    return new Promise((resolve) => {
        fs.readFile(file, (error, data) => {
            if (error) {
                return resolve({
                    error: error
                });
            }

            const result = jschardet.detect(data);
            const encoding = result.encoding
                ? result.encoding.toLowerCase()
                : 'unknown'.red;

            resolve({
                file: file,
                encoding: encoding
            });
        });
    });
}

function isFile(path) {
    return fs.lstatSync(path).isFile();
}

function verifyCharsetFileList(ignoreEncoding, matches, iteratee = (args) => args) {
    const files = matches.filter(isFile);
    return sequence(files.map((file) => () => fetchCharset(file)
        .then((charset) => {
            if (ignoreEncoding === charset.encoding) return;
            return iteratee(charset);
        })
    ));
}

module.exports = {
    verify: verifyCharsetFileList
};
