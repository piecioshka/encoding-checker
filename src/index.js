'use strict';

const sequence = require('sequence-as-promise');
const jschardet = require('jschardet');
const fs = require('fs');

function fetchCharset(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                return reject(err);
            }

            const result = jschardet.detect(data);

            resolve({
                file: file,
                encoding: result.encoding.toLowerCase()
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
    ))
        .catch((err) => {
            const error = err || new Error('Unexpected error');
            console.error(error.message.red);
            return err;
        });
}

module.exports = {
    verify: verifyCharsetFileList
};
