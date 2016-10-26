# encoding-checker

> :hammer: Tool to investigate files with different encoding than passed

## Usage

```bash
$ encoding-checker --help

  Usage: index [options]

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -d, --directory <d>        path to directory which will be analyze (default: ".")
    -i, --ignore-encoding <e>  name of encoding which will be ignore in results list
```

## Example

Command run in current project on my device:

```
$ encoding-checker -d .

[us-ascii]    "./.gitignore"
[us-ascii]    "./.idea/.name"
[us-ascii]    "./.idea/encoding-checker.iml"
[us-ascii]    "./.idea/encodings.xml"
[us-ascii]    "./.idea/inspectionProfiles/profiles_settings.xml"
[us-ascii]    "./.idea/inspectionProfiles/Project_Default.xml"
[us-ascii]    "./.idea/misc.xml"
[us-ascii]    "./.idea/modules.xml"
[us-ascii]    "./.idea/scopes/scope_settings.xml"
[us-ascii]    "./.idea/vcs.xml"
[us-ascii]    "./.idea/workspace.xml"
[us-ascii]    "./encoding-checker.js"
[utf-8]       "./README.md"
```

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2015
