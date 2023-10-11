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
    dot: true,
    ignore: [
        ".git/**",
        "node_modules/**",
    ]
};

async function main() {
    try {
        const files = await glob(argv.pattern, options);

        if (argv.verbose) {
            console.log(`Found items: ${files.length}`.gray);
        }

        const status = await EncodingChecker.verify(argv['ignore-encoding'], files);

        status.forEach(({ encoding, file, error }) => {
            if (error) {
                const message = error.message || 'unexpected error';
                console.error(message.red);
            } else {
                console.log('[%s] %s', encoding, file && file.blue);
            }
        });
    } catch (err) {
        const message = err.message;
        console.error(message.red);
    }
}

main().catch((err) => console.error(err));
