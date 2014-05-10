/* global beforeEach, expect, describe, it */
'use strict';



var get_credentials = require('oauth2-implicit')._get_credentials;

describe('instance gets credentials from URI hash', function(){

  it('clears and returns credentials', function(){
    window.location.hash = 'access_token=foobar';
    expect(window.location.href.indexOf('#')).not.toBe(-1);
    var crd = get_credentials();
    expect(crd.access_token).toBe('foobar');
    expect(window.location.href.indexOf('#')).toBe(-1);
  });

  it('caches result in localStorage', function(){
    window.location.hash = 'access_token=hash-token';
    get_credentials();
    expect(JSON.parse(localStorage.getItem('oauth_credentials')).credentials.access_token).toBe('hash-token');
  });

});



describe('instance gets credentials from localStorage cache', function(){
  var data = {
    expires_at: null,
    credentials: {
      access_token: 'foo-token'
    }
  };

  beforeEach(function(){
    localStorage.setItem('oauth_credentials', JSON.stringify(data));
  });

  it('works', function(){
    expect(get_credentials().access_token).toBe('foo-token');
  });

  it('only checked if no URI hash credentials', function(){
    window.location.hash = 'access_token=foo-token-in-hash';
    expect(get_credentials().access_token).toBe('foo-token-in-hash');
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
      expect(get_credentials().access_token).toBe('foo-token');
      done();
    }, 30);
  });
});