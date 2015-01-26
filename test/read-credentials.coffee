readCredentials = o2i.readCredentials



describe '.readCredentials()', ->
  fixData()

  describe 'from URI hash', ->
    fixHash()

    it 's creds and clears hash', ->
      a window.location.href.indexOf('#') isnt -1
      crd = readCredentials(@request)
      a crd.accessToken is 'foo-token'
      a window.location.href.indexOf('#') is -1
