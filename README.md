# encoding-checker

[![node version](https://img.shields.io/node/v/encoding-checker.svg)](https://www.npmjs.com/package/encoding-checker)
[![npm version](https://badge.fury.io/js/encoding-checker.svg)](https://badge.fury.io/js/encoding-checker)
[![downloads count](https://img.shields.io/npm/dt/encoding-checker.svg)](https://www.npmjs.com/package/encoding-checker)
[![license](https://img.shields.io/npm/l/encoding-checker.svg)](https://www.npmjs.com/package/encoding-checker)
[![github-ci](https://github.com/piecioshka/encoding-checker/actions/workflows/testing.yml/badge.svg)](https://github.com/piecioshka/encoding-checker/actions/workflows/testing.yml)

🛠 Tool to investigate files with different encoding than passed

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

### :arrow_right: Use case: All files in the current directory

```bash
> encoding-checker

[ascii] .gitignore
[ascii] index.js
[ascii] package-lock.json
[ascii] package.json
[ascii] README.md
[ascii] wallaby.js
```

### :arrow_right: Use case: All *.md files in current directory

```bash
encoding-checker -p "*.md"
```

### :arrow_right: Use case: Recursive directory

```bash
encoding-checker -p "**"
encoding-checker -p "../**"
```

### :arrow_right: Use case: Ignore all files with encoding "ascii"

```bash
encoding-checker -i "ascii"
```

### :arrow_right: Use case: Append number of results

```bash
encoding-checker -v
```

## License

[The MIT License](https://piecioshka.mit-license.org) @ 2015
