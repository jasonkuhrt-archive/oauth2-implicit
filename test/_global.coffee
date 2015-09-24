window.a = require('chai').assert
window.eq = a.deepEqual
window.o2i = require('../lib')



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

    @creds =
      version: '0.5.0'
      expiresAt: null
      id: JSON.stringify(@request)
      data:
        accessToken: 'foo-token'
        tokenType: 'bearer'

window.fixHash = ->
  beforeEach ->
    setHash
      access_token: @creds.data.accessToken
      token_type: @creds.data.token_type

  afterEach -> setHash ''