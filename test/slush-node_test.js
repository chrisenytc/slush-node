/*
 * slush-node
 * https://github.com/chrisenytc/slush-node
 *
 * Copyright (c) 2014 Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
chai.expect();
chai.should();

describe('slush-node module', function() {
    describe('#test', function() {
        it('should return a hello', function() {
            'Hello Node'.should.equal("Hello Node");
        });
    });
});
