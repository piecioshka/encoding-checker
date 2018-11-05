'use strict';

require('colors');

const MATCH_CHARSET_REGEXP = /charset=([\w\d\-/]*)/;

const sequence = require('sequence-as-promise');
const child_process = require('child_process');

function parseCharset(info) {
    const charset = info.replace(/(.*):/, '').trim();
    const matched = charset.match(MATCH_CHARSET_REGEXP);

    if (matched && matched.length > 1) {
        return matched[1];
    }

    return charset;
}

function fetchCharset(file) {
    return new Promise((resolve, reject) => {
        child_process.exec(`file ${file}`, (error, stdout) => {
            if (error) {
                return reject(error);
            }

            resolve(parseCharset(stdout));
        });
    })
}

function printFileRecord(encoding, filename) {
    console.log('[%s] %s', encoding, filename && filename.blue);
}

function verifyCharsetSingleFile(encoding, file) {
    return fetchCharset(file)
        .then((charset) => {
            if (charset && charset !== encoding) {
                printFileRecord(charset, file);
            }
        })
        .catch((err) => {
            console.error(err.message.red);
            return err;
        });
}

function verifyCharsetFileList(encoding, files) {
    return sequence(files.map((file) => () => verifyCharsetSingleFile(encoding, file)));
}

module.exports = {
    _test_parseCharset: parseCharset,
    _test_fetchCharset: fetchCharset,
    _test_printFileRecord: printFileRecord,
    _test_verifyCharsetSingleFile: verifyCharsetSingleFile,
    verifyCharsetFileList: verifyCharsetFileList
};
