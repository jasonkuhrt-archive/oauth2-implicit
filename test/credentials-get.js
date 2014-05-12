/* global beforeEach, expect, describe, it */
'use strict';



var get_credentials = require('oauth2-implicit')._get_credentials;

describe('instance gets credentials from URI hash', function(){

  it('clears and returns credentials', function(){
    window.location.hash = 'access_token=foobar&token_type=bearer';
    expect(window.location.href.indexOf('#')).not.toBe(-1);
    var crd = get_credentials();
    expect(crd.accessToken).toBe('foobar');
    expect(window.location.href.indexOf('#')).toBe(-1);
  });

  it('caches result in localStorage', function(){
    window.location.hash = 'access_token=hash-token&token_type=bearer';
    get_credentials();
    expect(JSON.parse(localStorage.getItem('oauth_credentials')).credentials.accessToken).toBe('hash-token');
  });

});



describe('instance gets credentials from localStorage cache', function(){
  var data = {
    expires_at: null,
    credentials: {
      accessToken: 'foo-token',
      tokenType: 'bearer'
    }
  };

  beforeEach(function(){
    localStorage.setItem('oauth_credentials', JSON.stringify(data));
  });

  it('works', function(){
    expect(get_credentials().accessToken).toBe('foo-token');
  });

  it('only checked if no URI hash credentials', function(){
    window.location.hash = 'access_token=foo-token-in-hash&token_type=bearer';
    expect(get_credentials().accessToken).toBe('foo-token-in-hash');
  });

  it('is destroyed if has expired and returns null', function(){
    var data2 = JSON.parse(JSON.stringify(data));
    data2.expires_at = Date.now() - 1000;
    localStorage.setItem('oauth_credentials', JSON.stringify(data2));
    get_credentials();
    expect(localStorage.getItem('oauth_credentials')).toBe(null);
  });

  it('never expires if credentials expires_in is null', function(done){
    var data2 = JSON.parse(JSON.stringify(data));
    data2.expires_at = null;
    localStorage.setItem('oauth_credentials', JSON.stringify(data2));
    setTimeout(function(){
      expect(get_credentials().accessToken).toBe('foo-token');
      done();
    }, 30);
  });
});