{ serializeState } = require '../lib/start'
parse = o2i.parseCredentials



describe '.parseCredentials() gets credentials from URI hash', ->
  beforeEach ->
    @stateObject = foo: 'bar'
    @credentialsResponse =
      access_token: 'a'
      token_type: 'bearer'
      expires_in: 100
      scope: 'a'
      state: serializeState @stateObject

    @credentialsResponseMin =
      access_token:'a'
      token_type:'bearer'

    @strMin = hashify @credentialsResponseMin
    @str = hashify @credentialsResponse



  it 'converts keys to camel-case', ->
    eq parse(@str), {
      accessToken: 'a'
      tokenType: 'bearer'
      expiresIn: '100'
      scope: ['a']
      state: @stateObject
    }


  describe '.access_token', ->

    it 'if missing throws', ->
      a.throws -> parse 'token_type=a'


  describe '.token_type', ->

    it 'if missing throws', ->
      a.throws -> parse 'access_token=foobar'


  describe '.state', ->

    it 'if missing defaults to empty object', ->
      o = parse @strMin
      a.isObject o.state


  describe '.token_type', ->

    it 'if missing throws a parse error', ->
      delete @credentialsResponse.token_type
      errorMatches = 'Auth Server response is missing "token_type"'
      a.throws (=> parse hashify @credentialsResponse), errorMatches


  describe '.expiresIn', ->

    it 'if missing defaults to null', ->
      o = parse @strMin
      eq o.expiresIn, null


  describe '.scope', ->

    it 'if missing defaults to empty array', ->
      o = parse @strMin
      eq o.scope, []

    it 'if mising value defaults to empty array', ->
      o = parse @strMin + '&scope='
      eq o.scope, []

    it 'if single item becomes singlton array', ->
      o = parse @strMin + '&scope=foo'
      eq o.scope[0], 'foo'

    it 'if multi scope becomes array', ->
      o = parse @strMin + '&scope=foo%20bar'
      a.include o.scope, 'foo'
      a.include o.scope, 'bar'
