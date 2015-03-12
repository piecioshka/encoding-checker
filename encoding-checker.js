#!/usr/bin/env node

'use strict';

var fs = require('fs');
var exec = require('child_process').exec;

var directory = '.';
var encoding = '';

var help = "Usage: ./encoding-checker.js [-d|--directory <arg>] [-e|--encoding <arg>] [-h|--help]\n\n" +
    "List of arguments which you can use:\n" +
    "   -d | --directory <arg>   Path to directory witch will be analyze. Default: \".\"\n" +
    "   -e | --encoding <arg>    Name of encoding witch will be ignore in results list.\n" +
    "   -h | --help              Show this message.";

var args = process.argv.slice(2);

// Analyze arguments.
args.forEach(function (val, index) {
    switch (true) {
        case (val === '-d' || val === '--directory'):
            directory = args[index + 1];
            break;

        case (val === '-e' || val === '--encoding'):
            encoding = args[index + 1];
            break;

        case (val === '-h' || val === '--help'):
            console.log(help);
            process.exit(2);
            break;

        default:
            // Do nothing.
    }
});

function verifyDirectory(path) {
    // Check that path exists.
    var stat = fs.lstatSync(path);

    // Check that path is not directory.
    if (!stat.isDirectory()) {
        throw new Error('Error: ' + path + ' is not a directory');
    }
}

function verifyFile(path) {
    // Check that path exists.
    var stat = fs.lstatSync(path);

    // Check that path is not directory.
    return stat.isFile();
}

// Error handling
verifyDirectory(directory);

// ---------------------------------------------------------------------------------------------------------------------

function parseCharset(stdout) {
    var result = null;
    var matchers = stdout.match(/charset=(.*)/);
    if (matchers && matchers.length > 1) {
        result = matchers[1];
    }
    return result;
}

function setWidth(string, width) {
    width = width || 15;
    var diffSize = width - string.length;
    var padding = new Array(diffSize).join(' ');
    return string + padding;
}

// ---------------------------------------------------------------------------------------------------------------------

var command = 'find -f ' + directory + ' | xargs file -I';
var options = {
    maxBuffer: 10 * 1024 * 1024
};

exec(command, options, function (err, stdout) {
    if (err) throw err;

    var files = stdout.split('\n');

    files.forEach(function (file) {
        var filename = file.replace(/:(.*)/, '');
        var stats = file.replace(/(.*):/, '');
        var charset = parseCharset(stats);

        // Ignore last empty line.
        if (!filename) {
            return;
        }

        // Check that is file
        if (!verifyFile(filename)) {
            return;
        }

        // If charset is different than ignoring, prints them with file name.
        if (charset !== encoding) {
            console.log(setWidth('[' + charset + ']') + '"' + filename + '"');
        }
    });
});
