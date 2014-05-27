# global expect, describe, it
parse = require('oauth2-implicit')._parse_oauth_credentials



describe 'instance gets credentials from URI hash', ->
  str_min = 'access_token=a&token_type=bearer'
  str = str_min + '&expires_in=100&scope=a&state=b'

  it 'converts keys to camel-case', ->
    a.deepEqual parse(str), {
      accessToken: 'a',
      tokenType: 'bearer',
      expiresIn: '100',
      scope: ['a'],
      state: 'b'
    }


  describe 'access_token', ->
    it 'if missing throws', ->
      a.throws -> parse 'token_type=a'

  describe 'token_type', ->
    it 'if missing throws', ->
      a.throws -> parse 'access_token=foobar'

  describe 'state', ->
    it 'if missing defaults to null', ->
      o = parse(str_min)
      a.equal o.state, null



  describe 'token_type', ->
    it 'if missing defaults to null', ->
      o = parse(str_min)
      a.equal o.state, null



  describe 'expiresIn', ->
    it 'if missing defaults to null', ->
      o = parse(str_min)
      a.equal o.expiresIn, null



  describe 'scope', ->
    it 'if missing defaults to empty array', ->
      o = parse(str_min)
      a.equal o.scope.length, 0


    it 'if single item becomes singlton array', ->
      o = parse(str_min + '&scope=foo')
      a.equal o.scope[0], 'foo'


    it 'if multi scope becomes array', ->
      o = parse(str_min + '&scope=foo&scope=bar')
      a.include o.scope, 'foo'
      a.include o.scope, 'bar'