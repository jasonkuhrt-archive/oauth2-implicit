var isLocalStorageAvailable = require('./utils/is-local-storage-available')
var store = require('store')
var cacheName = 'oauth_credentials'
var currentCacheVersion = '0.4.1'



/*

setCache :: *, String, UnixTimestampMS, -> Boolean

*/
exports.set = function setCache(data, id, expiresAt) {

  /* Sometimes localStorage is not usable, such as
  when iOS Safari is in private mode. */
  if (!isLocalStorageAvailable) return false

  store(cacheName, {
    version: currentCacheVersion,
    data: data,
    id: id,
    expiresAt: expiresAt
  })

  return true
}



/*

getCache :: id -> null | *

*/
exports.get = function getCache(id){

  var data = store(cacheName)

  return !data
  ? null

  /* If cache does not pass id match test then
  return null. This ensures cache correctly
  corresponds to requests. */
  : data.id !== id
  ? doClearCache(cacheName)

  /* if the cache was stored by an
  incompatible version of this module
  then opt to clear this cache; it might
  be the thing that is incompatible! */
  : isCacheOutdated(data, currentCacheVersion)
  ? doClearCache(cacheName)

  /* Cache is considered invalid if Date.now() has
  surpassed expiresAt.
  If expiresAt === null, it never expires. */
  : isTokenExpired(data)
  ? doClearCache(cacheName)

  : data.data
}



/* For clearing cache manually. This is at least
useful for cleanly logging out. While trivial,
the client application should not have to now the
cacheName being used.

Returns Boolean where true indicates that cache
was removed and false that there was no cache to
remove.

clearCache :: -> Boolean

*/
exports.clear = function clearCache() {
  return tapValue(
    Boolean(store(cacheName)),
    function(hasCache){
      if (hasCache) doClearCache(cacheName)
    }
  )
}



// Private

function tapValue(v, tapper) {
  tapper(v); return v
}

function isCacheOutdated(cache, currentCacheVersion) {
  return cache.version.split('.')[1] < currentCacheVersion.split('.')[1]
}

function isTokenExpired(token) {
  return token.expiresAt && token.expiresAt < Date.now()
}

function doClearCache(key) {
  store(key, null) // returns undefined which we don't want
  return null
}
