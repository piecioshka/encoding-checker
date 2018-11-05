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
Usage: encoding-checker [-p pattern] [-i encoding] [-v]

Options:
  --help                 Show help                                     [boolean]
  --version              Show version number                           [boolean]
  --pattern, -p, -d                                               [default: "*"]
  --ignore-encoding, -i                                            [default: ""]
  --verbose, -v                                                 [default: false]
```

## Examples

List of popular examples.

### :arrow_right: Use case: `All files in current directory`

```bash
encoding-checker
```

```text
[ASCII text] .gitignore
[ASCII text] .travis.yml
[ASCII text] index.js
[ASCII text] package-lock.json
[ASCII text] package.json
[ASCII text] README.md
[ASCII text] wallaby.js
```

### :arrow_right: Use case: `All *.csv files in current directory`

```bash
encoding-checker -p "*.md"
```

### :arrow_right: Use case: `Ignore all ASCII text files`

```bash
encoding-checker -i "ASCII text"
```

### :arrow_right: Use case: `Display number of results`

```bash
encoding-checker -v
```

## Supported Operating Systems

* Linux
* macOS

## How run tool on Windows?

1. Open <http://gnuwin32.sourceforge.net/packages/file.htm>
2. Install `file.exe` (copy to any directory from PATH)
3. Re-run `encoding-checker`

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2015-2018
