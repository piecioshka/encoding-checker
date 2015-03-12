# encoding-checker

Simple tool to investigate files with different encoding than passed.

## Usage

To use tool try run command in terminal:

```bash
node encoding-checker.js [-d|--directory <arg>] [-e|--encoding <arg>] [-h|--help]
```

or

```
./encoding-checker.js [-d|--directory <arg>] [-e|--encoding <arg>] [-h|--help]
```

## Arguments

List of arguments with short description.

```
-d | --directory <arg>   Path to directory witch will be analyze. Default: "."
-e | --encoding <arg>    Name of encoding witch will be ignore in results list.
-h | --help              Show this message.
```

## Example

Command run in current project on my device:

```
piecioshka in ~/projects/encoding-checker on master λ ./encoding-checker.js

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

[The MIT License](http://piecioshka.mit-license.org)
