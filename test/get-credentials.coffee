getCredentials = o2i.getCredentials



describe '.getCredentials()', ->
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

    it 'returns credentials', ->
      a getCredentials(@request).accessToken is 'foo-token'


    it 'if cache is expired, cache is destroyed, returns null', ->
      @cache.expiresAt = Date.now() - 1000
      localStorage.setItem 'oauth_credentials', JSON.stringify(@cache)
      a getCredentials(@request) is null
      a localStorage.getItem('oauth_credentials') is null


    it 'if cache is outdated, cache is destroyed, returns null', ->
      @cache.version = '0.1.0'
      localStorage.setItem 'oauth_credentials', JSON.stringify(@cache)
      a getCredentials(@request) is null
      a localStorage.getItem('oauth_credentials') is null

    it 'never expires if credentials expiresIn is null', (done) ->
      @cache.expiresAt = null
      localStorage.setItem 'oauth_credentials', JSON.stringify(@cache)
      setTimeout (=>
        console.log getCredentials(@request)
        a getCredentials(@request).accessToken is 'foo-token'
        done()
      ), 30


    it 'cache discarded if request differs from one causing cached response', ->
      @request.client_id = 'something-else'
      a getCredentials(@request) is null
      a localStorage.getItem('oauth_credentials') is null



  describe 'when credentials in URI hash AND cache', ->
    fixCache()
    fixHash()

    it 'cache is rewritten from URI hash', ->
      setHash access_token:'foo-token-in-hash', token_type:'bearer'
      a JSON.parse(localStorage.getItem('oauth_credentials')).data.accessToken is 'foo-token'
      a getCredentials(@request).accessToken is 'foo-token-in-hash'
      a JSON.parse(localStorage.getItem('oauth_credentials')).data.accessToken is 'foo-token-in-hash'
