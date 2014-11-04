clearCache = o2i.clearCache



describe '.clearCache()', ->
  fixCache()

  it 'manually clears the cache', ->
    a localStorage.getItem('oauth_credentials')
    o2i.clearCache()
    a !localStorage.getItem('oauth_credentials')
