var isLocalStorageAvailable = require('./utils/is-local-storage-available')
var store = require('store')
var cacheName = 'oauth_credentials'


exports.set = function setCache(data, id, expiresAt){
  /* Sometimes localStorage is not usable, such as
  when iOS Safari is in private mode. */
  if (!isLocalStorageAvailable) return null

  store(cacheName, {
    data: data,
    id: id,
    expiresAt: expiresAt
  })

  return null
}



exports.get = function getCache(id){
  var data = store(cacheName)

  return !data
  ? null

  /* If cache does not pass id
  match test then return null.
  This is a way of ensuring cache
  is only returned for correct requests. */
  : data.id !== id
  ? clearCache(cacheName)

  /* Cache is considered invalid if Date.now() has
  surpassed expiresAt.
  If expiresAt === null, it never expires. */
  : isTokenExpired(data)
  ? clearCache(cacheName)

  : data.data
}



// Private

function isTokenExpired(token) {
  return token.expiresAt && token.expiresAt < Date.now()
}

function clearCache(key) {
  store(key, null) // returns undefined which we don't want
  return null
}
