/* global afterEach, beforeEach, expect, describe, it */
'use strict';

var O2I = require('oauth2-implicit');



describe('oauth2-implicit', function(){
  var o2i;

  beforeEach(function(){
    o2i = O2I({
      client_id: 'foo-id'
    });
  });

  afterEach(function(){
    localStorage.clear();
  });



  it('exports a factory', function(){
    expect(typeof O2I({
      client_id: 'foobar'
    })).toBe('function');
  });

});