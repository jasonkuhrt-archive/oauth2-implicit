var parse_oauth_credentials = require('./credentials-parse')
var utils = require('./utils')
var tapValue = utils.tapValue,
  clearHash = utils.clearLocationHash



/*

get_credentials :: -> {} || null

*/
module.exports = function getGredentials () {
  return isOauthRedirect(location.hash)
    ? extractCredentials(location.hash.slice(1))
    : null
}



/*

isOauthRedirect :: String -> Bool

*/
function isOauthRedirect (hashString) {
  return !!~hashString.indexOf('#access_token')
}



/* This function mutates location to remove
the retrieved credentials

extractCredentials :: -> {} || null

*/
function extractCredentials (hashString) {
  return tapValue(
    parse_oauth_credentials(hashString),
    function () { clearHash() }
  )
}
