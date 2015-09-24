{ processGrantRequest, inferRedirectURI } = require '../lib/start'



describe 'start', ->

  describe 'processGrantRequest()', ->

    describe 'redirect_uri', ->

      it 'may be inferred', ->
        { redirect_uri } = processGrantRequest({})
        a redirect_uri is inferRedirectURI(window.location)

      it 'may be explicitly set', ->
        grantRequest = { redirect_uri: 'https://foo.bar.io:7272' }
        { redirect_uri } = processGrantRequest grantRequest
        a redirect_uri is grantRequest.redirect_uri
