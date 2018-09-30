# encoding-checker

[![npm version](https://badge.fury.io/js/encoding-checker.svg)](https://badge.fury.io/js/encoding-checker)
[![downloads count](https://img.shields.io/npm/dt/encoding-checker.svg)](https://www.npmjs.com/~piecioshka)
[![travis](https://img.shields.io/travis/piecioshka/encoding-checker.svg?maxAge=2592000)](https://travis-ci.org/piecioshka/encoding-checker)
[![dependencies](https://david-dm.org/piecioshka/encoding-checker.svg)](https://github.com/piecioshka/encoding-checker)
[![coveralls](https://coveralls.io/repos/github/piecioshka/encoding-checker/badge.svg?branch=master)](https://coveralls.io/github/piecioshka/encoding-checker?branch=master)

:hammer: Tool to investigate files with different encoding than passed

## Install

```bash
npm install -g encoding-checker
```

## Usage

```text
encoding-checker --help

  Usage: index [options]

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -d, --directory <d>        path to directory which will be analyze (default: ".")
    -i, --ignore-encoding <e>  name of encoding which will be ignore in results list
```

## Examples

List of popular examples.

### :arrow_right: Use case: All files in current directory

```text
encoding-checker -d .

[binary] ./.DS_Store
[us-ascii] ./README.md
[us-ascii] ./.bin/index.js
[us-ascii] ./index.js
[us-ascii] ./package.json
[us-ascii] ./src/index.js
[us-ascii] ./test/unit/jasmine.json
[us-ascii] ./test/unit/specs/test.index.js
[us-ascii] ./wallaby.js
[us-ascii] ./yarn.lock
```

### :arrow_right: Use case: All *.csv files in current directory

```text
encoding-checker -d "*.csv"
```

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2015
