/* global beforeEach, afterEach, expect, describe, it */
'use strict';



var get_credentials = require('oauth2-implicit')._get_credentials;



function scaffold_hash(){
  beforeEach(function(){
    window.location.hash = 'access_token='+ this.data.data.accessToken +
    '&token_type='+ this.data.data.tokenType;
  });

  afterEach(function(){
    window.location.hash = '';
  });
}



function scaffold_cache(){
  beforeEach(function(){
    localStorage.setItem('oauth_credentials', JSON.stringify(this.data));
  });

  afterEach(function(){
    localStorage.clear();
  });
}



describe('get_credentials', function(){
  beforeEach(function(){
    this.request = {
      client_id: 'foo-client',
      response_type: 'token'
    };
    this.data = {
      expiresAt: null,
      id: JSON.stringify(this.request),
      data: {
        accessToken: 'foo-token',
        tokenType: 'bearer'
      }
    };
  });

  describe('from URI hash', function(){
    scaffold_hash();

    it('returns creds and clears hash', function(){
      expect(window.location.href.indexOf('#')).not.toBe(-1);
      var crd = get_credentials(this.request);
      expect(crd.accessToken).toBe('foo-token');
      expect(window.location.href.indexOf('#')).toBe(-1);
    });

    it('caches result in localStorage', function(){
      get_credentials(this.request);
      expect(JSON.parse(localStorage.getItem('oauth_credentials')).data.accessToken).toBe('foo-token');
    });

  });



  describe('when credentials in cache', function(){
    scaffold_cache();

    it('returns creds (sans enevelope)', function(){
      expect(get_credentials(this.request).accessToken).toBe('foo-token');
    });

    it('if cache is expired, cache is destroyed, returns null', function(){
      this.data.expiresAt = Date.now() - 1000;
      localStorage.setItem('oauth_credentials', JSON.stringify(this.data));
      expect(get_credentials(this.request)).toBe(null);
      expect(localStorage.getItem('oauth_credentials')).toBe(null);
    });

    it('never expires if credentials expiresIn is null', function(done){
      var self = this;
      this.data.expiresAt = null;
      localStorage.setItem('oauth_credentials', JSON.stringify(this.data));
      setTimeout(function(){
        expect(get_credentials(self.request).accessToken).toBe('foo-token');
        done();
      }, 30);
    });

    it('cache discarded if request differs from one causing cached response', function(){
      this.request.client_id = 'something-else';
      expect(get_credentials(this.request)).toBe(null);
      expect(localStorage.getItem('oauth_credentials')).toBe(null);
    });

  });



  describe('when creds in URI hash AND cache', function(){
   scaffold_cache(this.data);
   scaffold_hash(this.data);

   it('cache is rewritten from URI hash', function(){
     window.location.hash = 'access_token=foo-token-in-hash&token_type=bearer';
     expect(JSON.parse(localStorage.getItem('oauth_credentials')).data.accessToken).toBe('foo-token');
     expect(get_credentials(this.request).accessToken).toBe('foo-token-in-hash');
     expect(JSON.parse(localStorage.getItem('oauth_credentials')).data.accessToken).toBe('foo-token-in-hash');
   });
  });

});
