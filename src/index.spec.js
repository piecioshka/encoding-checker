"use strict";

const verify = require("./index").verify;
const glob = require("glob-promise");
const fs = require("fs");
const path = require("path");
const jschardet = require("jschardet");

describe("General", () => {
    it("should works with single file", () => {
        return verify("utf-8", [__filename]).then((result) => {
            expect(result).toEqual(expect.any(Array));
            expect(result.length).toEqual(1);
            expect(result[0].encoding).toEqual("ascii");
            expect(result[0].file).toEqual(__filename);
        });
    });

    it("should works with many files", () => {
        return glob("*")
            .then((files) => verify("utf-8", files))
            .then((result) => {
                expect(result).toEqual(expect.any(Array));
                result.forEach(({ encoding }) => {
                    expect(encoding).toEqual("ascii");
                });
            });
    });

    it("should fail when put not valid params", () => {
        return verify("utf-8", ["."]).then((result) => {
            expect(result).toEqual(expect.any(Array));
            expect(result.length).toEqual(0);
        });
    });

    it("should handle file read errors", () => {
        // Since isFile filters out non-existent files, we need to test actual read errors
        // We'll test this by creating a mock scenario in a different test
        const nonExistentFile = "/path/to/nonexistent/file.txt";
        return verify("utf-8", [nonExistentFile]).then((result) => {
            // Non-existent files are filtered out by isFile
            expect(result).toEqual(expect.any(Array));
            expect(result.length).toEqual(0);
        });
    });

    it("should filter files matching the ignored encoding", () => {
        return verify("ascii", [__filename]).then((result) => {
            expect(result).toEqual(expect.any(Array));
            expect(result.length).toEqual(0);
        });
    });

    it("should return files that don't match the ignored encoding", () => {
        return verify("iso-8859-1", [__filename]).then((result) => {
            expect(result).toEqual(expect.any(Array));
            expect(result.length).toEqual(1);
            expect(result[0].encoding).toEqual("ascii");
        });
    });

    it("should handle empty file list", () => {
        return verify("utf-8", []).then((result) => {
            expect(result).toEqual(expect.any(Array));
            expect(result.length).toEqual(0);
        });
    });

    it("should handle mixed valid and invalid files", () => {
        const validFile = __filename;
        const invalidFile = "/path/to/nonexistent.txt";
        return verify("utf-8", [validFile, invalidFile]).then((result) => {
            expect(result).toEqual(expect.any(Array));
            // Invalid file is filtered out by isFile
            expect(result.length).toEqual(1);

            // One should be a valid file with encoding
            const validResult = result.find(r => r.file === validFile);
            expect(validResult).toBeDefined();
            expect(validResult.encoding).toEqual("ascii");
        });
    });

    it("should handle directories in the list by filtering them out", () => {
        const currentDir = __dirname;
        return verify("utf-8", [currentDir]).then((result) => {
            expect(result).toEqual(expect.any(Array));
            expect(result.length).toEqual(0);
        });
    });

    it("should handle file with unknown encoding detection", async () => {
        // Create a temporary file with specific content that might result in unknown encoding
        const tmpFile = path.join(__dirname, "temp-test-file.bin");

        // Create a file with binary content that might be hard to detect
        const buffer = Buffer.from([0xFF, 0xFE, 0x00, 0x00]);
        fs.writeFileSync(tmpFile, buffer);

        try {
            const result = await verify("utf-8", [tmpFile]);
            expect(result).toEqual(expect.any(Array));
            expect(result.length).toEqual(1);
            expect(result[0].encoding).toBeDefined();
        } finally {
            // Clean up
            if (fs.existsSync(tmpFile)) {
                fs.unlinkSync(tmpFile);
            }
        }
    });

    it("should process multiple files concurrently", async () => {
        const files = await glob("*.js");
        const validFiles = files.filter(file => {
            try {
                return fs.lstatSync(file).isFile();
            } catch (e) {
                return false;
            }
        });

        const result = await verify("utf-8", validFiles);
        expect(result).toEqual(expect.any(Array));
        expect(result.length).toBeGreaterThan(0);

        result.forEach((item) => {
            expect(item).toHaveProperty("encoding");
            expect(item).toHaveProperty("file");
        });
    });

    it("should handle fs.readFile errors gracefully", async () => {
        // Mock fs.readFile to simulate an error
        const originalReadFile = fs.readFile;
        const testFile = __filename;

        // We need to actually trigger the error path in fetchCharset
        // Create a test file, then make it unreadable
        const tmpFile = path.join(__dirname, "unreadable-test.txt");
        fs.writeFileSync(tmpFile, "test content");

        try {
            // Change permissions to make it unreadable (works on Unix-like systems)
            if (process.platform !== 'win32') {
                fs.chmodSync(tmpFile, 0o000);

                const result = await verify("utf-8", [tmpFile]);
                expect(result).toEqual(expect.any(Array));
                expect(result.length).toEqual(1);
                expect(result[0].error).toBeDefined();
            }
        } finally {
            // Clean up - restore permissions and delete
            try {
                if (process.platform !== 'win32') {
                    fs.chmodSync(tmpFile, 0o644);
                }
                fs.unlinkSync(tmpFile);
            } catch (e) {
                // Ignore cleanup errors
            }
        }
    });

    it("should handle files with undetectable encoding", async () => {
        // Create a file with content that might result in no encoding detection
        // Empty files or files with very little data might not be detected properly
        const tmpFile = path.join(__dirname, "empty-test.txt");
        fs.writeFileSync(tmpFile, "");

        try {
            const result = await verify("utf-8", [tmpFile]);
            expect(result).toEqual(expect.any(Array));
            // Empty file might still get a result, just checking it doesn't crash
            expect(result.length).toBeLessThanOrEqual(1);
        } finally {
            // Clean up
            if (fs.existsSync(tmpFile)) {
                fs.unlinkSync(tmpFile);
            }
        }
    });

    it("should handle various file encodings correctly", async () => {
        // Test with current file which is ASCII/UTF-8
        const result = await verify("iso-8859-1", [__filename]);
        expect(result).toEqual(expect.any(Array));
        expect(result.length).toEqual(1);
        expect(result[0]).toHaveProperty("encoding");
        expect(result[0]).toHaveProperty("file");
        expect(result[0].file).toEqual(__filename);
    });

    it("should handle when jschardet returns null encoding", async () => {
        // Mock jschardet to return null encoding
        const originalDetect = jschardet.detect;
        const tmpFile = path.join(__dirname, "mock-test.txt");
        fs.writeFileSync(tmpFile, "test");

        try {
            // Mock jschardet.detect to return null encoding
            jschardet.detect = jest.fn(() => ({ encoding: null }));

            // Use a different ignore encoding so it shows up in results
            const result = await verify("utf-8", [tmpFile]);
            expect(result).toEqual(expect.any(Array));
            // When encoding is null, it returns 'unknown', which is filtered out
            // if it doesn't match the ignore encoding
            expect(result.length).toEqual(1);
        } finally {
            // Restore original function
            jschardet.detect = originalDetect;
            // Clean up
            if (fs.existsSync(tmpFile)) {
                fs.unlinkSync(tmpFile);
            }
        }
    });

    it("should handle when jschardet returns undefined encoding", async () => {
        // Mock jschardet to return undefined encoding
        const originalDetect = jschardet.detect;
        const tmpFile = path.join(__dirname, "mock-test2.txt");
        fs.writeFileSync(tmpFile, "test");

        try {
            // Mock jschardet.detect to return undefined encoding
            jschardet.detect = jest.fn(() => ({ encoding: undefined }));

            const result = await verify("utf-8", [tmpFile]);
            expect(result).toEqual(expect.any(Array));
            expect(result.length).toEqual(1);
        } finally {
            // Restore original function
            jschardet.detect = originalDetect;
            // Clean up
            if (fs.existsSync(tmpFile)) {
                fs.unlinkSync(tmpFile);
            }
        }
    });
});
