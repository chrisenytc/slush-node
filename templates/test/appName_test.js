/*
 * <%= appNameSlug %>
 * https://github.com/<%= userName %>/<%= appNameSlug %>
 *
 * Copyright (c) 2014 <%= authorName %>
 * Licensed under the <%= license %> license.
 */

'use strict';

var chai = require('chai');
chai.expect();
chai.should();

var <%= appNameSlug %> = require('../lib/<%= appNameSlug %>.js');

describe('<%= appNameSlug %> module', function(){
  describe('#awesome()', function(){
    it('should return a hello', function(){
      <%= appNameSlug %>.awesome('livia').should.equal("hello livia");
    });
  });
});
