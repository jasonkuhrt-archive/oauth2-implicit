/* global expect, describe, it */
'use strict';



var parse = require('oauth2-implicit')._parse_oauth_credentials;



describe('instance gets credentials from URI hash', function(){
  var str_min = 'access_token=a&token_type=bearer';
  var str = str_min + '&expires_in=100&scope=a&state=b';

  it('converts keys to camel-case', function(){
    var keys = Object.keys(parse(str));
    expect(keys).toContain('accessToken');
    expect(keys).toContain('tokenType');
    expect(keys).toContain('expiresIn');
    expect(keys).toContain('scope');
    expect(keys).toContain('state');
  });

  describe('access_token', function(){
    it('if missing throws', function(){
      expect(function(){
        parse('token_type=a');
      }).toThrow();
    });
  });

  describe('token_type', function(){
    it('if missing throws', function(){
      expect(function(){
        parse('access_token=foobar');
      }).toThrow();
    });
  });

  describe('state', function(){
    it('if missing defaults to null', function(){
      var o = parse(str_min);
      expect(o.state).toBe(null);
    });
  });

  describe('token_type', function(){
    it('if missing defaults to null', function(){
      var o = parse(str_min);
      expect(o.state).toBe(null);
    });
  });

  describe('expiresIn', function(){
    it('if missing defaults to null', function(){
      var o = parse(str_min);
      expect(o.expiresIn).toBe(null);
    });
  });

  describe('scope', function(){
    it('if missing defaults to empty array', function(){
      var o = parse(str_min);
      expect(o.scope.length).toBe(0);
    });

    it('if single item becomes singlton array', function(){
      var o = parse(str_min + '&scope=foo');
      expect(o.scope[0]).toBe('foo');
    });

    it('if multi scope becomes array', function(){
      var o = parse(str_min + '&scope=foo+bar');
      expect(o.scope).toContain('foo');
      expect(o.scope).toContain('bar');
    });
  });
});