requestCredentials = o2i.requestCredentials
oldAssign = window.location.assign



describe '.requestCredentials()', ->
  fixCache()

  beforeEach -> window.location.assign = ->
  afterEach -> window.location.assign = oldAssign

  it 'clears cache', ->
    a localStorage.getItem('oauth_credentials')
    requestCredentials auth_uri: 'https://bar.com', client_id: 'foo'
    a !localStorage.getItem('oauth_credentials')
