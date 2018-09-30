'use strict';

var EncodingChecker = require('../../../src/index');
var noop = function () {
    // do nothing...
};

describe('General', function () {
    it('should be defined', function () {
        expect(EncodingChecker).toBeDefined();
    });

    it('should have 3 methods', function () {
        expect(EncodingChecker.isFile).toEqual(jasmine.any(Function));
        expect(EncodingChecker.parseCharset).toEqual(jasmine.any(Function));
        expect(EncodingChecker.verifyCharsetFileList).toEqual(jasmine.any(Function));
    });

    describe('method: parseCharset', function () {
        it('should returns null when passed empty string', function () {
            expect(EncodingChecker.parseCharset('')).toEqual('');
        });
        it('should returns correct charset', function () {
            expect(EncodingChecker.parseCharset('BLAH; charset=utf-8; BLAH')).toEqual('utf-8');
        });
    });

    describe('method: isFile', function () {
        it('should returns true on real files', function () {
            expect(EncodingChecker.isFile('./package.json')).toBeTruthy();
        });

        it('should returns false on directories', function () {
            expect(EncodingChecker.isFile('./')).toBeFalsy();
        });

        it('should throws an error on mystic files', function () {
            expect(function () {
                EncodingChecker.isFile('./my-mystic-file.txt')
            }).toThrow();
        });
    });

    describe('method: printFileRecord', function () {
        it('should be a procedure (nothing return)', function () {
            console.log = noop;
            expect(EncodingChecker.printFileRecord('')).toEqual(undefined);
        });
    });

    describe('method: verifyCharsetSingleFile', function () {
        it('should fail when put not valid params', function () {
            console.log = noop;
            expect(EncodingChecker.verifyCharsetSingleFile('', '')).toEqual(undefined);
            expect(EncodingChecker.verifyCharsetSingleFile('utf-8', '')).toEqual(undefined);
            expect(EncodingChecker.verifyCharsetSingleFile('utf-8', './package.json')).toEqual(undefined);
            expect(EncodingChecker.verifyCharsetSingleFile('utf-8', '.')).toEqual(undefined);
        });
    });

    describe('method: verifyCharsetFileList', function () {
        it('should fail when put not valid params', function () {
            console.log = noop;
            expect(EncodingChecker.verifyCharsetFileList('utf-8', ['.'])).toEqual(undefined);
        });
    });
});
