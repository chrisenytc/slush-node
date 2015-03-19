/*
 * slush-node
 * https://github.com/chrisenytc/slush-node
 *
 * Copyright (c) 2015, Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai'),
    expect = chai.expect;

chai.should();

describe('slush-node module', function() {
    describe('#test', function() {
        it('should return a hello', function() {
            expect('Hello Node').to.equal('Hello Node');
        });
    });
});
