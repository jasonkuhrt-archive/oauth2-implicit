o2i = require('oauth2-implicit')
getCredentials = o2i.getCredentials

fixData = ->
  beforeEach ->
    @request =
      client_id: 'foo-client'
      response_type: 'token'

    @data =
      version: '0.3.1'
      expiresAt: null
      id: JSON.stringify(@request)
      data:
        accessToken: 'foo-token'
        tokenType: 'bearer'

fixHash = ->
  beforeEach ->
    window.location.hash = 'access_token=' + @data.data.accessToken + '&token_type=' + @data.data.tokenType

  afterEach ->
    window.location.hash = ''

fixCache = ->
  beforeEach ->
    localStorage.setItem 'oauth_credentials', JSON.stringify(@data)

  afterEach ->
    localStorage.clear()



describe '.clearCache()', ->
  fixData()
  fixCache()

  it 'manually clears the cache', ->
    a localStorage.getItem('oauth_credentials')
    o2i.clearCache()
    a !localStorage.getItem('oauth_credentials')



describe 'getCredentials', ->
  fixData()

  describe 'from URI hash', ->
    fixHash()

    it 's creds and clears hash', ->
      a window.location.href.indexOf('#') isnt -1
      crd = getCredentials(@request)
      a crd.accessToken is 'foo-token'
      a window.location.href.indexOf('#') is -1


    it 'caches result in localStorage', ->
      getCredentials @request
      a JSON.parse(localStorage.getItem('oauth_credentials')).data.accessToken is 'foo-token'



  describe 'when credentials in cache', ->
    fixCache()

    it 'returns creds (sans enevelope)', ->
      a getCredentials(@request).accessToken is 'foo-token'


    it 'if cache is expired, cache is destroyed, returns null', ->
      @data.expiresAt = Date.now() - 1000
      localStorage.setItem 'oauth_credentials', JSON.stringify(@data)
      a getCredentials(@request) is null
      a localStorage.getItem('oauth_credentials') is null


    it 'if cache is outdated, cache is destroyed, returns null', ->
      @data.version = '0.1.0'
      localStorage.setItem 'oauth_credentials', JSON.stringify(@data)
      a getCredentials(@request) is null
      a localStorage.getItem('oauth_credentials') is null

    it 'never expires if credentials expiresIn is null', (done) ->
      self = this
      @data.expiresAt = null
      localStorage.setItem 'oauth_credentials', JSON.stringify(@data)
      setTimeout (->
        a getCredentials(self.request).accessToken is 'foo-token'
        done()
      ), 30


    it 'cache discarded if request differs from one causing cached response', ->
      @request.client_id = 'something-else'
      a getCredentials(@request) is null
      a localStorage.getItem('oauth_credentials') is null



  describe 'when creds in URI hash AND cache', ->
    fixCache()
    fixHash()

    it 'cache is rewritten from URI hash', ->
      window.location.hash = 'access_token=foo-token-in-hash&token_type=bearer'
      a JSON.parse(localStorage.getItem('oauth_credentials')).data.accessToken is 'foo-token'
      a getCredentials(@request).accessToken is 'foo-token-in-hash'
      a JSON.parse(localStorage.getItem('oauth_credentials')).data.accessToken is 'foo-token-in-hash'
