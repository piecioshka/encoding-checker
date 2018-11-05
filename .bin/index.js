#!/usr/bin/env node

'use strict';

require('colors');

const yargs = require('yargs');
const glob = require('glob');
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

glob(argv.pattern, options, function (err, files) {
    if (err) throw err;

    if (argv.verbose) {
        console.log(`Found items: ${files.length}`.gray);
    }

    EncodingChecker.verifyCharsetFileList(argv['ignore-encoding'], files);
});
