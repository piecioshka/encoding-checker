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
directory   Path to directory witch will be analyze.
            Default: .

encoding    Name of encoding witch will be ignore in results list.
            Default: utf-8
```

## Example

Command run in current project on my device:

```
piecioshka in ~/projects/encoding-checker on master λ ./encoding-checker.js

[us-ascii]     /Users/piecioshka/projects/encoding-checker/.idea/scopes/scope_settings.xml
[us-ascii]     /Users/piecioshka/projects/encoding-checker/.idea/inspectionProfiles/profiles_settings.xml
[us-ascii]     /Users/piecioshka/projects/encoding-checker/.idea/inspectionProfiles/Project_Default.xml
[us-ascii]     /Users/piecioshka/projects/encoding-checker/.idea/workspace.xml
[us-ascii]     /Users/piecioshka/projects/encoding-checker/.idea/vcs.xml
[us-ascii]     /Users/piecioshka/projects/encoding-checker/.idea/modules.xml
[us-ascii]     /Users/piecioshka/projects/encoding-checker/.idea/misc.xml
[us-ascii]     /Users/piecioshka/projects/encoding-checker/.idea/encodings.xml
[us-ascii]     /Users/piecioshka/projects/encoding-checker/.idea/encoding-checker.iml
[us-ascii]     /Users/piecioshka/projects/encoding-checker/.idea/.name
[us-ascii]     /Users/piecioshka/projects/encoding-checker/encoding-checker.js
[us-ascii]     /Users/piecioshka/projects/encoding-checker/README.md
[us-ascii]     /Users/piecioshka/projects/encoding-checker/.gitignore
```

## License

[The MIT License](http://piecioshka.mit-license.org)
