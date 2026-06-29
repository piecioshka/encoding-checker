import * as fs from "fs";
import * as jschardet from "jschardet";

export interface EncodingResult {
    file?: string;
    encoding?: string;
    error?: NodeJS.ErrnoException;
}

function fetchCharset(file: string): Promise<EncodingResult> {
    return new Promise<EncodingResult>((resolve) => {
        fs.readFile(file, (error, data) => {
            if (error) {
                return resolve({
                    error: error,
                });
            }

            const result = jschardet.detect(data);
            const encoding = result.encoding
                ? result.encoding.toLowerCase()
                : "unknown".red;

            resolve({
                file: file,
                encoding: encoding,
            });
        });
    });
}

function isFile(path: string): boolean {
    try {
        return fs.lstatSync(path).isFile();
    } catch (error) {
        return false;
    }
}

export async function verify(
    ignoreEncoding: string,
    matches: string[]
): Promise<EncodingResult[]> {
    const files = matches.filter(isFile);

    const charset = await Promise.all(files.map(fetchCharset));

    return charset.filter(({ encoding }) => {
        return encoding !== ignoreEncoding;
    });
}
