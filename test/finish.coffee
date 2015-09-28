finish = o2i.finish



describe '.finish()', ->
  fixData()

  it 'returns null if there is no hash data', ->
    a.isNull finish @request

  it 'returns null if there is on OAuth data in hash', ->
    setHash 'some-section'
    a.isNull finish @request

  describe 'from URI hash', ->
    beforeEach ->
      setHash
        access_token: @creds.data.accessToken
        token_type: @creds.data.token_type

    it 'reads data from hash and then clears hash', ->
      a window.location.href.indexOf('#') isnt -1
      data = finish @request
      a data.accessToken is 'foo-token'
      a window.location.href.indexOf('#') is -1
