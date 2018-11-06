#!/usr/bin/env node

'use strict';

require('colors');

const yargs = require('yargs');
const glob = require('glob-promise');
const EncodingChecker = require('../src/index');

yargs.usage('Usage: $0 [-p pattern] [-i encoding] [-v]');

yargs.option('pattern', {
    alias: ['p', 'd'],
    default: '*'
});

yargs.option('ignore-encoding', {
    alias: 'i',
    default: ''
});

yargs.option('verbose', {
    alias: 'v',
    default: false
});

const argv = yargs.argv;

const options = {
    absolute: true,
    nodir: true,
    dot: true
};

glob(argv.pattern, options)
    .then((files) => {
        if (argv.verbose) {
            console.log(`Found items: ${files.length}`.gray);
        }

        EncodingChecker.verify(argv['ignore-encoding'], files, ({ encoding, file, error }) => {
            if (error) {
                const message = error.message || 'unexpected error';
                console.error(message.red);
                return;
            }
            console.log('[%s] %s', encoding, file && file.blue);
        });
    })
    .catch((err) => {
        const message = err.message;
        console.error(message.red);
    });
