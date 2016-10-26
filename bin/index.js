#!/usr/bin/env node

'use strict';

var program = require('commander');
var colors = require('colors');
var VERSION = require('../package.json').version;
var EncodingChecker = require('../src/index');

var directory = '.';
var encoding = '';

program
    .version(VERSION)
    .option('-d, --directory <d>', 'path to directory which will be analyze (default: ".")', parseDirectory)
    .option('-i, --ignore-encoding <e>', 'name of encoding which will be ignore in results list', parseEncoding)
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp(colors.red);
    process.exit(1);
}

var fs = require('fs');
var exec = require('child_process').exec;

function parseDirectory(passedDirectory) {
    directory = passedDirectory;
}

function parseEncoding(passedEncoding) {
    encoding = passedEncoding;
}

function protectNonDirectory(path) {
    var stat = fs.lstatSync(path);
    if (!stat.isDirectory()) {
        throw new Error('Error: ' + path + ' is not a directory');
    }
}

function setup() {
    protectNonDirectory(directory);

    var command = 'find -f ' + directory + ' | xargs file -I';
    var options = {
        maxBuffer: 10 * 1024 * 1024
    };

    exec(command, options, function (err, stdout) {
        if (err) throw err;
        var files = stdout.split('\n');
        EncodingChecker.verifyCharsetOfFileList(encoding, files);
    });
}

setup();
