parse = o2i.parseCredentials

str_min = hashify
  access_token:'a'
  token_type:'bearer'

str = hashify
  access_token:'a'
  token_type: 'bearer'
  expires_in:100
  scope:'a'
  state:'b'



describe '.parseCredentials() gets credentials from URI hash', ->

  it 'converts keys to camel-case', ->
    eq parse(str), {
      accessToken: 'a',
      tokenType: 'bearer',
      expiresIn: '100',
      scope: ['a'],
      state: 'b'
    }


  describe '.access_token', ->

    it 'if missing throws', ->
      a.throws -> parse 'token_type=a'


  describe '.token_type', ->

    it 'if missing throws', ->
      a.throws -> parse 'access_token=foobar'


  describe '.state', ->

    it 'if missing defaults to null', ->
      o = parse(str_min)
      eq o.state, null


  describe '.token_type', ->

    it 'if missing defaults to null', ->
      o = parse(str_min)
      eq o.state, null


  describe '.expiresIn', ->

    it 'if missing defaults to null', ->
      o = parse(str_min)
      eq o.expiresIn, null


  describe '.scope', ->

    it 'if missing defaults to empty array', ->
      o = parse(str_min)
      eq o.scope.length, 0


    it 'if single item becomes singlton array', ->
      o = parse(str_min + '&scope=foo')
      eq o.scope[0], 'foo'


    it 'if multi scope becomes array', ->
      o = parse str_min + '&scope=foo&scope=bar'
      a.include o.scope, 'foo'
      a.include o.scope, 'bar'
