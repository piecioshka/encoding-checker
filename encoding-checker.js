#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var directory = '.';
var encoding = '';

var help = "Usage: ./encoding-checker.js [-d|--directory <directory>] [-e|--encoding <encoding>]\n\n" +
    "List of arguments which you can use:\n" +
    "   directory  Path to directory witch will be analyze. Default: \".\"\n" +
    "   encoding   Name of encoding witch will be ignore in results list.\n" +
    "   help       Show this message.";

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

// Error handling
var stats;

// Check that path exists.
try {
    stats = fs.lstatSync(directory);
} catch (e) {
    throw new Error(e);
}

// Check that path is not directory.
if (!stats.isDirectory()) {
    throw new Error('Argument: ' + directory + ' is not a directory');
}

// ---------------------------------------------------------------------------------------------------------------------

function walk(dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
}

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

        // If charset is different than ignoring, prints them with file name.
        if (charset !== encoding) {
            console.log(setWidth('[' + charset + ']') + '"' + filename + '"');
        }
    });
});
