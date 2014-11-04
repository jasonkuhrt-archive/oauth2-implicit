window.a = require('chai').assert
window.eq = a.deepEqual
window.o2i = require('oauth2-implicit')

window.hashify = (hash)->
  if typeof hash isnt 'object' then return hash
  Object.keys(hash)
  .reduce ((qsArr, k)-> qsArr.concat(["#{k}=#{hash[k]}"])), []
  .join '&'

window.setHash = (hash)->
  window.location.hash = hashify hash

window.fixData = ->
  beforeEach ->
    @request =
      client_id: 'foo-client'
      response_type: 'token'

    @cache =
      version: '0.4.2'
      expiresAt: null
      id: JSON.stringify(@request)
      data:
        accessToken: 'foo-token'
        tokenType: 'bearer'

window.fixHash = ->
  beforeEach ->
    setHash
      access_token: @cache.data.accessToken
      token_type: @cache.data.token_type

  afterEach -> setHash ''

window.fixCache = ->
  beforeEach -> localStorage.setItem 'oauth_credentials', JSON.stringify(@cache)
  afterEach -> localStorage.clear()
