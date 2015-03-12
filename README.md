# encoding-checker

Simple tool to investigate files with different encoding than passed.

## Usage

To use tool try run command in terminal:

```bash
node encoding-checker.js [-d|--directory <directory>] [-e|--encoding <encoding>]
```

or

```
./encoding-checker.js [-d|--directory <directory>] [-e|--encoding <encoding>]
```

## Arguments

List of arguments with short description.

```
directory   Path to directory witch will be analyze. Default: .
encoding    Name of encoding witch will be ignore in results list.
help        Show this message.
```

## Example

Command run in current project on my device:

```
piecioshka in ~/projects/encoding-checker on master λ ./encoding-checker.js

[us-ascii]    "./.gitignore"
[binary]      "./.idea"
[us-ascii]    "./.idea/.name"
[us-ascii]    "./.idea/encoding-checker.iml"
[us-ascii]    "./.idea/encodings.xml"
[binary]      "./.idea/inspectionProfiles"
[us-ascii]    "./.idea/inspectionProfiles/profiles_settings.xml"
[us-ascii]    "./.idea/inspectionProfiles/Project_Default.xml"
[us-ascii]    "./.idea/misc.xml"
[us-ascii]    "./.idea/modules.xml"
[binary]      "./.idea/scopes"
[us-ascii]    "./.idea/scopes/scope_settings.xml"
[us-ascii]    "./.idea/vcs.xml"
[us-ascii]    "./.idea/workspace.xml"
[us-ascii]    "./encoding-checker.js"
[utf-8]       "./README.md"
```

## License

[The MIT License](http://piecioshka.mit-license.org)
