'use strict';

const verify = require('../../../src/index').verify;
const glob = require('glob-promise');

describe('General', () => {
    it('should works with single file', () => {
        return verify('utf-8', [__filename])
            .then((result) => {
                expect(result).toEqual(jasmine.any(Array));
                expect(result.length).toEqual(1);
                expect(result[0].encoding).toEqual('ascii');
                expect(result[0].file).toMatch(__filename);
            });
    });

    it('should works with many files', () => {
        return glob('*')
            .then((files) => verify('utf-8', files))
            .then((result) => {
                expect(result).toEqual(jasmine.any(Array));
                expect(result.length).toEqual(5);
                result.forEach(({ encoding }) => {
                    expect(encoding).toEqual('ascii');
                })
            });
    });

    it('should fail when put not valid params', () => {
        return verify('utf-8', ['.'])
            .then((result) => {
                expect(result).toEqual(jasmine.any(Array));
                expect(result.length).toEqual(0);
            });
    });
});
