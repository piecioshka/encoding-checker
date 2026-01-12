#!/usr/bin/env node

'use strict';

require('colors');

const minimist = require('minimist');
const glob = require('glob-promise');
const EncodingChecker = require('../src/index');

const argv = minimist(process.argv.slice(2), {
    string: ['pattern', 'p', 'd', 'ignore-encoding', 'i'],
    boolean: ['verbose', 'v', 'help', 'version'],
    alias: {
        p: ['pattern', 'd'],
        i: 'ignore-encoding',
        v: 'verbose'
    },
    default: {
        pattern: '*',
        'ignore-encoding': ''
    }
});

// Handle --help
if (argv.help) {
    console.log('Usage: encoding-checker [-p pattern] [-i encoding] [-v]');
    console.log('');
    console.log('Options:');
    console.log('  --help                 Show help                                     [boolean]');
    console.log('  --version              Show version number                           [boolean]');
    console.log('  --pattern, -p, -d                                               [default: "*"]');
    console.log('  --ignore-encoding, -i                                            [default: ""]');
    console.log('  --verbose, -v                                                 [default: false]');
    process.exit(0);
}

// Handle --version
if (argv.version) {
    const pkg = require('../package.json');
    console.log(pkg.version);
    process.exit(0);
}

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
