var cache = require('./credentials-cache')
var parse_oauth_credentials = require('./credentials-parse')
var utils = require('./utils')
var tapValue = utils.tapValue,
    clearHash = utils.clearLocationHash



/*

get_credentials :: -> {} || null

*/
module.exports = function getGredentials(requestOpts){
  var cacheId = JSON.stringify(requestOpts)

  return isOauthRedirect(location.hash)
  ? tapValue(
      extractCredentials(location.hash.slice(1)),
      function(creds){
        cache.set(creds, cacheId, calcExpireAt(creds))
      }
    )
  : cache.get(cacheId)
}



/*

isOauthRedirect :: String -> Bool

*/
function isOauthRedirect(hashString){
  return !!~hashString.indexOf('#access_token')
}

function calcExpireAt(credentials){
  return credentials.expiresIn ? (Date.now() + credentials.expiresIn) : null
}




/* This function mutates location to remove
the retrieved credentials

extractCredentials :: -> {} || null

*/
function extractCredentials(hashString){
  return tapValue(
    parse_oauth_credentials(hashString),
    function(){ clearHash() }
  )
}
