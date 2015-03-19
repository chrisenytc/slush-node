/*
 * <%= appNameSlug %>
 * https://github.com/<%= userName %>/<%= appNameSlug %>
 *
 * Copyright (c) <%= year %>, <%= authorName %>
 * Licensed under the <%= license %> license.
 */

'use strict';

var chai = require('chai'),
    expect = chai.expect;

chai.should();

var <%= appNameSlug %> = require('../lib/<%= appNameSlug %>.js');

describe('<%= appNameSlug %> module', function() {
    describe('#awesome()', function() {
        it('should return a hello', function() {
            expect(<%= appNameSlug %>.awesome('livia')).to.equal('hello livia');
        });
    });
});
