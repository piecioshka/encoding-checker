// The `colors` package (loaded for its side effects in `bin/cli.js`) patches
// `String.prototype` with color accessors. Declare the ones used in the source
// so TypeScript recognizes them without a type assertion.
interface String {
    red: string;
    blue: string;
    gray: string;
    green: string;
}
