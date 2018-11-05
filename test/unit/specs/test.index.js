'use strict';

const EncodingChecker = require('../../../src/index');

const parseCharset = EncodingChecker._test_parseCharset;
const fetchCharset = EncodingChecker._test_fetchCharset;
const printFileRecord = EncodingChecker._test_printFileRecord;
const verifyCharsetSingleFile = EncodingChecker._test_verifyCharsetSingleFile;
const verifyCharsetFileList = EncodingChecker.verifyCharsetFileList;

describe('General', function () {
    beforeAll(() => {
        global.console.log = () => { };
        global.console.error = () => { };
    });

    it('should be defined', function () {
        expect(EncodingChecker).toBeDefined();
    });

    it('should have some methods', function () {
        [
            parseCharset,
            fetchCharset,
            printFileRecord,
            verifyCharsetSingleFile,
            verifyCharsetFileList
        ].forEach((method) => {
            expect(method).toEqual(jasmine.any(Function));
        });
    });

    describe('method: parseCharset', function () {
        it('should returns null when passed empty string', function () {
            expect(parseCharset('')).toEqual('');
        });
        it('should returns correct charset', function () {
            expect(parseCharset('BLAH; charset=utf-8; BLAH')).toEqual('utf-8');
        });
    });

    describe('method: fetchCharset', function () {
        it('should returns error message when "file" is not defined', function (done) {
            return fetchCharset('')
                .catch((result) => {
                    expect(result).toMatch('Error');
                    done();
                });
        });
    });

    describe('method: printFileRecord', function () {
        it('should be a procedure (nothing return)', function () {
            console.log = jasmine.createSpy();
            printFileRecord('', '');
            expect(console.log).toHaveBeenCalled();
        });
    });

    describe('method: verifyCharsetSingleFile', function () {
        it('should return undefined when put not valid params', function () {
            return Promise.all([
                verifyCharsetSingleFile('utf-8', './package.json')
                    .then((result) => {
                        expect(result).toEqual(undefined);
                    }),
                verifyCharsetSingleFile('utf-8', '.')
                    .then((result) => {
                        expect(result).toEqual(undefined);
                    })
            ]);
        });

        it('should breaks', function (done) {
            const child_process = require('child_process');
            const cache = child_process.exec;
            child_process.exec = (_, cb) => cb(new Error('Command not found'));

            verifyCharsetSingleFile('utf-8', './not-exist-file')
                .then((err) => {
                    expect(err.__proto__.constructor).toEqual(Error);
                    child_process.exec = cache;
                    done();
                });
        });
    });

    describe('method: verifyCharsetFileList', function () {
        it('should fail when put not valid params', function () {
            return verifyCharsetFileList('utf-8', ['.'])
                .then((result) => {
                    expect(result).toEqual(jasmine.any(Array));
                    expect(result.length).toEqual(0);
                })
        });
    });
});
