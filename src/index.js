'use strict';

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
    try {
        return fs.lstatSync(path).isFile();
    } catch (error) {
        return false;
    }
}

async function verifyCharsetFileList(ignoreEncoding, matches) {
    const files = matches.filter(isFile);

    const charset = await Promise.all(
        files.map(fetchCharset)
    );

    return charset
        .filter(({ encoding }) => {
            return (encoding !== ignoreEncoding);
        });
}

module.exports = {
    verify: verifyCharsetFileList
};
